/**
 * The `abbreviate` utility converts a number to a shorter localized form.
 *
 * @example
 * abbreviate(1000)
 * // 1K
 *
 * @param number The number to abbreviate
 */
export default function abbreviate(number: number): string {
  // TODO: Translations?

  if (number >= 1000000) {
    return Math.floor(number / 1000000) + "M";
  }

  if (number >= 1000) {
    return Math.floor(number / 1000) + "K";
  }

  return number.toString();
}
