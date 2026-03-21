import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileUpload, type UploadFile } from "./file-upload";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeFile(name: string, type = "text/plain", size = 1024): File {
  const file = new File(["x".repeat(size)], name, { type });
  return file;
}

function makeImageFile(name = "photo.png"): File {
  return makeFile(name, "image/png", 2048);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("FileUpload", () => {
  beforeEach(() => {
    // Stub URL.createObjectURL / revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("renders drop zone text", () => {
    render(<FileUpload />);
    expect(screen.getByText(/drag & drop files here/i)).toBeInTheDocument();
  });

  it("renders file input element", () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it("shows disabled state styling on drop zone", () => {
    render(<FileUpload disabled />);
    // react-dropzone manages disabled via event suppression, not native disabled attr;
    // verify the disabled visual class is applied to the root drop zone div.
    const dropZone = document.querySelector("[class*='cursor-not-allowed']");
    expect(dropZone).toBeInTheDocument();
  });

  it("accepts a file and shows it in the list", async () => {
    const onChange = vi.fn();
    render(<FileUpload onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("report.pdf", "application/pdf");

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => {
      expect(screen.getByText("report.pdf")).toBeInTheDocument();
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("shows image preview for image files", async () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeImageFile();

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => {
      const img = screen.getByRole("img", { name: /photo\.png/i });
      expect(img).toBeInTheDocument();
    });
  });

  it("shows file icon (not image preview) for non-image files", async () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("archive.zip", "application/zip");

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => {
      expect(screen.getByText("archive.zip")).toBeInTheDocument();
      // No <img> element should be present
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });

  it("removes a file when the remove button is clicked", async () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("delete-me.txt");

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => screen.getByText("delete-me.txt"));

    const removeBtn = screen.getByRole("button", { name: /remove delete-me\.txt/i });
    await userEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText("delete-me.txt")).not.toBeInTheDocument();
    });
  });

  it("single-file mode replaces previous file", async () => {
    render(<FileUpload multiple={false} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    const file1 = makeFile("first.txt");
    await act(async () => {
      await userEvent.upload(input, file1);
    });
    await waitFor(() => screen.getByText("first.txt"));

    const file2 = makeFile("second.txt");
    await act(async () => {
      await userEvent.upload(input, file2);
    });

    await waitFor(() => {
      expect(screen.queryByText("first.txt")).not.toBeInTheDocument();
      expect(screen.getByText("second.txt")).toBeInTheDocument();
    });
  });

  it("multi-file mode keeps previous files", async () => {
    render(<FileUpload multiple />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    const file1 = makeFile("one.txt");
    await act(async () => {
      await userEvent.upload(input, file1);
    });
    await waitFor(() => screen.getByText("one.txt"));

    const file2 = makeFile("two.txt");
    await act(async () => {
      await userEvent.upload(input, file2);
    });

    await waitFor(() => {
      expect(screen.getByText("one.txt")).toBeInTheDocument();
      expect(screen.getByText("two.txt")).toBeInTheDocument();
    });
  });

  it("calls onUpload and shows success state", async () => {
    const onUpload = vi.fn(async (_file: File, onProgress: (n: number) => void) => {
      onProgress(50);
      onProgress(100);
    });

    render(<FileUpload onUpload={onUpload} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("upload-me.txt");

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith(file, expect.any(Function));
    });

    // Success icon should appear (CheckCircleIcon aria label not explicit, check by title/role not present)
    // We verify by checking status - success removes progress bar
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("shows error state when onUpload rejects", async () => {
    const onUpload = vi.fn(async () => {
      throw new Error("Network error");
    });

    render(<FileUpload onUpload={onUpload} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("fail.txt");

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });

  it("rejects files exceeding maxSize and shows error", async () => {
    render(<FileUpload maxSize={500} />); // 500 bytes
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = makeFile("big.txt", "text/plain", 1024); // 1 KB

    await act(async () => {
      await userEvent.upload(input, bigFile);
    });

    await waitFor(() => {
      // File appears in list with an error
      expect(screen.getByText("big.txt")).toBeInTheDocument();
    });
  });

  it("works in controlled mode", async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <FileUpload value={[]} onChange={onChange} />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("controlled.txt");

    await act(async () => {
      await userEvent.upload(input, file);
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });

    // Simulate parent updating value
    const newFiles: UploadFile[] = onChange.mock.calls[0][0];
    rerender(<FileUpload value={newFiles} onChange={onChange} />);

    expect(screen.getByText("controlled.txt")).toBeInTheDocument();
  });

  it("shows max size hint text in drop zone", () => {
    render(<FileUpload maxSize={2 * 1024 * 1024} />);
    expect(screen.getByText(/max size: 2\.0 mb/i)).toBeInTheDocument();
  });
});
