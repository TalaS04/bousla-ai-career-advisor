import * as cheerio from "cheerio";
import fs from "fs/promises";

async function main() {
  const html = await fs.readFile(
    "src/extractors/studyInSaudi/universities.html",
    "utf8"
  );

  const $ = cheerio.load(html);

  const universities = $(".card--uni")
    .map((_, element) => {
      const card = $(element);

      const container = card.find(".rounded-3");

      const businessCode = container.attr("id") ?? "";

      const arabicName = card
        .find(".srch-target")
        .first()
        .text()
        .trim();

      const detailsHref =
        card.find("a[href*='/Universities/Details/']").attr("href") ?? "";

      const ministryId =
        detailsHref.match(/Details\/(\d+)/)?.[1] ?? null;

      const imageUrl =
        card.find("img.card-img-top").attr("src") ?? "";

      const logoUrl =
        card.find("img.img-thumbnail").attr("src") ?? "";

      return {
        ministryId,
        businessCode,
        arabicName,
        imageUrl,
        logoUrl,
      };
    })
    .get();

  console.log(universities);

  console.log(`\nFound ${universities.length} universities`);
}

main();