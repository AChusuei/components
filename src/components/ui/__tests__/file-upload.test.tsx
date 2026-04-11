import { render, act, waitFor } from "@testing-library/react"
import { vi, describe, it, expect } from "vitest"
import * as React from "react"
import { FileUpload } from "../file-upload"
import type { UploadFile } from "../file-upload"

// ── react-dropzone mock ────────────────────────────────────────────────────────
// Expose onDrop so tests can simulate drops directly.

let simulateDrop: ((accepted: File[], rejected: never[]) => void) | undefined

vi.mock("react-dropzone", () => ({
  useDropzone: (opts: { onDrop?: (accepted: File[], rejected: never[]) => void }) => {
    simulateDrop = opts.onDrop
    return {
      getRootProps: () => ({ "data-testid": "dropzone" }),
      getInputProps: () => ({}),
      isDragActive: false,
    }
  },
}))

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeFile(name = "photo.jpg", type = "image/jpeg"): File {
  return new File(["data"], name, { type })
}

// ── isImageFile (tested indirectly via preview URL) ───────────────────────────

describe("isImageFile — preview URL generation", () => {
  it("generates a preview for image/jpeg", async () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} />)

    await act(async () => {
      simulateDrop?.([makeFile("photo.jpg", "image/jpeg")], [])
    })

    await waitFor(() => {
      const [files] = onChange.mock.calls.at(-1) as [UploadFile[]]
      expect(files[0].preview).toMatch(/^blob:/)
    })
  })

  it("generates a preview for .heic file with empty MIME type", async () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} />)

    await act(async () => {
      simulateDrop?.([makeFile("iphone-shot.heic", "")], [])
    })

    await waitFor(() => {
      const [files] = onChange.mock.calls.at(-1) as [UploadFile[]]
      expect(files[0].preview).toMatch(/^blob:/)
    })
  })

  it("does NOT generate a preview for a PDF", async () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} />)

    await act(async () => {
      simulateDrop?.([makeFile("contract.pdf", "application/pdf")], [])
    })

    await waitFor(() => {
      const [files] = onChange.mock.calls.at(-1) as [UploadFile[]]
      expect(files[0].preview).toBeUndefined()
    })
  })
})

// ── Uncontrolled mode ─────────────────────────────────────────────────────────

describe("FileUpload — uncontrolled mode", () => {
  it("accumulates files across multiple drops", async () => {
    const onChange = vi.fn()
    render(<FileUpload multiple onChange={onChange} />)

    await act(async () => {
      simulateDrop?.([makeFile("a.jpg")], [])
    })
    await act(async () => {
      simulateDrop?.([makeFile("b.jpg")], [])
    })

    await waitFor(() => {
      const [latest] = onChange.mock.calls.at(-1) as [UploadFile[]]
      expect(latest).toHaveLength(2)
    })
  })
})

// ── Controlled mode — stale closure regression ────────────────────────────────
//
// Before the valueRef fix, async onUpload callbacks called updater(staleValue)
// which resolved to [] and passed onChange([]), wiping the file list.
// This test proves the fix holds.

describe("FileUpload — controlled mode stale closure fix", () => {
  it("does not wipe the file list when async upload callbacks fire after first render", async () => {
    let resolveUpload!: () => void
    let capturedOnProgress!: (pct: number) => void

    const onUpload = vi.fn(
      (_file: File, onProgress: (pct: number) => void) =>
        new Promise<void>((resolve) => {
          capturedOnProgress = onProgress
          resolveUpload = resolve
        })
    )

    const onChangeCalls: UploadFile[][] = []

    function TestHarness() {
      const [files, setFiles] = React.useState<UploadFile[]>([])

      return (
        <FileUpload
          value={files}
          onChange={(next) => {
            onChangeCalls.push(next)
            setFiles(next)
          }}
          onUpload={onUpload}
        />
      )
    }

    render(<TestHarness />)

    // Simulate drop → first onChange should add the file
    await act(async () => {
      simulateDrop?.([makeFile("photo.jpg", "image/jpeg")], [])
    })

    // First onChange: file added with status "uploading"
    await waitFor(() => expect(onChangeCalls.length).toBeGreaterThanOrEqual(1))
    expect(onChangeCalls[0]).toHaveLength(1)
    expect(onChangeCalls[0][0].status).toBe("uploading")

    // Fire progress callback AFTER state has updated (simulates async race)
    await act(async () => {
      capturedOnProgress(50)
    })

    // Progress onChange must still include the file, not be []
    await waitFor(() => {
      const latest = onChangeCalls.at(-1)!
      expect(latest).toHaveLength(1)
      expect(latest[0].progress).toBe(50)
    })

    // Complete the upload
    await act(async () => {
      resolveUpload()
    })

    // Final onChange: file should be success, not wiped
    await waitFor(() => {
      const latest = onChangeCalls.at(-1)!
      expect(latest).toHaveLength(1)
      expect(latest[0].status).toBe("success")
    })
  })
})
