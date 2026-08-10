# Update the enrolment form link

Point every "Register My Interest" / itinerary action at your new Google Form so all future Sweden program sign-ups land in the new form's responses.

## Answer to your question

Your site does not store enrolments — the buttons open an external Google Form, so all names, emails, and phone numbers live in that form's response sheet in your Google Drive, not in this app. I cannot read those responses from here, and the app's database currently has no applications or profiles at all. Open the form in Google Forms and use the Responses tab (or "Link to Sheets") to see the list.

## What changes

- Replace the old form link with:
  `https://docs.google.com/forms/d/e/1FAIpQLScN5mmD4pc1A6DVLuaRrrOESMqH7EcFmdHNXwHAvq2_VzmGjw/viewform`
- Two places use it today:
  - The pop-up form on the programs page (embedded version of the link).
  - The "Itinerary" link in the top navigation, which opens the form in a new tab.
- No other content, styling, or program details change.

## Technical detail

- `src/pages/Marketplace.tsx` line 16: update `GOOGLE_FORM_URL`, keeping the `?embedded=true` query param since it is rendered in an iframe inside the dialog.
- `src/components/landing/Navbar.tsx` line 12: update `GOOGLE_FORM_URL` to the plain viewform URL (no `embedded` param) since it opens in a new tab.

## Not included

No admin page or database capture of enrolments, per your answer. If you later want the list inside the site with export, that can be added as a separate step.
