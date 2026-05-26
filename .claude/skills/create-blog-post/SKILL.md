---
name: create-blog-post
description: Use when the user wants to create, edit, or publish a blog post on agilitycms.com via the Agility CMS MCP server. Handles drafting content, uploading images, looking up categories/tags/authors, and saving to Agility CMS. Triggers on phrases like "write a blog post", "create a post about", "publish to the blog", "update blog post", any mention of agilitycms.com blog content, or when a user provides source material (URLs, notes, docs) and wants it turned into a published post. Also use when editing an existing post's content, voice, categories, or images.
user-invocable: true
---

# Create Blog Post on agilitycms.com

Create and publish blog posts to the Agility CMS blog via the Agility CMS MCP server.

## Instance Configuration

| Setting         | Value                                                                                   |
| --------------- | --------------------------------------------------------------------------------------- |
| Instance GUID   | `80dc0987-be84-4405-a572-aba199832f68`                                                  |
| Locale          | `en-ca`                                                                                 |
| Container       | `blogposts`                                                                             |
| Definition Name | `BlogPost`                                                                              |
| Image Folder    | `blog-images`                                                                           |
| Default Author  | Joel Varty (contentID `113`)                                                            |
| CMS Editor URL  | `https://app.agilitycms.com/instance/{GUID}/en-ca/content/list-36/listitem-{contentID}` |
| Live Blog URL   | `https://agilitycms.com/blog/{slug}`                                                    |

---

## MCP Server Capabilities (April 2026)

-   **Field casing is flexible.** Saves accept any casing (`Title`, `title`, `TITLE` all work). Read responses return model-canonical casing.
-   **`definitionName` is inferred.** You no longer need to include it in `properties`. The server infers it from the container's `referenceName`.
-   **Field validation with clear errors.** If a field name doesn't match any known field, the server returns an error listing what it expected.
-   **`get_content_model_details` accepts container names.** Both `referenceName: "blogposts"` and `referenceName: "BlogPost"` work. Also accepts `modelID: 21`.
-   **Save response confirms contentID and title.** Successful saves return: `Item 0 -> contentID: 10345 (Title: "...")`.
-   **`state` accepts both string and number.** Full state enum: 1=Staging, 2=Published, 3=Deleted, 4=Approved, 5=AwaitingApproval, 6=Declined, 7=Unpublished.
-   **ImageAttachment fields work on create and update.** `PostImage` accepts `{url, label}` and persists correctly on both new and existing items.

---

## Workflow

### 1. Gather Info

If not already provided, confirm:

-   Topic or title
-   Author (default: Joel Varty)
-   Category (see lookup tables below)
-   Tags (see lookup tables below)
-   Hero image (file upload, URL, or generate later)
-   Any source material (URLs to fetch, notes, docs)

If the user provides a topic and asks you to write the post, generate content that matches the author's voice profile (see Voice section below).

### 2. Keyword and Intent First

Before writing or finalizing the title, identify:

-   **Primary keyword phrase:** the exact phrase someone would search if they had this question. It should appear in the `Title`, `URL` slug, `Excerpt`, and the first `<h2>` or first `<p>` of the body.
-   **Central question:** what is this post actually answering? Write it down as a single sentence before drafting. The post must answer it directly in the first paragraph.

Don't reverse-engineer keywords after writing. Start here.

### 3. Generate URL Slug

From the primary keyword (not necessarily the exact title): lowercase, hyphens, strip stop words and special characters, keep under 60 characters.

`"How to Deploy Next.js on Any Platform"` becomes `nextjs-deploy-any-platform`
`"Next.js 16.2 Adapters Are Here"` becomes `nextjs-162-adapters-are-here`

### 4. Handle Images

**Rule: If the user provides one or more images, ALWAYS use the first image as the hero image.** Set `DisplayImageinPost` to `"true"` and populate the `PostImage` field. Never leave these empty when an image is available.

**For each image:**

1. View the image with the `view` tool to write accurate alt text
2. Check dimensions with `identify <path>` or Python PIL to get width/height
3. Initialize upload:

```
initialize_media_upload({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  fileName: "descriptive-name.jpg",
  folderPath: "blog-images"
})
```

4. Upload via curl: `curl -s -X POST "<uploadUrl>" -F "file=@/path/to/image.jpg"`
5. **Use the URL returned by the upload API.** Do not hardcode a CDN base. The API returns the correct CDN URL in `media.url`.

**CDN Query Parameters (required on all `<img>` tags in post body HTML):**

-   If image width > 800px: append `?format=auto&w=800`
-   If image width <= 800px: append `?format=auto`
-   Hero image (`PostImage` field): use the raw CDN URL with NO query params (the frontend handles resizing)

**Single image provided:**

-   Use as hero image in `PostImage` field with `{url, label}`
-   Set `DisplayImageinPost` to `"true"`

**Multiple images provided:**

-   First image: hero image (`PostImage` field, `DisplayImageinPost: "true"`)
-   Additional images: embed in `Textblob` body HTML contextually near relevant sections, not dumped at the end
-   Format: `<img src="{cdnUrl}?format=auto&w=800" alt="Descriptive alt text" />`

### 5. Write the Excerpt

The `Excerpt` field is **both the listing page teaser and the meta description** for search. It must work in both contexts.

Write it as:

-   A direct, active statement of what the post covers or what the reader gets. Not a tease, not a setup. A payoff sentence.
-   Include the primary keyword naturally, ideally near the start.
-   **140-155 characters of text content** (HTML tags don't count toward this limit, but strip them mentally when counting).
-   First person or active voice: "We built an AI data security policy and here's what we decided." Not "This post explores how to..."
-   Should read as a standalone sentence even when extracted by a search engine or AI system, stripped of its HTML.
-   Wrap in `<p>` tags for the listing page renderer.

Bad: `<p>In this post, we explore the new adapter system in Next.js and what it means for deployments.</p>`

Good: `<p>Next.js 16.2's Adapter API lets you deploy to any runtime without touching your app code. Here's what changed and what it means for Agility CMS customers.</p>`

### 6. Write the Post Body

The `Textblob` field is the full post body in HTML.

**Structure:**

-   `<h2>` for main sections, `<h3>` for subsections
-   `<p>` for paragraphs, `<ul>/<ol>` for lists
-   `<strong>` for bold, `<em>` for italics, `<a href>` for links
-   `<hr>` between major sections if desired
-   Use `\r\n` for line breaks in the HTML string
-   Internal links: `/blog/other-post-slug`

**Opening paragraph:**
Answer the central question directly. No setup, no "In this post we'll cover." The first paragraph is the highest-value real estate for readers, search crawlers, and AI citation. Use it.

**Section headings (`<h2>`):**
Say something specific. If the heading could apply to any post on any topic, it's wrong. "Why This Matters" says nothing. "Why Deployment Flexibility Is Now a CMS Requirement" says something.

**Paragraph-level writing:**
Write each `<p>` so it can be extracted and cited on its own. If it starts with "As we saw above" or "Building on that," it can't stand alone. Reframe it.

Bad: `<p>As we saw above, this creates a problem for teams on legacy infrastructure.</p>`

Good: `<p>Teams on legacy infrastructure hit a specific wall: the deployment target is baked into the framework configuration, not abstracted away from it.</p>`

**Length:**
Thin posts under 600 words rarely rank or get cited. But padding to hit a word count is worse than stopping when you're done. Aim for depth proportional to the topic: focused how-to posts 600-900 words, strategic analysis 1,000-1,800.

**Internal links:**
Link to 2-4 relevant Agility CMS blog posts. Anchor text should describe the destination precisely. The linked phrase should be close to what someone would search to find that post. Never use "read more," "click here," or "this post."

**FAQ blocks (optional, high-signal for AEO):**
For posts answering a specific question, consider closing with a short FAQ section. Keep answers to 2-4 sentences. Direct.

```html
<h2>Frequently Asked Questions</h2>
<h3>What is the Next.js Adapter API?</h3>
<p>
	The Adapter API is an abstraction layer introduced in Next.js 15+ that lets you deploy to any runtime by swapping
	adapters rather than modifying your application code. You write your app once; the adapter handles the
	runtime-specific output.
</p>
```

### 7. Save the Blog Post

Use the payload format documented in "Save Format" below. Always default to `state: 1` (staging) unless the user explicitly says to publish.

Before saving, confirm:

-   If any images were provided, the first is set as `PostImage` and `DisplayImageinPost` is `"true"`
-   `Excerpt` is 140-155 characters, includes the primary keyword, reads as a standalone sentence
-   The opening paragraph answers the central question directly

### 8. Confirm to the User

After a successful save, provide:

1. Content ID (from the save response)
2. **Preview URL:** `https://agilitycms.com/blog/post-details?ContentID={contentID}&lang=en-ca&agilitypreviewkey=%2b8njrinSYiOFEXvr1SdYXZ8B4P8WNLaRwQojpCY%2beeJP4U2OZlBUWyQADkWl22ipb%2bavkFT%2fkQE95I0cDRB%2b5Q%3d%3d&agilityts={YYYYMMDDHHMMSS}` — replace `{contentID}` with the saved item's contentID and `{YYYYMMDDHHMMSS}` with the current UTC timestamp (e.g., `20260407153022`).
3. CMS editor link: `https://app.agilitycms.com/instance/{GUID}/en-ca/content/list-36/listitem-{contentID}`
4. Live URL (after publish): `https://agilitycms.com/blog/{slug}`
5. Remind them to review and publish in the CMS

---

## Save Format

### Creating a New Post (contentID: -1)

```json
{
	"contentID": -1,
	"referenceName": "blogposts",
	"fields": {
		"Title": "Post Title Here",
		"MetaTitle": "Post Title Here | Agility CMS",
		"URL": "post-url-slug",
		"Date": "2026-04-06T00:00:00",
		"SubTitle": "Optional subtitle",
		"Excerpt": "<p>140-155 chars. Direct. Includes primary keyword. Reads as a standalone sentence. Also used as meta description.</p>",
		"Textblob": "<h2>Section</h2>\r\n<p>Content here...</p>",
		"AuthorID": "113",
		"AuthorTitle": "Joel Varty",
		"EnableComments": "true",
		"DisplayImageinPost": "true",
		"PostImage": {
			"url": "https://the-url-returned-by-upload-api/blog-images/hero.jpg",
			"label": "Hero image alt text"
		},
		"BlogCategories_TextField": "Developer Tools",
		"BlogCategories_ValueField": "4214",
		"BlogCategories_SortIdField": "",
		"BlogTagsIDs": "44,43",
		"BlogTagsTitle": "Best Practices,Cloud",
		"CategoriesIDs": "",
		"CategoriesTitle": "",
		"ResourcesList_TextField": "",
		"ResourcesList_ValueField": "",
		"ResourcesList_SortIdField": "",
		"RelatedPosts_SortIdField": "",
		"TitleRelatedResources": "View Related Resources"
	},
	"properties": {
		"state": 1,
		"referenceName": "blogposts"
	}
}
```

Note: `definitionName` is optional. Include it explicitly if you prefer: `"definitionName": "BlogPost"`.

### Updating an Existing Post

**Fetch first.** Use `get_content_item` to get the current `versionID` and all field values. Include ALL fields in the update payload or they will be wiped.

```json
{
  "contentID": 9935,
  "referenceName": "blogposts",
  "fields": { "...all fields, including unchanged ones..." },
  "properties": {
    "state": 1,
    "referenceName": "blogposts",
    "versionID": 73292
  }
}
```

---

## Key Rules

1. **Boolean fields are strings.** `"true"` / `"false"`, not native booleans.
2. **Integer fields are strings.** `"113"` not `113` for `AuthorID`.
3. **All companion fields must be present**, even if empty strings. See full field list above.
4. **Updates require ALL fields.** Full replace, not a patch. Omit a field and it gets wiped.
5. **Updates require `versionID`.** Fetch the item first.
6. **New staging items may not appear in list queries.** Use `get_content_item` with the returned contentID to verify.
7. **Large `Textblob` payloads may cause MCP timeouts.** The save often still completes server-side. Fetch to verify before retrying.
8. **Legacy category fields must be empty strings.** `CategoriesIDs: ""` and `CategoriesTitle: ""`. The active field is `BlogCategories`.
9. **Always use provided images.** First image = `PostImage` + `DisplayImageinPost: "true"`. Additional images go into `Textblob` as `<img>` tags with `?format=auto&w=800`.
10. **Use the CDN URL returned by the upload API.** Do not hardcode a CDN base domain.

---

## Content Model Fields

Field names shown here use model-canonical casing. The API is case-insensitive on save.

### Core Fields

| Field                | Type            | Notes                                                                                                                                       |
| -------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Title`              | Text            | **Required.** Post title. Include primary keyword where natural.                                                                            |
| `MetaTitle`          | Text            | **Required.** SEO title. Format: `{Keyword-Rich Title} \| Agility CMS`                                                                      |
| `URL`                | Text            | **Required.** Slug. Lowercase, hyphens, no stop words, under 60 chars.                                                                      |
| `Date`               | Date            | **Required.** ISO format: `2026-04-06T00:00:00`                                                                                             |
| `Excerpt`            | Html            | **Required.** Also serves as meta description. 140-155 chars of text content. Direct, active, includes primary keyword. Wrap in `<p>` tags. |
| `Textblob`           | Html            | **Required.** Full post body in HTML.                                                                                                       |
| `SubTitle`           | Text            | Subtitle below title                                                                                                                        |
| `PostImage`          | ImageAttachment | `{"url": "https://...", "label": "Alt text"}`                                                                                               |
| `DisplayImageinPost` | Boolean         | String: `"true"` or `"false"`                                                                                                               |
| `EnableComments`     | Boolean         | String: `"true"` or `"false"`                                                                                                               |

### Author Fields

| Field         | Type    | Notes           |
| ------------- | ------- | --------------- |
| `AuthorID`    | Integer | String: `"113"` |
| `AuthorTitle` | Text    | `"Joel Varty"`  |

### Category Fields (use `newblogcategories` container)

| Field                        | Type | Notes                      |
| ---------------------------- | ---- | -------------------------- |
| `BlogCategories_TextField`   | Text | Comma-separated titles     |
| `BlogCategories_ValueField`  | Text | Comma-separated contentIDs |
| `BlogCategories_SortIdField` | Text | Include as empty string    |
| `CategoriesIDs`              | Text | Legacy. Set to `""`        |
| `CategoriesTitle`            | Text | Legacy. Set to `""`        |

### Tag Fields (use `blogtags` container)

| Field           | Type | Notes                      |
| --------------- | ---- | -------------------------- |
| `BlogTagsIDs`   | Text | Comma-separated contentIDs |
| `BlogTagsTitle` | Text | Comma-separated titles     |

### Related Content Fields (include as empty strings if unused)

| Field                       | Notes                                      |
| --------------------------- | ------------------------------------------ |
| `ResourcesList_TextField`   | Text                                       |
| `ResourcesList_ValueField`  | Text                                       |
| `ResourcesList_SortIdField` | Text                                       |
| `RelatedPosts_SortIdField`  | Text                                       |
| `TitleRelatedResources`     | Text (default: `"View Related Resources"`) |

### CTA / Sidebar Fields (optional, omit if unused)

`TitleRightCTA`, `ContentRightCTA`, `ButtonRightCTA`, `CTABlogPosts`, `CTAID`, `CTATitle`, `ListingImageOverride`, `FurtherReading`, `RelatePostsBy`, `RelatedPostsIDs`, `RelatedPostTitles`

---

## Linked Content Lookup Tables

### Categories (`newblogcategories` container)

| contentID | Title                   |
| --------- | ----------------------- |
| 4210      | SEO                     |
| 4211      | Email Marketing         |
| 4212      | Inbound Marketing       |
| 4213      | Artificial Intelligence |
| 4214      | Developer Tools         |
| 4844      | Marketing Strategy      |
| 4845      | Composable DXP          |
| 7145      | Product Update          |
| 7150      | Agility CMS News        |
| 7153      | Agility CMS Releases    |
| 7163      | Thought-Leadership      |
| 7518      | Partner Program         |
| 9852      | CMS                     |

### Common Tags (`blogtags` container, 107+ total)

| contentID | Title             |
| --------- | ----------------- |
| 34        | How To            |
| 35        | Blogging          |
| 36        | Email Marketing   |
| 37        | Inbound Marketing |
| 43        | Cloud             |
| 44        | Best Practices    |
| 81        | Design            |
| 85        | Analytics         |
| 86        | Agility CMS UI    |
| 89        | True Cloud        |
| 90        | Cloud CMS         |
| 91        | SaaS CMS          |

If the tag you need isn't listed, search with `get_content_items` on the `blogtags` container with `take: 50`. Paginate with `skip` if needed.

### Common Authors (`blogauthors` container, 175+ total)

| contentID | Title               |
| --------- | ------------------- |
| 113       | Joel Varty          |
| 105       | Jonathan Voigt      |
| 1510      | Olga Voigt          |
| 319       | Agility CMS         |
| 7141      | Mauro Flammini      |
| 6829      | Brendan Cooney      |
| 5576      | Harmonie Poirier    |
| 9555      | Joanna Olaru-Boyle  |
| 100       | Anthony Valela      |
| 644       | Charlie Soutthipanh |
| 3382      | Kaya Ismail         |

If the author isn't listed, search with `get_content_items` on the `blogauthors` container, paginating with `take: 50`. If the author doesn't exist at all, create one in `blogauthors` with `contentID: -1`, then use the returned contentID.

## How to Look Up Categories, Tags, Authors

Use `get_content_items` to browse. Text field filters may not work reliably for partial matching. Fetch all items and scan results instead.

```
get_content_items({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  referenceName: "newblogcategories",
  locale: "en-ca",
  fields: ["Title"]
})
```

For larger containers (tags: 107+, authors: 175+), use `take: 50` and `skip: 0`, `skip: 50`, etc.

To discover the content model for any container:

```
get_content_model_details({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  referenceName: "blogposts"
})
```

---

## Voice and Writing Style

### Default: Joel Varty

Joel's voice:

-   Short, punchy sentences. Direct framing.
-   First person, conversational but not casual. Talks to the reader like a peer.
-   Practical over theoretical. Concrete examples over abstract frameworks.
-   Opinionated. State what you think, then explain why.
-   No formulaic section openers ("Here's where it gets interesting", "Let's dive in", "The bottom line")
-   No em-dashes. Ever.
-   No dramatic setups or big-reveal structure
-   No self-introduction in body copy — the byline handles that

**AI slop to strip on every draft:**

"Here's the thing", "The honest takeaway", "It's worth noting", "At the end of the day", "In today's landscape", "It's no secret that", "Let's unpack", "Game-changer", "Revolutionize", "Delve into", "In conclusion", "Needless to say", "Without further ado"

### Adding Other Authors

When writing for a different team member, ask about their voice preferences or study their existing posts on agilitycms.com/blog. Key things to calibrate: sentence length, formality, use of questions, lists vs. prose, whether they address the reader directly. Every author has a real personality. Write toward it, not toward a generic brand voice.

### Voice Check

After drafting, re-read each section opener. If it sounds like a template, rewrite it. The first sentence of each section should say something specific, not set up what you're about to say.

**AEO check:** Read the first paragraph. Does it answer the central question directly, without setup? If not, reorder. Read the last paragraph of each section. Can it be extracted and cited on its own, without context from earlier in the section? If not, reframe it.

**Authenticity check:** Would the author actually say this? Would a reader feel like they're getting a real person's perspective? If a paragraph sounds like it was written to rank rather than to communicate, rewrite it. The goal is content that's genuinely useful and happens to be well-structured, not the other way around.

---

## SEO and Discoverability

### Keyword Placement

Once you've identified the primary keyword phrase, it goes in:

-   `Title` — as naturally as possible, ideally near the front
-   `URL` slug — keyword-first, strip stop words
-   `MetaTitle` — format: `{Keyword-Rich Title} | Agility CMS`
-   `Excerpt` — near the start of the text content (also meta description)
-   First `<h2>` or first `<p>` of the body

One natural mention in each location is enough. Don't repeat it mechanically.

Secondary keywords go in `<h2>` tags and naturally in body copy.

### Slug Rules

-   Reflect the primary keyword, not just the title
-   Drop stop words (a, the, an, for, with) unless they change meaning
-   Lowercase, hyphens only, no special characters
-   Under 60 characters if possible

### Excerpt as Meta Description

The `Excerpt` field renders on listing pages AND is used as the meta description for search. Both uses require the same thing: a direct, useful, standalone sentence that includes the primary keyword and tells the reader exactly what they get.

-   140-155 characters of text content
-   Active voice, not passive
-   Avoid "In this post..." or "We explore..."
-   Should work as a complete thought even when the `<p>` tags are stripped by a search engine

### Internal Linking

Link to 2-4 other Agility CMS blog posts where genuinely relevant. Anchor text should describe the destination precisely. The linked phrase should be close to what someone would search to find that post. Never use "read more," "click here," or "this post."

---

## AEO and GEO: Writing for AI Citation

AI systems (ChatGPT, Perplexity, Claude, Gemini) cite sources that are specific, structured, and attributable. Vague and generic content gets paraphrased away or skipped entirely. Joel's voice, when it's working, already does what AI systems reward. These rules make the pattern explicit.

### Answer First

The first paragraph of the post body answers the central question directly. No preamble. If someone found this post by searching for the title, the first paragraph gives them the answer. Everything after it is depth, context, and evidence.

### Define Key Terms Once, Clearly

If the post uses a term like "headless CMS," "Adapter API," or "composable architecture," include at least one clean definition sentence. Write it so it could stand alone as the answer to "what is X?" AI systems extract these. Make them precise.

Bad: "The Adapter API is a cool new feature that makes things more flexible."

Good: "The Adapter API is an abstraction layer in Next.js 15+ that separates your application code from the deployment target, so you can switch runtimes without changing your app."

### Quotable, Self-Contained Paragraphs

Each `<p>` block should be extractable and citable without context from surrounding paragraphs. Avoid forward or backward references. State the claim, then support it, within the same paragraph.

### Specificity Signals

AI systems and search crawlers trust specific claims over general ones. Version numbers, dates, named people, real percentages, actual product names. Vague claims don't get cited.

Weak: "The new system is faster and more flexible."

Strong: "The Next.js 16.2 Adapter API reduced our deployment configuration from 80 lines to 12 in our Agility CMS integration."

### FAQ Blocks

For posts that answer a specific question, a closing FAQ section is the highest-signal format for both featured snippets and AI extraction. Keep each answer to 2-4 sentences, self-contained. Use `<h3>` for questions, `<p>` for answers.

This is not required for every post, but it's particularly effective for:

-   How-to and comparison posts
-   Posts targeting a question-format search query
-   Posts covering a technical concept with common follow-up questions

### What Not to Do

Don't make posts feel like they were written to be cited. If a paragraph reads as if someone was optimizing it for extraction rather than communicating, it will feel hollow and probably won't rank anyway. The most citable content is usually just the clearest, most direct writing. Optimize for communication. The citation follows.

---

## Debugging

### Save fails with field validation error

The MCP server returns clear messages naming the problem field. Follow its guidance. Common causes: wrong data type (boolean/integer not passed as string), unknown field name (check spelling against model).

### Save fails with a generic or unclear error

-   Confirm all companion fields are included (even as empty strings)
-   Confirm boolean fields are strings (`"true"` / `"false"`)
-   Confirm integer fields are strings (`"113"` not `113`)
-   Try a minimal save to the `blogtags` container first to confirm write permissions

### Save times out but might have worked

Fetch the item with `get_content_item` using the contentID. If the data is there, the save succeeded.

### Hero image not showing

-   Confirm `PostImage` is set as `{"url": "...", "label": "..."}` (object, not string)
-   Confirm `DisplayImageinPost` is `"true"` (string)
-   Use the URL returned by the upload API, not a hardcoded CDN base

### Updated post is missing data

You probably omitted fields in the update. Updates are full replacements. Always fetch first and include every field.

---

## State Values

The `state` property accepts both string and number:

-   `1` = Staging (draft). **Always use this unless the user explicitly asks to publish.**
-   `2` = Published
-   Other values: 3=Deleted, 4=Approved, 5=AwaitingApproval, 6=Declined, 7=Unpublished

---

## Recently Created Posts (for reference)

| contentID | Slug                                                                         | Title                                      | Date       |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| 9935      | `nextjs-162-adapters-deploy-anywhere`                                        | Next.js 16.2 Adapters: Deploy Anywhere     | 2026-03-27 |
| 9927      | `we-built-an-ai-data-security-policy-heres-what-we-actually-decided-and-why` | AI Data Security Policy                    | 2026-03-25 |
| 9855      | `my-story-21-years-of-building-agility-cms`                                  | My Story: 21 Years of Building Agility CMS | 2026-03-19 |
