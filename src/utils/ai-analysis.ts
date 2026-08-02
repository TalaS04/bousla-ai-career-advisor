import type { StudentProfile } from "@/utils/student-profile";
import { buildStudentAnalysisPrompt } from "@/prompts/student-analysis";

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

  const prompt = buildStudentAnalysisPrompt(profile);

  const response = await fetch("/api/openrouter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error);
  }

  return JSON.parse(data.response);

}