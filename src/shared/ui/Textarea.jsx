import {
  forwardRef,
  useId,
} from "react";

import { CircleAlert } from "../icons";


const TextArea = forwardRef(
  (
    {
      id,
      label,

      value,

      name,

      placeholder,

      helperText,

      error,

      required = false,

      disabled = false,

      readOnly = false,

      fullWidth = true,

      rows = 5,

      maxLength,

      showCount = false,

      autoResize = false,

      className = "",

      onInput,

      ...props
    },
    ref
  ) => {
    const generatedId = useId();

    const textAreaId = id || generatedId;

    const handleInput = (e) => {
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }

      onInput?.(e);
    };

    return (
      <div
        className={[
          "textarea-group",
          fullWidth && "textarea-group--block",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label
            htmlFor={textAreaId}
            className="textarea-label"
          >
            {label}

            {required && (
              <span className="textarea-required">
                *
              </span>
            )}
          </label>
        )}

        <div
          className={[
            "textarea-wrapper",
            error && "textarea-wrapper--error",
            disabled &&
              "textarea-wrapper--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <textarea
            ref={ref}
            id={textAreaId}
            name={name}
            value={value}
            rows={rows}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-required={required}
            className="textarea"
            onInput={handleInput}
            {...props}
          />
        </div>

        <div className="textarea-footer">
          <div>
            {helperText && !error && (
              <small className="textarea-helper">
                {helperText}
              </small>
            )}

            {error && (
              <small className="textarea-error">
                <CircleAlert size={16} />

                <span>{error}</span>
              </small>
            )}
          </div>

          {showCount && maxLength && (
            <small className="textarea-count">
              {(value || "").length}/{maxLength}
            </small>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;