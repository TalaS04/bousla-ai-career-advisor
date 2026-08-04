/**
 * ============================================================
 * BOUSLA - Interview API
 * ------------------------------------------------------------
 * Handles communication between the frontend and the interview
 * backend routes.
 *
 * Responsibilities:
 * - Create Interview
 * - Save AI Analysis
 * - Complete Interview
 * ============================================================
 */

import type { StudentProfile } from "@/utils/student-profile";
import type { AIStudentAnalysis } from "@/utils/ai-analysis";

/**
 * ------------------------------------------------------------
 * Creates a new interview and stores the student's profile.
 * ------------------------------------------------------------
 */
export async function createInterview(
  profile: StudentProfile
): Promise<string> {

  const response = await fetch("/api/interview/create", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(profile),

  });

  const data = await response.json();

  if (!data.success) {

    throw new Error(data.message);

  }

  return data.interviewId;

}

/**
 * ------------------------------------------------------------
 * Saves the AI analysis.
 * ------------------------------------------------------------
 */
export async function saveInterviewAnalysis(
  interviewId: string,
  analysis: AIStudentAnalysis
) {

  const response = await fetch("/api/interview/analysis", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify({

      interviewId,

      analysis,

    }),

  });

  const data = await response.json();

  if (!data.success) {

    throw new Error(data.message);

  }

}

/**
 * ------------------------------------------------------------
 * Marks the interview as completed.
 * ------------------------------------------------------------
 */
export async function completeInterview(
  interviewId: string
) {

  const response = await fetch("/api/interview/complete", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify({

      interviewId,

    }),

  });

  const data = await response.json();

  if (!data.success) {

    throw new Error(data.message);

  }

}