export function formatDate(
  date,
  options = {}
) {
  if (!date) return "—";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  return value.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    }
  );
}

export function formatDateTime(date) {
  if (!date) return "—";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  return value.toLocaleString();
}

export function isValidDate(date) {
  if (!date) return false;

  return !Number.isNaN(
    new Date(date).getTime()
  );
}