import RichTextArea from "./RichTextArea";
import FeaturedPost from "./FeaturedPost";
import PostsListing from "./PostsListing/PostsListing.server";
import PostDetails from "./PostDetails";
import Heading from "./Heading";
import TextBlockWithImage from "./TextBlockWithImage";
import NoComponentFound from "./NoComponentFound";
import { CenteredContentPanel } from "./CenteredContentPanel";
import { LogoListingModule } from "./LogoListingModule/LogoListingModule.server";
import { VerticalContentPanelServer } from "./VerticalContentPanel/VerticalContentPanel.server";
import SingleTestimonialPanel from "./SingleTestimonialPanel";
import CaseStudyRotator from "./CaseStudyRotator/CaseStudyRotator";
import CenteredCTAPanel from "./CenteredCTAPanel";
import RightORLeftContentModule from "./RightORLeftContentModule";
import TriplePanelComparisonModule from "./TriplePanelComparisonModule";
import RightOrLeftSteps from "./RightOrLeftSteps";
import FeaturedResources from "./FeaturedResources";
import NewIntegrationListingModule from "./IntegrationListingModule/NewIntegrationListingModule";
import { TwoPanelFeatureComparison } from "./TwoPanelFeatureComparison/TwoPanelFeatureComparison.server";
import { Faqs } from "./Faqs";
import { TriplePanelModule } from "./TriplePanelModule";
import { GuideLinks } from "./GuideLinks";
import { NewIntegrationModule } from "./NewIntegrationModule";
import { RightOrLeftCaseStudyTestimonial } from "./RightOrLeftCaseStudyTestimonial";
import { TwoBoxContent } from "./2BoxContent";
import { G2CrowdReviewListing } from "./G2CrowdReviewListing/G2CrowdReviewListing";
import { CaseStudyListing } from "./CaseStudyListing/CaseStudyListing";
import { CaseStudyContentPanel } from "./CaseStudyDetails/CaseStudyContentPanel";
import { CaseStudyDetails } from "./CaseStudyDetails/CaseStudyDetails";
import { CaseStudyTechStack } from "./CaseStudyDetails/CaseStudyTechStack";
import { PartnerListing } from "./PartnerListing/PartnerListing";
import { PartnerContentPanel } from "./PartnerDetails/PartnerContentPanel";
import { PartnerDetails } from "./PartnerDetails/PartnerDetails";
import { Testimonials } from "./Testimonials/Testimonials";
import { SubmissionForm } from "./SubmissionForm/SubmissionForm";
import { TypeFormModule } from "./TypeFormModule/TypeFormModule";
import { PricingPackagesModule } from "./Pricing/PricingPackagesModule";
import { NEWFeaturedResource } from "./NEWFeaturedResource";
import { NEWDownloadableeBooks } from "./NEWDownloadableeBooks";
import { NEWWebinarDownload } from "./NEWWebinarDownload";
import { ScheduleADemo } from "./ScheduleADemo/ScheduleADemo";
import { Hero } from "./Hero/Hero";




// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
	{ name: "TextBlockWithImage", module: TextBlockWithImage },
	{ name: "Heading", module: Heading },
	{ name: "FeaturedPost", module: FeaturedPost },
	{ name: "PostsListing", module: PostsListing },
	{ name: "PostDetails", module: PostDetails },
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "CenteredContentPanel", module: CenteredContentPanel },
	{ name: "LogoListingModule", module: LogoListingModule },
	{ name: "VerticalContentPanel", module: VerticalContentPanelServer },
	{ name: "SingleTestimonialPanel", module: SingleTestimonialPanel },
	{ name: "CaseStudyRotator", module: CaseStudyRotator },
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
	{ name: "2BoxContent", "module": TwoBoxContent },
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
];


/**
 * Get the Agility Component/Module by name.
 * If the component is not found, a default component will be returned.
 * @param moduleName
 * @returns
 */
export const getModule = (moduleName: string): any | null => {

	if (!moduleName) return null;
	const obj = allModules.find(
		(m) => m.name.toLowerCase() === moduleName.toLowerCase()
	);
	if (!obj) return NoComponentFound;
	return obj.module
};
