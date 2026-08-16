# Product Requirements Document
## Photography Portfolio & Booking Website

**Version:** 1.0
**Date:** August 14, 2026
**Prepared for:** [Photographer/Business Name]

---

## 1. Overview

A single-page (or lightly multi-page) photography portfolio website that showcases the photographer's work and lets visitors request a booking. No visitor account, no payment processing, no backend database required for v1 — booking requests reach the photographer directly via a pre-filled SMS text (from the visitor's own phone) or email.

**Core principle:** Keep it fast, visually striking, mobile-first, and zero/low-cost to run (static site, no server needed for v1).

---

## 2. Goals

| Goal | Description |
|---|---|
| Showcase work | Present photography in a gallery that feels premium and lets images breathe |
| Generate leads | Make it effortless for a visitor to reach out about rates/availability |
| Zero-friction booking | Booking button → visitor's own messaging app opens with a pre-filled text to the photographer's number — no server, no SMS API cost |
| Brand identity | Distinct visual identity built around the supplied gradient color palette, not a generic template look |
| Mobile-first | Majority of traffic will be mobile (Instagram/WhatsApp referrals) |

---

## 3. Target Users

- **Primary:** Prospective clients browsing on mobile, discovering the site via Instagram/WhatsApp/word of mouth, who want to quickly see work and inquire.
- **Secondary:** Repeat/referred clients checking rates or specific shoot categories (e.g., "wedding," "portrait").

---

## 4. Visual & Brand Direction

Based on the two reference images supplied:

- **Palette A (dark/moody):** Deep charcoal-black base with glowing gradient blooms of magenta/pink, warm gold, and violet-lavender. Grainy/film-noise texture.
- **Palette B (warm/vivid):** Sunset pink fading to peach/orange, undercut by a deep blue-violet pool at the base. Same grainy texture.

**Recommended direction:** Use Palette A (dark charcoal base) as the primary site background/theme — it lets photography pop, feels premium/editorial, and works beautifully as a hero section backdrop. Palette B's warm gradient can be used as an accent (buttons, hover states, section dividers, the booking CTA) for contrast and energy.

Design language:
- Generous negative space, large full-bleed images
- Grain/noise texture overlay on gradient sections for the same tactile look as the references
- Minimal, elegant serif or high-contrast sans-serif type for headings; clean sans for body
- Smooth scroll, subtle fade-in animations on images
- Gradient used sparingly and intentionally (hero background, CTA button, section transitions) — not overused

*(You mentioned you'll provide exact color codes — this PRD assumes the direction above until hex values are supplied.)*

---

## 5. Site Structure (Pages/Sections)

Recommend a single scrollable landing page with anchor navigation (fastest to build, best for mobile, easiest to maintain) rather than multiple separate pages:

1. **Hero** — Full-screen gradient/photo background, photographer name/brand, tagline, primary CTA ("Book a Session")
2. **About** — Short bio, photo of the photographer, style philosophy
3. **Portfolio/Gallery** — Filterable by category (e.g., Portraits, Weddings, Events, Products, Nature) — masonry or grid layout, lightbox on click
4. **Services & Rates** — Package cards (e.g., Basic / Standard / Premium) with what's included; pricing can be exact figures or "starting at ₹X"
5. **Testimonials** *(optional, if available)*
6. **Booking / Contact section** — The core conversion point (see Section 6)
7. **Footer** — Social links (Instagram, etc.), copyright, alternate contact info

---

## 6. Booking Flow — Core Feature

### How it works (no backend/server/API cost)
1. Visitor fills a short form: **Name, Phone Number, Preferred Date, Shoot Type (dropdown), Message (optional)**
2. Visitor clicks **"Send Booking Request"**
3. This triggers one of two things, or both as options:
   - **SMS option:** Opens the visitor's own phone's default messaging app via an `sms:` link, addressed to the photographer's number, with the form details pre-filled as the message body. Visitor just taps "Send" — the photographer receives a real text containing the visitor's name, number, and request.
   - **Email option (fallback/alternative):** A `mailto:` link opens the visitor's email app with a pre-filled subject/body addressed to the photographer's email.
   - **Call Now button:** A simple `tel:` link for visitors who'd rather just call directly.

### Why this approach
- Requires no paid SMS gateway (e.g., Twilio), no server, no database — purely static/client-side.
- Photographer receives genuine texts/calls/emails directly to their own phone, with the client's number visible, so they can call back.
- Trade-off: this only works reliably on **mobile devices** (desktop visitors won't have a native SMS app — the email/call fallback covers this case). This should be explained to the client as an accepted limitation.

### Future upgrade path (v2, if desired later)
If the photographer wants to *guarantee* a text is sent even from desktop, that requires a lightweight backend (e.g., a serverless function calling Twilio's SMS API) and a small recurring cost (~$0.0079/text + phone number rental). Flagged as optional Phase 2, not required for launch.

---

## 7. Functional Requirements

| # | Requirement |
|---|---|
| 1 | Responsive design — mobile, tablet, desktop |
| 2 | Image gallery with lightbox (click to enlarge, swipe/arrow navigation) |
| 3 | Gallery filtering by category |
| 4 | Booking form with client-side validation (required fields, phone format check) |
| 5 | SMS deep-link (`sms:`), mailto deep-link, and tel deep-link generation from form data |
| 6 | Services/rates section, easily editable |
| 7 | Social media links (Instagram, WhatsApp, etc.) |
| 8 | Fast image loading (lazy-load, compressed/optimized images) |
| 9 | SEO basics — page title, meta description, alt text on images |
| 10 | Analytics-ready (optional Google Analytics/Plausible snippet slot) |

---

## 8. Non-Functional Requirements

- **Performance:** Page load under ~2.5s on 4G; images lazy-loaded and compressed (WebP)
- **Hosting:** Static site — deployable free/cheap on Netlify, Vercel, GitHub Pages, or similar
- **Accessibility:** Reasonable color contrast despite dark theme, alt text on all images, keyboard-navigable form
- **Browser support:** Latest Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome specifically tested (mobile-first)
- **Maintainability:** Gallery images and rates should be easy to update without touching code (e.g., organized in a clearly labeled folder/config, or simple CMS in a later phase)

---

## 9. Recommended Tech Stack

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | HTML/CSS/JS (or React if you want future interactivity) | No backend needed for v1; keeps hosting free |
| Styling | Custom CSS with the gradient/grain design system | Matches the distinctive visual direction, avoids generic template look |
| Hosting | Netlify or Vercel (free tier) | Free, fast, easy custom domain setup |
| Forms | Client-side only (sms:/mailto:/tel: links) | Zero cost, no backend |
| Images | Optimized WebP, lazy-loaded | Fast load on mobile |
| Domain | Custom domain (e.g., yourname.com) | Optional but recommended for credibility |

---

## 10. Information Still Needed From You

To move from this PRD into build:

1. **Business/photographer name** and tagline
2. **Booking phone number** (the one that should receive texts) and email
3. **Exact color hex codes** from your reference images, if you have specific ones in mind, or confirmation to extract them directly from the two images you shared
4. **Photos** for the gallery (organized by category if possible) or confirmation to use placeholders for now
5. **Services & pricing** — package names, what's included, prices (or "contact for quote")
6. **Bio/About text** and a headshot, if desired
7. **Social media handles** to link
8. **Logo**, if you have one (or should one be designed as part of this?)

---

## 11. Implementation Plan

### Phase 1 — Foundation (Day 1–2)
- Set up project structure, choose hosting, register domain (if applicable)
- Build design system: color variables, typography, spacing, grain-texture background component
- Build responsive layout skeleton (hero, nav, sections, footer)

### Phase 2 — Core Pages (Day 2–4)
- Hero section with gradient background + headline
- About section
- Gallery component with category filtering + lightbox
- Services/rates cards

### Phase 3 — Booking Flow (Day 4–5)
- Build booking form UI
- Wire up `sms:`, `mailto:`, and `tel:` link generation from form fields
- Form validation (required fields, phone number format)
- Test on real iOS and Android devices (SMS deep-links behave slightly differently per platform — this needs real-device testing, not just browser preview)

### Phase 4 — Content & Polish (Day 5–6)
- Load in real photos, bio, rates, social links
- Fine-tune animations, transitions, image loading performance
- Cross-browser and cross-device QA (iPhone Safari, Android Chrome, desktop)
- SEO basics: meta tags, alt text, favicon

### Phase 5 — Launch (Day 6–7)
- Deploy to hosting (Netlify/Vercel)
- Connect custom domain + SSL
- Final test of booking flow end-to-end (submit a real test booking to confirm the text/email arrives correctly)
- Optional: connect analytics

### Phase 6 — Optional Future Upgrades
- True server-side SMS (Twilio) so desktop visitors can also trigger a real text automatically
- CMS integration (e.g., simple admin panel) so photos/rates can be updated without code
- Client testimonials with photo uploads
- Instagram feed embed
- Blog/journal section for SEO

---

## 12. Success Metrics (Optional, for later)

- Number of booking-form submissions per month
- Gallery engagement (images viewed per session)
- Mobile vs desktop traffic split
- Bounce rate on hero section

---

## 13. Open Questions

- Do you want the site as a single scrolling page or separate pages (Home / Portfolio / Rates / Contact)?
- Should pricing be publicly listed, or "contact for quote"?
- Any specific photographers' or studios' websites you like the feel of, for reference?
