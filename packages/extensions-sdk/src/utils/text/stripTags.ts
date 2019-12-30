/**
 * Strips HTML elements, but leaves content within the elements.
 *
 * @param string The content to clean
 */
export default function stripTags(string: string): string {
  return string.replace(/<[^>]+>/g, "");
}
