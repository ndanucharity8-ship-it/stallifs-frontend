import {
  forwardRef,
  useId,
} from "react";

import {
  Upload,
  FileText,
  CircleAlert,
} from "../icons";

const FileUpload = forwardRef(
  (
    {
      id,

      label,

      helperText,

      error,

      accept,

      multiple = false,

      disabled = false,

      required = false,

      files,

      onChange,

      className = "",

      ...props
    },
    ref
  ) => {
    const generatedId = useId();

    const inputId = id || generatedId;

    const fileList = files
      ? Array.from(files)
      : [];

    return (
      <div
        className={[
          "file-upload",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="file-upload-label"
          >
            {label}

            {required && (
              <span className="file-upload-required">
                *
              </span>
            )}
          </label>
        )}

        <label
          htmlFor={inputId}
          className={[
            "file-upload-dropzone",
            disabled &&
              "file-upload-dropzone--disabled",
            error &&
              "file-upload-dropzone--error",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Upload size={28} />

          <h4>Upload File</h4>

          <p>
            Drag & drop files here or{" "}
            <strong>browse</strong>
          </p>

          {accept && (
            <small>{accept}</small>
          )}

          <input
            ref={ref}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            required={required}
            className="file-upload-input"
            onChange={onChange}
            {...props}
          />
        </label>

        {fileList.length > 0 && (
          <ul className="file-upload-list">
            {fileList.map((file) => (
              <li
                key={`${file.name}-${file.size}`}
                className="file-upload-item"
              >
                <FileText size={18} />

                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        )}

        {helperText && !error && (
          <small className="file-upload-helper">
            {helperText}
          </small>
        )}

        {error && (
          <small className="file-upload-error">
            <CircleAlert size={16} />

            <span>{error}</span>
          </small>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;