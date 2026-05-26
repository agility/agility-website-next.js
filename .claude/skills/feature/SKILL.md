---
name: feature
description: Implement one or more components from a design reference (Replit, Lovable, Figma screenshot, or any URL/image). Analyzes the design, builds the React components, creates CMS models in Agility, registers everything, and optionally creates/updates the page.
user-invocable: true
---

# Feature Implementation Skill

Implement page sections from a design reference into Agility CMS + Next.js components.

## Arguments

- `$ARGUMENTS` - A design reference (URL, screenshot path, or description) and any additional context about what to build.

## Instance Configuration

```
Instance GUID: 80dc0987-be84-4405-a572-aba199832f68
Locale: en-ca
```

## Overview

The marketing team provides designs via Replit, Lovable, Figma screenshots, or other prototyping tools. This skill turns those designs into production components wired into Agility CMS.

---

## Process

### Step 1: Analyze the Design

Examine the design reference provided in `$ARGUMENTS`:

1. **If a URL**: Use Playwright (`mcp__playwright__browser_navigate`, `mcp__playwright__browser_snapshot`, `mcp__playwright__browser_take_screenshot`) to visit the page, take a screenshot, and inspect the DOM structure. Scroll through the full page to capture all sections.
2. **If an image/screenshot path**: Use the Read tool to view it.
3. **If a description**: Work from the description directly.

For each section of the page, identify:
- What component it represents (hero, cards grid, comparison table, testimonials, FAQ, CTA, etc.)
- Whether an **existing component** already handles it (check the registry below)
- What content fields are needed
- What interactivity is required (client-side state needed?)
- Color palette, typography, spacing patterns

### Step 2: Plan the Components

Create a brief plan listing each section top-to-bottom:

| # | Section | Component | Status | Notes |
|---|---------|-----------|--------|-------|
| 1 | Hero | CompareHero | NEW | Stats bar, 2 CTAs |
| 2 | Cards | CompetitorCards | NEW | 8 cards with pain points |
| 3 | FAQ | Faqs | EXISTING | Just needs content |

For each NEW component, note:
- Component name (PascalCase)
- Whether it needs a client component (interactivity)
- What CMS fields it needs
- What content models are required (component model + any linked content models)

Present this plan to the user and confirm before proceeding.

### Step 3: Check for Reusable Existing Components

Before building anything new, check `components/agility-components/index.ts` for existing components that could be reused or extended. Common reusable ones:

- **Hero** - Standard hero with heading, description, CTA
- **SplitHero** - Hero with left/right layout
- **CenteredCTAPanel** - Centered heading + description + CTA buttons (supports dark mode)
- **Faqs** - Accordion FAQ list (has `label` and `title` fields)
- **TestimonialCarousel** - Carousel of testimonials with prev/next
- **LogoListing** / **TrustedByLogos** - Logo grids
- **RightORLeftContentModule** - Content with image left or right
- **FeatureBlocks** - Grid of feature cards
- **CTABlocks** - CTA card grid
- **VideoModule** - Embedded video
- **ReviewRotator** - Review carousel
- **G2AwardsBanner** - Awards/badges display
- **CustomerResults** - Stats/results display
- **ValuePropositionCards** - Value prop card grid

If a design section closely matches an existing component, reuse it. Only build new components for genuinely new patterns.

### Step 4: Create Content Models in Agility CMS

For each NEW component, create the required models using MCP tools.

#### Content Models (for linked lists)

Use `mcp__Agility-CMS__save_content_model` for any repeating data (cards, stats, testimonials, table rows, etc.):

```
{
  id: -1,
  displayName: "Feature Card",
  referenceName: "FeatureCard",   // PascalCase, no spaces
  description: "Individual feature card for the feature grid",
  fields: [
    { type: "Text", name: "title", label: "Title", required: true },
    { type: "LongText", name: "description", label: "Description" },
    { type: "ImageAttachment", name: "icon", label: "Icon" }
  ]
}
```

#### Component Models

Use `mcp__Agility-CMS__save_component_model` for the page module itself:

```
{
  id: -1,
  displayName: "Feature Grid",
  referenceName: "FeatureGrid",
  description: "Grid of feature cards with heading",
  fields: [
    { type: "Tab", name: "contentTab", label: "Content" },
    { type: "Text", name: "heading", label: "Heading", required: true },
    { type: "LongText", name: "description", label: "Description" },
    { type: "Link", name: "primaryCTA", label: "Primary CTA" },
    { type: "Tab", name: "configTab", label: "Configuration" },
    { type: "Text", name: "anchorId", label: "Anchor ID", description: "For smooth scroll links" }
  ]
}
```

**Field type reference:**
- `Text` - Single line text
- `LongText` - Multi-line text (no HTML)
- `Html` - Rich text with HTML editor
- `Integer` / `Decimal` - Numbers
- `Boolean` - True/false toggle
- `Link` - URL field (renders as `{ href, target, text }`)
- `ImageAttachment` - Image upload (renders as `{ url, label, width, height }`)
- `Tab` - Visual separator in the CMS editor

**Linked content lists** are configured separately after the component model is created — they appear as nested content lists on the page module instance.

### Step 5: Build React Components

For each NEW component, create files in `components/agility-components/{ComponentName}/`.

#### Server Component Pattern: `{ComponentName}.tsx`

```typescript
import { UnloadedModuleProps, URLField, ImageField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"

interface IMyItem {
  title: string
  description: string
}

interface IMyComponent {
  heading: string
  description?: string
  primaryCTA?: URLField
  items: {
    referencename: string  // lowercase — this is how Agility returns it
  }
}

export const MyComponent = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields, contentID } = await getContentItem<IMyComponent>({
    contentID: module.contentid,
    languageCode,
    contentLinkDepth: 0,
  })

  // Always null-safe for linked content lists
  const lstItems = fields.items?.referencename
    ? await getContentList({
        referenceName: fields.items.referencename,
        languageCode,
        take: 50,
      })
    : null

  const items = (lstItems?.items || []) as ContentItem<IMyItem>[]

  return (
    <Container id={`${contentID}`} data-agility-component={contentID}>
      <div className="mx-auto max-w-7xl pb-14">
        {/* Component markup */}
      </div>
    </Container>
  )
}
```

#### Client Component Pattern: `{ComponentName}.client.tsx`

Only create if the component needs interactivity (state, click handlers, animations).

```typescript
"use client"

import { useState } from "react"
import clsx from "clsx"

interface Props {
  // Pass only serializable data from the server component
}

export function MyComponentClient({ ... }: Props) {
  const [state, setState] = useState(...)

  return (
    <div>
      {/* Interactive UI */}
    </div>
  )
}
```

#### Key Conventions

- **Server components by default** — only split to client when you need `useState`, `useEffect`, or event handlers
- **`Container` wrapper** — always wrap top-level in `<Container>` for consistent padding
- **`id` and `data-agility-component`** — always set on the Container for CMS preview and anchor links
- **Null-safe linked lists** — always use `fields.items?.referencename` pattern
- **Content items typed** — `ContentItem<T>` from `@agility/content-fetch`
- **URLField** for link fields: `{ href: string, target: string, text: string }`
- **ImageField** for images: `{ url: string, label: string, width: number, height: number }`
- **`LinkButton`** for CTA buttons — supports types: `primary`, `secondary`, `alternate`, `slate`
- **Tailwind only** — no CSS modules, no styled-components
- **`clsx`** for conditional classes
- **`@tabler/icons-react`** for icons

### Step 6: Register Components

Add to `components/agility-components/index.ts`:

1. Import at the top with the other imports
2. Add to the `allModules` array with a section comment if it's a group of related components

```typescript
// My Feature Components
{ name: "MyComponent", module: MyComponent },
```

The `name` must match the component model's `referenceName` in Agility CMS exactly.

### Step 7: Populate Content

Use `mcp__Agility-CMS__save_content_items` to populate the content in Agility CMS based on what's in the design reference.

For linked content lists, you'll need to:
1. Create the content items in the linked list container
2. The container reference name is auto-generated when the page module is added to a page

**Important:** Save as staging (`state: 1`) unless told otherwise.

### Step 8: Create/Update Page (if needed)

If the components need a new page or need to be added to an existing page:

1. Check if the page exists: `mcp__Agility-CMS__get_sitemap`
2. Create page: `mcp__Agility-CMS__save_page` with the correct template and module list
3. Most pages use `Main Template` with zone name `Main`

### Step 9: Verify Build

Run `npx tsc --noEmit` to check for type errors. Fix any issues.

### Step 10: Review

Provide the user with:
1. Summary of components created/reused
2. CMS editor links for each new component model
3. Preview URL if a page was created: `https://agilitycms.com/{path}?AgilityChannelID=1&lang=en-ca&agilitypreviewkey=%2b8njrinSYiOFEXvr1SdYXZ8B4P8WNLaRwQojpCY%2beeJP4U2OZlBUWyQADkWl22ipb%2bavkFT%2fkQE95I0cDRB%2f5Q%3d%3d&agilityts={YYYYMMDDHHMMSS}`
4. Any remaining manual steps (content population, image uploads, etc.)

---

## Styling Guidelines

Match the agilitycms.com website style:

**Colors (from Tailwind theme):**
- `text-primary` (#2a3846) - Main heading/body text
- `text-highlight-light` (#5800d4) - Accent purple, links
- `bg-highlight-light` - Purple button backgrounds
- `bg-secondary` (#ffc414) - Yellow accent
- `bg-background` (#e9f0f5) - Light gray-blue background
- `text-highlight` - Highlight text color

**Common Tailwind Patterns:**
- Section wrapper: `<Container className="bg-white">` or `bg-background` or `bg-[#f8f4ff]`
- Content max-width: `mx-auto max-w-7xl` (or `max-w-4xl`, `max-w-5xl` for narrower)
- Section bottom padding: `pb-14`
- Cards: `rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm`
- Card hover: `transition-all duration-200 hover:shadow-lg hover:border-primary/30`
- Labels/eyebrows: `text-xs font-bold uppercase tracking-[0.18em] text-highlight-light/70`
- Headings: `text-balance text-4xl font-extrabold text-primary` (or `text-3xl`/`text-5xl`)
- Body text: `text-gray-500` or `text-gray-600`
- Responsive grids: `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`

**Icons:** Use `@tabler/icons-react` — e.g. `IconCheck`, `IconArrowRight`, `IconInfoCircle`

---

## Agility CMS Links

- **Instance**: https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68
- **Page editor**: https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68/en-ca/pages/page-{pageID}

---

## Example Usage

```
/feature https://my-prototype.replit.app/pricing - implement the pricing page
```

```
/feature /tmp/screenshot.png - build the hero and feature cards from this design
```

```
/feature Build a "Why Switch" landing page with: hero section, pain point cards for each competitor, feature comparison table, testimonial carousel, FAQ, and bottom CTA
```
