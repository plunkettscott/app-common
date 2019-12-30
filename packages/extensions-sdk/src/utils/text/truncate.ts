/**
 * Truncate a string up to a certain length.
 * Append the specified clamp at the end of the string.
 *
 * @example truncate('The quick brown fox jumps over the lazy dog.', 20)
 * // 'The quick brown fox...'
 *
 * @param string The string to be truncated.
 * @param length The length at which the string will be truncated at.
 * @param clamp The text that indicates truncation.
 *
 */

export default function truncate(
  string: string,
  length: number,
  clamp: string = "..."
): string {
  if (length < 0) {
    throw new Error("Cannot truncate a string that is less than zero.");
  }

  if (length >= string.length) {
    return string;
  }

  return string.slice(0, length).trim() + clamp;
}
