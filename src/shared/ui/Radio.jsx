import {
  forwardRef,
  useId,
} from "react";

const Radio = forwardRef(
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

    const radioId = id || generatedId;

    return (
      <div
        className={[
          "radio-group",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label
          htmlFor={radioId}
          className={[
            "radio-label",
            disabled &&
              "radio-label--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={ref}
            id={radioId}
            type="radio"
            required={required}
            disabled={disabled}
            className="radio-input"
            {...props}
          />

          <span className="radio-circle" />

          {label && (
            <span className="radio-text">
              {label}
            </span>
          )}
        </label>

        {helperText && !error && (
          <small className="radio-helper">
            {helperText}
          </small>
        )}

        {error && (
          <small className="radio-error">
            {error}
          </small>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;