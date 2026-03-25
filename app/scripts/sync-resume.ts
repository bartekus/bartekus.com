import fs from "node:fs/promises";

const RESUME_URL =
  "https://gist.githubusercontent.com/bartekus/d2f989f89d590ad0e661245ca18cd0df/raw/90858b148b5d88ddddae8867866f009961d384ae/resume.json";

async function main() {
  console.log("Syncing resume.json from gist...");

  const res = await fetch(RESUME_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch resume: ${res.status} ${res.statusText}`);
  }

  const json = await res.text();
  await fs.writeFile("app/data/resume.json", json, "utf8");

  console.log("✓ Synced app/data/resume.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
