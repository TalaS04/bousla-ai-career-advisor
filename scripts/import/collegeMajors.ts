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
    include: {
      colleges: true,
    },
  });

  const dbMajors = await prisma.major.findMany();

  console.log(`Found ${universities.length} universities\n`);

  let relationshipsCreated = 0;
  let matched = 0;
  let skipped = 0;

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

    console.log(`\n${university.arabicName}`);

    for (const collegeData of colleges) {
      const college = university.colleges.find(
        (c) => c.arabicName === collegeData.Name_Ar
      );

      if (!college) {
        console.log(`⚠ College not found: ${collegeData.Name_Ar}`);
        continue;
      }

      for (const specialization of collegeData.Specialization) {
        const specializationName = specialization.Name_Ar.trim();

        // Skip empty or generic entries
        if (
          specializationName === "" ||
          specializationName === "عام"
        ) {
          skipped++;
          continue;
        }

        // 1. Try exact major name
        let major = dbMajors.find(
          (m) => m.arabicName.trim() === specializationName
        );

        // 2. Try aliases from includedSpecializations
        if (!major) {
          major = dbMajors.find((m) => {
            if (!m.includedSpecializations) return false;

            try {
              const aliases = JSON.parse(
                m.includedSpecializations
              ) as string[];

              return aliases.some(
                (alias) => alias.trim() === specializationName
              );
            } catch {
              return false;
            }
          });
        }

        if (!major) {
          console.log(
            `⚠ ${university.arabicName} -> ${specializationName}`
          );

          skipped++;
          continue;
        }

        await prisma.collegeMajor.upsert({
          where: {
            collegeId_majorId: {
              collegeId: college.id,
              majorId: major.id,
            },
          },

          update: {},

          create: {
            collegeId: college.id,
            majorId: major.id,
          },
        });

        relationshipsCreated++;
        matched++;
      }
    }
  }

  console.log("\n====================");
  console.log(`Relationships : ${relationshipsCreated}`);
  console.log(`Matched       : ${matched}`);
  console.log(`Skipped       : ${skipped}`);
  console.log("====================");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });