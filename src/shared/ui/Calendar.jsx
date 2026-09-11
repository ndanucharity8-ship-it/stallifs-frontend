import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "../icons";

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export default function Calendar({
  value = null,

  onChange,

  minDate,

  maxDate,

  disabledDates = [],

  className = "",
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] =
    useState(
      value ? new Date(value) : today
    );

  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const monthLabel =
    currentMonth.toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );

  const days = useMemo(() => {
    const firstDay = new Date(
      year,
      month,
      1
    );

    const lastDay = new Date(
      year,
      month + 1,
      0
    );

    const start = firstDay.getDay();

    const total =
      lastDay.getDate();

    const items = [];

    for (let i = 0; i < start; i++) {
      items.push(null);
    }

    for (
      let day = 1;
      day <= total;
      day++
    ) {
      items.push(
        new Date(year, month, day)
      );
    }

    return items;
  }, [month, year]);

  const previousMonth = () =>
    setCurrentMonth(
      new Date(year, month - 1, 1)
    );

  const nextMonth = () =>
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );

  const isDisabled = (date) => {
    if (!date) return true;

    if (
      minDate &&
      date < new Date(minDate)
    )
      return true;

    if (
      maxDate &&
      date > new Date(maxDate)
    )
      return true;

    return disabledDates.some(
      (d) =>
        new Date(d).toDateString() ===
        date.toDateString()
    );
  };

  const isSelected = (date) =>
    value &&
    date &&
    new Date(value).toDateString() ===
      date.toDateString();

  const isToday = (date) =>
    date &&
    today.toDateString() ===
      date.toDateString();

  return (
    <div
      className={[
        "calendar",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-nav"
          onClick={previousMonth}
        >
          <ChevronLeft size={18} />
        </button>

        <h4 className="calendar-title">
          {monthLabel}
        </h4>

        <button
          type="button"
          className="calendar-nav"
          onClick={nextMonth}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEK_DAYS.map((day) => (
          <span key={day}>
            {day}
          </span>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date, index) =>
          date ? (
            <button
              key={index}
              type="button"
              disabled={isDisabled(date)}
              className={[
                "calendar-day",
                isToday(date)
                  ? "calendar-day--today"
                  : "",
                isSelected(date)
                  ? "calendar-day--selected"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                onChange?.(date)
              }
            >
              {date.getDate()}
            </button>
          ) : (
            <span
              key={index}
              className="calendar-empty"
            />
          )
        )}
      </div>

      <div className="calendar-footer">
        <button
          type="button"
          className="calendar-today"
          onClick={() =>
            onChange?.(today)
          }
        >
          Today
        </button>
      </div>
    </div>
  );
}