

## Plan: Transform Marketplace into AceEdX International Exchange Program Page

This plan converts the current marketplace into a rich, branded International Exchange Program page inspired by the uploaded Sweden program HTML, with AceEdX brand colors (blue, white, gold), the official logo, and all the content sections from the reference file.

### Summary of Changes

1. **Brand & Color System** — Update `index.css` to use navy (#0a1628), gold (#c9933a), and blue/white palette from the reference HTML. Add Cormorant Garamond and DM Sans fonts alongside existing ones.

2. **Copy AceEdX Logo** — Copy `user-uploads://Ace_EduX_Logo_3.png` into `src/assets/aceedx-logo.png` and use it in Navbar and Footer.

3. **Update Navbar** (`src/components/landing/Navbar.tsx`)
   - Replace the Globe icon with the AceEdX logo image
   - Remove "Sign In" and "Get Started" buttons (no auth needed)
   - Add `www.aceedx.com` external link at top corner
   - Update nav links: Programs, Why Sweden, Itinerary, Eligibility, Register
   - All links scroll to sections or navigate to `/marketplace`

4. **Update Footer** (`src/components/landing/Footer.tsx`)
   - Add `www.aceedx.com` link
   - Add WhatsApp contact (+91 93733 87800)
   - Update copyright text to match reference

5. **Rename route** — Rename "Marketplace" to "International Exchange Program" in the page title and heading

6. **Rebuild Marketplace page** (`src/pages/Marketplace.tsx`) — Major rewrite to integrate the Sweden program content:
   - **Hero Section**: Navy background, split layout with program title "Global Immersive Program for School Leaders", destination Helsingborg Sweden, badges (USA Closed, Sweden Open), "Register My Interest" button that opens Google Form modal
   - **Marquee Strip**: Scrolling keywords (School Visits, Leadership Workshops, Swedish EdTech, etc.)
   - **Program Cards**: Two cards — USA (Closed) and Sweden/Helsingborg (Open with Apply Now). All durations set to 7 days. Add "For Principals" type option in filter dropdown.
   - **Photo Gallery**: Horizontal scrolling gallery with fallback Unsplash images and captions from the reference
   - **Why Sweden Section**: Stats (#1 PISA, 100% digital, 5+ visits, 30+ peers) and pillars (School Immersions, AI & EdTech, Global Network, Playbook, Certification)
   - **Itinerary Section**: 7-day timeline (Arrival in Helsingborg, School Visits, EdTech & AI, Leadership Masterclass, Synthesis & Farewell)
   - **Eligibility Section**: Three cards (School Principals, Vice Principals, School Owners)
   - **Testimonial**: Quote from Principal Meena Sharma
   - **CTA Section**: "Seats Are Filling Fast" with Register button
   - **Google Form Modal**: Dialog with embedded iframe (`https://docs.google.com/forms/d/e/1FAIpQLSfkDPxPz5ZK_X2o_-zcrhXNMdBKf6eE4eFjk6WhCLN3jXZ-qw/viewform?embedded=true`)

7. **Filter Updates** — Keep search and filters functional. Add "For Principals" to the type dropdown. Status filter stays. All non-Sweden programs show "Application Closed" and disabled buttons.

8. **Update Landing Page** (`src/pages/Index.tsx` and hero) — Update CTA buttons to link to `/marketplace` (International Exchange Program). Remove references to "Sign In" or "Register" auth flows.

### Files Modified
- `src/index.css` — Brand colors (navy, gold, blue, white)
- `src/components/landing/Navbar.tsx` — Logo, links, remove auth, add aceedx.com
- `src/components/landing/Footer.tsx` — Logo, contact info, aceedx.com link
- `src/pages/Marketplace.tsx` — Full rewrite with all program sections
- `src/pages/Index.tsx` — Update CTAs
- `src/components/landing/HeroSection.tsx` — Update CTA text/links

### Files Created
- `src/assets/aceedx-logo.png` — Copied from upload

### Technical Notes
- Google Form is embedded via iframe in a Dialog component
- All sections use `id` attributes for smooth scroll navigation from navbar
- Framer Motion animations preserved for section reveals
- The mock program data is replaced with the two programs (USA closed, Sweden/Helsingborg open)
- No database changes needed — this page is static content
- No authentication required per user request

