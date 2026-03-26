---
name: create-blog-post
description: Use when the user wants to create a new blog post on agilitycms.com. Handles writing content, uploading images, and saving to Agility CMS. Can also update existing blog posts.
user-invocable: true
---

# Create Blog Post Skill

Create and publish blog posts on agilitycms.com via Agility CMS.

## Instance Configuration

- **Instance GUID**: `80dc0987-be84-4405-a572-aba199832f68`
- **Locale**: `en-ca`
- **Container Reference Name**: `blogposts`
- **CDN Base**: `https://static.agilitycms.com`
- **Image Upload Folder**: `blog-images`
- **Site URL**: `https://agilitycms.com/blog/{uRL}`

## Blog Post Fields

When creating a blog post via `save_content_items`, these are the available fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | Text | Yes | Post title |
| `subTitle` | Text | No | Subtitle shown below the title |
| `date` | Date | Yes | Publication date (ISO format, e.g. `2026-03-18T00:00:00`) |
| `uRL` | Text | Yes | URL slug (lowercase, hyphens, no spaces). Post will be at `/blog/{uRL}` |
| `excerpt` | HTML | No | Short description for listings (HTML, keep under 200 chars of text) |
| `textblob` | HTML | Yes | Full post body content in HTML |
| `postImage` | Image | No | Hero/featured image |
| `displayImageinPost` | Text | No | Set to `"true"` to show hero image in the post |
| `categories` | Linked Content | No | Link to `newblogcategories` container (contentID) |
| `blogTags` | Linked Content | No | Link to `blogtags` container (contentIDs) |
| `author` | Linked Content | No | Link to `blogauthors` container (contentID) |
| `titleRelatedResources` | Text | No | Heading for related posts section (default: "View Related Resources") |
| `titleRightCTA` | Text | No | CTA box title in sidebar |
| `contentRightCTA` | Text | No | CTA box description |
| `buttonRightCTA` | Link | No | CTA button (href + text) |

## Linked Content: Categories, Tags, and Authors

Blog posts link to related content items for category, tags, and author. You need to find or look up the correct `contentID` values for these linked fields.

### How to Look Up Linked Content

Use `mcp__claude_ai_Agility_CMS__get_content_items` to browse these containers. **Note:** Text field filters (like, contains, eq) do NOT work reliably for partial matching on title fields. Instead, fetch all items and scan the results.

**Browse categories (small list, fetch all at once):**
```
get_content_items({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  referenceName: "newblogcategories",
  locale: "en-ca",
  fields: ["title"]
})
```

**Browse tags (107 total, may need pagination):**
```
get_content_items({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  referenceName: "blogtags",
  locale: "en-ca",
  fields: ["title"],
  take: 50,
  skip: 0
})
```

**Browse authors (175 total, will need pagination):**
```
get_content_items({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  referenceName: "blogauthors",
  locale: "en-ca",
  fields: ["title"],
  take: 50,
  skip: 0
})
```
Paginate with `skip: 50`, `skip: 100`, `skip: 150` to scan through all authors. Match by scanning the `title` field in the results.

If the user mentions a category, tag, or author that doesn't exist, you can create one first by saving to the appropriate container with `contentID: -1`, then use the returned contentID in the blog post.

### Common Categories (container: `newblogcategories`)

| contentID | Title |
|-----------|-------|
| 4210 | SEO |
| 4211 | Email Marketing |
| 4212 | Inbound Marketing |
| 4213 | Artificial Intelligence |
| 4214 | Developer Tools |
| 4844 | Marketing Strategy |
| 4845 | Composable DXP |
| 7145 | Product Update |
| 7150 | Agility CMS News |
| 7153 | Agility CMS Releases |
| 7163 | Thought-Leadership |
| 7518 | Partner Program |
| 9852 | CMS |

### Common Blog Tags (container: `blogtags`, 107 total)

| contentID | Title |
|-----------|-------|
| 34 | How To |
| 35 | Blogging |
| 36 | Email Marketing |
| 37 | Inbound Marketing |
| 43 | Cloud |
| 44 | Best Practices |
| 81 | Design |
| 85 | Analytics |
| 86 | Agility CMS UI |
| 89 | True Cloud |
| 90 | Cloud CMS |
| 91 | SaaS CMS |

If the tag you need isn't listed above, search with `get_content_items` using a filter on `fields.title`.

### Common Authors (container: `blogauthors`, 175 total)

| contentID | Title |
|-----------|-------|
| 113 | Joel Varty |
| 105 | Jonathan Voigt |
| 1510 | Olga Voigt |
| 319 | Agility CMS |
| 7141 | Mauro Flammini |
| 6829 | Brendan Cooney |
| 5576 | Harmonie Poirier |
| 9555 | Joanna Olaru-Boyle |
| 100 | Anthony Valela |
| 644 | Charlie Soutthipanh |
| 3382 | Kaya Ismail |

If the author you need isn't listed above, search with `get_content_items` using a filter on `fields.title`.

## Workflow

### Step 1: Gather Information

Ask the user for (if not already provided):
1. **Topic/Title** - What the post is about
2. **Author** - Who wrote it (match to existing author, or note if new author needed)
3. **Category** - Which category it belongs to
4. **Tags** - Relevant tags
5. **Image** - Whether they have a hero image to upload

If the user provides a topic and asks you to write the post, generate high-quality content that matches the Agility CMS blog voice: professional, informative, practical, with clear headings and actionable advice.

### Step 2: Generate URL Slug

Create a URL-friendly slug from the title:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Keep it concise but descriptive

Example: "10 Tips for Headless CMS Migration" -> `10-tips-for-headless-cms-migration`

### Step 3: Upload Hero Image (if provided)

If the user provides an image file:

1. **View the image** using the Read tool to understand its content
2. **Initialize upload**:
```
mcp__claude_ai_Agility_CMS__initialize_media_upload({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  fileName: "descriptive-name.jpg",
  folderPath: "blog-images"
})
```
3. **Upload via curl**:
```bash
curl -s -X POST "<uploadUrl>" -F "file=@/path/to/image.jpg"
```
4. The CDN URL will be: `https://static.agilitycms.com/blog-images/{fileName}`

### Step 4: Format the Post Body

Write the `textblob` field as HTML. Follow these conventions:
- Use `<h2>` for main sections, `<h3>` for subsections
- Use `<p>` tags for paragraphs
- Use `<ul>/<ol>` for lists
- Use `<strong>` for bold, `<em>` for italics
- Use `<a href="...">` for links
- Use `<hr>` between major sections
- Use `<img src="...">` for inline images
- Tables are supported with standard HTML table markup
- Internal links should use relative paths where possible (e.g., `/blog/other-post-slug`)
- Use `\r\n` for line breaks in the HTML string

### Step 5: Save the Blog Post

```
mcp__claude_ai_Agility_CMS__save_content_items({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  locale: "en-ca",
  items: [{
    contentID: -1,
    referenceName: "blogposts",
    fields: {
      title: "Post Title",
      subTitle: "Optional subtitle",
      date: "2026-03-18T00:00:00",
      uRL: "post-url-slug",
      excerpt: "<p>Short excerpt for listings.</p>",
      textblob: "<h2>Section 1</h2>\r\n<p>Content here...</p>",
      postImage: {
        url: "https://static.agilitycms.com/blog-images/hero.jpg",
        label: "Hero image description"
      },
      displayImageinPost: "true",
      titleRelatedResources: "View Related Resources"
    },
    properties: {
      state: 1,
      referenceName: "blogposts"
    }
  }]
})
```

**State values:**
- `1` = Staging (draft) - use this by default
- `2` = Published - only use if user explicitly wants to publish immediately

### Step 6: Confirm to the User

After saving, provide:
1. The content ID returned
2. The CMS editor link: `https://app.agilitycms.com/instance/80dc0987-be84-4405-a572-aba199832f68/en-ca/content/list-36/listitem-{contentID}`
3. The preview URL: `https://agilitycms.com/blog/{uRL}?AgilityChannelID=1&lang=en-ca&agilitypreviewkey=%2b8njrinSYiOFEXvr1SdYXZ8B4P8WNLaRwQojpCY%2beeJP4U2OZlBUWyQADkWl22ipb%2bavkFT%2fkQE95I0cDRB%2f5Q%3d%3d&agilityts={YYYYMMDDHHMMSS}` (use current UTC timestamp for `agilityts`)
4. The live URL (once published): `https://agilitycms.com/blog/{uRL}`
5. Remind the user to review and publish in the CMS if saved as staging

## Updating an Existing Blog Post

To update an existing post:

1. **Fetch the current post** using `get_content_items` with a filter on the URL or content ID
2. **Include ALL fields** in the update (not just changed ones)
3. **Include `properties.versionID`** from the fetched item
4. Set `contentID` to the existing post's content ID

```
mcp__claude_ai_Agility_CMS__save_content_items({
  instanceGuid: "80dc0987-be84-4405-a572-aba199832f68",
  locale: "en-ca",
  items: [{
    contentID: 1234,
    referenceName: "blogposts",
    fields: { /* ALL fields */ },
    properties: {
      versionID: 56789,
      referenceName: "blogposts"
    }
  }]
})
```

## Writing Style Guidelines

When generating blog content for agilitycms.com:

- **Tone**: Professional but approachable, not overly formal
- **Structure**: Clear headings, short paragraphs, bullet points for scanability
- **Length**: Typically 800-2000 words for standard posts
- **SEO**: Include relevant keywords naturally, use descriptive headings
- **CTAs**: Include internal links to relevant Agility CMS pages where appropriate
- **Audience**: Content managers, developers, digital marketers evaluating or using headless CMS

## Example: Creating a Blog Post

User says: "Write a blog post about why headless CMS is great for AI"

1. Generate title: "Why Headless CMS is the Foundation for AI-Powered Content"
2. Generate slug: `why-headless-cms-is-the-foundation-for-ai-powered-content`
3. Pick category: Artificial Intelligence (4213)
4. Pick tags: Cloud CMS (90), SaaS CMS (91), Best Practices (44)
5. Write 1200-word HTML body with sections, examples, and CTAs
6. Save to CMS as staging
7. Provide content ID and editor link to user

## Important Notes

- Always save as **staging (state: 1)** unless the user explicitly asks to publish
- If the user provides images, view them first to write accurate alt text
- Generate URL slugs that are SEO-friendly and concise
- When the user references an existing post, fetch it first before making changes
- If creating a new author is needed, save to `blogauthors` container first, then reference the new contentID
