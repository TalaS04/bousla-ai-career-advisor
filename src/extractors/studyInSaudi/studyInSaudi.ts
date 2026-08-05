import * as cheerio from "cheerio";

async function test() {
  const response = await fetch("https://studyinsaudi.moe.gov.sa/Universities");

  const html = await response.text();

  const $ = cheerio.load(html);

  console.log("Title:", $("title").text());

  const interesting = [
    "api",
    "Universities",
    "UniDetails",
    "assets",
    "main.",
    "runtime.",
    "polyfills.",
    "environment",
    "json"
  ];

  for (const word of interesting) {
    console.log(`\n======= ${word} =======`);

    const index = html.indexOf(word);

    if (index !== -1) {
      console.log(html.substring(index - 150, index + 350));
    } else {
      console.log("Not found");
    }
  }
}

test();