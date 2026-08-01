import type { Question, QuestionOption } from "@/types/data";

export type InterviewAnswers = Record<string, string>;

export interface RiasecProfile {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
}

type RiasecProfileKey = keyof RiasecProfile;

/** Creates an empty profile before any interview answers are processed. */
function createEmptyProfile(): RiasecProfile {
  return {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  };
}

/** Converts the dataset's RIASEC label into the matching profile property. */
function getProfileKey(dimension: string): RiasecProfileKey | null {
  const keys: Record<string, RiasecProfileKey> = {
    Realistic: "realistic",
    Investigative: "investigative",
    Artistic: "artistic",
    Social: "social",
    Enterprising: "enterprising",
    Conventional: "conventional",
  };

  return keys[dimension] ?? null;
}

/** Finds the selected option and confirms that it belongs to the question. */
function findSelectedOption(
  questionId: string,
  optionId: string,
  options: QuestionOption[],
): QuestionOption | undefined {
  return options.find((option) => option.id === optionId && option.questionId === questionId);
}

/** Returns the lowest and highest values available for one question. */
function getOptionRange(questionId: string, options: QuestionOption[]) {
  const values = options
    .filter((option) => option.questionId === questionId)
    .map((option) => option.value);

  if (values.length === 0) {
    return null;
  }

  return {
    lowest: Math.min(...values),
    highest: Math.max(...values),
  };
}

/** Reverses a score while preserving the option scale for that question. */
function reverseScore(value: number, lowest: number, highest: number) {
  return lowest + highest - value;
}

/**
 * Calculates a student's six RIASEC totals from their selected answers.
 *
 * Each answer contributes its option value to the question's RIASEC
 * dimension. Reverse-scored questions first flip that value within their
 * own option range, then the question weight is applied.
 */
export function calculateRiasecProfile(
  answers: InterviewAnswers,
  questions: Question[],
  options: QuestionOption[],
): RiasecProfile {
  const profile = createEmptyProfile();

  for (const question of questions) {
    if (question.category !== "RIASEC") {
    continue;
}
    const selectedOptionId = answers[question.id];
    const profileKey = getProfileKey(question.riasecDimension);

    if (!selectedOptionId || !profileKey) {
      continue;
    }

    const selectedOption = findSelectedOption(question.id, selectedOptionId, options);

    if (!selectedOption) {
      continue;
    }

    let answerValue = selectedOption.value;

    if (question.isReverseScored) {
      const optionRange = getOptionRange(question.id, options);

      if (optionRange) {
        answerValue = reverseScore(answerValue, optionRange.lowest, optionRange.highest);
      }
    }

    profile[profileKey] += answerValue * question.weight;
  }

  return profile;
}
