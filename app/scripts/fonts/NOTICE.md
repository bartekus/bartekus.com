# Vendored fonts

**Arimo** (Regular, Bold, Italic, Bold Italic), by Steve Matteson / Google.

Arimo is metrically compatible with Arial and is the same design family as
Liberation Sans (LibreOffice's Arial substitute), which the reference resume in
`app/data/Bartlomiej_Kus_Resume.pdf` embeds. It is used by the PDF generator
(`app/scripts/generate-resume-pdf.tsx`) so the generated PDF matches the
reference typeface. The DOCX generator sets the run font to "Arial" and relies
on the viewer's substitution (Arial on Windows/macOS, Liberation Sans on Linux),
so it does not embed these files.

Vendored as TTF rather than fetched at build time so the build stays offline and
deterministic (it runs in node:20-alpine with no system fonts).

License: Apache License 2.0. Source: the `@expo-google-fonts/arimo` npm package,
which repackages the Apache-2.0 Arimo fonts from Google Fonts.
