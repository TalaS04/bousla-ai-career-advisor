import type { RiasecMajorWeight } from "@/types/data";
import type { RiasecProfile } from "@/utils/riasec";
import { riasecMajorWeights } from "@/utils/data";

export interface MajorCompatibility {
  majorId: string;
  compatibilityPercentage: number;
}

type RiasecValues = [number, number, number, number, number, number];

/** Keeps the six RIASEC values in the same order for every calculation. */
function getProfileValues(profile: RiasecProfile): RiasecValues {
  return [
    profile.realistic,
    profile.investigative,
    profile.artistic,
    profile.social,
    profile.enterprising,
    profile.conventional,
  ];
}

/** Reads the six stored weights for one university major. */
function getMajorWeightValues(weights: RiasecMajorWeight): RiasecValues {
  return [
    weights.realistic,
    weights.investigative,
    weights.artistic,
    weights.social,
    weights.enterprising,
    weights.conventional,
  ];
}

/** Adds the products of matching values in two RIASEC vectors. */
function calculateDotProduct(firstValues: RiasecValues, secondValues: RiasecValues) {
  return firstValues.reduce(
    (total, value, index) => total + value * secondValues[index],
    0,
  );
}

/** Calculates the length of a RIASEC vector for the similarity formula. */
function calculateMagnitude(values: RiasecValues) {
  return Math.sqrt(values.reduce((total, value) => total + value ** 2, 0));
}

/**
 * Compares the shape of a student's profile with a major's stored weights.
 * Cosine similarity returns a value between 0 and 1 for these positive
 * scores; converting it to 0–100 makes the result easier to display later.
 */
function calculateCompatibilityPercentage(
  profile: RiasecProfile,
  majorWeights: RiasecMajorWeight,
) {
  const profileValues = getProfileValues(profile);
  const majorWeightValues = getMajorWeightValues(majorWeights);
  const profileMagnitude = calculateMagnitude(profileValues);
  const majorMagnitude = calculateMagnitude(majorWeightValues);

  if (profileMagnitude === 0 || majorMagnitude === 0) {
    return 0;
  }

  const similarity =
    calculateDotProduct(profileValues, majorWeightValues) /
    (profileMagnitude * majorMagnitude);

  return Math.round(similarity * 100);
}

/**
 * Returns the three majors whose stored RIASEC weights best match a profile.
 * The dataset is loaded only through `src/utils/data.ts`, so it can later be
 * replaced with API data without changing this matching logic.
 */
export function getTopMajorCompatibilities(profile: RiasecProfile): MajorCompatibility[] {
  return riasecMajorWeights
    .map((majorWeights) => ({
      majorId: majorWeights.majorId,
      compatibilityPercentage: calculateCompatibilityPercentage(profile, majorWeights),
    }))
    .sort((firstMajor, secondMajor) => {
      return secondMajor.compatibilityPercentage - firstMajor.compatibilityPercentage;
    })
    .slice(0, 3);
}

/**
 * Compatibility percentage for one specific major, not just the overall
 * top 3. Reuses the exact same `calculateCompatibilityPercentage` that
 * `getTopMajorCompatibilities` calls internally — this only changes which
 * major(s) the result is computed for, never how it's computed. Used by a
 * major's own detail page, where the visitor is looking at one specific
 * major that may or may not be in their personal top 3.
 */
export function getMajorCompatibility(profile: RiasecProfile, majorId: string): number | null {
  const majorWeights = riasecMajorWeights.find((weights) => weights.majorId === majorId);

  if (!majorWeights) {
    return null;
  }

  return calculateCompatibilityPercentage(profile, majorWeights);
}

export interface MatchedRiasecDimension {
  dimension: keyof RiasecProfile;
  labelAr: string;
}

/** Arabic display name for each Holland/RIASEC dimension. */
const RIASEC_DIMENSION_LABELS: Record<keyof RiasecProfile, string> = {
  realistic: "الجانب العملي",
  investigative: "التفكير التحليلي",
  artistic: "الإبداع",
  social: "التفاعل الاجتماعي",
  enterprising: "القيادة وريادة الأعمال",
  conventional: "التنظيم والدقة",
};

/**
 * Identifies which RIASEC dimensions contributed most to one major's match.
 *
 * This does not add a new signal or change any ranking — it decomposes the
 * exact same dot product `calculateCompatibilityPercentage` already sums
 * (`Σ profile[dim] × majorWeights[dim]`) into its six per-dimension terms,
 * so the highest-contributing dimensions can be shown to the student as
 * "why this major matched you" instead of only the final percentage.
 */
export function getMatchedRiasecDimensions(
  profile: RiasecProfile,
  majorWeights: RiasecMajorWeight,
  limit = 2,
): MatchedRiasecDimension[] {
  const dimensions = Object.keys(RIASEC_DIMENSION_LABELS) as (keyof RiasecProfile)[];

  return dimensions
    .map((dimension) => ({
      dimension,
      contribution: profile[dimension] * majorWeights[dimension],
    }))
    .sort((first, second) => second.contribution - first.contribution)
    .slice(0, limit)
    .map(({ dimension }) => ({
      dimension,
      labelAr: RIASEC_DIMENSION_LABELS[dimension],
    }));
}
