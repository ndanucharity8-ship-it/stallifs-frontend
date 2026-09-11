import {
  forwardRef,
  useMemo,
} from "react";

const Button = forwardRef(
  (
    {
      children,

      type = "button",

      variant = "primary",

      size = "md",

      fullWidth = false,

      block = false,

      loading = false,

      disabled = false,

      leftIcon: LeftIcon,

      rightIcon: RightIcon,

      className = "",

      onClick,

      ...props
    },
    ref
  ) => {
    const classes = useMemo(
      () =>
        [
          "btn",

          `btn--${variant}`,

          `btn--${size}`,

          (fullWidth || block) && "btn--block",

          loading && "btn--loading",

          (disabled || loading) &&
            "btn--disabled",

          className,
        ]
          .filter(Boolean)
          .join(" "),
      [
        variant,
        size,
        fullWidth,
        block,
        loading,
        disabled,
        className,
      ]
    );

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-disabled={
          disabled || loading
        }
        aria-busy={loading}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <span
            className="btn-spinner"
            aria-hidden="true"
          />
        )}

        {!loading && LeftIcon && (
          <LeftIcon
            size={18}
            className="btn-icon btn-icon-left"
          />
        )}

        <span className="btn-label">
          {children}
        </span>

        {!loading && RightIcon && (
          <RightIcon
            size={18}
            className="btn-icon btn-icon-right"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;