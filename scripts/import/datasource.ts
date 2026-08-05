import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dataSources = [
  {
    name: "Saudi Standard Classification of Educational Specializations",
    organization: "General Authority for Statistics (GASTAT)",
    url: "https://database.stats.gov.sa",
    datasetVersion: "2024",
    lastVerified: new Date(),
  },

  {
    name: "Saudi Universities Directory",
    organization: "Ministry of Education",
    url: "https://www.moe.gov.sa/ar/education/highereducation/Pages/UniversitiesList.aspx",
    datasetVersion: "2024",
    lastVerified: new Date(),
  },

  {
    name: "HRSD Skills Portal",
    organization: "Ministry of Human Resources and Social Development",
    url: "https://www.hrsd.gov.sa/skills-occupations",
    datasetVersion: "2024",
    lastVerified: new Date(),
  },

  {
    name: "Saudi Unified Standard Classification of Occupations (SSCO)",
    organization: "General Authority for Statistics (GASTAT)",
    url: "https://database.stats.gov.sa",
    datasetVersion: "2024",
    lastVerified: new Date(),
  },
];

async function importDataSources() {
  for (const source of dataSources) {
    await prisma.dataSource.upsert({
      where: {
        name: source.name,
      },

      update: {
        organization: source.organization,
        url: source.url,
        datasetVersion: source.datasetVersion,
        lastVerified: source.lastVerified,
      },

      create: source,
    });

    console.log(`✅ ${source.name}`);
  }
}

importDataSources()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });