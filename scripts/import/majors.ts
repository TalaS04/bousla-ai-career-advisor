import { PrismaClient } from "@prisma/client";
import majors from "@/data/json/official_specializations.json";

const prisma = new PrismaClient();

async function importMajors() {
  const dataSource = await prisma.dataSource.findUnique({
    where: {
      name: "Saudi Standard Classification of Educational Specializations",
    },
  });

  if (!dataSource) {
    throw new Error("Data source not found.");
  }

  let imported = 0;
  let skipped = 0;

  for (const item of majors) {
    // Find the top-level classification by its Arabic name
    const classification = await prisma.classification.findFirst({
      where: {
        arabicName: item.officialClassification.broadField,
      },
    });

    if (!classification) {
      console.warn(
        `⚠️ Classification not found for: ${item.nameAr} (${item.officialClassification.broadField})`
      );
      skipped++;
      continue;
    }

    await prisma.major.upsert({
      where: {
        officialCode: item.id,
      },

      update: {
        arabicName: item.nameAr,
        description: item.officialDefinitionAr,
        classificationId: classification.id,
        dataSourceId: dataSource.id,
        includedSpecializations: JSON.stringify(
          item.includedSpecializations ?? []
        ),
        coreSubjects: JSON.stringify(item.coreSubjects ?? []),
      },

      create: {
        officialCode: item.id,
        arabicName: item.nameAr,
        description: item.officialDefinitionAr,
        classificationId: classification.id,
        dataSourceId: dataSource.id,
        includedSpecializations: JSON.stringify(
          item.includedSpecializations ?? []
        ),
        coreSubjects: JSON.stringify(item.coreSubjects ?? []),
      },
    });

    imported++;
    console.log(`✅ ${item.nameAr}`);
  }

  console.log("\n======================");
  console.log(`Imported : ${imported}`);
  console.log(`Skipped  : ${skipped}`);
  console.log("======================");
}

importMajors()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });