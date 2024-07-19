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
import NewIntegrationListingModule from "./NewIntegrationListingModule";




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
	{ name: "NewIntegrationListingModule", module: NewIntegrationListingModule }
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
