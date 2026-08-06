import fs from "fs/promises";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

interface RawMajor {
    code: string;
    title: string;
    page: number;
    text: string;
}

async function main() {

    const dataFolder = path.join("src", "data");

    const files = await fs.readdir(dataFolder);

    const pdfFile = files.find(f => f.toLowerCase().endsWith(".pdf"));

    if (!pdfFile) {
        throw new Error("No PDF found.");
    }

    const pdfPath = path.join(dataFolder, pdfFile);

    console.log("Using:", pdfFile);

    const data = await fs.readFile(pdfPath);

    const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(data)
    }).promise;

    console.log("Pages:", pdf.numPages);

    const majors: RawMajor[] = [];

    for (let pageNumber = 77; pageNumber <= pdf.numPages; pageNumber++) {

        console.log(`Reading page ${pageNumber}`);

        const page = await pdf.getPage(pageNumber);

        const text = await page.getTextContent();

        const pageText = text.items
            .map((item: any) => item.str)
            .join(" ");

        // Find first 6-digit code on page
        const codeMatch = pageText.match(/\b\d{6}\b/);

        if (!codeMatch)
            continue;

        const code = codeMatch[0];

        // Everything after the code
        const afterCode = pageText.substring(
            pageText.indexOf(code) + code.length
        );

        // Remove repeated headers
        const cleaned = afterCode
            .replace(/المجال التفصيلي اسم التخصص التعريف/g, "")
            .replace(/تخصصات أخرى مشمولة بالتعريف/g, "")
            .replace(/\s+/g, " ")
            .trim();

        // First sentence becomes title
        const title = cleaned
            .split("يهدف")[0]
            .split("يتناول")[0]
            .split("يهدف")[0]
            .split("تخصصات")[0]
            .trim();

        majors.push({
            code,
            title,
            page: pageNumber,
            text: cleaned
        });

    }

    await fs.mkdir("output", { recursive: true });

    await fs.writeFile(
        "output/majors_raw.json",
        JSON.stringify(majors, null, 2),
        "utf8"
    );

    console.log();
    console.log("===============================");
    console.log("Extraction complete.");
    console.log("Majors:", majors.length);
    console.log("Saved to output/majors_raw.json");
    console.log("===============================");
}

main().catch(console.error);