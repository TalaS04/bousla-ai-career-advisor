/**
 * ============================================================
 * BOUSLA - Interview Service
 * ------------------------------------------------------------
 * Responsible for all database operations related to interviews.
 *
 * Responsibilities:
 * - Create a new interview.
 * - Save the generated student profile.
 * - Save the AI analysis.
 * - Complete an interview.
 *
 * Author:
 * BOUSLA Development Team
 * ============================================================
 */

import { prisma } from "@/utils/prisma";

export async function createInterview(
  userId: string,
  studentProfile: unknown
) {

  return prisma.interview.create({

    data: {

      userId,

      studentProfile: JSON.stringify(studentProfile),

      status: "IN_PROGRESS",

    },

  });

}

export async function saveInterviewAnalysis(
  interviewId: string,
  analysis: unknown
) {

  return prisma.interview.update({

    where: {

      id: interviewId,

    },

    data: {

      analysis: JSON.stringify(analysis),

    },

  });

}

export async function completeInterview(
  interviewId: string
) {

  return prisma.interview.update({

    where: {

      id: interviewId,

    },

    data: {

      status: "COMPLETED",

      completedAt: new Date(),

    },

  });

}

export async function getInterview(
  interviewId: string
) {

  return prisma.interview.findUnique({

    where: {

      id: interviewId,

    },

  });

}

/**
 * ------------------------------------------------------------
 * Returns the latest completed interview for a user.
 * ------------------------------------------------------------
 */
export async function getLatestInterview(
  userId: string
) {

  return prisma.interview.findFirst({

    where: {

      userId,

      status: "COMPLETED",

    },

    orderBy: {

      completedAt: "desc",

    },

  });

}