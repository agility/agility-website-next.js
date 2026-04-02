# Comparison Page Implementation Plan

## Overview

Building a CMS comparison landing page based on the design at `https://agility-cms-clone.replit.app/compare`. The page showcases how Agility CMS stacks up against competing headless CMS platforms.

---

## Page Sections (top to bottom)

| # | Section | Component | Code | CMS | Content |
|---|---------|-----------|------|-----|---------|
| 1 | Hero with stats | **CompareHero** (NEW) | Done | Done | Done |
| 2 | Competitor cards grid | **CompetitorCards** (NEW) | Done | Done | Done (8 cards with #comparison-table links) |
| 3 | Feature comparison table | **ComparisonTable** (NEW) | Done | Done | Done (7 categories, 25 features, full tooltips, ratings) |
| 4 | Testimonial carousel | **TestimonialCarousel** (EXISTING) | Done | Done | Done (4 testimonials matching reference) |
| 5 | "Why teams switch" testimonials | **SwitchTestimonials** (NEW) | Done | Done | Done (3 testimonials) |
| 6 | FAQ accordion | **Faqs** (EXISTING) | Done | Done | Done (8 FAQs with label) |
| 7 | Bottom CTA | **CenteredCTAPanel** (EXISTING) | Done | Done | Done (2 CTAs, dark mode) |

---

## New Components Built

### 1. CompareHero
**File:** `components/agility-components/CompareHero/CompareHero.tsx`
**Agility Reference Name:** `CompareHero`

- Purple-to-white gradient background (`from-[#f8f4ff] to-white`)
- Section label (uppercase, purple)
- Heading with highlighted text portion in purple
- Description paragraph
- Two CTA buttons (primary yellow, secondary outline)
- Stats bar: 4-column grid of stat value + label

**Content Model needed:** `CompareHeroStat` (value, label)
**Component Model fields:** label, heading, highlightedText, description, primaryCTA, secondaryCTA, stats (linked list)

### 2. CompetitorCards
**File:** `components/agility-components/CompetitorCards/CompetitorCards.tsx`
**Agility Reference Name:** `CompetitorCards`

- Section heading + description
- Responsive grid (1-4 columns)
- Each card: colored avatar initial, competitor name, description, pain point pills (red badges), "See comparison" link
- Hover effect: shadow lift + border color shift (`transition-all duration-200`)

**Content Model needed:** `CompetitorCard` (title, description, painPoint1-3, avatarColor, link)
**Component Model fields:** heading, description, competitors (linked list)

### 3. ComparisonTable
**Files:**
- `components/agility-components/ComparisonTable/ComparisonTable.tsx` (server)
- `components/agility-components/ComparisonTable/ComparisonTable.client.tsx` (client)

**Agility Reference Name:** `ComparisonTable`

- Section label, heading (with highlighted portion), description
- Legend: green check (fully supported), amber dash (partial), red X (not available)
- Responsive table with horizontal scroll and sticky first column
- Category header rows (dark background)
- Feature rows with tooltip info icons (click-to-open popover)
- Agility column highlighted with light purple background
- Supports text values (for ratings like "4.5 / 5")
- Footnote area
- Anchor ID support for smooth scroll links

**Content Models needed:**
- `ComparisonTableFeature` (title, category, tooltipText, sortOrder)
- `ComparisonTablePlatform` (title)
- `ComparisonTablePlatformFeature` (platform, feature, trueFalseValue, textValue)

**Component Model fields:** label, heading, highlightedText, description, anchorId, comparisonFeatures, comparisonPlatforms, comparisonPlatformFeatures, footnote, bottomCTA

### 4. SwitchTestimonials
**File:** `components/agility-components/SwitchTestimonials/SwitchTestimonials.tsx`
**Agility Reference Name:** `SwitchTestimonials`

- Centered heading + description
- 3-column grid of testimonial cards
- Each card: italic quote, divider, person title + company
- Clean white cards with subtle border

**Content Model needed:** `SwitchTestimonial` (quote, personTitle, company)
**Component Model fields:** heading, description, testimonials (linked list)

---

## Design & UX Details (from analysis of example page)

### Color Palette
- Primary: `#2a3846` (dark slate)
- Highlight/Purple: `#5800d4`
- Secondary/Yellow: `#ffc414`
- Background: `#e9f0f5`
- Hero gradient: `#f8f4ff` → white
- CTA section: deep purple `rgb(72, 0, 173)`

### Interaction Patterns
- **No scroll-triggered entrance animations** — the example keeps it simple
- **Card hover**: `shadow-sm` → `shadow-lg` + border color shift, `transition-all duration-200`
- **Smooth scroll**: anchor links (`#comparison-table`) from hero and competitor cards
- **FAQ accordion**: standard expand/collapse with `aria-expanded`
- **Testimonial carousel**: prev/next buttons + dot navigation, backdrop blur glass buttons
- **Comparison table tooltips**: click-to-toggle info popovers

### Typography
- Font: Mulish (sans-serif)
- Heading: bold/extrabold, tight tracking
- Body: regular weight, relaxed line-height
- Labels: uppercase, widest tracking, small size

---

---

## Design Alignment with Reference (agility-cms-clone.replit.app/compare)

### Completed

1. **ComparisonTable collapsible categories** — Category header rows are now clickable to expand/collapse their features, matching the reference design.
2. **ComparisonTable data** — Updated to match reference exactly:
   - Added tooltips to nearly all features (detailed, source-backed)
   - Added 2 extra features: "Headless + visual page management", "Built-in CDN"
   - Added "Independent Review Ratings" category with G2 and Gartner text values
   - Updated all cell values to match reference (many differences from initial data)
   - Expanded footnote to 3 paragraphs
3. **Competitor card links** — All 8 cards now link to `#comparison-table`
4. **CompareHero CTAs** — Primary → `/contact-us/get-a-demo`, Secondary → `#comparison-table`
5. **CenteredCTAPanel** — Added both CTA buttons ("Book a Demo", "Get the free playbook"), updated description
6. **Faqs label** — Added "Frequently asked questions" eyebrow label
7. **Testimonial Carousel** — All 4 quotes updated to match reference exactly
8. **Page module order** — Fixed to match reference: Hero → Cards → Table → Carousel → Switch → FAQs → CTA
9. **Removed debug console.log** from CompareHero

### Remaining Design Work

- [ ] Visual polish pass: compare rendered page side-by-side with reference for pixel-level differences
- [ ] Test collapsible categories on mobile
- [ ] Verify CTA link field format renders correctly (saved as JSON strings due to MCP limitation)

---

## Existing Components Reused

### TestimonialCarousel
Already registered. Uses a content list of testimonials with quote, personName, personRole, company. Has carousel with prev/next buttons.

### Faqs
Already registered. Uses a content list of FAQ items (question/answer). Renders as disclosure/accordion.

### CenteredCTAPanel
Already registered. Centered heading + description + CTA buttons on colored background. Supports dark mode (purple bg).

---

## Agility CMS Setup Required

### New Content Models
1. **CompareHeroStat** — `value` (Text), `label` (Text)
2. **CompetitorCard** — `title` (Text), `description` (Text), `painPoint1` (Text), `painPoint2` (Text), `painPoint3` (Text), `avatarColor` (Text), `link` (Link)
3. **ComparisonTableFeature** — `title` (Text, required), `category` (Text), `tooltipText` (Text), `sortOrder` (Text)
4. **ComparisonTablePlatform** — `title` (Text, required)
5. **ComparisonTablePlatformFeature** — `platform` (Text), `feature` (Text), `trueFalseValue` (Boolean), `textValue` (Text), `platformName` (Text), `featureName` (Text)
6. **SwitchTestimonial** — `quote` (Text), `personTitle` (Text), `company` (Text)

### New Component Models
1. **CompareHero** — label, heading, highlightedText, description, primaryCTA, secondaryCTA, stats (linked list → CompareHeroStat)
2. **CompetitorCards** — heading, description, competitors (linked list → CompetitorCard)
3. **ComparisonTable** — label, heading, highlightedText, description, anchorId, comparisonFeatures (linked list → ComparisonTableFeature), comparisonPlatforms (linked list → ComparisonTablePlatform), comparisonPlatformFeatures (linked list → ComparisonTablePlatformFeature), footnote, bottomCTA
4. **SwitchTestimonials** — heading, description, testimonials (linked list → SwitchTestimonial)

### Test Page
- Path: `/compare`
- Template: Main Template
- Modules (in order):
  1. CompareHero
  2. CompetitorCards
  3. ComparisonTable
  4. TestimonialCarousel (existing)
  5. SwitchTestimonials
  6. Faqs (existing)
  7. CenteredCTAPanel (existing)

---

## Content to Populate

### Stats (4 items)
- 500+ / Teams that switched
- <30 days / Avg. onboarding time
- 80% / Lower content ops cost
- 4.6 / 5 / G2 rating (2026)

### Competitors (8 cards)
Contentful, Contentstack, Sanity, WordPress/WPEngine, Sitecore, Drupal, Kontent.ai, Adobe Experience Manager

### Comparison Table Features (22+ features in 5 categories)
Categories: Content Management, Developer Experience, Enterprise & Security, Time to Value & Cost, Support & Customer Success, Independent Review Ratings

### Platforms in Table (7)
Agility CMS, Contentful, Contentstack, Sanity, WordPress, Sitecore (+ optionally Drupal, Kontent.ai, AEM)

### Switch Testimonials (3)
Oxford Properties, Cineplex, Enterprise Financial Services

### FAQ Items (8)
Enterprise evaluation, multi-site management, phone/live chat support, onboarding time, implementation partners, transparent pricing, SOC 2 certification, SSO/SAML
