/**
 * ============================================================
 * BOUSLA - AI Career Advisor
 * ------------------------------------------------------------
 * Recommendation Explanation Service
 *
 * Purpose:
 * Generates a personalized explanation describing why a
 * university major was recommended.
 *
 * IMPORTANT:
 * This version is intentionally rule-based.
 *
 * Later it will call Gemini API instead without changing
 * any page in the application.
 * ============================================================
 */

import type { RiasecProfile } from "@/utils/riasec";
import type { Major } from "@/types/data";

/**
 * Arabic names for each Holland dimension.
 */
const DIMENSION_NAMES: Record<keyof RiasecProfile, string> = {
  realistic: "الجانب العملي",
  investigative: "التفكير التحليلي",
  artistic: "الإبداع",
  social: "التفاعل الاجتماعي",
  enterprising: "القيادة وريادة الأعمال",
  conventional: "التنظيم والدقة",
};

/**
 * Returns the student's strongest personality dimensions.
 */
function getStrongestDimensions(
  profile: RiasecProfile
): string[] {
  return Object.entries(profile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([dimension]) => DIMENSION_NAMES[dimension as keyof RiasecProfile]);
}

/**
 * Generates a recommendation explanation.
 *
 * Later this function will simply call Gemini API.
 */
export function generateRecommendationExplanation(
  profile: RiasecProfile,
  major: Major,
  compatibility: number
): string {

  const strengths = getStrongestDimensions(profile);

  return `
تم ترشيح تخصص ${major.nameAr} لأنه يتوافق بدرجة ${compatibility}% مع نتائج المقابلة الشخصية.

أظهرت نتائج التقييم أن من أبرز نقاط قوتك:

• ${strengths[0]}
• ${strengths[1]}

ويتطلب هذا التخصص هذه السمات بشكل واضح، لذلك يُعد من أكثر الخيارات المناسبة لك.

ننصحك بالاطلاع على تفاصيل التخصص والمهارات المطلوبة وفرص العمل قبل اتخاذ قرارك النهائي.
`.trim();

}