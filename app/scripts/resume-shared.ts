import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shared types and helpers for the resume document generators.
// The web route (app/routes/resume.tsx) keeps its own copy of these shapes so the
// two surfaces stay independently typed; this module is the source for the build scripts.

export interface ResumeLocation {
  city: string;
  region: string;
  countryCode: string;
}

export interface Profile {
  network: string;
  username?: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  url?: string;
  summary: string;
  email: string;
  phone?: string;
  location: ResumeLocation;
  profiles: Profile[];
}

export interface Work {
  name: string;
  position: string;
  location: string;
  employmentType?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface Project {
  name: string;
  type?: string;
  url?: string;
  repository?: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  keywords: string[];
  // Optional verbatim display string; overrides keywords.join(", ") when the
  // reference uses punctuation a comma-join cannot express (e.g. a semicolon).
  value?: string;
}

export interface Education {
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  location?: string;
  // Optional override for the displayed credential title; falls back to
  // "<studyType> in <area>" when absent.
  credential?: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Reference {
  name: string;
  reference: string;
}

export interface Resume {
  basics: Basics;
  work: Work[];
  projects?: Project[];
  skills: Skill[];
  education: Education[];
  languages?: Language[];
  references?: Reference[];
  referencesNote?: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Format a YYYY-MM string as "Mon YYYY"; undefined renders as "Present".
export function formatDate(value?: string): string {
  if (!value) return "Present";
  const [year, month] = value.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return value;
  return `${MONTHS[monthIndex]} ${year}`;
}

// Format a start/end pair as "Mon YYYY – Mon YYYY" (en dash, allowed for ranges).
export function formatRange(start: string, end?: string): string {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

// Strip the protocol and any trailing slash for compact link display.
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

// For component bullets shaped exactly like "name (lang): description", return
// [name, rest] so the name can be emphasized (matching the reference, which bolds
// only the Platform-components leads). The trailing "): " is what distinguishes a
// component label from ordinary prose that merely contains a parenthetical, so a
// bullet like "...tools (Claude, Cursor, Copilot) to..." is left unbolded.
export function splitLeadIn(text: string): [string, string] | null {
  const m = text.match(/^(.{1,40}?) \([^()]*\): /);
  if (!m) return null;
  return [m[1], text.slice(m[1].length)];
}

// Resume palette, aligned to the reference document. Hex without leading '#'
// (docx wants bare hex; the PDF generator prepends '#').
export const COLORS = {
  navy: "1F3864", // name + section headings
  black: "000000", // body text, job/education titles, bullets
  dark: "333333", // subtitle line + contact line
  grey: "555555", // sublines, project meta, dates, references note
};

// Normalize middot separators inside a free-text string to the document's
// "  ·  " (two-space) house spacing, so values like the label and project type
// match the joined separators used elsewhere.
export function normalizeSep(text: string): string {
  return text.replace(/\s*·\s*/g, "  ·  ");
}

// Group header profiles into display rows: each "website" profile starts a new
// row, keeping its associated accounts beside it. This reproduces the reference
// header's two-row link block (personal links, then statecraft links).
export function groupProfiles(profiles: Profile[]): Profile[][] {
  const rows: Profile[][] = [];
  for (const p of profiles) {
    if (rows.length === 0 || p.network === "website") rows.push([p]);
    else rows[rows.length - 1].push(p);
  }
  return rows;
}

// The displayed credential title for an education entry.
export function educationCredential(edu: Education): string {
  return edu.credential ?? `${edu.studyType} in ${edu.area}`;
}

// The displayed skill values line (verbatim override or comma-joined keywords).
export function skillValue(skill: Skill): string {
  return skill.value ?? skill.keywords.join(", ");
}

// Resolve the contact line(s) shown under the name.
export function contactLines(basics: Basics): string[] {
  const loc = basics.location;
  const line1 = [`${loc.city}, ${loc.region}, ${loc.countryCode === "CA" ? "Canada" : loc.countryCode}`, basics.email, basics.phone]
    .filter(Boolean)
    .join("  ·  ");
  const links = basics.profiles.map((p) => displayUrl(p.url));
  return [line1, links.join("  ·  ")].filter(Boolean);
}

// Load and parse the resume JSON that the build syncs into app/data.
export function loadResume(): Resume {
  const jsonPath = path.join(__dirname, "../data/resume.json");
  const raw = fs.readFileSync(jsonPath, "utf8");
  return JSON.parse(raw) as Resume;
}

export const OUTPUT_DIR = path.join(__dirname, "../../public");
export const PDF_PATH = path.join(OUTPUT_DIR, "Bartlomiej_Kus_Resume.pdf");
export const DOCX_PATH = path.join(OUTPUT_DIR, "Bartlomiej_Kus_Resume.docx");
