import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function main() {

  const html = await fs.readFile(
    "src/extractors/studyInSaudi/universities.html",
    "utf8"
  );

  const $ = cheerio.load(html);

  const dataSource = await prisma.dataSource.findUnique({
    where: {
      name: "Saudi Universities Directory",
    },
  });

  if (!dataSource) {
    throw new Error("Saudi Universities Directory datasource not found.");
  }

  const cards = $(".card--uni").toArray();

  let imported = 0;

  for (const cardElement of cards) {

    const card = $(cardElement);

    const container = card.find(".rounded-3");

    const businessCode = container.attr("id") ?? "";

    const arabicName = card.find(".srch-target").text().trim();

    const detailsHref =
      card.find("a[href*='/Universities/Details/']").attr("href") ?? "";

    const ministryId =
      Number(detailsHref.match(/Details\/(\d+)/)?.[1]);

    const imageUrl =
      card.find("img.card-img-top").attr("src") ?? "";

    const logoUrl =
      card.find("img.img-thumbnail").attr("src") ?? "";

    await prisma.university.upsert({

      where: {
        arabicName,
      },

      update: {

        ministryId,

        businessCode,

        imageUrl,

        logoUrl,

        dataSourceId: dataSource.id,
      },

      create: {

        arabicName,

        ministryId,

        businessCode,

        imageUrl,

        logoUrl,

        dataSourceId: dataSource.id,
      },
    });

    console.log(`✅ ${arabicName}`);

    imported++;
  }

  console.log(`\nImported ${imported} universities`);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });