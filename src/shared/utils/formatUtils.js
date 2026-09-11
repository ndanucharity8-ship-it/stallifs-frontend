export function formatCurrency(
  amount,
  currency = "KES"
) {
  if (
    amount === null ||
    amount === undefined ||
    Number.isNaN(Number(amount))
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-KE",
    {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }
  ).format(Number(amount));
}

export function formatNumber(
  value,
  options = {}
) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-KE",
    options
  ).format(Number(value));
}

export function formatPercentage(
  value,
  decimals = 1
) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return `${Number(value).toFixed(
    decimals
  )}%`;
}

export function capitalize(value = "") {
  if (!value) return "";

  return value.charAt(0).toUpperCase() +
    value.slice(1);
}

export function formatStatus(value = "") {
  return value
    .replace(/[_-]/g, " ")
    .split(" ")
    .map(capitalize)
    .join(" ");
}