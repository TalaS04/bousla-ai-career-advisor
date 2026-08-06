import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const universities = await prisma.university.findMany({
    where: {
      ministryId: {
        not: null,
      },
    },
  });

  const outputDir = "src/extractors/studyInSaudi/details";

  await fs.mkdir(outputDir, { recursive: true });

  for (const university of universities) {
    if (university.ministryId === null) {
      console.log(`⚠ Skipping ${university.arabicName} (No Ministry ID)`);
      continue;
    }

    console.log(`Downloading ${university.arabicName}...`);

    const response = await fetch(
      `https://studyinsaudi.moe.gov.sa/Universities/UniDetails/${university.ministryId}`
    );

    const json = await response.text();

    await fs.writeFile(
      path.join(outputDir, `${university.ministryId}.html`),
      json,
      "utf8"
    );

    console.log(`✅ ${university.ministryId}`);
  }

  console.log("\nFinished.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });