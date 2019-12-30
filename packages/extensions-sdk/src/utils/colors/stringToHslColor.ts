/**
 * Convert a string (using the ASCII values for each character) into a unique color.
 * The algorithm will use a lowercased representation of the string provided to ensure
 * the Saturation and Lightness values remain constant for a single instance of a string.
 *
 * @example
 * stringToHslColor("Scott") // stringToHslColor("scott") is the same
 * // hsl(287, 82%, 47%)
 *
 * @param str The string to convert to an HSL color.
 */
export default function stringToHslColor(str: string): string {
  str = str.toLowerCase();

  const opts = {
    hue: [0, 360],
    sat: [75, 100],
    lit: [40, 60],
  };

  // get a range from the minimum and maximum that stays consistent
  // based on the provided hash
  const range = function(hash: number, min: number, max: number): number {
    const diff = max - min;
    const x = ((hash % diff) + diff) % diff;
    return x + min;
  };

  let hash = 0;
  if (str.length === 0) return '';
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const h = range(hash, opts.hue[0], opts.hue[1]);
  const s = range(hash, opts.sat[0], opts.sat[1]);
  const l = range(hash, opts.lit[0], opts.lit[1]);

  return `hsl(${h}, ${s}%, ${l}%)`;
}
