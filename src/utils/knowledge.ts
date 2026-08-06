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
  officialSpecializations,
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
 * Returns a career by its id — mirrors `getMajorById` below.
 * --------------------------------------------------------------
 */
export function getCareerById(careerId: string) {
  return careers.find((career) => career.id === careerId);
}

/**
 * --------------------------------------------------------------
 * Returns every major that leads to a given career — the reverse
 * of `getMajorCareers`, using the same `majorCareerMapping` table.
 * --------------------------------------------------------------
 */
export function getCareerMajors(careerId: string) {
  const majorIds = majorCareerMapping
    .filter((mapping) => mapping.careerId === careerId)
    .map((mapping) => mapping.majorId);

  return officialSpecializations.filter((major) => majorIds.includes(major.id));
}

/**
 * --------------------------------------------------------------
 * Returns the skills relevant to a career.
 *
 * There is no direct career-skill mapping in the knowledge base,
 * so this derives one from data that already exists: every skill
 * required by any major that leads to this career.
 * --------------------------------------------------------------
 */
export function getCareerSkills(careerId: string) {
  const relatedMajorIds = getCareerMajors(careerId).map((major) => major.id);
  const skillIds = new Set(
    majorSkillMapping
      .filter((mapping) => relatedMajorIds.includes(mapping.majorId))
      .map((mapping) => mapping.skillId),
  );

  return skills.filter((skill) => skillIds.has(skill.id));
}

/**
 * --------------------------------------------------------------
 * Returns a university by its id — mirrors `getMajorById`/`getCareerById`.
 * --------------------------------------------------------------
 */
export function getUniversityById(universityId: string) {
  return universities.find((university) => university.id === universityId);
}

/**
 * --------------------------------------------------------------
 * Returns every major offered by a university — the reverse of
 * `getMajorUniversities`, using the same `universityMajorMapping`.
 * --------------------------------------------------------------
 */
export function getUniversityMajors(universityId: string) {
  const majorIds = universityMajorMapping
    .filter((mapping) => mapping.universityId === universityId)
    .map((mapping) => mapping.majorId);

  return officialSpecializations.filter((major) => majorIds.includes(major.id));
}

/**
 * --------------------------------------------------------------
 * Returns the careers reachable through a university's majors.
 *
 * There is no direct university-career mapping in the knowledge
 * base, so — like `getCareerSkills` — this derives one from data
 * that already exists: every career linked to any major the
 * university offers.
 * --------------------------------------------------------------
 */
export function getUniversityCareers(universityId: string) {
  const offeredMajorIds = getUniversityMajors(universityId).map((major) => major.id);
  const careerIds = new Set(
    majorCareerMapping
      .filter((mapping) => offeredMajorIds.includes(mapping.majorId))
      .map((mapping) => mapping.careerId),
  );

  return careers.filter((career) => careerIds.has(career.id));
}

/**
 * --------------------------------------------------------------
 * Converts a university's stored `type` ("government" / "private")
 * into the Arabic label used throughout the UI.
 * --------------------------------------------------------------
 */
export function getUniversityTypeLabel(type: string) {
  return type === "government" ? "حكومية" : "أهلية";
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
  return officialSpecializations.find(
    (major) => major.id === majorId
  );
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