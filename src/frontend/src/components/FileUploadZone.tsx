/**
 * FileUploadZone — drag-and-drop / click-to-select file input.
 * Accepts images (jpg, png, gif, webp) and PDFs only, max 5MB.
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { File, FileImage, Paperclip, Trash2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface FileUploadZoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string | null;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeLabel(mimeType: string): string {
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType.startsWith("image/"))
    return mimeType.split("/")[1].toUpperCase();
  return "FILE";
}

export function FileUploadZone({
  value,
  onChange,
  error,
  className,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (file: File) => {
      setValidationError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setValidationError(
          "Only images (JPG, PNG, GIF, WebP) and PDF files are allowed.",
        );
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setValidationError(
          `File too large. Maximum size is 5 MB (this file: ${formatBytes(file.size)}).`,
        );
        return;
      }

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      onChange(file);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSet(file);
      e.target.value = "";
    },
    [validateAndSet],
  );

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    setValidationError(null);
  };

  const displayError = error ?? validationError;

  // ── File selected state ──
  if (value) {
    const isImage = value.type.startsWith("image/");
    return (
      <div
        data-ocid="file_upload.panel"
        className={cn("rounded-sm border border-border bg-card p-3", className)}
      >
        <div className="flex items-center gap-3">
          {/* Preview or icon */}
          {preview && isImage ? (
            <div className="w-12 h-12 rounded-sm overflow-hidden border border-border shrink-0">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-sm bg-muted/40 border border-border flex items-center justify-center shrink-0">
              {isImage ? (
                <FileImage className="w-5 h-5 text-primary" />
              ) : (
                <File className="w-5 h-5 text-primary" />
              )}
            </div>
          )}

          {/* File info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {value.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="badge-security">
                {getFileTypeLabel(value.type)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatBytes(value.size)}
              </span>
            </div>
          </div>

          {/* Remove button */}
          <Button
            data-ocid="file_upload.delete_button"
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive transition-smooth"
            onClick={handleRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Empty / dropzone state ──
  // Use <label> wrapping the hidden <input> — semantically correct and accessible
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        data-ocid="file_upload.dropzone"
        className={cn(
          "relative flex flex-col items-center gap-2 rounded-sm border-2 border-dashed",
          "px-4 py-6 text-center cursor-pointer transition-smooth",
          isDragging
            ? "border-primary/60 bg-primary/5"
            : "border-border hover:border-primary/40 hover:bg-primary/5",
          displayError && "border-destructive/50",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label="Upload file — click or drag and drop"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
          className="sr-only"
          onChange={handleChange}
          data-ocid="file_upload.upload_button"
        />
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border transition-smooth",
            isDragging
              ? "bg-primary/10 border-primary/40"
              : "bg-muted/40 border-border",
          )}
        >
          {isDragging ? (
            <Paperclip className="w-5 h-5 text-primary" />
          ) : (
            <Upload className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {isDragging ? "Drop to attach" : "Attach a file"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Images (JPG, PNG, GIF, WebP) or PDF · Max 5 MB
          </p>
        </div>
      </label>

      {displayError && (
        <p
          data-ocid="file_upload.field_error"
          className="text-xs text-destructive"
        >
          {displayError}
        </p>
      )}
    </div>
  );
}
