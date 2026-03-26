# Home Page Redesign - New Components Plan

## Overview

This document outlines the plan for implementing the new home page design ([Replit preview](https://agility-cms-clone.replit.app/)). We are **only creating new components** — no modifications to existing components, no header changes, no footer changes. This ensures zero risk to the rest of the site.

**Summary:** 8 new reusable Agility CMS components to build.

---

## New Components

### 1. `SplitHero`

A two-column hero with text on the left and a large image on the right.

**Design:**
- Left side: large heading with accent/italic first line ("Go faster"), subheading paragraph, two CTA buttons (filled + outlined)
- Right side: composite illustration (platform UI screenshot with people photos overlaid)
- Subtle purple gradient wash on background

**Agility CMS Component Model — `SplitHero`:**

| Field | Type | Example |
|---|---|---|
| `highlightedHeading` | Text | "Publish more" |
| `highlightedHeading2` | Text | "Collaborate" |
| `highlightedHeading3` | Text | "Code better" |
| `highlightedHeading4` | Text | "Go faster" |
| `heading` | Text | "with the best enterprise CMS" |
| `description` | Text | "We streamline content operations for marketers..." |
| `primaryCTA` | URL | "Try for Free" → /free |
| `secondaryCTA` | URL | "Request a Demo" → /contact-us/get-a-demo |
| `image` | Image | Composite platform illustration |

**Implementation:**
- Server component: `SplitHero.tsx` + Client component: `SplitHero.client.tsx`
- Client component handles cycling animation through 4 highlighted headings (slide-up + fade)
- Tailwind: two-column flexbox (`lg:flex-row`), responsive stacking on mobile

---

### 2. `TrustedByLogos`

A simple logo bar with a label and a row of linked brand logos.

**Design:**
- Uppercase label text: "TRUSTED BY ENTERPRISE BRANDS"
- Single horizontal row of 5 brand logos, each linking to a case study
- Clean, minimal spacing

**Agility CMS Component Model — `TrustedByLogos`:**

| Field | Type | Example |
|---|---|---|
| `heading` | Text | "Trusted by enterprise brands" |
| `logos` | Content List (ref to new `TrustedByLogo` list) | — |

**`TrustedByLogo` content definition (new):**

| Field | Type | Example |
|---|---|---|
| `logo` | Image | Scotiabank logo |
| `name` | Text | "Scotiabank" |
| `link` | URL (optional) | Link to case study |

**Implementation:**
- Server component: `TrustedByLogos.tsx`
- Flexbox row with `justify-center` and `gap-10 lg:gap-16`, grayscale + opacity-70 (full color on hover)
- Logo size: `h-10 lg:h-12`
- Responsive: wraps on mobile

---

### 3. `CustomerResults`

Stat cards showcasing measurable customer outcomes.

**Design:**
- Heading: "Results that speak for themselves"
- 4 cards in a horizontal row
- Each card: brand logo (top), large stat value in purple (middle), label text (bottom)
- Light card backgrounds with subtle border/rounded corners

**Agility CMS Component Model — `CustomerResults`:**

| Field | Type | Example |
|---|---|---|
| `heading` | Text | "Results that speak for themselves" |
| `results` | Content List (ref to new `CustomerResult` list) | — |

**`CustomerResult` content definition (new):**

| Field | Type | Example |
|---|---|---|
| `logo` | Image | Cineplex logo |
| `statValue` | Text | "+15%" |
| `statLabel` | Text | "Ad Revenue" |
| `link` | URL (optional) | Link to case study |

**Implementation:**
- Server component: `CustomerResults.tsx`
- CSS Grid: `grid-cols-4` on desktop, `grid-cols-2` on tablet, `grid-cols-1` on mobile

---

### 4. `ValuePropositionCards`

A 4-column grid of feature/value cards with icons.

**Design:**
- Centered heading: "The Composable CMS that Unlocks Enterprise Growth"
- Centered subtitle paragraph
- 4 cards, each with: purple icon (top-left), bold title, description paragraph
- Light gray card background, rounded corners

**Agility CMS Component Model — `ValuePropositionCards`:**

| Field | Type | Example |
|---|---|---|
| `heading` | Text | "The Composable CMS that Unlocks Enterprise Growth" |
| `description` | Text | "Create scalable and secure experiences..." |
| `cards` | Content List (ref to new `ValuePropositionCard` list) | — |

**`ValuePropositionCard` content definition (new):**

| Field | Type | Example |
|---|---|---|
| `iconName` | Dropdown List | "stack-2" (choices: stack-2, code, shield-check, world, rocket, users, bolt, puzzle) |
| `title` | Text | "Smoother Content Operations" |
| `description` | Text | "Streamline content operations with team collaboration..." |
| `link` | URL (optional) | Link to feature page |

**Implementation:**
- Server component: `ValuePropositionCards.tsx`
- Uses Tabler Icons React (`@tabler/icons-react`) — icon map renders the selected icon from the dropdown
- CSS Grid: `grid-cols-4` on desktop, `grid-cols-2` on tablet, stacked on mobile

---

### 5. `G2AwardsBanner`

A showcase of G2 award badges.

**Design:**
- Bold centered heading: "Agility CMS is a Multi-G2 2026 Award Winner"
- Single large rounded card containing a composite image of all G2 badges
- Two rows of badges within the image (5 top, 5 bottom)

**Agility CMS Component Model — `G2AwardsBanner`:**

| Field | Type | Example |
|---|---|---|
| `heading` | Text | "Agility CMS is a Multi-G2 2026 Award Winner" |
| `badgesImage` | Image | Composite image of all G2 badges |

**Implementation:**
- Server component: `G2AwardsBanner.tsx`
- Simple centered layout with max-width constraint on the image
- Rounded card container with subtle shadow

---

### 6. `HeadlessBenefits`

A left/right split panel with an illustration and a checklist.

**Design:**
- Left side: stylized illustration showing JSON/API flow (content block → arrow → API block)
- Right side: bold heading ("Faster time to market (and revenue)"), 4 bullet points with checkmark icons, CTA link with arrow
- Light/white background

**Agility CMS Component Model — `HeadlessBenefits`:**

| Field | Type | Example |
|---|---|---|
| `heading` | Text | "Faster time to market (and revenue)" |
| `benefits` | Content List (ref to new `HeadlessBenefit` list) | — |
| `ctaButton` | URL | "Learn more about Headless" → /product/headless-cms |
| `image` | Image | JSON/API illustration |

**`HeadlessBenefit` content definition (new):**

| Field | Type | Example |
|---|---|---|
| `text` | Text | "Drag-and-drop website building to empower marketers." |

**Implementation:**
- Server component: `HeadlessBenefits.tsx`
- Two-column grid (`lg:grid-cols-2`)
- Checkmark icons rendered via inline SVG or a shared icon component
- Responsive: stacks vertically on mobile (image on top)

---

### 7. `TestimonialCarousel`

A full-width testimonial slider with large quotes and brand navigation.

**Design:**
- Section label ("CUSTOMER STORIES") + bold heading ("A Headless CMS pioneer since 2003")
- Full-width lavender/purple background card
- Large swipeable quote cards with:
  - Large quote text in dark bold font
  - Avatar initial circle (derived from name/company)
  - Person name, role, company
  - Pagination indicator ("01 / 04")
- Previous/Next arrow buttons + dot indicators
- Bottom bar: brand name chips (clickable) + "Read customer stories" CTA with arrow

**Agility CMS Component Model — `TestimonialCarousel`:**

| Field | Type | Example |
|---|---|---|
| `sectionLabel` | Text | "Customer stories" |
| `heading` | Text | "A Headless CMS pioneer since 2003" |
| `testimonials` | Content List (ref to new `CarouselTestimonial` list) | — |
| `ctaButton` | URL | "Read customer stories" → /resources/case-studies |

**`CarouselTestimonial` content definition (new):**

| Field | Type | Example |
|---|---|---|
| `quote` | Long Text | "With Agility we can decouple content from code..." |
| `personName` | Text | "Vinícius Philot" |
| `personRole` | Text | "Frontend Tech Lead" |
| `company` | Text | "Cineplex" |
| `companyLink` | URL (optional) | Link to case study |

**Implementation:**
- Server component: `TestimonialCarousel.tsx` (data fetching + layout)
- Client component: `TestimonialCarousel.client.tsx` (carousel interactivity)
- Use CSS scroll-snap for the swipe behavior + minimal JS for arrows/dots/pagination counter
- Avatar initials derived from first character(s) of `personName` or `company`

---

### 8. `DualCTABanner`

A centered call-to-action section with two buttons.

**Design:**
- Centered bold heading: "We're ready when you are."
- Subtitle paragraph
- Two buttons: "Get a Demo" (yellow/gold filled) + "Contact Sales" (outlined)
- Subtle purple gradient background

**Agility CMS Component Model — `DualCTABanner`:**

| Field | Type | Example |
|---|---|---|
| `heading` | Text | "We're ready when you are." |
| `description` | Text | "Get started today with a personalized demo..." |
| `primaryCTA` | URL | "Get a Demo" → /contact-us/get-a-demo |
| `secondaryCTA` | URL | "Contact Sales" → /contact-agility-cms |

**Implementation:**
- Server component: `DualCTABanner.tsx`
- Centered flexbox layout, max-width constraint
- Primary button: gold/yellow background; Secondary button: outlined/bordered

---

## Summary

| # | Component | Reference Name | Content Definitions Needed | Effort |
|---|-----------|---------------|---------------------------|--------|
| 1 | Split Hero | `SplitHero` | — | Low |
| 2 | Trusted By Logos | `TrustedByLogos` | `TrustedByLogo` | Low |
| 3 | Customer Results | `CustomerResults` | `CustomerResult` | Medium |
| 4 | Value Proposition Cards | `ValuePropositionCards` | `ValuePropositionCard` | Medium |
| 5 | G2 Awards Banner | `G2AwardsBanner` | — | Low |
| 6 | Headless Benefits | `HeadlessBenefits` | `HeadlessBenefit` | Medium |
| 7 | Testimonial Carousel | `TestimonialCarousel` | `CarouselTestimonial` | High |
| 8 | Dual CTA Banner | `DualCTABanner` | — | Low |

**Total new component models:** 8
**Total new content definitions:** 4

---

## Agility CMS Setup Checklist

- [x] Create content definition: `TrustedByLogo` (logo, name, link)
- [x] Create content definition: `CustomerResult` (title, logo, statValue, statLabel, link)
- [x] Create content definition: `ValuePropositionCard` (title, iconName dropdown, description, link)
- [x] Create content definition: `HeadlessBenefit` (text)
- [x] Create content definition: `CarouselTestimonial` (title, quote, personName, personRole, company, companyLink)
- [x] Create component model: `SplitHero` (with 4 highlighted heading fields for cycling animation)
- [x] Create component model: `TrustedByLogos`
- [x] Create component model: `CustomerResults`
- [x] Create component model: `ValuePropositionCards`
- [x] Create component model: `G2AwardsBanner`
- [x] Create component model: `HeadlessBenefits`
- [x] Create component model: `TestimonialCarousel`
- [x] Create component model: `DualCTABanner`
- [x] Create content lists and populate with content
- [x] Add all 8 components to the home page in the CMS page editor
- [x] Upload logos (Cineplex, Oxford, Mitsubishi Electric, CPA Ontario) to `home-redesign/` media folder
- [x] Upload G2 badges composite image
- [x] Attach logos to TrustedByLogos and CustomerResults items
- [x] Attach G2 badges image to G2AwardsBanner

**Test page:** [/home-redesign-test](http://localhost:3000/home-redesign-test) (Page ID 548, locale `en-ca`)

---

## Developer Checklist

- [x] Implement `SplitHero.tsx` + `SplitHero.client.tsx` + register in `index.ts`
- [x] Implement `TrustedByLogos.tsx` + register in `index.ts`
- [x] Implement `CustomerResults.tsx` + register in `index.ts`
- [x] Implement `ValuePropositionCards.tsx` + register in `index.ts`
- [x] Implement `G2AwardsBanner.tsx` + register in `index.ts`
- [x] Implement `HeadlessBenefits.tsx` + register in `index.ts`
- [x] Implement `TestimonialCarousel.tsx` + `TestimonialCarousel.client.tsx` + `testimonial-carousel.css` + register in `index.ts`
- [x] Implement `DualCTABanner.tsx` + register in `index.ts`
- [x] Add null-safe image handling in `CustomerResults`, `ValuePropositionCards`, `TrustedByLogos`
- [x] Switch `ValuePropositionCards` from CMS image icons to **Tabler Icons** with dropdown selector
- [x] Set icon values on all 4 ValuePropositionCard items (stack-2, code, shield-check, world)
- [x] Fix `TrustedByLogos` layout — centered with larger gaps, bigger logos (`h-10 lg:h-12`), higher opacity (`0.7`)
- [x] Fix `CustomerResults` logo sizing — bumped to `h-10` from `h-8`
- [x] Add subtle purple gradient background wash to `SplitHero` (matches Replit reference's lavender tint)
- [x] Add light lavender background gradient to `HeadlessBenefits` section
- [x] Restyle `TestimonialCarousel` to match Replit reference:
  - Header ("CUSTOMER STORIES" + heading) moved from deep purple/centered to white bg/left-aligned
  - Carousel cards changed from deep purple + white text to light lavender bg + white cards + dark text
  - Avatar initials changed from gold circles to purple circles (`bg-purple-200`)
  - Brand chips changed from filled purple to outlined style with purple highlight on active
  - Dots/arrows updated to match light lavender theme
- [x] Restyle `DualCTABanner` to match Replit reference:
  - Added decorative purple gradient wash + circular shapes in background
  - Heading changed to italic
  - Replaced LinkButton with custom Link elements to avoid default purple ring styles
  - Primary button: yellow/gold filled, no border (`bg-secondary`)
  - Secondary button: white with dark border (`border-gray-800`)
  - Added bottom margin (`mb-8`)

---

## Key Decisions Made

1. **Testimonial Carousel library:** Using **Embla Carousel** for polished touch/swipe, navigation arrows, dot indicators, and brand chip navigation.

2. **Icon approach for Value Proposition Cards:** Uses **Tabler Icons React** (`@tabler/icons-react`) with a **CMS dropdown list** of 8 icon choices (stack-2, code, shield-check, world, rocket, users, bolt, puzzle). The component maps dropdown values to Tabler icon components. This avoids image uploads and gives editors a curated set of icons.

3. **Cycling headings on SplitHero:** Using 4 separate CMS text fields (`highlightedHeading` through `highlightedHeading4`) rather than pipe-delimited values. Client component animates with slide-up + fade transition (250ms, 3s interval).

4. **Logo rendering:** TrustedByLogos uses centered layout with `gap-10 lg:gap-16` (not `justify-between`) so logos look balanced regardless of count. Grayscale + opacity-70 on default, full color on hover. CustomerResults logos at `h-10` for visibility.

---

## Current Screenshot

![Home Redesign Test Page](../screenshots/home-redesign-test-full.png)

---

## Remaining Items

- [x] ~~Upload HeadlessBenefits illustration (JSON/API flow image)~~ — Done
- [x] ~~Upload G2 badges composite image to G2AwardsBanner~~ — Done
- [x] ~~Visual QA: Restyle SplitHero, HeadlessBenefits, TestimonialCarousel, DualCTABanner to match Replit reference~~ — Done
- [ ] Add Scotiabank logo to TrustedByLogos (not included in provided images)
- [ ] Set Link fields in CMS UI (MCP can't save Link field types):
  - SplitHero: change primary CTA text "Free Trial" → "Try for Free"
  - HeadlessBenefits: add CTA "Learn more about Headless" → `/product/headless-cms`
  - TestimonialCarousel: add CTA "Read customer stories" → `/resources/case-studies`
- [ ] Review/replace placeholder testimonial quotes for Scotiabank, Mitsubishi Electric, and Compass (only Cineplex quote is from reference)
