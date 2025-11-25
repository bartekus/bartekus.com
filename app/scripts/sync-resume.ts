import fs from "node:fs/promises";

const RESUME_URL =
  "https://gist.githubusercontent.com/bartekus/36e3eb073b29a83b846b5b15d145b918/raw/6fcb2159a053bd64a10f796032679e401b07374d/resume.json";

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
