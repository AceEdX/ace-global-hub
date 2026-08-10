# Replace Hero Image: Group of Principals in Sweden

## Goal
Change the hero image on the main page (currently a group of students and teachers in an exotic location) to a group of Principals in Sweden with a distinctly Swedish background.

## Change

**1. Generate a new hero image** using the image-generation tool. Subject: a professional group of school Principals (diverse, well-dressed, warm and approachable) photographed in front of a clearly Swedish setting — e.g. a classic Swedish red wooden building / Gamla Stan (Old Town) architecture in Stockholm, or an iconic Swedish landmark — in soft daylight. Match the site's navy/blue/gold brand tones and the modern EdTech aesthetic of the current hero.

**2. Save it as a new asset** at `src/assets/hero-sweden-principals.jpg` (keep the existing `hero-exchange.jpg` as a fallback rather than overwriting it, in case the new image needs to be reverted).

**3. Update the reference** in `src/pages/Marketplace.tsx`:
- Add the import for the new asset.
- Change `<img src={heroExchange} ...>` (line ~320) to use the new asset.
- Update the alt text to something like "School principals on the AceEdX Sweden program in Stockholm".

## Technical details
- Single-file change in `src/pages/Marketplace.tsx` (import + img src/alt).
- New asset written to `src/assets/`.
- No other sections (gallery, testimonials, Why Sweden) are touched.

## Out of scope
- The gallery images and other program photos stay unchanged.
- No text or content edits beyond the alt attribute.
