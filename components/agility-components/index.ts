import RichTextArea from "./RichTextArea"

import PostDetails from "./PostDetails"
import Heading from "./Heading"
import TextBlockWithImage from "./TextBlockWithImage"
import NoComponentFound from "./NoComponentFound"
import { CenteredContentPanel } from "./CenteredContentPanel"
import { LogoListingModule } from "./LogoListingModule/LogoListingModule.server"

import { VerticalContentPanelServer } from "./VerticalContentPanel/VerticalContentPanel.server"
import SingleTestimonialPanel from "./SingleTestimonialPanel"
import CaseStudyRotator from "./CaseStudyRotator/CaseStudyRotator"
import CenteredCTAPanel from "./CenteredCTAPanel"
import RightORLeftContentModule from "./RightORLeftContentModule"
import TriplePanelComparisonModule from "./TriplePanelComparisonModule"
import RightOrLeftSteps from "./RightOrLeftSteps"
import FeaturedResources from "./FeaturedResources"
import NewIntegrationListingModule from "./IntegrationListingModule/NewIntegrationListingModule"
import { TwoPanelFeatureComparison } from "./TwoPanelFeatureComparison/TwoPanelFeatureComparison.server"
import { Faqs } from "./Faqs"
import { TriplePanelModule } from "./TriplePanelModule"
import { GuideLinks } from "./GuideLinks"
import { NewIntegrationModule } from "./NewIntegrationModule"
import { RightOrLeftCaseStudyTestimonial } from "./RightOrLeftCaseStudyTestimonial"
import { TwoBoxContent } from "./2BoxContent"
import { G2CrowdReviewListing } from "./G2CrowdReviewListing/G2CrowdReviewListing"
import { CaseStudyListing } from "./CaseStudyListing/CaseStudyListing"
import { CaseStudyContentPanel } from "./CaseStudyDetails/CaseStudyContentPanel"
import { CaseStudyDetails } from "./CaseStudyDetails/CaseStudyDetails"
import { CaseStudyTechStack } from "./CaseStudyDetails/CaseStudyTechStack"
import { PartnerListing } from "./PartnerListing/PartnerListing"
import { PartnerContentPanel } from "./PartnerDetails/PartnerContentPanel"
import { PartnerDetails } from "./PartnerDetails/PartnerDetails"
import { Testimonials } from "./Testimonials/Testimonials"
import { SubmissionForm } from "./SubmissionForm/SubmissionForm"
import { TypeFormModule } from "./TypeFormModule/TypeFormModule"
import { PricingPackagesModule } from "./Pricing/PricingPackagesModule"
import { NEWFeaturedResource } from "./NEWFeaturedResource"
import { NEWDownloadableeBooks } from "./NEWDownloadableeBooks"
import { NEWWebinarDownload } from "./NEWWebinarDownload"
import { ScheduleADemo } from "./ScheduleADemo/ScheduleADemo"
import { Hero } from "./Hero/Hero"
import { RightLeftContent } from "components/RightLeftContent"
import { LogoListing } from "./LogoListing/LogoListing.server"

import { PartnerLogoListing } from "./PartnerLogoListing/PartnerLogoListing.server"
import SubscribedThankYou from "./SubscribedThankYou"
import { SearchResults } from "./SearchResults/SearchResults"
import { FeatureBlocks } from "./FeatureBlocks"
import { ContentPanel } from "./ContentPanel"
import { Callout } from "./Callout"
import { NEWFeaturedCaseStudies } from "./NEWFeaturedCaseStudies"
import { NEWAllResources } from "./NEWAllResources/NEWAllResources"
import { Carousel } from "./Carousel/Carousel"
import { BestofBothWorlds2Paragraphs } from "components/BestofBothWorlds2Paragraphs/BestofBothWorlds2Paragraphs"
import { NewPostsFeatured } from "./NewPostsFeatured"
import PostListing from "./PostsListing/PostsListing.server"
import { UnUsedComponent } from "./UnUsedComponent"
import { EventListing } from "./EventListing/EventListing.server"
import { CTABlocks } from "./CTABlocks"
import { EventDetails } from "./EventDetails/EventDetails"
import { StarterTemplateListing } from "./StarterTemplateListing"
import { StarterTemplateDetails } from "./StarterTemplateDetails"
import { ResourceDetails } from "./ResourceDetails/ResourceDetails"
import { NEWeBookThankYou } from "./NEWeBookThankYou"
import { VideoModule } from "./VideoModule/VideoModule"
import { PodcastDetail } from "./Podcast/PodcastDetail"
import { GartnerPeerInsightsBar } from "./GartnerPeerInsightsBar"
import { ReviewRotator } from "./ReviewRotator/ReviewRotator"
import { LatestPosts } from "./LatestPosts"
import { GatedDownload } from "./GatedDownload/GatedDownload"
import { LogoListingModuleCopy } from "./LogoListingModuleCopy/LogoListingModuleCopy.server"
import { PodcastContentPanel } from "./Podcast/PodcastContentPanel"
import { PodcastListing } from "./Podcast/PodcastListing"
import { SplashImage } from "./SplashImage/SplashImage"
import { CalendlyScheduler } from "./CalendlyScheduler/CalendlyScheduler"

// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
	{ name: "TextBlockWithImage", module: TextBlockWithImage },
	{ name: "Heading", module: Heading },
	{ name: "PostDetails", module: PostDetails },
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "CenteredContentPanel", module: CenteredContentPanel },
	{ name: "LogoListingModule", module: LogoListingModule },
	{ name: "LogoListingModuleCopy", module: LogoListingModuleCopy },
	{ name: "LogoListing", module: LogoListing },
	{ name: "PartnerLogoListing", module: PartnerLogoListing },
	{ name: "VerticalContentPanel", module: VerticalContentPanelServer },
	{ name: "SingleTestimonialPanel", module: SingleTestimonialPanel },
	{ name: "CaseStudyRotator", module: CaseStudyRotator },
	{ name: "FeaturedCaseStudies", module: CaseStudyRotator },
	{ name: "CenteredCTAPanel", module: CenteredCTAPanel },
	{ name: "RightORLeftContentModule", module: RightORLeftContentModule },
	{ name: "TriplePanelComparisonModule", module: TriplePanelComparisonModule },
	{ name: "RightOrLeftSteps", module: RightOrLeftSteps },
	{ name: "FeaturedResources", module: FeaturedResources },
	{ name: "NewIntegrationListingModule", module: NewIntegrationListingModule },
	{ name: "TwoPanelFeatureComparison", module: TwoPanelFeatureComparison },
	{ name: "Faqs", module: Faqs },
	{ name: "TriplePanelModule", module: TriplePanelModule },
	{ name: "GuideLinks", module: GuideLinks },
	{ name: "NewIntegrationModule", module: NewIntegrationModule },
	{ name: "RightOrLeftCaseStudyTestimonial", module: RightOrLeftCaseStudyTestimonial },
	{ name: "2BoxContent", module: TwoBoxContent },
	{ name: "G2CrowdReviewListing", module: G2CrowdReviewListing },
	{ name: "CaseStudyListing", module: CaseStudyListing },
	{ name: "CaseStudyContentPanel", module: CaseStudyContentPanel },
	{ name: "CaseStudyDetails", module: CaseStudyDetails },
	{ name: "CaseStudyTechStack", module: CaseStudyTechStack },
	{ name: "PartnerListing", module: PartnerListing },
	{ name: "PartnerContentPanel", module: PartnerContentPanel },
	{ name: "PartnerDetails", module: PartnerDetails },
	{ name: "Testimonials", module: Testimonials },
	{ name: "SubmissionForm", module: SubmissionForm },
	{ name: "TypeFormModule", module: TypeFormModule },
	{ name: "PricingPackagesModule", module: PricingPackagesModule },
	{ name: "NEWFeaturedResource", module: NEWFeaturedResource },
	{ name: "NEWDownloadableeBooks", module: NEWDownloadableeBooks },
	{ name: "NEWWebinarDownload", module: NEWWebinarDownload },
	{ name: "ScheduleADemo", module: ScheduleADemo },
	{ name: "Hero", module: Hero },
	{ name: "RightLeftContent", module: RightLeftContent },
	{ name: "SubscribedThankYou", module: SubscribedThankYou },
	{ name: "SearchResults", module: SearchResults },
	{ name: "FeatureBlocks", module: FeatureBlocks },
	{ name: "ContentPanel", module: ContentPanel },
	{ name: "Callout", module: Callout },
	{ name: "NEWFeaturedCaseStudies", module: NEWFeaturedCaseStudies },
	{ name: "NEWAllResources", module: NEWAllResources },
	{ name: "Carousel", module: Carousel },
	{ name: "BestofBothWorlds2Paragraphs", module: BestofBothWorlds2Paragraphs },
	{ name: "NewPostsFeatured", module: NewPostsFeatured },
	{ name: "NewPostListing", module: PostListing },
	{ name: "MostViewedArticles", module: UnUsedComponent },
	{ name: "NewStayInTouch", module: UnUsedComponent },
	{ name: "Space", module: UnUsedComponent },
	{ name: "EventListing", module: EventListing },
	{ name: "EventDetails", module: EventDetails },
	{ name: "CTABlocks", module: CTABlocks },
	{ name: "StarterTemplateListing", module: StarterTemplateListing },
	{ name: "StarterTemplateDetails", module: StarterTemplateDetails },
	{ name: "ResourceDetails", module: ResourceDetails },
	{ name: "NEWeBookThankYou", module: NEWeBookThankYou },
	{ name: "VideoModule", module: VideoModule },
	{ name: "SplashImage", module: SplashImage },
	{ name: "GartnerPeerInsightsBar", module: GartnerPeerInsightsBar },
	{ name: "ReviewRotator", module: ReviewRotator },
	{ name: "LatestPosts", module: LatestPosts },
	{ name: "GatedDownload", module: GatedDownload },

	{ name: "PodcastDetail", module: PodcastDetail },
	{ name: "PodcastContentPanel", module: PodcastContentPanel },
	{ name: "PodcastSubscribe", module: UnUsedComponent },
	{ name: "PodcastListing", module: PodcastListing },
	{ name: "CalendlyScheduler", module: CalendlyScheduler },

]

/**
 * Get the Agility Component/Module by name.
 * If the component is not found, a default component will be returned.
 * @param moduleName
 * @returns
 */
export const getModule = (moduleName: string): any | null => {
	if (!moduleName) return null
	const obj = allModules.find((m) => m.name.toLowerCase() === moduleName.toLowerCase())
	if (!obj) return NoComponentFound
	return obj.module
}
