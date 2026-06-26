import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  TabStopType,
  BorderStyle,
  PageOrientation,
  convertInchesToTwip,
  type ISectionOptions,
  type IRunOptions,
} from "docx";
import {
  type Resume,
  type Work,
  type Project,
  type Education,
  type Profile,
  COLORS,
  displayUrl,
  educationCredential,
  formatRange,
  groupProfiles,
  normalizeSep,
  skillValue,
  splitLeadIn,
} from "./resume-shared";

const NAVY = COLORS.navy;
const BLACK = COLORS.black;
const DARK = COLORS.dark;
const GREY = COLORS.grey;

const FONT = "Arial";

// Font sizes in half-points (Word units): 10pt body => 20.
const SZ = {
  name: 34, // 17pt
  subtitle: 21, // 10.5pt
  contact: 18, // 9pt
  heading: 22, // 11pt
  body: 20, // 10pt
  subline: 18, // 9pt
};

// US Letter, 0.6in margins => content width 12240 - 2*864 = 10512 twips.
const MARGIN = convertInchesToTwip(0.6);
const RIGHT_TAB = 12240 - 2 * MARGIN;

// Spacing in twips (points * 20).
const SP = {
  nameAfter: 30, // 1.5pt
  subtitleAfter: 60, // 3.0pt
  headingBefore: 150, // 7.5pt
  headingAfter: 110, // 5.5pt
  bulletAfter: 28, // 1.4pt
  skillAfter: 38, // 1.9pt
  sublineAfter: 46, // 2.3pt
  entryBefore: 110, // 5.5pt
};

const SEP = "  ·  ";

// A body run defaults to Arial 10pt true black unless overridden.
function run(text: string, opts: Partial<IRunOptions> = {}): TextRun {
  return new TextRun({ text, font: FONT, size: SZ.body, color: BLACK, ...opts });
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: SP.headingBefore, after: SP.headingAfter },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C8CDD8", space: 2 } },
    children: [run(text.toUpperCase(), { bold: true, color: NAVY, size: SZ.heading })],
  });
}

function link(url: string): ExternalHyperlink {
  return new ExternalHyperlink({
    link: url,
    children: [run(displayUrl(url), { color: NAVY, size: SZ.contact })],
  });
}

function bulletPara(text: string): Paragraph {
  const lead = splitLeadIn(text);
  const children = lead ? [run(lead[0], { bold: true }), run(lead[1])] : [run(text)];
  return new Paragraph({ bullet: { level: 0 }, spacing: { after: SP.bulletAfter }, children });
}

function titleWithDateRow(titleRuns: TextRun[], dateText: string): Paragraph {
  return new Paragraph({
    spacing: { before: SP.entryBefore, after: 10 },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    children: [...titleRuns, run("\t"), run(dateText, { color: GREY, size: SZ.subline })],
  });
}

function subline(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: SP.sublineAfter },
    children: [run(text, { italics: true, color: GREY, size: SZ.subline })],
  });
}

function profileRow(row: Profile[]): Paragraph {
  const children: (TextRun | ExternalHyperlink)[] = [];
  row.forEach((p, i) => {
    if (i > 0) children.push(run(SEP, { color: GREY, size: SZ.contact }));
    children.push(link(p.url));
  });
  return new Paragraph({ spacing: { after: 0 }, children });
}

function workEntry(job: Work): Paragraph[] {
  const sub = [job.location, job.employmentType].filter(Boolean).join(SEP);
  // One bold run for "Title · Company" (matches the reference).
  const paras: Paragraph[] = [
    titleWithDateRow([run(`${job.position}${SEP}${job.name}`, { bold: true })], formatRange(job.startDate, job.endDate)),
  ];
  if (sub) paras.push(subline(sub));
  for (const h of job.highlights ?? []) paras.push(bulletPara(h));
  return paras;
}

function projectEntry(project: Project): Paragraph[] {
  const links = [project.url, project.repository].filter(Boolean) as string[];
  const metaChildren: (TextRun | ExternalHyperlink)[] = [];
  if (project.type) metaChildren.push(run(normalizeSep(project.type), { color: GREY, size: SZ.subline }));
  links.forEach((l, i) => {
    if (project.type || i > 0) metaChildren.push(run(SEP, { color: GREY, size: SZ.subline }));
    metaChildren.push(link(l));
  });

  const paras: Paragraph[] = [
    new Paragraph({ spacing: { before: SP.entryBefore, after: 10 }, children: [run(project.name, { bold: true })] }),
  ];
  if (metaChildren.length > 0) paras.push(new Paragraph({ spacing: { after: SP.sublineAfter }, children: metaChildren }));
  if (project.description) paras.push(new Paragraph({ spacing: { after: SP.bulletAfter }, children: [run(project.description)] }));
  for (const h of project.highlights ?? []) paras.push(bulletPara(h));
  return paras;
}

function educationEntry(edu: Education): Paragraph[] {
  // Credential and institution share the bold title line; location is the subline.
  const paras: Paragraph[] = [
    titleWithDateRow(
      [run(`${educationCredential(edu)}${SEP}${edu.institution}`, { bold: true })],
      formatRange(edu.startDate, edu.endDate)
    ),
  ];
  if (edu.location) paras.push(subline(edu.location));
  if (edu.summary) paras.push(bulletPara(edu.summary));
  return paras;
}

function buildSection(resume: Resume): ISectionOptions {
  const { basics, work, projects, skills, education, languages, references, referencesNote } = resume;
  const loc = basics.location;
  const locStr = `${loc.city}, ${loc.region}, ${loc.countryCode === "CA" ? "Canada" : loc.countryCode}`;

  const children: Paragraph[] = [];

  // Header
  children.push(new Paragraph({ spacing: { after: SP.nameAfter }, children: [run(basics.name, { bold: true, color: NAVY, size: SZ.name })] }));
  children.push(new Paragraph({ spacing: { after: SP.subtitleAfter }, children: [run(normalizeSep(basics.label), { color: DARK, size: SZ.subtitle })] }));
  children.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [run(`${locStr}${SEP}${basics.email}${basics.phone ? `${SEP}${basics.phone}` : ""}`, { color: DARK, size: SZ.contact })],
    })
  );
  for (const row of groupProfiles(basics.profiles)) children.push(profileRow(row));

  // Profile
  children.push(sectionHeading("Profile"));
  children.push(new Paragraph({ children: [run(basics.summary)] }));

  // Experience
  children.push(sectionHeading("Professional Experience"));
  for (const job of work) children.push(...workEntry(job));

  // Projects
  if (projects && projects.length > 0) {
    children.push(sectionHeading("Selected Projects"));
    for (const project of projects) children.push(...projectEntry(project));
  }

  // Skills
  children.push(sectionHeading("Technical Skills"));
  for (const skill of skills) {
    children.push(new Paragraph({ spacing: { after: SP.skillAfter }, children: [run(`${skill.name}: `, { bold: true }), run(skillValue(skill))] }));
  }

  // Education
  children.push(sectionHeading("Education"));
  for (const edu of education) children.push(...educationEntry(edu));

  // Languages
  if (languages && languages.length > 0) {
    children.push(sectionHeading("Languages"));
    children.push(new Paragraph({ children: [run(languages.map((l) => `${l.language} (${l.fluency})`).join(SEP))] }));
  }

  // References
  if (references && references.length > 0) {
    children.push(sectionHeading("References"));
    for (const ref of references) {
      children.push(new Paragraph({ spacing: { after: 20 }, children: [run(`“${ref.reference}”`, { italics: true })] }));
      children.push(new Paragraph({ children: [run(`- ${ref.name}`)] }));
    }
    if (referencesNote)
      children.push(new Paragraph({ spacing: { before: 80 }, children: [run(referencesNote, { italics: true, color: GREY, size: SZ.subline })] }));
  }

  return {
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      },
    },
    children,
  };
}

export async function renderResumeDocx(resume: Resume): Promise<Buffer> {
  const doc = new Document({
    creator: "bartekus.com resume generator",
    title: `${resume.basics.name} Resume`,
    description: resume.basics.label,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: SZ.body, color: BLACK },
          paragraph: { spacing: { line: 252 } },
        },
      },
    },
    sections: [buildSection(resume)],
  });
  return Packer.toBuffer(doc) as Promise<Buffer>;
}
