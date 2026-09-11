import {
  forwardRef,
  useId,
} from "react";

import {
  ChevronDown,
  CircleAlert,
} from "../icons";

const Select = forwardRef(
  (
    {
      id,
      label,

      name,

      value,

      options = [],

      placeholder = "Select an option",

      helperText,

      error,

      required = false,

      disabled = false,

      fullWidth = true,

      className = "",

      ...props
    },
    ref
  ) => {
    const generatedId = useId();

    const selectId = id || generatedId;

    return (
      <div
        className={[
          "select-group",
          fullWidth && "select-group--block",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="select-label"
          >
            {label}

            {required && (
              <span className="select-required">
                *
              </span>
            )}
          </label>
        )}

        <div
          className={[
            "select-wrapper",
            error && "select-wrapper--error",
            disabled &&
              "select-wrapper--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-required={required}
            className="select"
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <span className="select-icon">
            <ChevronDown size={18} />
          </span>
        </div>

        {helperText && !error && (
          <small className="select-helper">
            {helperText}
          </small>
        )}

        {error && (
          <small className="select-error">
            <CircleAlert size={16} />

            <span>{error}</span>
          </small>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;