import {
  calculateRiasecProfile,
  type InterviewAnswers,
} from "@/utils/riasec";

import type {
  Question,
  QuestionOption,
} from "@/types/data";
import type { RiasecProfile } from "@/utils/riasec";

export interface StudentProfile {
  riasec: RiasecProfile;

  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    emotionalStability: number;
  };

  workValues: {
    achievement: number;
    independence: number;
    teamwork: number;
    jobSecurity: number;
    creativity: number;
  };

  skillsConfidence: {
    analyticalThinking: number;
    communication: number;
    problemSolving: number;
    technology: number;
    leadership: number;
  };

  careerGoals: {
    workEnvironment: string;
    preferredSector: string;
    careerPriority: string;
  };
}

/**
 * ============================================================
 * Calculates the average score of a group of interview questions.
 *
 * Used by:
 * • Big Five
 * • Work Values
 * • Skills Confidence
 * ============================================================
 */
function calculateAverageScore(
  questionIds: string[],
  answers: InterviewAnswers,
  options: QuestionOption[]
): number {

  let total = 0;
  let count = 0;

  for (const questionId of questionIds) {

    const selectedOptionId = answers[questionId];

    if (!selectedOptionId) {
      continue;
    }

    const selectedOption = options.find(
      option =>
        option.questionId === questionId &&
        option.id === selectedOptionId
    );

    if (!selectedOption) {
      continue;
    }

    total += selectedOption.value;
    count++;

  }

  return count === 0 ? 0 : total / count;

}

/**
 * ============================================================
 * Calculates the student's Big Five personality profile.
 *
 * Each personality dimension is calculated as the average
 * score of its corresponding interview questions.
 * ============================================================
 */
function calculateBigFive(
  answers: InterviewAnswers,
  options: QuestionOption[]
) {

  return {

    openness: calculateAverageScore(
      ["P01", "P02"],
      answers,
      options
    ),

    conscientiousness: calculateAverageScore(
      ["P03", "P04"],
      answers,
      options
    ),

    extraversion: calculateAverageScore(
      ["P05", "P06"],
      answers,
      options
    ),

    agreeableness: calculateAverageScore(
      ["P07", "P08"],
      answers,
      options
    ),

    emotionalStability: calculateAverageScore(
      ["P09", "P10"],
      answers,
      options
    ),

  };

}

/**
 * ============================================================
 * Calculates the student's work values profile.
 *
 * Each work value is represented by one interview question.
 * ============================================================
 */
function calculateWorkValues(
  answers: InterviewAnswers,
  options: QuestionOption[]
) {

  return {

    achievement: calculateAverageScore(
      ["WV01"],
      answers,
      options
    ),

    independence: calculateAverageScore(
      ["WV02"],
      answers,
      options
    ),

    teamwork: calculateAverageScore(
      ["WV03"],
      answers,
      options
    ),

    jobSecurity: calculateAverageScore(
      ["WV04"],
      answers,
      options
    ),

    creativity: calculateAverageScore(
      ["WV05"],
      answers,
      options
    ),

  };

}

/**
 * ============================================================
 * Calculates the student's confidence in key skills.
 *
 * Each skill is represented by one interview question.
 * ============================================================
 */
function calculateSkillsConfidence(
  answers: InterviewAnswers,
  options: QuestionOption[]
) {

  return {

    analyticalThinking: calculateAverageScore(
      ["SK01"],
      answers,
      options
    ),

    communication: calculateAverageScore(
      ["SK02"],
      answers,
      options
    ),

    problemSolving: calculateAverageScore(
      ["SK03"],
      answers,
      options
    ),

    technology: calculateAverageScore(
      ["SK04"],
      answers,
      options
    ),

    leadership: calculateAverageScore(
      ["SK05"],
      answers,
      options
    ),

  };

}

/**
 * ============================================================
 * Returns the student's selected career preferences.
 *
 * Career Goals questions are single-choice questions.
 * We return the selected option labels instead of numbers.
 * ============================================================
 */

function getSelectedOptionLabel(
  questionId: string,
  answers: InterviewAnswers,
  options: QuestionOption[]
): string {

  const selectedOptionId = answers[questionId];

  if (!selectedOptionId) {
    return "";
  }

  const selectedOption = options.find(
    option =>
      option.questionId === questionId &&
      option.id === selectedOptionId
  );

  return selectedOption?.labelAr ?? "";

}

function calculateCareerGoals(
  answers: InterviewAnswers,
  options: QuestionOption[]
) {

  return {

    workEnvironment: getSelectedOptionLabel(
      "CG01",
      answers,
      options
    ),

    preferredSector: getSelectedOptionLabel(
      "CG02",
      answers,
      options
    ),

    careerPriority: getSelectedOptionLabel(
      "CG03",
      answers,
      options
    )

  };

}

export function generateStudentProfile(
  answers: InterviewAnswers,
  questions: Question[],
  options: QuestionOption[]
): StudentProfile {

  const riasec = calculateRiasecProfile(
    answers,
    questions,
    options
  );

  const bigFive = calculateBigFive(
  answers,
  options
);

const workValues = calculateWorkValues(
  answers,
  options
);

const skillsConfidence = calculateSkillsConfidence(
  answers,
  options
);

const careerGoals = calculateCareerGoals(
  answers,
  options
);

return {

  riasec,

  bigFive,

  workValues,

  skillsConfidence,

  careerGoals

};

}
