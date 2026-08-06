import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

interface StudyInSaudiSpecialization {
  Name_Ar: string;
  Name_En: string | null;
}

interface StudyInSaudiCollege {
  Code: string;
  Name_Ar: string;
  Name_En: string | null;
  Specialization: StudyInSaudiSpecialization[];
}

async function main() {

  const universities = await prisma.university.findMany({
    where: {
      ministryId: {
        not: null,
      },
    },
  });

  console.log(`Found ${universities.length} universities\n`);

  let imported = 0;

  for (const university of universities) {

    if (university.ministryId == null) continue;

    const filePath = path.join(
      "src",
      "extractors",
      "studyInSaudi",
      "details",
      `${university.ministryId}.html`
    );

    const content = await fs.readFile(filePath, "utf8");

    const colleges: StudyInSaudiCollege[] = JSON.parse(content);

    console.log(
      `${university.arabicName}: ${colleges.length} colleges`
    );

    for (const college of colleges) {

      await prisma.college.upsert({

        where: {
          universityId_arabicName: {
            universityId: university.id,
            arabicName: college.Name_Ar,
          },
        },

        update: {
          englishName: college.Name_En,
          officialCode: college.Code,
        },

        create: {
          universityId: university.id,
          arabicName: college.Name_Ar,
          englishName: college.Name_En,
          officialCode: college.Code,
        },
      });

      imported++;
    }
  }

  console.log("\n====================");
  console.log(`Imported Colleges: ${imported}`);
  console.log("====================");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });