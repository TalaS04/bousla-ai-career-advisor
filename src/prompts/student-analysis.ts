import type { StudentProfile } from "@/utils/student-profile";

/**
 * ============================================================
 * Builds the prompt used to analyze a student's profile.
 *
 * This prompt is sent to the AI after the interview has been
 * converted into a structured StudentProfile.
 *
 * The AI should only analyze the student. It must NOT recommend
 * university majors at this stage.
 * ============================================================
 */

export function buildStudentAnalysisPrompt(
  profile: StudentProfile
): string {

  return `
أنت مستشار مهني أكاديمي محترف.

سيتم تزويدك بملف طالب تم إنشاؤه من نتائج مقابلة مهنية تعتمد على:

- RIASEC
- Big Five
- Work Values
- Skills Confidence
- Career Goals

مهمتك هي تحليل شخصية الطالب فقط.

لا تقترح أي تخصصات جامعية.

لا تختر أي مهنة.

لا تخمن أي معلومات غير موجودة.

اعتمد فقط على البيانات التالية.

==========================
Student Profile
==========================

${JSON.stringify(profile, null, 2)}

==========================

أعد النتيجة بصيغة JSON فقط بالشكل التالي:

{
  "summary": "...",
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "developmentAreas": [
    "...",
    "...",
    "..."
  ],
  "learningStyle": "...",
  "workStyle": "...",
  "confidenceLevel": "..."
}

لا تكتب أي نص خارج JSON.
`;

}