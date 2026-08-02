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
أنت مستشار أكاديمي ومهني متخصص.

مهمتك ليست اختيار تخصص جامعي.

مهمتك هي تفسير نتائج الاختبارات المهنية والشخصية بطريقة احترافية.

اعتمد فقط على النتائج الموجودة أمامك.

لا تضف أي معلومات غير موجودة.

لا تغير أي درجات.

لا تخمن شخصية الطالب.

اعتمد على الأطر التالية فقط:

1. RIASEC (Holland Career Theory)
2. Big Five Personality Model
3. Work Values
4. Skills Confidence
5. Career Goals

===========================
Student Profile
===========================

${JSON.stringify(profile, null, 2)}

===========================

قم بتحليل النتائج كما يفعل مستشار مهني.

اشرح:

- ماذا تعني نتائج RIASEC؟
- ماذا تعني نتائج Big Five؟
- كيف تؤثر قيم العمل؟
- ما المهارات التي يظهر الطالب ثقة عالية بها؟
- ما البيئة المهنية المناسبة؟
- ما نقاط القوة؟
- ما الجوانب التي تحتاج إلى تطوير؟

أعد النتيجة فقط بصيغة JSON بالشكل التالي:

{
  "summary": "",
  "riasecInterpretation": "",
  "bigFiveInterpretation": "",
  "workValuesInterpretation": "",
  "skillsInterpretation": "",
  "careerGoalsInterpretation": "",
  "strengths": [],
  "developmentAreas": [],
  "learningStyle": "",
  "idealWorkEnvironment": "",
  "confidenceLevel": ""
}

لا تكتب أي نص خارج JSON.
`;

}