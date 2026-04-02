# Agility CMS MCP Server - Improvements for AI Agents

Issues encountered while building the comparison page via MCP tool calls.

---

## 1. Link Fields Cannot Be Saved via `save_content_items`

**Problem:** The `save_content_items` tool schema only accepts `string | number | {url, label} | null` for field values. Agility Link fields are objects with `{href, target, text}`, but the MCP tool rejects them because the schema doesn't include a Link field type.

**Workaround:** Passing the link as a JSON string (`"{\"href\":\"...\",\"target\":\"...\",\"text\":\"...\"}"`) works, but is non-obvious and fragile.

**Fix:** Add a Link field value type to the `save_content_items` schema:
```json
{
  "description": "Link field value",
  "properties": {
    "href": { "type": "string" },
    "text": { "type": "string" },
    "target": { "type": "string" }
  },
  "required": ["href", "text"],
  "type": "object"
}
```

---

## 2. `get_content_items` Returns Empty Fields for Nested Content

**Problem:** When fetching items from a nested content list (e.g., `comparetestcomparehero_compa72c589`), the list response returns items with only `{ OtherLocales: {} }` in their fields -- no actual field values. You must then call `get_content_item` individually for each item to get field data.

**Fix:** Ensure `get_content_items` returns field values for nested content lists, not just shared/top-level lists. At minimum, document this limitation so agents know to use `get_content_item` for individual items.

---

## 3. `get_containers` Returns Too Much Data

**Problem:** The `get_containers` response for the Agility CMS Website instance was 470K+ characters, exceeding context limits. The tool had to save results to a file, requiring manual parsing.

**Fix:** Add pagination (`skip`/`take`) and optional filtering (`search`, `modelID`) to `get_containers`. Or return a summary view by default and offer a detail mode.

---

## 4. `get_sitemap` Returns Too Much Data

**Problem:** Similar to containers -- the sitemap response was 89K+ characters and had to be saved to a file.

**Fix:** Add depth limiting (e.g., `maxDepth: 2`), path filtering (e.g., `pathPrefix: "/compare"`), or a flat listing mode that returns `[{pageID, pageName, path, parentPageID}]` without full page details.

---

## 5. No Way to Reorder Page Modules Without Full Page Save

**Problem:** To reorder modules in a page zone, you must call `save_page` with the entire page structure (all zones, all properties, SEO, scripts, etc.). There's no lightweight "reorder modules" endpoint.

**Suggestion:** Consider adding a `reorder_page_modules` tool that takes `pageID`, `zoneName`, and an array of `contentId` values in the desired order.

---

## 6. Link Field Read/Write Format Inconsistency

**Problem:** `get_content_item` returns Link fields as `{ href, target, text }` objects. But `save_content_items` doesn't accept this format (see #1). Agents naturally try to pass back the same structure they received.

**Fix:** Accept the same `{ href, target, text }` format on write that is returned on read.

---

## 7. No Bulk Content Item Read

**Problem:** To verify all nested items (e.g., 8 competitor cards), I had to make 8 separate `get_content_item` calls. There's no way to fetch multiple items by ID in one call.

**Suggestion:** Add a `contentIDs` array parameter to `get_content_item` (or a separate `get_content_items_by_ids` tool) for batch retrieval.
