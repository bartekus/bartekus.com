import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { Document, Page, Text, View, Link, Font, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import {
  type Resume,
  type Work,
  type Project,
  type Education,
  COLORS,
  displayUrl,
  educationCredential,
  formatRange,
  groupProfiles,
  normalizeSep,
  skillValue,
  splitLeadIn,
} from "./resume-shared";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS = path.join(__dirname, "fonts");

// Arimo is metric-compatible with Arial and the same design as Liberation Sans,
// which the reference PDF embeds. Embedding it (rather than using the built-in
// Helvetica) gives the generated PDF matching glyph metrics and pagination.
Font.register({
  family: "Arimo",
  fonts: [
    { src: path.join(FONTS, "Arimo-Regular.ttf") },
    { src: path.join(FONTS, "Arimo-Bold.ttf"), fontWeight: "bold" },
    { src: path.join(FONTS, "Arimo-Italic.ttf"), fontStyle: "italic" },
    { src: path.join(FONTS, "Arimo-BoldItalic.ttf"), fontWeight: "bold", fontStyle: "italic" },
  ],
});
// The reference (LibreOffice) does not hyphenate; keep words whole.
Font.registerHyphenationCallback((word) => [word]);

const NAVY = `#${COLORS.navy}`;
const BLACK = `#${COLORS.black}`;
const DARK = `#${COLORS.dark}`;
const GREY = `#${COLORS.grey}`;
const RULE = "#C8CDD8";

const SEP = "  ·  ";

const styles = StyleSheet.create({
  page: {
    paddingTop: 43,
    paddingBottom: 43,
    paddingHorizontal: 43,
    fontFamily: "Arimo",
    fontSize: 10,
    color: BLACK,
    lineHeight: 1.13,
  },
  name: { fontSize: 17, fontWeight: "bold", color: NAVY, lineHeight: 1.15, marginBottom: 2 },
  label: { fontSize: 10.5, color: DARK, lineHeight: 1.2, marginBottom: 6 },
  contact: { fontSize: 9, color: DARK, lineHeight: 1.35 },
  link: { color: NAVY, textDecoration: "none" },
  section: { marginTop: 7 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: NAVY,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    paddingBottom: 2,
    marginBottom: 5,
  },
  entry: { marginBottom: 4 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  entryTitle: { fontSize: 10, fontWeight: "bold", color: BLACK, flex: 1, paddingRight: 8 },
  entryDate: { fontSize: 10, color: GREY },
  entrySub: { fontSize: 9, fontStyle: "italic", color: GREY, marginTop: 1 },
  projectName: { fontSize: 10, fontWeight: "bold", color: BLACK },
  projectMeta: { fontSize: 9, color: GREY, marginTop: 1 },
  paragraph: { marginTop: 2 },
  bulletRow: { flexDirection: "row", marginTop: 1.5, paddingRight: 2 },
  bulletDot: { width: 12, color: BLACK },
  bulletText: { flex: 1 },
  bold: { fontWeight: "bold", color: BLACK },
  skillRow: { marginTop: 3.5 },
  skillName: { fontWeight: "bold", color: BLACK },
  langLine: { marginTop: 2 },
  quote: { fontStyle: "italic", marginTop: 2 },
  refName: { fontSize: 10, color: BLACK, marginTop: 2 },
  note: { fontSize: 9, fontStyle: "italic", color: GREY, marginTop: 6 },
});

function Bullet({ text }: { text: string }) {
  const lead = splitLeadIn(text);
  return (
    <View style={styles.bulletRow} wrap={false}>
      <Text style={styles.bulletDot}>{"•"}</Text>
      <Text style={styles.bulletText}>
        {lead ? (
          <>
            <Text style={styles.bold}>{lead[0]}</Text>
            <Text>{lead[1]}</Text>
          </>
        ) : (
          text
        )}
      </Text>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function WorkEntry({ job }: { job: Work }) {
  const sub = [job.location, job.employmentType].filter(Boolean).join(SEP);
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHeaderRow}>
        <Text style={styles.entryTitle}>{`${job.position}${SEP}${job.name}`}</Text>
        <Text style={styles.entryDate}>{formatRange(job.startDate, job.endDate)}</Text>
      </View>
      {sub ? <Text style={styles.entrySub}>{sub}</Text> : null}
      {(job.highlights ?? []).map((h, i) => (
        <Bullet key={i} text={h} />
      ))}
    </View>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  const links = [project.url, project.repository].filter(Boolean) as string[];
  return (
    <View style={styles.entry}>
      <View wrap={false}>
        <Text style={styles.projectName}>{project.name}</Text>
        <Text style={styles.projectMeta}>
          {project.type ? <Text>{normalizeSep(project.type)}</Text> : null}
          {links.map((l, i) => (
            <Text key={l}>
              {project.type || i > 0 ? SEP : ""}
              <Link style={styles.link} src={l}>
                {displayUrl(l)}
              </Link>
            </Text>
          ))}
        </Text>
        {project.description ? <Text style={styles.paragraph}>{project.description}</Text> : null}
      </View>
      {(project.highlights ?? []).map((h, i) => (
        <Bullet key={i} text={h} />
      ))}
    </View>
  );
}

function EducationEntry({ edu }: { edu: Education }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHeaderRow}>
        <Text style={styles.entryTitle}>{`${educationCredential(edu)}${SEP}${edu.institution}`}</Text>
        <Text style={styles.entryDate}>{formatRange(edu.startDate, edu.endDate)}</Text>
      </View>
      {edu.location ? <Text style={styles.entrySub}>{edu.location}</Text> : null}
      {edu.summary ? <Bullet text={edu.summary} /> : null}
    </View>
  );
}

function ResumeDocument({ resume }: { resume: Resume }) {
  const { basics, work, projects, skills, education, languages, references, referencesNote } = resume;
  const loc = basics.location;
  const locStr = `${loc.city}, ${loc.region}, ${loc.countryCode === "CA" ? "Canada" : loc.countryCode}`;

  return (
    <Document
      title={`${basics.name} Resume`}
      author={basics.name}
      subject={basics.label}
      creator="bartekus.com resume generator"
      producer="bartekus.com resume generator"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{basics.name}</Text>
          <Text style={styles.label}>{normalizeSep(basics.label)}</Text>
          <Text style={styles.contact}>
            {`${locStr}${SEP}${basics.email}`}
            {basics.phone ? `${SEP}${basics.phone}` : ""}
          </Text>
          {groupProfiles(basics.profiles).map((row, ri) => (
            <Text key={ri} style={styles.contact}>
              {row.map((p, i) => (
                <Text key={`${p.network}-${i}`}>
                  {i > 0 ? SEP : ""}
                  <Link style={styles.link} src={p.url}>
                    {displayUrl(p.url)}
                  </Link>
                </Text>
              ))}
            </Text>
          ))}
        </View>

        {/* Profile */}
        <View style={styles.section}>
          <SectionTitle>PROFILE</SectionTitle>
          <Text>{basics.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>
          {work.map((job, i) => (
            <WorkEntry key={i} job={job} />
          ))}
        </View>

        {/* Projects */}
        {projects && projects.length > 0 ? (
          <View style={styles.section}>
            <SectionTitle>SELECTED PROJECTS</SectionTitle>
            {projects.map((project, i) => (
              <ProjectEntry key={i} project={project} />
            ))}
          </View>
        ) : null}

        {/* Skills */}
        <View style={styles.section}>
          <SectionTitle>TECHNICAL SKILLS</SectionTitle>
          {skills.map((skill, i) => (
            <Text key={i} style={styles.skillRow}>
              <Text style={styles.skillName}>{`${skill.name}: `}</Text>
              <Text>{skillValue(skill)}</Text>
            </Text>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <SectionTitle>EDUCATION</SectionTitle>
          {education.map((edu, i) => (
            <EducationEntry key={i} edu={edu} />
          ))}
        </View>

        {/* Languages */}
        {languages && languages.length > 0 ? (
          <View style={styles.section}>
            <SectionTitle>LANGUAGES</SectionTitle>
            <Text style={styles.langLine}>{languages.map((l) => `${l.language} (${l.fluency})`).join(SEP)}</Text>
          </View>
        ) : null}

        {/* References */}
        {references && references.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <SectionTitle>REFERENCES</SectionTitle>
            {references.map((ref, i) => (
              <View key={i}>
                <Text style={styles.quote}>{`“${ref.reference}”`}</Text>
                <Text style={styles.refName}>{`- ${ref.name}`}</Text>
              </View>
            ))}
            {referencesNote ? <Text style={styles.note}>{referencesNote}</Text> : null}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function renderResumePdf(resume: Resume): Promise<Buffer> {
  return renderToBuffer(<ResumeDocument resume={resume} />);
}
