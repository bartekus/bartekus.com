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
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">
                    {skill.name}
                    {skill.level && <span className="text-text-muted text-sm font-normal ml-2">({skill.level})</span>}
                  </h3>
                  <p className="text-text-muted text-sm">{skill.keywords.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">
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
            <section className="mb-8">
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
            <section className="mb-8">
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
            <section>
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
            margin: 0.5in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
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
          /* Ensure main content takes full width */
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Remove any container padding/margins that might interfere */
          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
