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
