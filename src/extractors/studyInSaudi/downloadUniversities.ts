import fs from "fs/promises";

async function main() {
  const html = await fetch(
    "https://studyinsaudi.moe.gov.sa/Universities"
  ).then(r => r.text());

  await fs.writeFile(
    "src/extractors/studyInSaudi/universities.html",
    html,
    "utf8"
  );

  console.log("✅ Universities page saved.");
}

main();