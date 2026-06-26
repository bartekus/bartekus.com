import fs from "node:fs/promises";

// Hashless raw URL: always resolves the latest revision of the gist (the pinned-SHA
// form would require a manual bump on every gist edit). GitHub's raw CDN caches this
// for roughly a minute, which is fine for a build-time sync.
const RESUME_URL =
  "https://gist.githubusercontent.com/bartekus/d2f989f89d590ad0e661245ca18cd0df/raw/resume.json";

async function main() {
  console.log("Syncing resume.json from gist...");

  const res = await fetch(RESUME_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch resume: ${res.status} ${res.statusText}`);
  }

  const json = await res.text();

  // Validate before writing so a non-JSON response (e.g. a 404 HTML page) cannot
  // clobber the file that the route imports and the document generators read.
  let parsed: { basics?: { name?: string } };
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Fetched resume is not valid JSON; refusing to overwrite app/data/resume.json");
  }
  if (!parsed.basics?.name) {
    throw new Error("Fetched resume JSON is missing basics.name; refusing to overwrite app/data/resume.json");
  }

  await fs.writeFile("app/data/resume.json", json, "utf8");

  console.log(`✓ Synced app/data/resume.json (${parsed.basics.name})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
