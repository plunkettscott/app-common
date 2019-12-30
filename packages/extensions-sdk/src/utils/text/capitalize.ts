/**
 * Capitalize the first letter of the string.
 *
 * @example capitalize("hi my name is Joe.")
 * // Hi my name is Joe.
 *
 * @param string The string that you would like to capitalize the first letter of the string.
 */
export default function capitalize(string: string): string {
  if (!string) {
    return '';
  }

  return string.substr(0, 1).toUpperCase() + string.substr(1);
}
