/**
 * ==============================================================
 * knowledge.ts
 * --------------------------------------------------------------
 * Purpose:
 * This file acts as the bridge between a university major and
 * the rest of the knowledge base.
 *
 * The recommendation engine only knows:
 *
 *      Major ID
 *
 * This utility resolves that ID into:
 *
 *      • Careers
 *      • Skills
 *      • Universities
 *
 * It contains NO UI and NO recommendation logic.
 * ==============================================================
 */

import {
  majors,
  careers,
  skills,
  universities,
  majorCareerMapping,
  majorSkillMapping,
  universityMajorMapping,
  preparationRoadmaps,
} from "@/utils/data";

/**
 * --------------------------------------------------------------
 * Returns every career related to a university major.
 * --------------------------------------------------------------
 */
export function getMajorCareers(majorId: string) {
  const careerIds = majorCareerMapping
    .filter((mapping) => mapping.majorId === majorId)
    .map((mapping) => mapping.careerId);

  return careers.filter((career) => careerIds.includes(career.id));
}

/**
 * --------------------------------------------------------------
 * Returns every important skill for the selected major.
 * --------------------------------------------------------------
 */
export function getMajorSkills(majorId: string) {
  const skillIds = majorSkillMapping
    .filter((mapping) => mapping.majorId === majorId)
    .map((mapping) => mapping.skillId);

  return skills.filter((skill) => skillIds.includes(skill.id));
}

/**
 * --------------------------------------------------------------
 * Returns every university offering this major.
 * --------------------------------------------------------------
 */
export function getMajorUniversities(majorId: string) {
  const universityIds = universityMajorMapping
    .filter((mapping) => mapping.majorId === majorId)
    .map((mapping) => mapping.universityId);

  return universities.filter((university) =>
    universityIds.includes(university.id)
  );
}

/**
 * --------------------------------------------------------------
 * Converts a compatibility percentage into a friendly Arabic label.
 *
 * This improves the UI without changing the recommendation
 * algorithm.
 * --------------------------------------------------------------
 */
export function getCompatibilityLabel(score: number) {
  if (score >= 90) return "توافق ممتاز";
  if (score >= 80) return "توافق مرتفع";
  if (score >= 70) return "توافق جيد";
  return "توافق مقبول";
}

/**
 * --------------------------------------------------------------
 * Returns a university major by its id.
 *
 * This keeps pages from repeatedly writing:
 *
 * majors.find(...)
 *
 * If the major does not exist, undefined is returned.
 * --------------------------------------------------------------
 */
export function getMajorById(majorId: string) {
  return majors.find((major) => major.id === majorId);
}

/**
 * --------------------------------------------------------------
 * Returns the preparation roadmap for a major.
 * --------------------------------------------------------------
 */
export function getPreparationRoadmap(majorId: string) {
  return (
    preparationRoadmaps.find(
      (roadmap) => roadmap.majorId === majorId
    ) ?? null
  );
}

/**
 * --------------------------------------------------------------
 * Returns the recommended courses for a major.
 * --------------------------------------------------------------
 */
export function getRecommendedCourses(majorId: string) {
  return (
    getPreparationRoadmap(majorId)?.recommendedCourses ?? []
  );
}

/**
 * --------------------------------------------------------------
 * Returns the recommended tools for a major.
 * --------------------------------------------------------------
 */
export function getRecommendedTools(majorId: string) {
  return (
    getPreparationRoadmap(majorId)?.recommendedTools ?? []
  );
}