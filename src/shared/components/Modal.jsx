import { createPortal } from "react-dom";
import { useEffect } from "react";

import { X } from "../icons";

export default function Modal({
  open = false,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  onClose,
  className = "",
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => {
        if (closeOnOverlay) {
          onClose?.();
        }
      }}
    >
      <div
        className={[
          "modal",
          `modal--${size}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(event) =>
          event.stopPropagation()
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          title ? "modal-title" : undefined
        }
      >
        {(title || onClose) && (
          <header className="modal-header">
            {title && (
              <h2
                id="modal-title"
                className="modal-title"
              >
                {title}
              </h2>
            )}

            {onClose && (
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </header>
        )}

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <footer className="modal-footer">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}