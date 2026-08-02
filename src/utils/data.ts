/**
 * ============================================================
 * BOUSLA - AI Career Advisor
 * ------------------------------------------------------------
 * Data Loader
 *
 * This file loads all JSON knowledge base files.
 *
 * Pages and components should import data from this file
 * instead of importing JSON files directly.
 *
 * Why?
 * ----
 * Today:
 *    JSON Files
 *
 * Future:
 *    Database
 *
 * When we switch to a database, only this file will change.
 * The rest of the application will continue working normally.
 * ============================================================
 */

import officialSpecializationsData from "@/data/json/official_specializations.json";
import careersData from "@/data/json/careers.json";
import universitiesData from "@/data/json/universities.json";
import skillsData from "@/data/json/skills.json";

import questionsData from "@/data/json/questions.json";
import questionOptionsData from "@/data/json/question_options.json";

import majorCareerMappingData from "@/data/json/major_career_mapping.json";
import majorSkillMappingData from "@/data/json/major_skill_mapping.json";
import universityMajorMappingData from "@/data/json/university_major_mapping.json";
import riasecMajorWeightsData from "@/data/json/riasec_major_weights.json";
import preparationRoadmapsData from "@/data/json/preparation_roadmaps.json";

/**
 * Import the interfaces so every dataset has a known type.
 */

import type {
  OfficialSpecialization,
  Career,
  University,
  Skill,
  Question,
  QuestionOption,
  MajorCareerMapping,
  MajorSkillMapping,
  UniversityMajorMapping,
  RiasecMajorWeight,
  PreparationRoadmap,
} from "@/types/data";

/**
 * Convert the imported JSON into typed objects.
 * This improves IntelliSense and allows TypeScript
 * to detect mistakes during development.
 */

export const officialSpecializations =
  officialSpecializationsData as OfficialSpecialization[];

export const majors = officialSpecializations.map((item) => ({
  id: item.id,
  nameAr: item.nameAr,
  descriptionAr: item.officialDefinitionAr,
}));

export const careers = careersData as Career[];

export const universities = universitiesData as University[];

export const skills = skillsData as Skill[];

export const questions = questionsData as Question[];

export const questionOptions = questionOptionsData as QuestionOption[];

export const majorCareerMapping =
  majorCareerMappingData as MajorCareerMapping[];

export const majorSkillMapping =
  majorSkillMappingData as MajorSkillMapping[];

export const universityMajorMapping =
  universityMajorMappingData as UniversityMajorMapping[];

export const riasecMajorWeights =
  riasecMajorWeightsData as RiasecMajorWeight[];

export const preparationRoadmaps =
  preparationRoadmapsData as PreparationRoadmap[];

export interface OfficialSpecialization {

  id: string;

  classificationCode: string;

  nameAr: string;

  officialClassification: {

    broadField: string;

    narrowField: string;

    detailedField: string;

  };

  officialDefinitionAr: string;

  includedSpecializations: string[];

  coreSubjects: string[];

}