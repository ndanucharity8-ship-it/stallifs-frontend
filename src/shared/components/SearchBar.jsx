import { Search, X } from "../icons";

export default function SearchBar({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  clearable = true,
  className = "",
}) {
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const searchValue = value.trim();

      if (searchValue) {
        onSearch?.(searchValue);
      }
    }
  };

  const handleClear = () => {
    onChange?.("");
    onSearch?.("");
  };

  return (
    <div
      className={[
        "search-bar",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="search-bar-icon">
        <Search size={18} />
      </span>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled || loading}
        className="search-bar-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {loading && (
        <span className="search-bar-loading">
          Loading...
        </span>
      )}

      {!loading && clearable && value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}