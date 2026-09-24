/**
 * Names of the three level hubs (/a-levels/, /igcse/, /o-levels/).
 *
 * A hub's name is fixed by its URL, not taken from whichever page happens to
 * be listed first. The /igcse/ hub also lists AQA's UK GCSE courses, whose own
 * `level` is "GCSE" (AQA publishes no IGCSE), so reading the name from a
 * page's `level` field could relabel the whole IGCSE hub.
 */
export const LEVEL_HUB_NAME: Record<string, string> = {
  'a-levels': 'A Level',
  igcse: 'IGCSE',
  'o-levels': 'O Level',
};

export const levelHubName = (levelSlug: string, fallback: string): string =>
  LEVEL_HUB_NAME[levelSlug] ?? fallback;
