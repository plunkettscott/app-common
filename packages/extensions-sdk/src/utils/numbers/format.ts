/**
 * The `formatNumber` utility localizes a number into a string with the appropriate
 * punctuation.
 *
 * @example
 * formatNumber(1000000)
 * // 1,000,000
 *
 * @param number The number to format
 */
export default function format(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
