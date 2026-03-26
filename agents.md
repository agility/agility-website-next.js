# Agents.md - AI Agent Context for Agility CMS Next.js Website

> This document provides AI agents and LLMs with comprehensive context about this codebase to enable effective assistance with development tasks.

## Project Overview

**Project:** Agility CMS Marketing Website
**Framework:** Next.js 14.2.35 with App Router
**Language:** TypeScript 5.5.3
**Styling:** Tailwind CSS 4.x
**CMS:** Agility CMS (Headless)
**Hosting:** Netlify

This is the official marketing website for Agility CMS, built as a headless Next.js application that fetches all content from Agility CMS via REST API and GraphQL.

---

## Architecture Summary

### Core Concepts

1. **Headless CMS Architecture** - All content (pages, posts, resources) is managed in Agility CMS and fetched at build/request time
2. **Dynamic Page Routing** - The `app/[...slug]/page.tsx` catch-all route handles all CMS-managed pages
3. **Module-Based Composition** - Pages are composed of dynamic modules (components) defined in the CMS
4. **ISR (Incremental Static Regeneration)** - Pages are statically generated and revalidated via webhooks

### Data Flow

```
User Request → Middleware (redirects, preview) → [..slug]/page.tsx
    → getAgilityPage() → Agility CMS API → Page + Modules Data
    → Template Component → Module Components → Rendered HTML
```

---

## Directory Structure

```
├── app/                           # Next.js App Router
│   ├── [...slug]/page.tsx         # Main dynamic page handler
│   ├── api/                       # API routes
│   │   ├── preview/               # Preview mode endpoints
│   │   ├── revalidate/            # Cache invalidation webhook
│   │   └── llms-txt/              # LLM context endpoint
│   ├── layout.tsx                 # Root layout (header/footer/providers)
│   └── sitemap.tsx                # Dynamic sitemap generation
│
├── components/
│   ├── agility-components/        # CMS Module Components (60+)
│   ├── agility-layouts/           # Page Templates
│   ├── common/                    # Shared components (header, footer)
│   ├── search/                    # Algolia search components
│   └── micro/                     # Small utility components
│
├── lib/
│   ├── cms/                       # CMS integration layer
│   ├── cms-content/               # Content-specific utilities
│   ├── types/                     # TypeScript interfaces
│   └── utils/                     # General utilities
│
├── styles/                        # Tailwind CSS
├── data/                          # Cached redirect data
└── netlify/functions/             # Serverless functions
```

---

## Key Files Reference

### Core Application

| File | Purpose |
|------|---------|
| `app/[...slug]/page.tsx` | Main page rendering - fetches and renders all CMS pages |
| `app/layout.tsx` | Root layout with header, footer, analytics providers |
| `middleware.ts` | Request routing, redirects, preview mode handling |
| `lib/cms/getAgilityPage.ts` | Primary function to fetch page data from Agility |
| `lib/cms/getAgilitySDK.ts` | Agility SDK initialization |
| `lib/cms/getAgilityGraphQLClient.ts` | Apollo GraphQL client setup |

### Component System

| File | Purpose |
|------|---------|
| `components/agility-components/index.ts` | Module registry - maps CMS module names to React components |
| `components/agility-layouts/index.ts` | Template registry - maps CMS templates to layout components |
| `components/common/header/SiteHeader.tsx` | Main navigation header |
| `components/common/footer/SiteFooter.tsx` | Site footer |

### Content Fetching

| File | Purpose |
|------|---------|
| `lib/cms/getContentList.ts` | Fetch content lists with filtering/pagination |
| `lib/cms/getContentItem.ts` | Fetch single content items |
| `lib/cms-content/getHeaderContent.ts` | Build navigation structure |
| `lib/cms-content/getPostListing.ts` | Get blog posts with filters |
| `lib/cms-content/getResourceListing.ts` | Get resources with filters |

---

## Content Types & Data Models

### Primary Content Types

Located in `lib/types/`:

| Type | File | Description |
|------|------|-------------|
| `IPost` | `IPost.ts` | Blog articles with author, categories, tags |
| `IResource` | `IResource.ts` | Guides, webinars, whitepapers (can be gated) |
| `ICaseStudy` | `ICaseStudy.ts` | Customer success stories |
| `IEvent` | `IEvent.ts` | Webinars, conferences |
| `IPartner` | `IPartner.ts` | Partner profiles |
| `IAuthor` | `IAuthor.ts` | Content authors |
| `ICategory` | `ICategory.ts` | Content categories |

### Common Field Types

```typescript
// Image from Agility
interface ImageField {
  url: string
  label: string
  width: number
  height: number
}

// Link from Agility
interface URLField {
  href: string
  target: string
  text: string
}

// Content reference
interface ContentItem<T> {
  contentID: number
  fields: T
}
```

---

## Common Patterns

### 1. Fetching Content in Server Components

```typescript
// Pattern: Async server component with content fetching
const MyComponent = async ({ module, globalData }: ModuleProps) => {
  const { locale } = useAgilityContext()

  const items = await getContentList({
    referenceName: "blogposts",
    languageCode: locale,
    filters: [
      { fieldName: "fields.categoryID", operand: "eq", value: "123" }
    ],
    take: 10,
    skip: 0
  })

  return <div>{items.map(item => ...)}</div>
}
```

### 2. Adding a New Module Component

1. Create component in `components/agility-components/MyModule.tsx`
2. Register in `components/agility-components/index.ts`:
   ```typescript
   import MyModule from "./MyModule"

   const allModules = [
     // ... existing modules
     { name: "MyModule", module: MyModule }
   ]
   ```
3. Create matching module in Agility CMS with same name

### 3. Client Components (Interactive)

```typescript
"use client"
import { useState } from "react"

const InteractiveComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  // Client-side interactivity
}
```

### 4. Image Optimization

```typescript
// Use AgilityPic for optimized images
import AgilityPic from "@/components/common/AgilityPic"

<AgilityPic
  image={imageField}
  className="w-full h-auto"
  fallbackWidth={800}
/>
```

---

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/preview` | GET | Enable preview mode with Agility preview key |
| `/api/preview/exit` | GET | Exit preview mode |
| `/api/revalidate` | POST | Webhook endpoint for cache invalidation from Agility |
| `/api/dynamic-redirect` | GET | Redirect ContentID-based URLs to actual paths |
| `/api/llms-txt` | GET | Serve LLM context content |

---

## Caching Strategy

### ISR Configuration

- Default cache duration: `3600 seconds` (1 hour)
- Configured via `AGILITY_FETCH_CACHE_DURATION` env var
- Cache tags used for granular invalidation:
  - `agility-content-{referenceName}-{locale}`
  - `agility-page-{pageID}-{locale}`
  - `agility-sitemap-{locale}`

### Revalidation Flow

1. Content published in Agility CMS
2. Webhook sent to `/api/revalidate`
3. `revalidateTag()` called for affected content
4. Next request generates fresh content

---

## Third-Party Integrations

| Service | Purpose | Key Files |
|---------|---------|-----------|
| **Algolia** | Site search | `components/search/Search.tsx` |
| **PostHog** | Analytics | `app/providers.tsx` |
| **Google Tag Manager** | Tracking | `app/layout.tsx` |
| **HubSpot** | Forms/CRM | `components/common/HubspotTracker.tsx` |
| **Typeform** | Surveys | Module components |
| **Calendly** | Scheduling | `CalendlyScheduler` component |

---

## Environment Variables

```bash
# Agility CMS (Required)
AGILITY_GUID=                     # Tenant ID
AGILITY_API_FETCH_KEY=            # Live API key
AGILITY_API_PREVIEW_KEY=          # Preview API key
AGILITY_SECURITY_KEY=             # Security key for webhooks
AGILITY_LOCALES=en-ca             # Supported locales
AGILITY_SITEMAP=website           # Sitemap name

# Caching
AGILITY_FETCH_CACHE_DURATION=3600
AGILITY_PATH_REVALIDATE_DURATION=186400

# Analytics
GTM_ID=                           # Google Tag Manager
NEXT_PUBLIC_POSTHOG_KEY=          # PostHog
NEXT_PUBLIC_POSTHOG_HOST=

# Search
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=
ALGOLIA_ADMIN_API_KEY=

# Netlify
BUILD_HOOK_URL=                   # Build trigger webhook
```

---

## Common Development Tasks

### Adding a New Blog Post Detail Field

1. Add field to `lib/types/IPost.ts`
2. Update `components/agility-components/PostDetails.tsx` to render it
3. Add field in Agility CMS content model

### Adding a New Page Module

1. Create `components/agility-components/NewModule.tsx`
2. Export from `components/agility-components/index.ts`
3. Create module definition in Agility CMS
4. Add module to pages as needed

### Modifying Navigation

Navigation is fetched via `lib/cms-content/getHeaderContent.ts`:
- Main menu items from `primarynavigationitem` content list
- Mega menu content linked via content references
- Changes made in Agility CMS, not code

### Adding New Content Type Listing

1. Create interface in `lib/types/INewType.ts`
2. Create listing function in `lib/cms-content/getNewTypeListing.ts`
3. Create listing component in `components/agility-components/NewTypeListing.tsx`
4. Create detail component if needed

---

## Middleware Logic

The `middleware.ts` handles:

1. **Host redirects** - Enforce canonical domain
2. **Preview mode** - Enable draft content viewing
3. **Dynamic redirects** - ContentID → actual URL resolution
4. **Redirect rules** - Legacy URL redirects via bloom filter
5. **Query param handling** - Preserves params through rewrites

---

## Testing Locally

```bash
# Install dependencies
npm install

# Start dev server (includes Tailwind watch)
npm run dev

# Preview mode: Use Agility preview URL with agilitypreviewkey param
```

---

## Build & Deployment

```bash
# Full build
npm run build

# Build steps:
# 1. prebuild - Rebuild redirect cache
# 2. build:tw - Compile Tailwind CSS
# 3. build:next - Build Next.js app
```

Deployed to Netlify with:
- Environment variables in dashboard
- Build hooks for CMS publish triggers
- Scheduled function for search reindexing (every 2 hours)

---

## Important Conventions

### Code Style

- **Server Components by default** - Use `"use client"` only when needed
- **Async/await for data fetching** - All CMS calls are async
- **TypeScript strict mode** - All types required
- **Tailwind for styling** - No CSS modules

### Naming Conventions

- **Components:** PascalCase (`PostDetails.tsx`)
- **Utilities:** camelCase (`getContentList.ts`)
- **Types:** I-prefix (`IPost.ts`)
- **CMS Module names:** Must match component names exactly

### File Organization

- One component per file
- Related components in folders (e.g., `ResourceDetails/`)
- Types co-located in `lib/types/`
- CMS utilities in `lib/cms/`
- Content-specific utilities in `lib/cms-content/`

---

## Gotchas & Known Issues

1. **Query params rewriting** - Middleware rewrites `?foo=bar` to `/~~~foo%3Dbar` for caching
2. **Bloom filter for redirects** - May have false positives, always check actual map
3. **Preview mode** - Requires valid `agilitypreviewkey` parameter
4. **GraphQL types** - Generated via `yarn generate`, may need regeneration after schema changes
5. **Module name matching** - CMS module names must exactly match component names in registry

---

## Quick Reference: Adding Features

| Task | Files to Modify |
|------|-----------------|
| New page module | `components/agility-components/`, `index.ts` |
| New content type | `lib/types/`, `lib/cms-content/`, component |
| New API route | `app/api/` |
| Navigation changes | Agility CMS (not code) |
| Styling changes | Component files (Tailwind classes) |
| New page template | `components/agility-layouts/`, `index.ts` |
| Search modifications | `components/search/` |
| Analytics events | Client components with PostHog/GTM calls |

---

## Agility CMS Instance Details

### Instance Configuration

| Property | Value |
|----------|-------|
| **Instance GUID** | `80dc0987-be84-4405-a572-aba199832f68` |
| **Instance Name** | Agility CMS Website - 2021 |
| **Locale** | `en-ca` (English - Canada) |
| **Sitemap Name** | `website` (ID: 1) |
| **App URL** | https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68 |

### Page Models Available

| Model Name | ID | Use Case |
|------------|-----|----------|
| Main Template | 1 | Standard pages with Main zone |
| Two Column Template | 2 | Pages with two content columns |
| Two Columns with Top Zone Template | 3 | Two columns plus top area |
| Blank Template | 4 | Minimal pages |
| Landing Page Template | 5 | Marketing landing pages |
| New Main Template | 6 | Alternative main layout |

### Key Content Zones

- **Main** - Primary content zone in Main Template (most common)
- **MainContentZone** - May exist in some templates
- **TopZone** - Top area in Two Columns with Top Zone Template

### Page URL Format in Agility CMS

```
https://app.agilitycms.com/instance/{instanceGuid}/{locale}/pages/page-{pageID}
```

Example: https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68/en-ca/pages/page-545

### Key Parent Pages

| Page | ID | Path |
|------|-----|------|
| Home | 176 | `/` |
| Product | 4 | `/product` |
| Blog | 2 | `/blog` |
| Partners | 14 | `/partners` |
| Resources | 155 | `/resources` |

---

## Contact & Resources

- **Agility CMS Docs:** https://agilitycms.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
