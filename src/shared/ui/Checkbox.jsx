import {
  forwardRef,
  useId,
} from "react";



const Checkbox = forwardRef(
  (
    {
      id,
      label,

      helperText,

      error,

      disabled = false,

      required = false,

      className = "",

      ...props
    },
    ref
  ) => {
    const generatedId = useId();

    const checkboxId = id || generatedId;

    return (
      <div
        className={[
          "checkbox-group",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label
          htmlFor={checkboxId}
          className={[
            "checkbox-label",
            disabled &&
              "checkbox-label--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            required={required}
            disabled={disabled}
            className="checkbox-input"
            {...props}
          />

          <span className="checkbox-box" />

          {label && (
            <span className="checkbox-text">
              {label}
            </span>
          )}
        </label>

        {helperText && !error && (
          <small className="checkbox-helper">
            {helperText}
          </small>
        )}

        {error && (
          <small className="checkbox-error">
            {error}
          </small>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;