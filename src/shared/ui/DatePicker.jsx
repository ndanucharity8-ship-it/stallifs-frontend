import { useEffect, useRef, useState } from "react";

import { Calendar as CalendarIcon } from "../icons";

import Calendar from "./Calendar";

export default function DatePicker({
  label,

  value = null,

  onChange,

  placeholder = "Select date",

  required = false,

  disabled = false,

  error,

  helperText,

  minDate,

  maxDate,

  disabledDates = [],

  className = "",
}) {
  const [open, setOpen] = useState(false);

  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString();
  };

  const handleSelect = (date) => {
    onChange?.(date);

    setOpen(false);
  };

  return (
    <div
      className={[
        "datepicker-group",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      ref={pickerRef}
    >
      {label && (
        <label className="datepicker-label">
          {label}

          {required && (
            <span className="datepicker-required">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={[
          "datepicker-wrapper",
          error
            ? "datepicker-wrapper--error"
            : "",
          disabled
            ? "datepicker-wrapper--disabled"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          type="text"
          readOnly
          disabled={disabled}
          value={formatDate(value)}
          placeholder={placeholder}
          className="datepicker-input"
          onClick={() =>
            !disabled &&
            setOpen(!open)
          }
        />

        <button
          type="button"
          className="datepicker-button"
          disabled={disabled}
          onClick={() =>
            setOpen(!open)
          }
        >
          <CalendarIcon size={20} />
        </button>

        {open && (
          <div className="datepicker-popup">
            <Calendar
              value={value}
              onChange={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={
                disabledDates
              }
            />
          </div>
        )}
      </div>

      {helperText && !error && (
        <small className="datepicker-helper">
          {helperText}
        </small>
      )}

      {error && (
        <small className="datepicker-error">
          {error}
        </small>
      )}
    </div>
  );
}