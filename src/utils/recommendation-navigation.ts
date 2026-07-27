import type { RiasecProfile } from "@/utils/riasec";

export type RecommendationSearchParams = Record<string, string | string[] | undefined>;

const RIASEC_KEYS: (keyof RiasecProfile)[] = [
  "realistic",
  "investigative",
  "artistic",
  "social",
  "enterprising",
  "conventional",
];

/** Builds the recommendations URL from a completed interview profile. */
export function createRecommendationsUrl(profile: RiasecProfile) {
  const searchParams = new URLSearchParams();

  for (const key of RIASEC_KEYS) {
    searchParams.set(key, String(profile[key]));
  }

  return `/recommendations?${searchParams.toString()}`;
}

/** Reads and validates a RIASEC profile passed from the completed interview. */
export function readRiasecProfile(
  searchParams: RecommendationSearchParams,
): RiasecProfile | null {
  const profile = {} as RiasecProfile;

  for (const key of RIASEC_KEYS) {
    const value = searchParams[key];

    if (typeof value !== "string" || value.trim() === "") {
      return null;
    }

    const score = Number(value);

    if (!Number.isFinite(score)) {
      return null;
    }

    profile[key] = score;
  }

  return profile;
}
