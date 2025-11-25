import { Download, Mail, Linkedin, Github, Twitter, Phone } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { Button } from "~/components/ui/button";
import resumeData from "~/data/resume.json";

// Type definitions for JSON Resume schema
interface Location {
  city: string;
  region: string;
  countryCode: string;
}

interface Profile {
  network: string;
  username?: string;
  url: string;
}

interface Basics {
  name: string;
  label: string;
  email: string;
  phone?: string;
  location: Location;
  profiles: Profile[];
  summary: string;
}

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface Education {
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  location?: string;
}

interface Work {
  name: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights?: string[];
}

interface Reference {
  name: string;
  reference: string;
}

interface Language {
  language: string;
  fluency: string;
}

interface Interest {
  name: string;
}

interface ResumeData {
  basics: Basics;
  skills: Skill[];
  education: Education[];
  work: Work[];
  references?: Reference[];
  languages?: Language[];
  interests?: Interest[];
}

const resume = resumeData as ResumeData;

// Format date from YYYY-MM format to readable format
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Present";
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

// Format date range
const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

// Get profile icon component
const getProfileIcon = (network: string) => {
  const networkLower = network.toLowerCase();
  switch (networkLower) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "twitter":
    case "x":
      return Twitter;
    default:
      return null;
  }
};

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  const { basics, skills, education, work, references, languages, interests } = resume;

  return (
    <>
      <SEO title="Resume" description={`Resume of ${basics.name} - ${basics.label}`} path="/resume" />

      <div className="container px-4 py-12 max-w-4xl mx-auto">
        {/* Print Button - Hidden on print */}
        <div className="mb-8 print:hidden flex justify-end">
          <Button onClick={handlePrint} variant="outline">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Resume Content */}
        <div className="bg-card border border-border rounded-lg p-8 print:border-0 print:shadow-none">
          {/* Header */}
          <section className="mb-8 pb-6 border-b border-border">
            <h1 className="text-4xl font-bold mb-2">{basics.name}</h1>
            <p className="text-xl text-text-muted mb-4">{basics.label}</p>
            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <a href={`mailto:${basics.email}`} className="flex items-center gap-1 hover:text-primary print:text-foreground">
                <Mail className="h-4 w-4" />
                {basics.email}
              </a>
              {basics.phone && (
                <a href={`tel:${basics.phone}`} className="flex items-center gap-1 hover:text-primary print:text-foreground">
                  <Phone className="h-4 w-4" />
                  {basics.phone}
                </a>
              )}
              {basics.profiles.map((profile) => {
                const IconComponent = getProfileIcon(profile.network);
                if (!IconComponent) return null;
                return (
                  <a
                    key={profile.network}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary print:text-foreground"
                  >
                    <IconComponent className="h-4 w-4" />
                    {profile.network.charAt(0).toUpperCase() + profile.network.slice(1)}
                  </a>
                );
              })}
            </div>
            {basics.location && (
              <p className="text-sm text-text-muted mt-2">
                {basics.location.city}, {basics.location.region}, {basics.location.countryCode}
              </p>
            )}
          </section>

          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Summary</h2>
            <p className="text-text-muted leading-relaxed">{basics.summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Experience</h2>
            <div className="space-y-6">
              {work.map((job, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold">{job.position}</h3>
                  <p className="text-text-muted">
                    {job.name} • {formatDateRange(job.startDate, job.endDate)} • {job.location}
                  </p>
                  {job.summary && <p className="mt-2 text-text-muted italic">{job.summary}</p>}
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 text-text-muted list-disc list-inside ml-4">
                      {job.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8 print:page-break-before">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">
                    {skill.name}
                    {skill.level && <span className="text-text-muted text-sm font-normal ml-2">({skill.level})</span>}
                  </h3>
                  <p className="text-text-muted text-sm">{skill.keywords.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-8 print:keep-together">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold">
                    {edu.studyType} in {edu.area}
                  </h3>
                  <p className="text-text-muted">
                    {edu.institution} • {formatDateRange(edu.startDate, edu.endDate)}
                    {edu.location && ` • ${edu.location}`}
                  </p>
                  {edu.summary && <p className="mt-1 text-text-muted text-sm italic">{edu.summary}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="mb-8 print:keep-together">
              <h2 className="text-2xl font-semibold mb-3 text-primary">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-semibold">{lang.language}</span>
                    <span className="text-text-muted">{lang.fluency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {interests && interests.length > 0 && (
            <section className="mb-8 print:keep-together">
              <h2 className="text-2xl font-semibold mb-3 text-primary">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span key={index} className="text-text-muted text-sm">
                    {interest.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references && references.length > 0 && (
            <section className="print:keep-together">
              <h2 className="text-2xl font-semibold mb-3 text-primary">References</h2>
              <div className="space-y-4">
                {references.map((ref, index) => (
                  <div key={index}>
                    <p className="text-text-muted italic mb-1">"{ref.reference}"</p>
                    <p className="text-text-muted text-sm">— {ref.name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            /* Paper size - options: A4, Letter, Legal, etc. */
            size: Legal;
            /* Or specify custom size: size: 8.5in 11in; */

            /* Margins - top right bottom left */
            margin: 0.75in 0.1in 0.1in 0.5in;

            /* Orientation (optional - usually inferred from size) */
            /* size: Letter portrait; or size: Letter landscape; */
          }

          /* Alternative: Different margins for first page */
          @page :first {
            margin-top: 0.75in;
          }

          /* Force light mode for printing - override all color variables */
          * {
            --background: oklch(100% 0 89.9) !important;
            --foreground: oklch(17.31% 0.006 264) !important;
            --primary: oklch(55.13% 0.085 262.1) !important;
            --primary-foreground: oklch(100% 0 89.9) !important;
            --accent: oklch(65.11% 0.069 299.3) !important;
            --accent-foreground: oklch(100% 0 89.9) !important;
            --surface: oklch(100% 0 89.9) !important;
            --surface-2: oklch(97.46% 0.002 264.5) !important;
            --text: oklch(17.31% 0.006 264) !important;
            --text-muted: oklch(53.37% 0.016 264.2) !important;
            --card: oklch(100% 0 89.9) !important;
            --card-foreground: oklch(17.31% 0.006 264) !important;
            --border: oklch(92.47% 0.004 264.5) !important;
            --muted: oklch(96.61% 0.002 264.5) !important;
            --muted-foreground: oklch(53.37% 0.016 264.2) !important;
          }

          /* Force white background and dark text */
          body,
          html {
            background: white !important;
            color: #0B1220 !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          /* Ensure all text elements use dark colors */
          h1, h2, h3, h4, h5, h6, p, li, span, div, a {
            color: #0B1220 !important;
          }
          /* Ensure muted text is still readable but lighter */
          .text-text-muted,
          [class*="text-muted"] {
            color: #6B7280 !important;
          }
          /* Ensure primary color is visible but not too dark */
          .text-primary,
          [class*="text-primary"] {
            color: #2563EB !important;
          }
          /* Hide header and footer */
          header,
          footer {
            display: none !important;
          }
          /* Hide navigation and other layout elements */
          nav,
          .print\\:hidden {
            display: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:text-foreground {
            color: #0B1220 !important;
          }
          /* Force Technical Skills to start on new page */
          .print\\:page-break-before {
            page-break-before: always !important;
            break-before: page !important;
          }
          /* Keep sections together after Skills */
          .print\\:keep-together {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* Prevent page breaks within work experience items */
          .space-y-6 > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* Ensure main content takes full width */
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Remove any container padding/margins that might interfere */
          .container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Remove padding from content wrapper - let @page margin handle spacing */
          .container > div {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
          /* Ensure sections that start on new pages have consistent spacing */
          section {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          /* Ensure card background is white */
          .bg-card {
            background: white !important;
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
          /* Ensure borders are visible but subtle */
          .border-border {
            border-color: #E5E7EB !important;
          }
        }
      `}</style>
    </>
  );
}
