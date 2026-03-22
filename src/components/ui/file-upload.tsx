import * as React from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import {
  FileIcon,
  FileTextIcon,
  FileArchiveIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileCodeIcon,
  XIcon,
  UploadCloudIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FileUploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadFile {
  /** Stable ID for the file entry */
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: FileUploadStatus;
  error?: string;
}

export type UploadFn = (
  file: File,
  onProgress: (pct: number) => void
) => Promise<void>;

export interface FileUploadProps {
  /** Allow multiple file selection */
  multiple?: boolean;
  /** react-dropzone accept map, e.g. { "image/*": [".png", ".jpg"] } */
  accept?: Accept;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Upload transport — consumer supplies this */
  onUpload?: UploadFn;
  /** Called whenever the internal file list changes */
  onChange?: (files: UploadFile[]) => void;
  /** Controlled file list — use with onChange for full control */
  value?: UploadFile[];
  /** Additional class on the root element */
  className?: string;
  /** Disable the entire widget */
  disabled?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _id = 0;
function uid() {
  return `fu-${++_id}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true
  // Fallback: check extension — browsers sometimes report empty type for HEIC/HEIF
  const ext = file.name.split(".").pop()?.toLowerCase()
  return ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "avif"].includes(ext ?? "")
}

function FileTypeIcon({ file, className }: { file: File; className?: string }) {
  const type = file.type;
  const props = { className: cn("h-8 w-8", className) };
  if (type.startsWith("video/")) return <FileVideoIcon {...props} />;
  if (type.startsWith("audio/")) return <FileAudioIcon {...props} />;
  if (type.includes("zip") || type.includes("tar") || type.includes("gzip"))
    return <FileArchiveIcon {...props} />;
  if (
    type.includes("javascript") ||
    type.includes("typescript") ||
    type.includes("json") ||
    type.includes("html") ||
    type.includes("css")
  )
    return <FileCodeIcon {...props} />;
  if (type.startsWith("text/")) return <FileTextIcon {...props} />;
  return <FileIcon {...props} />;
}

// ─── FileRow ──────────────────────────────────────────────────────────────────

interface FileRowProps {
  entry: UploadFile;
  onRemove: (id: string) => void;
}

function FileRow({ entry, onRemove }: FileRowProps) {
  const { file, preview, progress, status, error, id } = entry;

  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
      {/* Thumbnail / icon */}
      <div className="flex-shrink-0">
        {preview ? (
          <img
            src={preview}
            alt={file.name}
            className="h-12 w-12 rounded object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded bg-muted text-muted-foreground">
            <FileTypeIcon file={file} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <div className="flex items-center gap-1 flex-shrink-0">
            {status === "success" && (
              <CheckCircleIcon className="h-4 w-4 text-green-500" />
            )}
            {status === "error" && (
              <AlertCircleIcon className="h-4 w-4 text-destructive" />
            )}
            {status !== "uploading" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onRemove(id)}
                aria-label={`Remove ${file.name}`}
              >
                <XIcon className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>

        {status === "uploading" && (
          <Progress value={progress} className="h-1.5" />
        )}

        {status === "error" && error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    </div>
  );
}

// ─── FileUpload ───────────────────────────────────────────────────────────────

export function FileUpload({
  multiple = false,
  accept,
  maxSize,
  onUpload,
  onChange,
  value,
  className,
  disabled = false,
}: FileUploadProps) {
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = React.useState<UploadFile[]>([]);

  const files = isControlled ? value : internalFiles;

  // Keep a ref so async upload callbacks always read the latest controlled value
  // without capturing a stale closure.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  const updateFiles = React.useCallback(
    (updater: (prev: UploadFile[]) => UploadFile[]) => {
      if (isControlled) {
        const next = updater(valueRef.current!);
        onChange?.(next);
      } else {
        setInternalFiles((prev) => {
          const next = updater(prev);
          onChange?.(next);
          return next;
        });
      }
    },
    [isControlled, onChange]
  );

  const addFiles = React.useCallback(
    async (accepted: File[], rejections: FileRejection[]) => {
      // Build rejection entries
      const rejectedEntries: UploadFile[] = rejections.map((r) => ({
        id: uid(),
        file: r.file,
        progress: 0,
        status: "error",
        error: r.errors.map((e) => e.message).join(", "),
      }));

      // Build accepted entries with previews
      const acceptedEntries: UploadFile[] = accepted.map((file) => ({
        id: uid(),
        file,
        preview: isImageFile(file) ? URL.createObjectURL(file) : undefined,
        progress: 0,
        status: onUpload ? "uploading" : "idle",
      }));

      const newEntries = [...acceptedEntries, ...rejectedEntries];

      if (!multiple) {
        // Single-file mode: revoke old previews then replace
        updateFiles((prev) => {
          prev.forEach((e) => {
            if (e.preview) URL.revokeObjectURL(e.preview);
          });
          return newEntries.slice(0, 1);
        });
      } else {
        updateFiles((prev) => [...prev, ...newEntries]);
      }

      // Kick off uploads for accepted files
      if (onUpload) {
        for (const entry of acceptedEntries) {
          try {
            await onUpload(entry.file, (pct) => {
              updateFiles((prev) =>
                prev.map((e) =>
                  e.id === entry.id ? { ...e, progress: pct } : e
                )
              );
            });
            updateFiles((prev) =>
              prev.map((e) =>
                e.id === entry.id
                  ? { ...e, status: "success", progress: 100 }
                  : e
              )
            );
          } catch (err) {
            updateFiles((prev) =>
              prev.map((e) =>
                e.id === entry.id
                  ? {
                      ...e,
                      status: "error",
                      error: err instanceof Error ? err.message : "Upload failed",
                    }
                  : e
              )
            );
          }
        }
      }
    },
    [multiple, onUpload, updateFiles]
  );

  const removeFile = React.useCallback(
    (id: string) => {
      updateFiles((prev) => {
        const entry = prev.find((e) => e.id === id);
        if (entry?.preview) URL.revokeObjectURL(entry.preview);
        return prev.filter((e) => e.id !== id);
      });
    },
    [updateFiles]
  );

  // Revoke object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (!isControlled) {
        internalFiles.forEach((e) => {
          if (e.preview) URL.revokeObjectURL(e.preview);
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: addFiles,
    multiple,
    accept,
    maxSize,
    disabled,
  });

  const hasFiles = files.length > 0;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloudIcon className="mb-3 h-10 w-10 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-sm font-medium">Drop files here…</p>
        ) : (
          <>
            <p className="text-sm font-medium">
              Drag &amp; drop files here, or{" "}
              <span className="text-primary underline-offset-2 hover:underline">
                click to browse
              </span>
            </p>
            {maxSize && (
              <p className="mt-1 text-xs text-muted-foreground">
                Max size: {formatBytes(maxSize)}
              </p>
            )}
          </>
        )}
      </div>

      {/* File list */}
      {hasFiles && (
        <div className="space-y-2">
          {files.map((entry) => (
            <FileRow key={entry.id} entry={entry} onRemove={removeFile} />
          ))}
        </div>
      )}
    </div>
  );
}
