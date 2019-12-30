/**
 * Slugify a string.
 *
 * @example slugify("this is a string 122142wu90w")
 * // this-is-a-string-122142wu90w
 *
 * @param string String to slugify.
 */
export default function slugify(string: string): string {
  return string
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
