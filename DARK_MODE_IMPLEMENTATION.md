# Dark Mode Implementation Plan

## Overview
Implementing dark mode support across the entire project using Tailwind CSS v4's built-in dark mode feature. Dark mode will automatically follow the system preference (`prefers-color-scheme` media query) - no toggle needed.

## Approach
- **DO NOT** change any existing light mode styles
- **ONLY** add `dark:` variants to existing classes
- Use Tailwind's default dark mode (system preference)
- Follow Tailwind CSS v4 documentation: https://tailwindcss.com/docs/dark-mode

## Color Mapping Strategy

### Background Colors
- `bg-white` → add `dark:bg-gray-900` or `dark:bg-gray-800`
- `bg-gray-50` → add `dark:bg-gray-900`
- `bg-gray-100` → add `dark:bg-gray-800`
- `bg-gray-200` → add `dark:bg-gray-700`
- `bg-background` → add `dark:bg-gray-900` (custom color)

### Text Colors
- `text-gray-900` → add `dark:text-white`
- `text-gray-700` → add `dark:text-gray-300`
- `text-gray-500` → add `dark:text-gray-400`
- `text-gray-400` → add `dark:text-gray-500`
- `text-primary` → add `dark:text-gray-200` (custom color)
- `text-white` → typically stays white (on dark backgrounds)

### Border Colors
- `border-gray-300` → add `dark:border-gray-700`
- `border-gray-200` → add `dark:border-gray-700`
- `ring-gray-900/10` → add `dark:ring-gray-100/10`

### Custom Colors
- `bg-highlight` → keep as is (brand color)
- `bg-highlight-dark` → keep as is (brand color)
- `text-highlight` → keep as is (brand color)
- `text-secondary` → keep as is (brand color - yellow)

## Implementation Checklist

### Phase 1: Core Layout & Navigation ✅
- [x] `app/layout.tsx` - Main layout wrapper
- [x] `components/common/header/SiteHeader.tsx` - Header component
- [x] `components/common/footer/SiteFooter.tsx` - Footer component
- [x] `components/common/header/MenuItemOutput.tsx` - Menu items

### Phase 2: Common Components ✅
- [x] `components/common/PreviewBar.tsx`
- [x] `components/search/Search.tsx` and related search components
- [x] `components/micro/LinkButton.tsx`
- [x] `components/micro/Container.tsx`
- [ ] `components/common/GuideWithLinks.tsx`

### Phase 3: Agility Components - Content Panels (In Progress)
- [x] `components/agility-components/CenteredContentPanel.tsx`
- [x] `components/agility-components/CTABlocks.tsx`
- [x] `components/agility-components/SingleTestimonialPanel.tsx`
- [x] `components/agility-components/RightOrLeftCaseStudyTestimonial.tsx`
- [x] `components/agility-components/TriplePanelComparisonModule.tsx`
- [x] `components/agility-components/VerticalContentPanel/VerticleStylePanel.client.tsx`
- [ ] `components/agility-components/ContentPanel.tsx`
- [ ] `components/agility-components/CenteredCTAPanel.tsx` (uses darkMode prop - may need adjustment)
- [ ] `components/agility-components/VerticalContentPanel/VerticalContentPanel.server.tsx`
- [x] `components/agility-components/RightORLeftContentModule.tsx` (uses darkMode prop - may need adjustment)
- [ ] `components/agility-components/TextBlockWithImage.tsx`

### Phase 4: Agility Components - Listings (In Progress)
- [x] `components/agility-components/PostsListing/PostsListing.client.tsx`
- [x] `components/agility-components/CaseStudyListing/CaseStudyItem.tsx`
- [x] `components/agility-components/CaseStudyListing/CaseStudyListing.client.tsx`
- [x] `components/agility-components/NEWAllResources/ResourceListingItem.tsx`
- [ ] `components/agility-components/EventListing/`
- [ ] `components/agility-components/PartnerListing/`
- [ ] `components/agility-components/LogoListing/` (CSS may need review)
- [ ] `components/agility-components/NEWAllResources/ResourceListing.client.tsx`
- [ ] `components/agility-components/FeaturedResources.tsx`
- [ ] `components/agility-components/LatestPosts.tsx`

### Phase 5: Agility Components - Special Features (In Progress)
- [x] `components/agility-components/Hero/Hero.tsx`
- [x] `components/agility-components/Carousel/Carousel.client.tsx`
- [x] `components/agility-components/CTABlocks.tsx`
- [ ] `components/agility-components/Testimonials/`
- [ ] `components/agility-components/Faqs.tsx`
- [ ] `components/agility-components/FeatureBlocks.tsx`
- [ ] `components/agility-components/Callout.tsx`
- [ ] `components/agility-components/RichTextArea.tsx`

### Phase 6: Agility Components - Forms & Interactive (In Progress)
- [x] `components/agility-components/SubmissionForm/`
- [x] `components/agility-components/Pricing/PricingPackagesModule.client.tsx`
- [ ] `components/agility-components/GatedDownload/`
- [ ] `components/agility-components/ScheduleADemo/`
- [ ] `components/agility-components/Pricing/GetPricePopup.tsx`
- [ ] `components/agility-components/TypeFormModule/`

### Phase 7: Agility Components - Details Pages (In Progress)
- [x] `components/agility-components/PostDetails.tsx`
- [x] `components/agility-components/ResourceDetails/ResourceDetails.tsx`
- [x] `components/agility-components/ResourceDetails/DownloadForm.client.tsx`
- [x] `components/agility-components/CaseStudyDetails/CaseStudyDetails.tsx`
- [ ] `components/agility-components/EventDetails/`
- [ ] `components/agility-components/PartnerDetails/`
- [ ] `components/agility-components/Podcast/`
- [ ] `components/agility-components/StarterTemplateDetails.tsx`

### Phase 8: Agility Components - Remaining
- [ ] `components/agility-components/Heading.tsx`
- [ ] `components/agility-components/GuideLinks.tsx`
- [ ] `components/agility-components/ReviewRotator/`
- [ ] `components/agility-components/G2CrowdReviewListing/`
- [ ] `components/agility-components/GartnerPeerInsightsBar.tsx`
- [ ] `components/agility-components/IntegrationListingModule/`
- [ ] `components/agility-components/NewIntegrationModule.tsx`
- [ ] `components/agility-components/VideoModule/`
- [ ] `components/agility-components/SplashImage/`
- [ ] `components/agility-components/VisualFeedback/`
- [ ] `components/agility-components/SearchResults/`

### Phase 9: CSS Files (In Progress)
- [x] `styles/input.css` - Added dark mode prose styles
- [ ] Review and update any custom CSS files in component directories

### Phase 10: Testing & Refinement
- [ ] Test all pages in dark mode (use Playwright and/or Chrome Devtools MCP)
- [ ] Verify contrast ratios for accessibility
- [ ] Check for any missed components
- [ ] Ensure images/logos work well in dark mode

## Notes
- Tailwind v4 uses `prefers-color-scheme` by default - no configuration needed
- All dark mode classes use the `dark:` prefix
- Brand colors (highlight, secondary) typically remain unchanged
- Focus on readability and contrast in dark mode

## Status
- Plan created: ✅
- Implementation: In progress
