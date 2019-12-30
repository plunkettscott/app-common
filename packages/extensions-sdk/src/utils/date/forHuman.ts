import { DateTime } from "luxon";
import { DAY } from "./constants";

/**
 * Formats the provided Date to a human-friendly relative time
 * string.
 *
 * @param time The relative time
 * @param rel The relative time to test against. Defaults to now.
 * @return string
 */
export default function forHuman(time?: Date): string | null {
  if (time === null || time === undefined) {
    time = new Date();
  }

  let ins = DateTime.fromJSDate(time);
  let now = DateTime.local();

  if (ins > now) {
    ins = now;
  }

  const diff = ins.diff(now, "days");
  let ago: string | null = null;

  if (diff.days > -30) {
    if (ins.year === now.year) {
      ago = ins.toFormat("d MMM");
    } else {
      // prettier-ignore
      ago = ins.toFormat("MMM y");
    }
  } else {
    ago = ins.toRelative();
  }

  return ago;
}
