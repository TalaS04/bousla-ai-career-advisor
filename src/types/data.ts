/**
 * ============================================================
 * BOUSLA - AI Career Advisor
 * ------------------------------------------------------------
 * This file contains all TypeScript interfaces used by the
 * project's knowledge base.
 *
 * Why do we use interfaces?
 * -------------------------
 * Interfaces define the structure of our data.
 * They allow TypeScript to detect mistakes before running
 * the application and provide auto-completion while coding.
 *
 * Every JSON file inside /src/data/json follows one of these
 * interfaces.
 * ============================================================
 */


/**
 * ------------------------------------------------------------
 * Major
 * ------------------------------------------------------------
 * Represents one university major.
 *
 * Example:
 * Computer Science
 * Software Engineering
 * Medicine
 * Accounting
 * ------------------------------------------------------------
 */
export interface Major {
  id: string;
  nameAr: string;
  nameEn: string;

  descriptionAr: string;
  descriptionEn: string;

  studyDuration: string;
  futureDemand: string;
  salaryRange: string;

  category: string;
}


/**
 * ------------------------------------------------------------
 * Career
 * ------------------------------------------------------------
 * Represents a possible career after graduation.
 *
 * Example:
 * Software Developer
 * Data Analyst
 * Civil Engineer
 * ------------------------------------------------------------
 */
export interface Career {
  id: string;

  nameAr: string;
  nameEn: string;

  descriptionAr: string;
  descriptionEn: string;

  salaryRange: string;

  careerPath: string;
}


/**
 * ------------------------------------------------------------
 * Skill
 * ------------------------------------------------------------
 * Represents one important skill.
 *
 * Example:
 * Programming
 * Communication
 * Leadership
 * ------------------------------------------------------------
 */
export interface Skill {
  id: string;

  nameAr: string;
  nameEn: string;

  category: string;
}


/**
 * ------------------------------------------------------------
 * University
 * ------------------------------------------------------------
 * Represents one Saudi university.
 *
 * Example:
 * King Saud University
 * King Abdulaziz University
 * ------------------------------------------------------------
 */
export interface University {
  id: string;

  nameAr: string;
  nameEn: string;

  cityAr: string;
  cityEn: string;

  website: string;

  type: string;
}


/**
 * ------------------------------------------------------------
 * Interview Question
 * ------------------------------------------------------------
 * Represents a single interview question.
 *
 * Each question belongs to one RIASEC dimension.
 * During the interview we use these questions to calculate
 * the student's personality profile.
 * ------------------------------------------------------------
 */
export interface Question {
  id: string;

  textAr: string;
  textEn: string;

  category: string;
  type: string;

  riasecDimension: string;

  weight: number;

  isAdaptive: boolean;

  followUpQuestionId: string | null;

  displayOrder: number;

  isReverseScored: boolean;
}


/**
 * ------------------------------------------------------------
 * Question Option
 * ------------------------------------------------------------
 * Represents one answer choice.
 *
 * Example:
 * Strongly Agree
 * Agree
 * Neutral
 * ------------------------------------------------------------
 */
export interface QuestionOption {
  id: string;

  questionId: string;

  labelAr: string;
  labelEn: string;

  value: number;
}


/**
 * ------------------------------------------------------------
 * Major-Career Mapping
 * ------------------------------------------------------------
 * Connects a university major to its possible careers.
 *
 * Example:
 * Computer Science
 *        ↓
 * Software Developer
 * Data Analyst
 * Systems Analyst
 * ------------------------------------------------------------
 */
export interface MajorCareerMapping {
  majorId: string;

  careerId: string;
}


/**
 * ------------------------------------------------------------
 * Major-Skill Mapping
 * ------------------------------------------------------------
 * Connects each major with the skills required for success.
 * ------------------------------------------------------------
 */
export interface MajorSkillMapping {
  majorId: string;

  skillId: string;

  importanceLevel: string;
}


/**
 * ------------------------------------------------------------
 * University-Major Mapping
 * ------------------------------------------------------------
 * Defines which universities offer each major.
 * ------------------------------------------------------------
 */
export interface UniversityMajorMapping {
  universityId: string;

  majorId: string;
}


/**
 * ------------------------------------------------------------
 * RIASEC Major Weights
 * ------------------------------------------------------------
 * This is the heart of the recommendation engine.
 *
 * Each major has six weights representing how strongly it
 * matches each Holland personality dimension.
 *
 * During Week 5 we will compare the student's RIASEC scores
 * against these weights to calculate compatibility.
 * ------------------------------------------------------------
 */
export interface RiasecMajorWeight {
  majorId: string;

  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;

  explanationTemplateAr: string;
  explanationTemplateEn: string;
}


/**
 * ------------------------------------------------------------
 * Preparation Roadmap
 * ------------------------------------------------------------
 * Represents a preparation guide for a university major.
 *
 * Unlike a traditional study plan, this roadmap helps students
 * prepare before and during university by recommending:
 *
 * • Skills to develop
 * • Courses
 * • Tools
 * • Activities
 * • Learning roadmap
 * • Common challenges
 * • Success tips
 * ------------------------------------------------------------
 */

export interface PreparationSkill {
  skill: string;
  importance: number;
  descriptionAr: string;
}

export interface RecommendedCourse {
  titleAr: string;
  provider: string;
  reasonAr: string;
}

export interface RecommendedTool {
  name: string;
  purposeAr: string;
}

export interface PreparationRoadmap {
  majorId: string;

  overviewAr: string;

  skillsToDevelop: PreparationSkill[];

  recommendedCourses: RecommendedCourse[];

  recommendedTools: RecommendedTool[];

  recommendedActivities: string[];

  learningRoadmap: string[];

  commonChallenges: string[];

  successTips: string[];
}

/**
 * ------------------------------------------------------------
 * Official Saudi Specialization
 * ------------------------------------------------------------
 * Represents one specialization from the official Saudi
 * Unified Classification.
 * ------------------------------------------------------------
 */
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