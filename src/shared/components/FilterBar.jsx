import { Button, DatePicker, Select } from "../ui";

export default function FilterBar({
  filters = [],
  values = {},
  onChange,
  onReset,
  className = "",
}) {
  const handleChange = (name, value) => {
    onChange?.({
      ...values,
      [name]: value,
    });
  };

  return (
    <div
      className={[
        "filter-bar",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {filters.length > 0 && (
        <div className="filter-bar-fields">
          {filters.map((filter) => {
            const value =
              values[filter.name] ?? "";

            if (filter.type === "date") {
              return (
                <DatePicker
                  key={filter.name}
                  label={filter.label}
                  value={value || null}
                  onChange={(nextValue) =>
                    handleChange(
                      filter.name,
                      nextValue
                    )
                  }
                  placeholder={
                    filter.placeholder ||
                    "Select date"
                  }
                  minDate={filter.minDate}
                  maxDate={filter.maxDate}
                  disabled={filter.disabled}
                />
              );
            }

            return (
              <Select
                key={filter.name}
                label={filter.label}
                value={value}
                onChange={(event) =>
                  handleChange(
                    filter.name,
                    event.target.value
                  )
                }
                options={filter.options || []}
                placeholder={
                  filter.placeholder ||
                  `Select ${filter.label}`
                }
                disabled={filter.disabled}
              />
            );
          })}
        </div>
      )}

      {onReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
        >
          Reset
        </Button>
      )}
    </div>
  );
}