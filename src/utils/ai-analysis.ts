import type { StudentProfile } from "@/utils/student-profile";

/**
 * ============================================================
 * AI Student Analysis
 *
 * Sends the structured student profile to the Python AI service.
 *
 * The Python backend is responsible for:
 * - Building the prompt
 * - Calling OpenRouter
 * - Validating the JSON response
 *
 * This file simply forwards the student's profile and returns
 * the structured analysis.
 * ============================================================
 */

export interface AIStudentAnalysis {
  summary: string;

  riasecInterpretation: string;
  bigFiveInterpretation: string;
  workValuesInterpretation: string;
  skillsInterpretation: string;
  careerGoalsInterpretation: string;

  strengths: string[];
  developmentAreas: string[];

  learningStyle: string;
  idealWorkEnvironment: string;

  confidenceLevel: string;
}

export async function generateStudentAnalysis(
  profile: StudentProfile
): Promise<AIStudentAnalysis> {

  const response = await fetch("/api/openrouter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error);
  }

  return data.response;
}