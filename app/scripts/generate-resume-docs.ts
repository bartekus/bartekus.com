import fs from "node:fs/promises";
import { loadResume, PDF_PATH, DOCX_PATH } from "./resume-shared";
import { renderResumePdf } from "./generate-resume-pdf";
import { renderResumeDocx } from "./generate-resume-docx";

// Generates the downloadable resume artifacts (PDF + DOCX) from app/data/resume.json,
// the single source of truth synced by sync-resume.ts. Runs in plain Node (no headless
// browser) so it works in the Alpine/CI build.
async function main() {
  console.log("Generating resume documents from app/data/resume.json...");
  const resume = loadResume();

  const [pdf, docx] = await Promise.all([renderResumePdf(resume), renderResumeDocx(resume)]);

  await fs.writeFile(PDF_PATH, pdf);
  await fs.writeFile(DOCX_PATH, docx);

  console.log(`✓ Wrote ${PDF_PATH} (${(pdf.length / 1024).toFixed(1)} KB)`);
  console.log(`✓ Wrote ${DOCX_PATH} (${(docx.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
