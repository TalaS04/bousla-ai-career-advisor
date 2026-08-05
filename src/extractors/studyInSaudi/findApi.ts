async function main() {
  const url =
    "https://studyinsaudi.moe.gov.sa/bundles/universities?v=ptO1NgNZO2dY2eeS560PXrwNn4NthbpRjFrR1fukbYk1";

  const js = await fetch(url).then(r => r.text());

  console.log(js);
}

main();