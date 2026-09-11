import {
  forwardRef,
  useId,
} from "react";

const Switch = forwardRef(
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

    const switchId = id || generatedId;

    return (
      <div
        className={[
          "switch-group",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label
          htmlFor={switchId}
          className={[
            "switch-label",
            disabled &&
              "switch-label--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            required={required}
            disabled={disabled}
            className="switch-input"
            {...props}
          />

          <span className="switch-track">
            <span className="switch-thumb" />
          </span>

          {label && (
            <span className="switch-text">
              {label}
            </span>
          )}
        </label>

        {helperText && !error && (
          <small className="switch-helper">
            {helperText}
          </small>
        )}

        {error && (
          <small className="switch-error">
            {error}
          </small>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;