/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\tquery supporting {\n\n\t\t\tcasestudyindustries {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tcasestudychallenges {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.SupportingDocument,
    "\n\t\t\tquery integrations {\n\t\t\t\tintegrations {\n\t\t\t\t\tcontentID\n\t\t\t\t\tfields {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcompanyDescription\n\t\t\t\t\t\tintegrationType {\n\t\t\t\t\t\t\tcontentID\n\t\t\t\t\t\t\tfields {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tuRL\n\t\t\t\t\t\tlogo {\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.IntegrationsDocument,
    "\n\t\tquery tags {\n\t\t\timplementationpartnertags {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.TagsDocument,
    "\n\t\tquery getPricingItems {\n\tpackagefeaturevalues(sort: \"properties.itemOrder\") {\n\t\tcontentID\n\t\tfields {\n\t\t\tpackageFeature {\n\t\t\tcontentID\n\t\t\t}\n\t\t\tpricingPackage {\n\t\t\tcontentID\n\t\t\t}\n\t\t\ttextValue\n\t\t\ttrueFalseValue\n\t\t}\n\t\tproperties {\n\t\t\titemOrder\n\t\t\treferenceName\n\t\t}\n\t}\n\n\tpricingcategories {\n\t\tcontentID\n\t\tfields {\n\t\t\tcategory\n\t\t}\n\t}\n\n\tprimarypackagefeaturelabels (sort: \"properties.itemOrder\") {\n\t\tcontentID\n\t\tfields {\n\t\t\tisPrimary\n\t\t\ttitle\n\t\t\tpricingCategory_ValueField\n\t\t\tdescription\n\t\t}\n\t\tproperties {\n\t\t\treferenceName\n\t\t\titemOrder\n\t\t}\n\t}\n\n\tpricingpackages(\n\t\tsort: \"properties.itemOrder\"\n\t\tfilter: \"fields.displayOnWebsite[eq]true\"\n\t) {\n\t\tcontentID\n\t\tfields {\n\t\t\tcTAButtonLabel\n\t\t\tcost\n\t\t\tsaleCost\n\t\t\tisMostPopular\n\t\t\ttitle\n\t\t\ticon {\n\t\t\t\turl\n\t\t\t\tfileSize\n\t\t\t\theight\n\t\t\t\twidth\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tcTAButton {\n\t\t\t\ttarget\n\t\t\t\thref\n\t\t\t\ttext\n\t\t\t}\n\t\t\tpricingPlan\n\t\t\tyearlyPricingPlan\n\t\t\tyearlyCTAButton {\n\t\t\t\thref\n\t\t\t\ttarget\n\t\t\t\ttext\n\t\t\t}\n\t\t\tyearlyCTAButtonLabel\n\t\t\tdescription\n\t\t\tyearlyCost\n\t\t\tyearlyPricingPlan\n\t\t\tyearlyDescription\n\t\t\tyearlySaleCost\n\t\t\tdisplayInManager\n\t\t\tdisplayOnWebsite\n\t\t}\n\t\tproperties {\n\t\t\treferenceName\n\t\t\titemOrder\n\t\t}\n\t}\n\n\t}\n": types.GetPricingItemsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery supporting {\n\n\t\t\tcasestudyindustries {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tcasestudychallenges {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery supporting {\n\n\t\t\tcasestudyindustries {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tcasestudychallenges {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\t\tquery integrations {\n\t\t\t\tintegrations {\n\t\t\t\t\tcontentID\n\t\t\t\t\tfields {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcompanyDescription\n\t\t\t\t\t\tintegrationType {\n\t\t\t\t\t\t\tcontentID\n\t\t\t\t\t\t\tfields {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tuRL\n\t\t\t\t\t\tlogo {\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery integrations {\n\t\t\t\tintegrations {\n\t\t\t\t\tcontentID\n\t\t\t\t\tfields {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcompanyDescription\n\t\t\t\t\t\tintegrationType {\n\t\t\t\t\t\t\tcontentID\n\t\t\t\t\t\t\tfields {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tuRL\n\t\t\t\t\t\tlogo {\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery tags {\n\t\t\timplementationpartnertags {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery tags {\n\t\t\timplementationpartnertags {\n\t\t\t\tcontentID\n\t\t\t\tfields {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery getPricingItems {\n\tpackagefeaturevalues(sort: \"properties.itemOrder\") {\n\t\tcontentID\n\t\tfields {\n\t\t\tpackageFeature {\n\t\t\tcontentID\n\t\t\t}\n\t\t\tpricingPackage {\n\t\t\tcontentID\n\t\t\t}\n\t\t\ttextValue\n\t\t\ttrueFalseValue\n\t\t}\n\t\tproperties {\n\t\t\titemOrder\n\t\t\treferenceName\n\t\t}\n\t}\n\n\tpricingcategories {\n\t\tcontentID\n\t\tfields {\n\t\t\tcategory\n\t\t}\n\t}\n\n\tprimarypackagefeaturelabels (sort: \"properties.itemOrder\") {\n\t\tcontentID\n\t\tfields {\n\t\t\tisPrimary\n\t\t\ttitle\n\t\t\tpricingCategory_ValueField\n\t\t\tdescription\n\t\t}\n\t\tproperties {\n\t\t\treferenceName\n\t\t\titemOrder\n\t\t}\n\t}\n\n\tpricingpackages(\n\t\tsort: \"properties.itemOrder\"\n\t\tfilter: \"fields.displayOnWebsite[eq]true\"\n\t) {\n\t\tcontentID\n\t\tfields {\n\t\t\tcTAButtonLabel\n\t\t\tcost\n\t\t\tsaleCost\n\t\t\tisMostPopular\n\t\t\ttitle\n\t\t\ticon {\n\t\t\t\turl\n\t\t\t\tfileSize\n\t\t\t\theight\n\t\t\t\twidth\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tcTAButton {\n\t\t\t\ttarget\n\t\t\t\thref\n\t\t\t\ttext\n\t\t\t}\n\t\t\tpricingPlan\n\t\t\tyearlyPricingPlan\n\t\t\tyearlyCTAButton {\n\t\t\t\thref\n\t\t\t\ttarget\n\t\t\t\ttext\n\t\t\t}\n\t\t\tyearlyCTAButtonLabel\n\t\t\tdescription\n\t\t\tyearlyCost\n\t\t\tyearlyPricingPlan\n\t\t\tyearlyDescription\n\t\t\tyearlySaleCost\n\t\t\tdisplayInManager\n\t\t\tdisplayOnWebsite\n\t\t}\n\t\tproperties {\n\t\t\treferenceName\n\t\t\titemOrder\n\t\t}\n\t}\n\n\t}\n"): (typeof documents)["\n\t\tquery getPricingItems {\n\tpackagefeaturevalues(sort: \"properties.itemOrder\") {\n\t\tcontentID\n\t\tfields {\n\t\t\tpackageFeature {\n\t\t\tcontentID\n\t\t\t}\n\t\t\tpricingPackage {\n\t\t\tcontentID\n\t\t\t}\n\t\t\ttextValue\n\t\t\ttrueFalseValue\n\t\t}\n\t\tproperties {\n\t\t\titemOrder\n\t\t\treferenceName\n\t\t}\n\t}\n\n\tpricingcategories {\n\t\tcontentID\n\t\tfields {\n\t\t\tcategory\n\t\t}\n\t}\n\n\tprimarypackagefeaturelabels (sort: \"properties.itemOrder\") {\n\t\tcontentID\n\t\tfields {\n\t\t\tisPrimary\n\t\t\ttitle\n\t\t\tpricingCategory_ValueField\n\t\t\tdescription\n\t\t}\n\t\tproperties {\n\t\t\treferenceName\n\t\t\titemOrder\n\t\t}\n\t}\n\n\tpricingpackages(\n\t\tsort: \"properties.itemOrder\"\n\t\tfilter: \"fields.displayOnWebsite[eq]true\"\n\t) {\n\t\tcontentID\n\t\tfields {\n\t\t\tcTAButtonLabel\n\t\t\tcost\n\t\t\tsaleCost\n\t\t\tisMostPopular\n\t\t\ttitle\n\t\t\ticon {\n\t\t\t\turl\n\t\t\t\tfileSize\n\t\t\t\theight\n\t\t\t\twidth\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tcTAButton {\n\t\t\t\ttarget\n\t\t\t\thref\n\t\t\t\ttext\n\t\t\t}\n\t\t\tpricingPlan\n\t\t\tyearlyPricingPlan\n\t\t\tyearlyCTAButton {\n\t\t\t\thref\n\t\t\t\ttarget\n\t\t\t\ttext\n\t\t\t}\n\t\t\tyearlyCTAButtonLabel\n\t\t\tdescription\n\t\t\tyearlyCost\n\t\t\tyearlyPricingPlan\n\t\t\tyearlyDescription\n\t\t\tyearlySaleCost\n\t\t\tdisplayInManager\n\t\t\tdisplayOnWebsite\n\t\t}\n\t\tproperties {\n\t\t\treferenceName\n\t\t\titemOrder\n\t\t}\n\t}\n\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;