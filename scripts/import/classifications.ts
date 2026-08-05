import { PrismaClient } from "@prisma/client";
import classifications from "@/data/json/classification_fields.json";

const prisma = new PrismaClient();

async function importClassifications() {
  const dataSource = await prisma.dataSource.findUnique({
    where: {
      name: "Saudi Standard Classification of Educational Specializations",
    },
  });

  if (!dataSource) {
    throw new Error("DataSource not found.");
  }

  let imported = 0;

  for (const item of classifications) {
    await prisma.classification.upsert({
      where: {
        officialCode: item.id,
      },

      update: {
        arabicName: item.nameAr,
        englishName: item.nameEn,
      },

      create: {
        officialCode: item.id,
        arabicName: item.nameAr,
        englishName: item.nameEn,
        level: 1,
        dataSourceId: dataSource.id,
      },
    });

    imported++;
    console.log(`✅ ${item.id} - ${item.nameAr}`);
  }

  console.log(`\nImported ${imported} classifications`);
}

importClassifications()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });