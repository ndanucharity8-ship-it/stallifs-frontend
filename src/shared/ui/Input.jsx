import {
  forwardRef,
  useId,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  CircleAlert,
  LoaderCircle,
} from "../icons";

const Input = forwardRef(
  (
    {
      id,
      label,

      type = "text",

      value,

      name,

      placeholder,

      helperText,

      error,

      required = false,

      disabled = false,

      readOnly = false,

      fullWidth = true,

      loading = false,

      leftIcon: LeftIcon,

      rightIcon: RightIcon,

      onEnter,

      className = "",

      onKeyDown,

      ...props
    },
    ref
  ) => {
    const generatedId = useId();

    const inputId = id || generatedId;

    const [showPassword, setShowPassword] =
      useState(false);

    const isPassword =
      type === "password";

    const inputType =
      isPassword && showPassword
        ? "text"
        : type;

    const handleKeyDown = (e) => {
      if (
        e.key === "Enter" &&
        onEnter &&
        !disabled &&
        !loading
      ) {
        onEnter(e);
      }

      onKeyDown?.(e);
    };

    return (
      <div
        className={[
          "input-group",

          fullWidth &&
            "input-group--block",

          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="input-label"
          >
            {label}

            {required && (
              <span className="input-required">
                *
              </span>
            )}
          </label>
        )}

        <div
          className={[
            "input-wrapper",

            error &&
              "input-wrapper--error",

            disabled &&
              "input-wrapper--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {LeftIcon && (
            <span className="input-icon input-icon-left">
              <LeftIcon size={18} />
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={inputType}
            value={value}
            placeholder={placeholder}
            required={required}
            disabled={
              disabled || loading
            }
            readOnly={readOnly}
            aria-invalid={!!error}
            aria-required={required}
            aria-busy={loading}
            className="input"
            onKeyDown={handleKeyDown}
            {...props}
          />

          {loading && (
            <span className="input-icon input-icon-right">
              <LoaderCircle
                size={18}
                className="input-spinner"
              />
            </span>
          )}

          {!loading &&
            isPassword && (
              <button
                type="button"
                className="input-toggle"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            )}

          {!loading &&
            !isPassword &&
            RightIcon && (
              <span className="input-icon input-icon-right">
                <RightIcon size={18} />
              </span>
            )}
        </div>

        {helperText && !error && (
          <small className="input-helper">
            {helperText}
          </small>
        )}

        {error && (
          <small className="input-error">
            <CircleAlert size={16} />

            <span>{error}</span>
          </small>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;