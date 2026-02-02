# Create Agility Component

Create a new Agility CMS component with its component model, React component files, and optionally a page to display it.

## Arguments

- `$ARGUMENTS` - Description of the component to create (e.g., "A pricing calculator", "A testimonial carousel", "A contact form")

## Process

### Step 1: Analyze Requirements

Based on the component description provided in `$ARGUMENTS`, determine:
1. What content fields are needed (text, numbers, images, links, etc.)
2. What interactivity is required (client-side state, forms, calculations)
3. What styling approach to use (match agilitycms.com design)

### Step 2: Create Agility CMS Component Model

Use the Agility CMS MCP tools to create the component model:

```
Instance GUID: 80dc0987-be84-4405-a572-aba199832f68
Locale: en-ca
```

**Important considerations:**
- Use Tab fields to organize content into logical sections
- Use appropriate field types (Text, LongText, Html, Integer, Decimal, Boolean, Link, ImageAttachment)
- Include default values where sensible
- Add descriptions to help content editors
- Use `-1` for new model ID

**Example component model structure:**
```typescript
{
  id: -1,
  displayName: "Component Display Name",
  referenceName: "ComponentReferenceName", // PascalCase, no spaces
  description: "Brief description",
  fields: [
    { type: "Tab", name: "mainTab", label: "Main Content" },
    { type: "Text", name: "heading", label: "Heading", required: true },
    { type: "LongText", name: "description", label: "Description" },
    { type: "Integer", name: "someNumber", label: "Some Number", defaultValue: 10 },
    { type: "Link", name: "ctaButton", label: "CTA Button" },
    // ... more fields
  ]
}
```

### Step 3: Create React Component Files

Create a folder in `components/agility-components/{ComponentName}/` with:

#### Server Component: `{ComponentName}.tsx`

```typescript
import { UnloadedModuleProps, URLField, ImageField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { Container } from "components/micro/Container"
import { ComponentNameClient } from "./ComponentName.client"

export interface IComponentName {
  // Define all fields matching the CMS model
  // Field names start with lowercase (e.g., heading, not Heading)
  heading: string
  description?: string
  // ... other fields
}

export const ComponentName = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields } = await getContentItem<IComponentName>({
    contentID: module.contentid,
    languageCode,
  })

  return (
    <Container>
      <div className="mx-auto max-w-7xl">
        {/* Render content or pass to client component */}
        <ComponentNameClient fields={fields} />
      </div>
    </Container>
  )
}
```

#### Client Component (if interactive): `{ComponentName}.client.tsx`

```typescript
"use client"

import { useState } from "react"
import clsx from "clsx"
import { IComponentName } from "./ComponentName"

interface Props {
  fields: IComponentName
}

export const ComponentNameClient = ({ fields }: Props) => {
  const [state, setState] = useState(/* initial state */)

  return (
    <div>
      {/* Interactive component implementation */}
    </div>
  )
}
```

### Step 4: Register the Component

Add to `components/agility-components/index.ts`:

1. Import at the top:
```typescript
import { ComponentName } from "./ComponentName/ComponentName"
```

2. Add to allModules array:
```typescript
{ name: "ComponentName", module: ComponentName },
```

### Step 5: Verify Build

Run `npm run build` to ensure the component compiles without errors.

### Step 6: Create Page (Optional)

If requested, create a page in Agility CMS with the component:

```
Page Model: "Main Template" (most common)
Zone Name: "Main"
Parent Page ID: 4 (Product section) or -1 (root)
```

**Important:** Use the correct zone name for the template:
- Main Template uses zone: `Main`
- Other templates may have different zone names

## Styling Guidelines

Match the agilitycms.com website style:

**Colors (from Tailwind theme):**
- `text-primary` (#2a3846) - Main text
- `text-highlight-light` (#5800d4) - Accent/links
- `bg-highlight-light` - Primary buttons
- `bg-secondary` (#ffc414) - Alternate accent
- `bg-background` (#e9f0f5) - Light background

**Common Patterns:**
- Use `Container` component for section padding
- Use `LinkButton` component for CTA buttons
- Use `clsx` for conditional classes
- Use Tabler icons (`@tabler/icons-react`)
- Cards: `rounded-2xl bg-white p-8 shadow-lg`
- Inputs: `rounded-lg border border-gray-300 px-4 py-3`

## Agility CMS Links

- **Instance**: https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68
- **Page format**: https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68/en-ca/pages/page-{pageID}

## Example Usage

```
/create-component A pricing comparison table with 3 tiers, feature checkmarks, and CTA buttons
```

```
/create-component An interactive quiz that collects user preferences and shows personalized results
```

```
/create-component A testimonial slider with customer photos, quotes, and company logos
```
