export function isRequired(value) {
  return (
    value !== null &&
    value !== undefined &&
    String(value).trim() !== ""
  );
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email).trim()
  );
}

export function isValidPhone(phone) {
  return /^[+]?[0-9\s()-]{7,20}$/.test(
    String(phone).trim()
  );
}

export function isValidNationalId(value) {
  return /^[0-9]{6,12}$/.test(
    String(value).trim()
  );
}

export function isValidNumber(value) {
  return (
    value !== "" &&
    value !== null &&
    value !== undefined &&
    Number.isFinite(Number(value))
  );
}

export function isValidDate(value) {
  if (!value) return false;

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
}

export function minLength(value, length) {
  return String(value || "").length >= length;
}

export function maxLength(value, length) {
  return String(value || "").length <= length;
}