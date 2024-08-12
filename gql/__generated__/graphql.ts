/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type DynamicType = {
  __typename?: 'DynamicType';
  fieldName?: Maybe<Scalars['String']['output']>;
  menuTextFormula: Scalars['String']['output'];
  pageNameFormula: Scalars['String']['output'];
  referenceName: Scalars['String']['output'];
  titleFormula: Scalars['String']['output'];
  visibleOnMenu?: Maybe<Scalars['Boolean']['output']>;
  visibleOnSitemap?: Maybe<Scalars['Boolean']['output']>;
};

export type File = {
  __typename?: 'File';
  fileSize: Scalars['Int']['output'];
  label?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Gallery = {
  __typename?: 'Gallery';
  description?: Maybe<Scalars['String']['output']>;
  galleryId: Scalars['Int']['output'];
  media: Array<Maybe<Media>>;
  name: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  fileSize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  label?: Maybe<Scalars['String']['output']>;
  pixelHeight: Scalars['Int']['output'];
  pixelWidth: Scalars['Int']['output'];
  target?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ItemType = {
  __typename?: 'ItemType';
  contentID?: Maybe<Scalars['Int']['output']>;
  properties?: Maybe<PagePropertiesType>;
};



export type Media = {
  __typename?: 'Media';
  fileName: Scalars['String']['output'];
  modifiedOn: Scalars['DateTime']['output'];
  size: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type Page = {
  __typename?: 'Page';
  /** The dynamic of the item. */
  dynamic?: Maybe<DynamicType>;
  /** The exclude from output cache of the item. */
  excludeFromOutputCache?: Maybe<Scalars['Boolean']['output']>;
  /** The menu text of the item. */
  menuText?: Maybe<Scalars['String']['output']>;
  /** The name of the item. */
  name?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the item. */
  pageID?: Maybe<Scalars['Int']['output']>;
  /** The page type of the item. */
  pageType?: Maybe<Scalars['String']['output']>;
  /** The path of the item. */
  path?: Maybe<Scalars['String']['output']>;
  /** The properties of the item. */
  properties?: Maybe<PagePropertiesType>;
  /** The redirect URL of the item. */
  redirectUrl?: Maybe<Scalars['String']['output']>;
  /** The scripts of the item. */
  scripts?: Maybe<ScriptsType>;
  /** The secure page of the item. */
  securePage?: Maybe<Scalars['Boolean']['output']>;
  /** The SEO of the item. */
  seo?: Maybe<SeoType>;
  /** The template name of the item. */
  templateName?: Maybe<Scalars['String']['output']>;
  /** The title of the item. */
  title?: Maybe<Scalars['String']['output']>;
  /** The visible of the item. */
  visible?: Maybe<VisibleType>;
  /** The zones of the item. */
  zones?: Maybe<Array<Maybe<ZoneType>>>;
};


export type PageZonesArgs = {
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type PagePropertiesType = {
  __typename?: 'PagePropertiesType';
  modified?: Maybe<Scalars['DateTime']['output']>;
  state: Scalars['String']['output'];
  versionID?: Maybe<Scalars['Int']['output']>;
};

export type PropertiesType = {
  __typename?: 'PropertiesType';
  definitionName: Scalars['String']['output'];
  itemOrder: Scalars['Int']['output'];
  modified: Scalars['DateTime']['output'];
  referenceName: Scalars['String']['output'];
  state: Scalars['Int']['output'];
  versionID: Scalars['Int']['output'];
};

export type RedirectUrlType = {
  __typename?: 'RedirectUrlType';
  target: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Root = {
  __typename?: 'Root';
  ag_pages?: Maybe<Array<Maybe<Page>>>;
  ag_sitemapflat?: Maybe<Array<Maybe<SitemapFlat>>>;
  ag_sitemapnested?: Maybe<Array<Maybe<SitemapNested>>>;
  ag_urlredirections?: Maybe<Array<Maybe<UrlRedirection>>>;
  alltestimonials?: Maybe<Array<Maybe<Testimonial>>>;
  allyoursitesinoneinstan7bdb2c?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  allyoursitesinoneinstanab7ac2?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  allyoursitesinoneinstanabf7de?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  allyoursitesinoneinstane0023f?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  blogauthors?: Maybe<Array<Maybe<Blogauthor>>>;
  blogcategories?: Maybe<Array<Maybe<Blogcategory>>>;
  bloglist?: Maybe<Array<Maybe<Blogpost>>>;
  blogposts?: Maybe<Array<Maybe<Blogpost>>>;
  blogtags?: Maybe<Array<Maybe<Blogtag>>>;
  callout?: Maybe<Array<Maybe<Callout>>>;
  callout230?: Maybe<Array<Maybe<Callout>>>;
  callout234?: Maybe<Array<Maybe<Callout>>>;
  casestudies?: Maybe<Array<Maybe<Casestudy>>>;
  casestudychallenge?: Maybe<Array<Maybe<Casestudychallenge>>>;
  casestudychallenges?: Maybe<Array<Maybe<Casestudychallenge>>>;
  casestudyindustries?: Maybe<Array<Maybe<Casestudyindustry>>>;
  casestudyindustry?: Maybe<Array<Maybe<Casestudyindustry>>>;
  casestudyproducts?: Maybe<Array<Maybe<Casestudyproduct>>>;
  cmscontentpanels?: Maybe<Array<Maybe<Contentpanel>>>;
  cmscontentpanelsform?: Maybe<Array<Maybe<Contentpanelform>>>;
  cmsfasterblocks?: Maybe<Array<Maybe<Featureblock>>>;
  cmsfeatureblocks?: Maybe<Array<Maybe<Featureblock>>>;
  cmsfeaturetags?: Maybe<Array<Maybe<Customtag>>>;
  cmstabpanels?: Maybe<Array<Maybe<Tabpanel>>>;
  comparisonfeatures?: Maybe<Array<Maybe<Comparisonfeatures>>>;
  comparisonplatformfeatures?: Maybe<Array<Maybe<Comparisonplatformfeatures>>>;
  comparisonplatforms?: Maybe<Array<Maybe<Comparisonplatform>>>;
  contactus?: Maybe<Array<Maybe<Submissionform>>>;
  contactus416?: Maybe<Array<Maybe<Submissionform>>>;
  contentpanel?: Maybe<Array<Maybe<Contentpanel>>>;
  contentpanel228?: Maybe<Array<Maybe<Contentpanel>>>;
  contentpanel346?: Maybe<Array<Maybe<Contentpanel>>>;
  contentpanel347?: Maybe<Array<Maybe<Contentpanel>>>;
  contentpanel481?: Maybe<Array<Maybe<Contentpanel>>>;
  contentpanel1764?: Maybe<Array<Maybe<Contentpanel>>>;
  ctablocks?: Maybe<Array<Maybe<Ctablocks>>>;
  ctablocks493?: Maybe<Array<Maybe<Ctablocks>>>;
  ctablocks515?: Maybe<Array<Maybe<Ctablocks>>>;
  ctablocks719?: Maybe<Array<Maybe<Ctablocks>>>;
  customerreviews?: Maybe<Array<Maybe<Reviews>>>;
  customers?: Maybe<Array<Maybe<Logo>>>;
  developertestimonials?: Maybe<Array<Maybe<Testimonial>>>;
  dynamicpagemappings?: Maybe<Array<Maybe<Dynamicpagemapping>>>;
  ecommerceplatforms?: Maybe<Array<Maybe<Logo>>>;
  employeetestimonials?: Maybe<Array<Maybe<Testimonial>>>;
  eventlisting?: Maybe<Array<Maybe<Eventlisting>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventtypes?: Maybe<Array<Maybe<Eventtype>>>;
  faqs?: Maybe<Array<Maybe<Faqs>>>;
  faqs233?: Maybe<Array<Maybe<Faqs>>>;
  faqs668?: Maybe<Array<Maybe<Faqs>>>;
  faqs916?: Maybe<Array<Maybe<Faqs>>>;
  featureblocks?: Maybe<Array<Maybe<Featureblock>>>;
  featureblockswithtext?: Maybe<Array<Maybe<Featureblockswithtext>>>;
  featuredcasestudies?: Maybe<Array<Maybe<Featuredcasestudies>>>;
  featuredcasestudies2579?: Maybe<Array<Maybe<Featuredcasestudies>>>;
  featuredplancta?: Maybe<Array<Maybe<Featuredplancta>>>;
  featuredresources?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348432?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348499?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348554?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348555?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348566?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources3343484324def200?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources3343484324e4b11e?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348432400d390?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources334348432439?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources3343484324103cff?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredresources33434843247670f3?: Maybe<Array<Maybe<Featuredresources>>>;
  featuredreview?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview1176?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview1177?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview1393?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview1394?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview1395?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview2245?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview11761600?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featuredreview13941402?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  featurelist?: Maybe<Array<Maybe<Featurelistitem>>>;
  feedbackloop?: Maybe<Array<Maybe<Faqitem>>>;
  feedbackloopfeaturelist?: Maybe<Array<Maybe<Featurelistitem>>>;
  feedbacklooplist?: Maybe<Array<Maybe<Faqitem>>>;
  g2crowdreviewlisting?: Maybe<Array<Maybe<G2crowdreviewlisting>>>;
  gatedcontentdownloads?: Maybe<Array<Maybe<Contentpanel>>>;
  gateddownload?: Maybe<Array<Maybe<Gateddownload>>>;
  gettingstarteditems?: Maybe<Array<Maybe<Gettingstarteditem>>>;
  globalfooter?: Maybe<Array<Maybe<Globalfooter>>>;
  globalheader?: Maybe<Array<Maybe<Globalheader>>>;
  implementationonboardingprocesstabs?: Maybe<Array<Maybe<Tabpanel>>>;
  implementationpartnerfaqs?: Maybe<Array<Maybe<Faqitem>>>;
  implementationpartners?: Maybe<Array<Maybe<Partner>>>;
  implementationpartnertags?: Maybe<Array<Maybe<Customtag>>>;
  implementationstepsdummycontent?: Maybe<Array<Maybe<Stepforimplementation>>>;
  infobox?: Maybe<Array<Maybe<Infobox>>>;
  integrationlogos?: Maybe<Array<Maybe<Logo>>>;
  integrationpartnerfaqs?: Maybe<Array<Maybe<Faqitem>>>;
  integrations?: Maybe<Array<Maybe<Integrations>>>;
  integrationspartners?: Maybe<Array<Maybe<Partner>>>;
  integrationspartnerstags?: Maybe<Array<Maybe<Customtag>>>;
  integrationtypes?: Maybe<Array<Maybe<Integrationtype>>>;
  jobpostings?: Maybe<Array<Maybe<Job>>>;
  landingpagesdevelopers?: Maybe<Array<Maybe<Contentpanel>>>;
  latestposts?: Maybe<Array<Maybe<Latestposts>>>;
  leadershipteam?: Maybe<Array<Maybe<Person>>>;
  leadgenerationcallouts?: Maybe<Array<Maybe<Calloutitem>>>;
  linksdummycontent?: Maybe<Array<Maybe<Links>>>;
  listoffeatures?: Maybe<Array<Maybe<Featurelistitem>>>;
  logolisting?: Maybe<Array<Maybe<Logolisting>>>;
  logolisting718?: Maybe<Array<Maybe<Logolisting>>>;
  logolisting2559?: Maybe<Array<Maybe<Logolisting>>>;
  logolisting2560?: Maybe<Array<Maybe<Logolisting>>>;
  logolisting25592578?: Maybe<Array<Maybe<Logolisting>>>;
  marketplaceapps?: Maybe<Array<Maybe<Marketplace_App>>>;
  marketplacecategories?: Maybe<Array<Maybe<Marketplacecategory>>>;
  marketplacepublishers?: Maybe<Array<Maybe<Marketplacepublisher>>>;
  modulebackgrounds?: Maybe<Array<Maybe<Modulebackground>>>;
  mostviewedarticles?: Maybe<Array<Maybe<Mostviewedarticles>>>;
  mostviewedarticles1151?: Maybe<Array<Maybe<Mostviewedarticles>>>;
  new_bestofbothworldsmoa4b6df?: Maybe<Array<Maybe<Bestofbothworldsmodule>>>;
  new_casestudyrotator?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1147?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1149?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1149b1b6f7?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1150?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1160?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1160a12801?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1160af3b6a?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1161?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1164?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1164a64ab1?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1165?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator2391?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator11498c6e86?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator11605f2000?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator11606d3916?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator11609f600d?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator114956dc9a?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator116456a2b7?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1160087a73?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1160713c79?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_casestudyrotator1160786538?: Maybe<Array<Maybe<Casestudyrotator>>>;
  new_centeredcontentpanel?: Maybe<Array<Maybe<Centeredcontentpanel>>>;
  new_centeredcontentpanel2403?: Maybe<Array<Maybe<Centeredcontentpanel>>>;
  new_centeredcontentpanel2692?: Maybe<Array<Maybe<Centeredcontentpanel>>>;
  new_centeredcontentpanele0ebae?: Maybe<Array<Maybe<Centeredcontentpanel>>>;
  new_centeredctapanel?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel823?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel922?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel923?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel924?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel926?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel927?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1035?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1066?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1071?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1072?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1138?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1165?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1165c0a856?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1166?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1211?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1212?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1327?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1328?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1604?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1618?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1618a7cfa4?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1618baa90e?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1618c06987?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1618f06c24?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1619?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1621?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1775?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2247?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2313?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2314?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2317?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2338?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2339?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2355?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2392?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2411?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2412?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2422?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2423?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2562?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2563?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2615?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2616?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel2645?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16181ea1dd?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16185e0b1e?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16188c4705?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16188f1ef7?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel23130eb512?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel26157bb742fe?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel161831a962?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel161845fe17?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel161876eba3?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel161887c161?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1165131c9b?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel1618762d7e?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel8232375?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel8232386?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16181650?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16181819?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel16187460d0?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel23132460?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel23382466?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel25622581?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel26152670?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel26152680?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel26152722?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_centeredctapanel233890987f?: Maybe<Array<Maybe<Centeredctapanel>>>;
  new_downloadableebooks?: Maybe<Array<Maybe<Newdownloadableebooks>>>;
  new_downloadableebooks205ffdd79?: Maybe<Array<Maybe<Newdownloadableebooks>>>;
  new_downloadableebooks2074?: Maybe<Array<Maybe<Newdownloadableebooks>>>;
  new_featurecomparisoncha64c936?: Maybe<Array<Maybe<Featurecomparisonchart>>>;
  new_featurecomparisonchac37a21?: Maybe<Array<Maybe<Featurecomparisonchart>>>;
  new_featurecomparisonchae9fbeb?: Maybe<Array<Maybe<Featurecomparisonchart>>>;
  new_featuredcasestudies?: Maybe<Array<Maybe<Newfeaturedcasestudies>>>;
  new_featuredcasestudies2d96143?: Maybe<Array<Maybe<Newfeaturedcasestudies>>>;
  new_featuredcasestudies2076?: Maybe<Array<Maybe<Newfeaturedcasestudies>>>;
  new_gartnerpeerinsights01dfad?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsights1f1e3c?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsights4b867c?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsights5ea431?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsights6d1e61?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsights57ee3a?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsights568918?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsightsa429b4?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsightsbe81ab?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsightsc7fe3d?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsightsd1aae8?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_gartnerpeerinsightsff7898?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  new_guidelinks?: Maybe<Array<Maybe<Guidelinks>>>;
  new_guidelinks2421?: Maybe<Array<Maybe<Guidelinks>>>;
  new_guidelinks2557?: Maybe<Array<Maybe<Guidelinks>>>;
  new_guidelinks2558?: Maybe<Array<Maybe<Guidelinks>>>;
  new_guidelinks2681?: Maybe<Array<Maybe<Guidelinks>>>;
  new_guidelinks25572576?: Maybe<Array<Maybe<Guidelinks>>>;
  new_logolistingmodule?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule116a2291f?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule116b36579?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule116b77848?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule116ddeb97?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule116e7cd0b?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule145f7aff2?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule233de0ca1?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule265a27eeb?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule265bf91dc?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule1161f443a?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule1163?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule1164e41ea?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule1166a87e4?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule1454?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2250?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2332?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2333?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2335ecb7d?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2338b797f?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2350?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2596?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2641?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2643?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2652?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2693?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2698dfa48?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2699?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2723?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule2724?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule11661e82a?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule23363f1bc?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmodule233952448?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_logolistingmoduled44d8469?: Maybe<Array<Maybe<Logolistingmodule>>>;
  new_reviewrotator?: Maybe<Array<Maybe<Reviewrotator>>>;
  new_reviewrotator1154?: Maybe<Array<Maybe<Reviewrotator>>>;
  new_reviewrotator1583?: Maybe<Array<Maybe<Reviewrotator>>>;
  new_reviewrotator2248?: Maybe<Array<Maybe<Reviewrotator>>>;
  new_reviewrotator2353?: Maybe<Array<Maybe<Reviewrotator>>>;
  new_rightorleftcontent015ec9?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent0e334b?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent3a97e8?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent3c4508?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent3f8463?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent4c666f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent5bebaf?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent5d6eeb?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent6d47a6?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent6faf2e?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent7d6189?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent7e6088?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent7ecea5?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent8b10b5?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent8d9041?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent9c2dfa?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent9c8da7?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent10d555?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent86b3c0?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent88ccff?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent89e83f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent304cc0?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent330bbc?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent494de2?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent889c5a?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent943a5c?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent1142d6?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent1781f0?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent3730f1?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent5047a2?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent19301d?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent32553b?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent67193f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent74327f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent213553?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent496926?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontent656217?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontenta81f8c?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontenta84e95?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontenta7701c?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentab419e?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentb18b4a?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentb788c7?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentb2144b?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentba8e5d?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentba200b?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentbe9314?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentbf99d5?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentc97d62?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentc965b6?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentca4200?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentcd3027?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentce20f1?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentcef947?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentcf43c1?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentd11beb?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentd19b83?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentd72b36?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentd3847b?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontente0412f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontente06400?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontente5f36f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontente9d883?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontente83eea?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontente26338?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentf2bbca?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentf86a25?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentf587c7?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentf3812f?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftcontentfeff34?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  new_rightorleftsteps?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps231af1b86?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps232b273f0?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261a847f3?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261e2e349?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261ea05e2?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261f0636e?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261fd76d0?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2329b494f?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2330?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2443?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2457?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2612?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2612d0688?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2613?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2614?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2614c4f75?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2615b5fea?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2617da742?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2618c069a?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2619a604b?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps2619ea310?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps24459d448?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps232399b61?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261051d48?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps23156943f?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps231627418?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261840000?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_rightorleftsteps261904659?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  new_singletestimonialpan6f3ab7?: Maybe<Array<Maybe<Singletestimonialpanel>>>;
  new_singletestimonialpan73a952?: Maybe<Array<Maybe<Singletestimonialpanel>>>;
  new_singletestimonialpana62ac1?: Maybe<Array<Maybe<Singletestimonialpanel>>>;
  new_singletestimonialpanc0f291?: Maybe<Array<Maybe<Singletestimonialpanel>>>;
  new_triplepanelcompariso0a946c?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcompariso8c46d2?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcompariso52b888?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcompariso52c3e4?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcompariso947f50?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcompariso8201e1?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcompariso85921d?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcomparisoa6e07c?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcomparisoad0187?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcomparisob088a5?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelcomparisoc57e30?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  new_triplepanelmodule?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule180a7c802?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule194b97b0a?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule194fd285c?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule233ea2206?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule240c0a7af?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule1087?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule1806?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule1807e1006?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule1944?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2176?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2238?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2243?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2257?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2310?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2330a35cb?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2337?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2351?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2408?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2410?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2410f94e9?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2415?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2415d875c?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2419?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2685?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule18004baf6?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule233898c7f?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule2409360bd?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_triplepanelmodule180663804?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  new_twopanelfeaturecomp014939?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp0abaf7?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp1a6fad?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp49d89b?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp63ae09?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp84d5d0?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp517dcc?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp8320d1?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp57564a?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecomp366808?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_twopanelfeaturecompb30038?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  new_verticalcontentpanel?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2aba10?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel4c8621?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel5f3e5d?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel13f99d?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel69dcdd?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel99eba4?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel911c4b?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel1751?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel1757?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel1821?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel1847?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel1876?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2077?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2157?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2174?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2178?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2252?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2406?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2417?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel2618?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanel8829a8?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelbabfd1?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelbb0a29?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelbba867?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelbbf644?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelbf14cf?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelcd84bd?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpaneld91aca?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanele409fc?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_verticalcontentpanelf5a29f?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  new_videomodule?: Maybe<Array<Maybe<Videomodule>>>;
  new_webinardownload?: Maybe<Array<Maybe<Newwebinardownload>>>;
  new_webinardownload2058?: Maybe<Array<Maybe<Newwebinardownload>>>;
  new_webinardownload2075?: Maybe<Array<Maybe<Newwebinardownload>>>;
  newbestofbothworldsmodule?: Maybe<Array<Maybe<Bestofbothworldsmodule>>>;
  newblogcategories?: Maybe<Array<Maybe<Newblogcategory>>>;
  newcasestudyrotator?: Maybe<Array<Maybe<Casestudyrotator>>>;
  newcenteredcontentpanel?: Maybe<Array<Maybe<Centeredcontentpanel>>>;
  newcenteredctapanel?: Maybe<Array<Maybe<Centeredctapanel>>>;
  newdownloadableebooks?: Maybe<Array<Maybe<Newdownloadableebooks>>>;
  newfeaturecomparisonchart?: Maybe<Array<Maybe<Featurecomparisonchart>>>;
  newfeaturedcasestudies?: Maybe<Array<Maybe<Newfeaturedcasestudies>>>;
  newfeaturedresource?: Maybe<Array<Maybe<Newfeaturedresource>>>;
  newgartnerpeerinsightsbar?: Maybe<Array<Maybe<Gartnerpeerinsightsbar>>>;
  newguidelinks?: Maybe<Array<Maybe<Guidelinks>>>;
  newlogolistingmodule?: Maybe<Array<Maybe<Logolistingmodule>>>;
  newpricingchangesfaqs?: Maybe<Array<Maybe<Faqitem>>>;
  newpricingchangespartnersfaq?: Maybe<Array<Maybe<Faqitem>>>;
  newpricingpackagesmodule?: Maybe<Array<Maybe<Pricingpackagesmodule>>>;
  newreviewrotator?: Maybe<Array<Maybe<Reviewrotator>>>;
  newrightorleftcontentmodule?: Maybe<Array<Maybe<Rightorleftcontentmodule>>>;
  newrightorleftsteps?: Maybe<Array<Maybe<Rightorleftsteps>>>;
  newsingletestimonialpanel?: Maybe<Array<Maybe<Singletestimonialpanel>>>;
  newtriplepanelcomparisonmodule?: Maybe<Array<Maybe<Triplepanelcomparisonmodule>>>;
  newtriplepanelmodule?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  newtwopanelfeaturecomparison?: Maybe<Array<Maybe<Twopanelfeaturecomparison>>>;
  newverticalcontentpanel?: Maybe<Array<Maybe<Verticalcontentpanel>>>;
  newvideomodule?: Maybe<Array<Maybe<Videomodule>>>;
  newwebinardownload?: Maybe<Array<Maybe<Newwebinardownload>>>;
  onlythebestauthenticationca054f?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  packagedetailspage?: Maybe<Array<Maybe<Faqitem>>>;
  packagefeaturevalues?: Maybe<Array<Maybe<Packagefeaturevalues>>>;
  pagemanagement?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  pagemanagement1052?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  partnerlogo?: Maybe<Array<Maybe<Logo>>>;
  partnertestimonials?: Maybe<Array<Maybe<Testimonial>>>;
  partnertiers?: Maybe<Array<Maybe<Partnertier>>>;
  pasteventslisting?: Maybe<Array<Maybe<Eventlisting>>>;
  podcast?: Maybe<Array<Maybe<Podcast>>>;
  pricingcategories?: Maybe<Array<Maybe<Pricingcategories>>>;
  pricingpackages?: Maybe<Array<Maybe<Pricingpackages>>>;
  pricingplancomponents?: Maybe<Array<Maybe<Pricingplancomponent>>>;
  pricingplans?: Maybe<Array<Maybe<Pricingplan>>>;
  pricingplantiers?: Maybe<Array<Maybe<Pricingplantier>>>;
  primarypackagefeaturelabels?: Maybe<Array<Maybe<Packagefeatures>>>;
  productreleases?: Maybe<Array<Maybe<Productreleases>>>;
  productupdatesq42020?: Maybe<Array<Maybe<Faqitem>>>;
  projecttemplateframeworks?: Maybe<Array<Maybe<Projecttemplateframework>>>;
  projecttemplates?: Maybe<Array<Maybe<Projecttemplate>>>;
  quickdevelopmentandfastp734af0?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  recognition?: Maybe<Array<Maybe<Logo>>>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  resourcescallouts?: Maybe<Array<Maybe<Calloutitem>>>;
  resourcetopics?: Maybe<Array<Maybe<Newresourcetopic>>>;
  resourcetypes?: Maybe<Array<Maybe<Resourcetype>>>;
  richtextarea?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1196?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1346?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1347?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1350?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1612?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1653?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1928?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1929?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1930?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea1931?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextarea19301943?: Maybe<Array<Maybe<Richtextarea>>>;
  richtextareac9ec123a?: Maybe<Array<Maybe<Richtextarea>>>;
  rightleftcontent?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent531?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent574?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent692?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent1409?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent1410?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent2556?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent2557?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent14091729?: Maybe<Array<Maybe<Rightleftcontent>>>;
  rightleftcontent25562575?: Maybe<Array<Maybe<Rightleftcontent>>>;
  security?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  security2232?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  security2533?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  sharedctablocks?: Maybe<Array<Maybe<Ctablock>>>;
  singlepointoftruth?: Maybe<Array<Maybe<Triplepanelmodule>>>;
  singletemp?: Maybe<Array<Maybe<Temp>>>;
  sitesearchsettings?: Maybe<Array<Maybe<Sitesearchsettings>>>;
  socialfollowlinks?: Maybe<Array<Maybe<Socialfollowlink>>>;
  stayintouch?: Maybe<Array<Maybe<Stayintouch>>>;
  submissionform?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform714?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1616?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1701?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1702?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1736?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1737?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform2225?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform2242?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform2354?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform2478?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform2479?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022c474ab5ddaf5?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022c474abbe?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141023?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151629?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151638?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151639?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151807?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151808?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform17011705?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform24782494?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform43897141?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform71410221606?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform71410222525?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161516381665?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161516381666?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161516381792?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161516381793?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161518071830?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161518071859?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163816651b322b5?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163817921a6770a?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615180718301f20333?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022160621bc4e46?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022160621c5c966?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022160621f061e6?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151807183017b79f4?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform16151807183018fea52?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform71410221606215d4455?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform71410221606216eac06?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161516381665190a3b7?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform161518071830169ba5f?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform714102216062115?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform714102216062204?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163816651878?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163816651890?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163817921920?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163817922084?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615180718301977?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform4389714131090283?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform7141022160619265c0c?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform71410221606216389aa?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615163816651491073?: Maybe<Array<Maybe<Submissionform>>>;
  submissionform1615180718301285360?: Maybe<Array<Maybe<Submissionform>>>;
  submissionformac7a2d81?: Maybe<Array<Maybe<Submissionform>>>;
  technologypartners?: Maybe<Array<Maybe<Partner>>>;
  temp?: Maybe<Array<Maybe<Temp>>>;
  testimonials?: Maybe<Array<Maybe<Testimonial>>>;
  testimonials227?: Maybe<Array<Maybe<Testimonials>>>;
  testimonials232?: Maybe<Array<Maybe<Testimonials>>>;
  testimonials307?: Maybe<Array<Maybe<Testimonials>>>;
  testimonials2561?: Maybe<Array<Maybe<Testimonials>>>;
  testimonials2562?: Maybe<Array<Maybe<Testimonials>>>;
  testimonials25612580?: Maybe<Array<Maybe<Testimonials>>>;
  whitegloveservice?: Maybe<Array<Maybe<Faqitem>>>;
  workingatagilitypanels?: Maybe<Array<Maybe<Tabpanel>>>;
};


export type RootAg_PagesArgs = {
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  pageID?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootAg_SitemapflatArgs = {
  channelName?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};


export type RootAg_SitemapnestedArgs = {
  channelName?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};


export type RootAg_UrlredirectionsArgs = {
  lastAccessDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type RootAlltestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootAllyoursitesinoneinstan7bdb2cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootAllyoursitesinoneinstanab7ac2Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootAllyoursitesinoneinstanabf7deArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootAllyoursitesinoneinstane0023fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootBlogauthorsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootBlogcategoriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootBloglistArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootBlogpostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootBlogtagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCalloutArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCallout230Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCallout234Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCasestudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCasestudychallengeArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCasestudychallengesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCasestudyindustriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCasestudyindustryArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCasestudyproductsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCmscontentpanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCmscontentpanelsformArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCmsfasterblocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCmsfeatureblocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCmsfeaturetagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCmstabpanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootComparisonfeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootComparisonplatformfeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootComparisonplatformsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContactusArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContactus416Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContentpanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContentpanel228Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContentpanel346Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContentpanel347Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContentpanel481Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootContentpanel1764Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCtablocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCtablocks493Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCtablocks515Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCtablocks719Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCustomerreviewsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootCustomersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootDevelopertestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootDynamicpagemappingsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootEcommerceplatformsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootEmployeetestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootEventlistingArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootEventsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootEventtypesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFaqsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFaqs233Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFaqs668Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFaqs916Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeatureblocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeatureblockswithtextArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedcasestudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedcasestudies2579Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedplanctaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresourcesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348432Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348499Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348554Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348555Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348566Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources3343484324def200Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources3343484324e4b11eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348432400d390Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources334348432439Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources3343484324103cffArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedresources33434843247670f3Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreviewArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview1176Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview1177Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview1393Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview1394Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview1395Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview2245Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview11761600Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturedreview13941402Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeaturelistArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeedbackloopArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeedbackloopfeaturelistArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootFeedbacklooplistArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootG2crowdreviewlistingArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootGatedcontentdownloadsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootGateddownloadArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootGettingstarteditemsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootGlobalfooterArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootGlobalheaderArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootImplementationonboardingprocesstabsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootImplementationpartnerfaqsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootImplementationpartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootImplementationpartnertagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootImplementationstepsdummycontentArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootInfoboxArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootIntegrationlogosArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootIntegrationpartnerfaqsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootIntegrationsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootIntegrationspartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootIntegrationspartnerstagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootIntegrationtypesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootJobpostingsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLandingpagesdevelopersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLatestpostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLeadershipteamArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLeadgenerationcalloutsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLinksdummycontentArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootListoffeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLogolistingArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLogolisting718Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLogolisting2559Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLogolisting2560Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLogolisting25592578Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMarketplaceappsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMarketplacecategoriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMarketplacepublishersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootModulebackgroundsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMostviewedarticlesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMostviewedarticles1151Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Bestofbothworldsmoa4b6dfArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_CasestudyrotatorArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1147Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1149Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1149b1b6f7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1150Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1160Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1160a12801Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1160af3b6aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1161Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1164Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1164a64ab1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1165Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator2391Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator11498c6e86Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator11605f2000Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator11606d3916Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator11609f600dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator114956dc9aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator116456a2b7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1160087a73Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1160713c79Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Casestudyrotator1160786538Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_CenteredcontentpanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredcontentpanel2403Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredcontentpanel2692Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredcontentpanele0ebaeArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_CenteredctapanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel823Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel922Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel923Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel924Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel926Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel927Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1035Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1066Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1071Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1072Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1138Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1165Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1165c0a856Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1166Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1211Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1212Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1327Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1328Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1604Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1618Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1618a7cfa4Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1618baa90eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1618c06987Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1618f06c24Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1619Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1621Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1775Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2247Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2313Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2314Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2317Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2338Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2339Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2355Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2392Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2411Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2412Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2422Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2423Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2562Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2563Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2615Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2616Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel2645Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16181ea1ddArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16185e0b1eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16188c4705Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16188f1ef7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel23130eb512Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel26157bb742feArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel161831a962Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel161845fe17Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel161876eba3Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel161887c161Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1165131c9bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel1618762d7eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel8232375Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel8232386Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16181650Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16181819Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel16187460d0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel23132460Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel23382466Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel25622581Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel26152670Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel26152680Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel26152722Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Centeredctapanel233890987fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_DownloadableebooksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Downloadableebooks205ffdd79Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Downloadableebooks2074Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Featurecomparisoncha64c936Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Featurecomparisonchac37a21Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Featurecomparisonchae9fbebArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_FeaturedcasestudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Featuredcasestudies2d96143Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Featuredcasestudies2076Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights01dfadArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights1f1e3cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights4b867cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights5ea431Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights6d1e61Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights57ee3aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsights568918Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsightsa429b4Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsightsbe81abArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsightsc7fe3dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsightsd1aae8Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Gartnerpeerinsightsff7898Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_GuidelinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Guidelinks2421Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Guidelinks2557Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Guidelinks2558Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Guidelinks2681Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Guidelinks25572576Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_LogolistingmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule116a2291fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule116b36579Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule116b77848Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule116ddeb97Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule116e7cd0bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule145f7aff2Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule233de0ca1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule265a27eebArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule265bf91dcArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule1161f443aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule1163Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule1164e41eaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule1166a87e4Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule1454Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2250Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2332Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2333Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2335ecb7dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2338b797fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2350Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2596Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2641Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2643Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2652Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2693Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2698dfa48Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2699Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2723Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule2724Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule11661e82aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule23363f1bcArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmodule233952448Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Logolistingmoduled44d8469Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_ReviewrotatorArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Reviewrotator1154Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Reviewrotator1583Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Reviewrotator2248Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Reviewrotator2353Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent015ec9Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent0e334bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent3a97e8Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent3c4508Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent3f8463Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent4c666fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent5bebafArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent5d6eebArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent6d47a6Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent6faf2eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent7d6189Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent7e6088Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent7ecea5Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent8b10b5Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent8d9041Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent9c2dfaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent9c8da7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent10d555Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent86b3c0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent88ccffArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent89e83fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent304cc0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent330bbcArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent494de2Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent889c5aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent943a5cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent1142d6Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent1781f0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent3730f1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent5047a2Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent19301dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent32553bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent67193fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent74327fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent213553Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent496926Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontent656217Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontenta81f8cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontenta84e95Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontenta7701cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentab419eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentb18b4aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentb788c7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentb2144bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentba8e5dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentba200bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentbe9314Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentbf99d5Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentc97d62Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentc965b6Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentca4200Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentcd3027Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentce20f1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentcef947Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentcf43c1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentd11bebArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentd19b83Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentd72b36Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentd3847bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontente0412fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontente06400Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontente5f36fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontente9d883Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontente83eeaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontente26338Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentf2bbcaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentf86a25Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentf587c7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentf3812fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftcontentfeff34Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_RightorleftstepsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps231af1b86Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps232b273f0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261a847f3Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261e2e349Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261ea05e2Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261f0636eArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261fd76d0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2329b494fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2330Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2443Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2457Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2612Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2612d0688Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2613Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2614Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2614c4f75Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2615b5feaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2617da742Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2618c069aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2619a604bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps2619ea310Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps24459d448Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps232399b61Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261051d48Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps23156943fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps231627418Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261840000Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Rightorleftsteps261904659Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Singletestimonialpan6f3ab7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Singletestimonialpan73a952Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Singletestimonialpana62ac1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Singletestimonialpanc0f291Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso0a946cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso8c46d2Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso52b888Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso52c3e4Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso947f50Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso8201e1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcompariso85921dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcomparisoa6e07cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcomparisoad0187Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcomparisob088a5Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelcomparisoc57e30Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_TriplepanelmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule180a7c802Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule194b97b0aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule194fd285cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule233ea2206Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule240c0a7afArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule1087Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule1806Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule1807e1006Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule1944Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2176Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2238Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2243Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2257Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2310Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2330a35cbArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2337Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2351Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2408Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2410Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2410f94e9Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2415Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2415d875cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2419Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2685Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule18004baf6Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule233898c7fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule2409360bdArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Triplepanelmodule180663804Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp014939Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp0abaf7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp1a6fadArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp49d89bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp63ae09Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp84d5d0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp517dccArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp8320d1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp57564aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecomp366808Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Twopanelfeaturecompb30038Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_VerticalcontentpanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2aba10Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel4c8621Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel5f3e5dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel13f99dArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel69dcddArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel99eba4Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel911c4bArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel1751Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel1757Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel1821Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel1847Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel1876Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2077Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2157Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2174Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2178Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2252Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2406Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2417Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel2618Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanel8829a8Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelbabfd1Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelbb0a29Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelbba867Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelbbf644Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelbf14cfArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelcd84bdArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpaneld91acaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanele409fcArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Verticalcontentpanelf5a29fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_VideomoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_WebinardownloadArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Webinardownload2058Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNew_Webinardownload2075Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewbestofbothworldsmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewblogcategoriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewcasestudyrotatorArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewcenteredcontentpanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewcenteredctapanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewdownloadableebooksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewfeaturecomparisonchartArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewfeaturedcasestudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewfeaturedresourceArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewgartnerpeerinsightsbarArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewguidelinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewlogolistingmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewpricingchangesfaqsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewpricingchangespartnersfaqArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewpricingpackagesmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewreviewrotatorArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewrightorleftcontentmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewrightorleftstepsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewsingletestimonialpanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewtriplepanelcomparisonmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewtriplepanelmoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewtwopanelfeaturecomparisonArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewverticalcontentpanelArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewvideomoduleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootNewwebinardownloadArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootOnlythebestauthenticationca054fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPackagedetailspageArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPackagefeaturevaluesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPagemanagementArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPagemanagement1052Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPartnerlogoArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPartnertestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPartnertiersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPasteventslistingArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPodcastArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPricingcategoriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPricingpackagesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPricingplancomponentsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPricingplansArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPricingplantiersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootPrimarypackagefeaturelabelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootProductreleasesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootProductupdatesq42020Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootProjecttemplateframeworksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootProjecttemplatesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQuickdevelopmentandfastp734af0Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRecognitionArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootResourcesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootResourcescalloutsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootResourcetopicsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootResourcetypesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextareaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1196Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1346Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1347Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1350Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1612Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1653Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1928Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1929Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1930Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea1931Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextarea19301943Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRichtextareac9ec123aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontentArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent531Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent574Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent692Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent1409Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent1410Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent2556Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent2557Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent14091729Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootRightleftcontent25562575Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSecurityArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSecurity2232Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSecurity2533Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSharedctablocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSinglepointoftruthArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSingletempArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSitesearchsettingsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSocialfollowlinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootStayintouchArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionformArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform714Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1616Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1701Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1702Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1736Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1737Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform2225Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform2242Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform2354Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform2478Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform2479Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022c474ab5ddaf5Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022c474abbeArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141023Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151629Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151638Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151639Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151807Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151808Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform17011705Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform24782494Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform43897141Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform71410221606Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform71410222525Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161516381665Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161516381666Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161516381792Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161516381793Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161518071830Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161518071859Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163816651b322b5Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163817921a6770aArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615180718301f20333Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022160621bc4e46Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022160621c5c966Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022160621f061e6Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151807183017b79f4Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform16151807183018fea52Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform71410221606215d4455Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform71410221606216eac06Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161516381665190a3b7Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform161518071830169ba5fArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform714102216062115Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform714102216062204Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163816651878Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163816651890Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163817921920Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163817922084Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615180718301977Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform4389714131090283Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform7141022160619265c0cArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform71410221606216389aaArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615163816651491073Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionform1615180718301285360Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubmissionformac7a2d81Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTechnologypartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTempArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonials227Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonials232Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonials307Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonials2561Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonials2562Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootTestimonials25612580Args = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootWhitegloveserviceArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RootWorkingatagilitypanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ScriptsType = {
  __typename?: 'ScriptsType';
  bottom?: Maybe<Scalars['String']['output']>;
  excludedFromGlobal?: Maybe<Scalars['Boolean']['output']>;
  top?: Maybe<Scalars['String']['output']>;
};

export type SeoType = {
  __typename?: 'SeoType';
  menuVisible?: Maybe<Scalars['Boolean']['output']>;
  metaDescription: Scalars['String']['output'];
  metaHTML: Scalars['String']['output'];
  metaKeywords: Scalars['String']['output'];
  sitemapVisible?: Maybe<Scalars['Boolean']['output']>;
};

export type SitemapFlat = {
  __typename?: 'SitemapFlat';
  isFolder: Scalars['Boolean']['output'];
  menuText: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pageID: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  redirecturl?: Maybe<RedirectUrlType>;
  title?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<VisibleType>;
};

export type SitemapNested = {
  __typename?: 'SitemapNested';
  children?: Maybe<Array<Maybe<SitemapNested>>>;
  isFolder: Scalars['Boolean']['output'];
  menuText: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pageID: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  redirecturl?: Maybe<RedirectUrlType>;
  title?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<VisibleType>;
};


export type SitemapNestedChildrenArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};

export type UrlRedirection = {
  __typename?: 'URLRedirection';
  destinationUrl: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  originUrl: Scalars['String']['output'];
  statusCode: Scalars['Int']['output'];
};

export type VisibleType = {
  __typename?: 'VisibleType';
  menu?: Maybe<Scalars['Boolean']['output']>;
  sitemap?: Maybe<Scalars['Boolean']['output']>;
};

export type ZoneType = {
  __typename?: 'ZoneType';
  item?: Maybe<ItemType>;
  module?: Maybe<Scalars['String']['output']>;
  zoneName?: Maybe<Scalars['String']['output']>;
};

export type Agilitycodetemplate = {
  __typename?: 'agilitycodetemplate';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Agilitycodetemplate_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Agilitycodetemplate_Fields = {
  __typename?: 'agilitycodetemplate_fields';
  referenceName?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type Agilitycss = {
  __typename?: 'agilitycss';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Agilitycss_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Agilitycss_Fields = {
  __typename?: 'agilitycss_fields';
  minify?: Maybe<Scalars['Boolean']['output']>;
  referenceName?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Agilityjavascript = {
  __typename?: 'agilityjavascript';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Agilityjavascript_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Agilityjavascript_Fields = {
  __typename?: 'agilityjavascript_fields';
  minify?: Maybe<Scalars['Boolean']['output']>;
  referenceName?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Bestofbothworlds2paragraphs = {
  __typename?: 'bestofbothworlds2paragraphs';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Bestofbothworlds2paragraphs_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Bestofbothworlds2paragraphs_Fields = {
  __typename?: 'bestofbothworlds2paragraphs_fields';
  developerCTA?: Maybe<Link>;
  developerContent?: Maybe<Scalars['String']['output']>;
  developerHeading?: Maybe<Scalars['String']['output']>;
  marketerCTA?: Maybe<Link>;
  marketerContent?: Maybe<Scalars['String']['output']>;
  marketerHeading?: Maybe<Scalars['String']['output']>;
};

export type Bestofbothworldsmodule = {
  __typename?: 'bestofbothworldsmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Bestofbothworldsmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Bestofbothworldsmodule_Fields = {
  __typename?: 'bestofbothworldsmodule_fields';
  cTA1?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  leftGroupName?: Maybe<Link>;
  leftGroupedFeatures?: Maybe<Array<Maybe<Featurelistitem>>>;
  leftGroupedFeatures_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  rightGroupName?: Maybe<Link>;
  rightGroupedFeatures?: Maybe<Array<Maybe<Featurelistitem>>>;
  rightGroupedFeatures_ValueField?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  videoPath?: Maybe<Link>;
  videointrotext?: Maybe<Scalars['String']['output']>;
};


export type Bestofbothworldsmodule_FieldsLeftGroupedFeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Bestofbothworldsmodule_FieldsRightGroupedFeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Blogauthor = {
  __typename?: 'blogauthor';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Blogauthor_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Blogauthor_Fields = {
  __typename?: 'blogauthor_fields';
  image?: Maybe<Image>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  textblob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Blogcategory = {
  __typename?: 'blogcategory';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Blogcategory_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Blogcategory_Fields = {
  __typename?: 'blogcategory_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Blogpost = {
  __typename?: 'blogpost';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Blogpost_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Blogpost_Fields = {
  __typename?: 'blogpost_fields';
  author?: Maybe<Blogauthor>;
  authorID?: Maybe<Scalars['Int']['output']>;
  authorTitle?: Maybe<Scalars['String']['output']>;
  blogCategories?: Maybe<Array<Maybe<Newblogcategory>>>;
  blogCategories_SortIdField?: Maybe<Scalars['String']['output']>;
  blogCategories_TextField?: Maybe<Scalars['String']['output']>;
  blogCategories_ValueField?: Maybe<Scalars['String']['output']>;
  blogTags?: Maybe<Array<Maybe<Blogtag>>>;
  blogTagsIDs?: Maybe<Scalars['String']['output']>;
  blogTagsTitle?: Maybe<Scalars['String']['output']>;
  buttonRightCTA?: Maybe<Link>;
  cTA?: Maybe<Ctablock>;
  cTABlogPosts?: Maybe<Image>;
  cTAID?: Maybe<Scalars['Int']['output']>;
  cTATitle?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Blogcategory>;
  categoriesIDs?: Maybe<Scalars['String']['output']>;
  categoriesTitle?: Maybe<Scalars['String']['output']>;
  contentRightCTA?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  displayImageinPost?: Maybe<Scalars['Boolean']['output']>;
  enableComments?: Maybe<Scalars['Boolean']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  furtherReading?: Maybe<Link>;
  listingImageOverride?: Maybe<Image>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  postImage?: Maybe<Image>;
  relatePostsBy?: Maybe<Scalars['String']['output']>;
  relatedPostTitles?: Maybe<Scalars['String']['output']>;
  relatedPosts?: Maybe<Array<Maybe<Blogpost>>>;
  relatedPostsIDs?: Maybe<Scalars['String']['output']>;
  relatedPosts_SortIdField?: Maybe<Scalars['String']['output']>;
  resourcesList?: Maybe<Array<Maybe<Blogpost>>>;
  resourcesList_SortIdField?: Maybe<Scalars['String']['output']>;
  resourcesList_TextField?: Maybe<Scalars['String']['output']>;
  resourcesList_ValueField?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  textblob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  titleRelatedResources?: Maybe<Scalars['String']['output']>;
  titleRightCTA?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
};


export type Blogpost_FieldsBlogCategoriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Blogpost_FieldsBlogTagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Blogpost_FieldsRelatedPostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Blogpost_FieldsResourcesListArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Blogtag = {
  __typename?: 'blogtag';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Blogtag_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Blogtag_Fields = {
  __typename?: 'blogtag_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Callout = {
  __typename?: 'callout';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Callout_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Callout_Fields = {
  __typename?: 'callout_fields';
  callout?: Maybe<Calloutitem>;
  calloutID?: Maybe<Scalars['Int']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
};

export type Calloutitem = {
  __typename?: 'calloutitem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Calloutitem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Calloutitem_Fields = {
  __typename?: 'calloutitem_fields';
  caption?: Maybe<Scalars['String']['output']>;
  labelInternal?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Casestudy = {
  __typename?: 'casestudy';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudy_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudy_Fields = {
  __typename?: 'casestudy_fields';
  bottomContent?: Maybe<Scalars['String']['output']>;
  brandBGColor?: Maybe<Scalars['String']['output']>;
  brandFGColor?: Maybe<Scalars['String']['output']>;
  cTA?: Maybe<Ctablock>;
  cTAID?: Maybe<Scalars['Int']['output']>;
  cTAName?: Maybe<Scalars['String']['output']>;
  caseStudyChallenges?: Maybe<Array<Maybe<Casestudychallenge>>>;
  caseStudyChallenges_SortIdField?: Maybe<Scalars['String']['output']>;
  caseStudyChallenges_TextField?: Maybe<Scalars['String']['output']>;
  caseStudyChallenges_ValueField?: Maybe<Scalars['String']['output']>;
  caseStudyIndustries?: Maybe<Array<Maybe<Casestudyindustry>>>;
  caseStudyIndustries_SortIdField?: Maybe<Scalars['String']['output']>;
  caseStudyIndustries_TextField?: Maybe<Scalars['String']['output']>;
  caseStudyIndustries_ValueField?: Maybe<Scalars['String']['output']>;
  clientNames?: Maybe<Scalars['String']['output']>;
  contentPanelCopy?: Maybe<Scalars['String']['output']>;
  customerLogo?: Maybe<Image>;
  customerWhiteLogo?: Maybe<Image>;
  excerpt?: Maybe<Scalars['String']['output']>;
  gallery?: Maybe<Gallery>;
  image?: Maybe<Image>;
  imagePosition?: Maybe<Scalars['String']['output']>;
  isPurpleBackground?: Maybe<Scalars['Boolean']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  metrics?: Maybe<Array<Maybe<Keyvaluepair>>>;
  optionalText?: Maybe<Scalars['String']['output']>;
  productIDs?: Maybe<Scalars['String']['output']>;
  productNames?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Casestudyproduct>>>;
  productsHeading?: Maybe<Scalars['String']['output']>;
  productsRenderType?: Maybe<Scalars['String']['output']>;
  productsSubHeading?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  relatedResources?: Maybe<Array<Maybe<Resource>>>;
  relatedResourcesTitle?: Maybe<Scalars['String']['output']>;
  relatedResources_SortIdField?: Maybe<Scalars['String']['output']>;
  relatedResources_TextField?: Maybe<Scalars['String']['output']>;
  relatedResources_ValueField?: Maybe<Scalars['String']['output']>;
  rightContentCopy?: Maybe<Scalars['String']['output']>;
  rotatorCTAbuttonText?: Maybe<Scalars['String']['output']>;
  rotatorCaseStudies?: Maybe<Array<Maybe<Casestudy>>>;
  rotatorCaseStudies_SortIdField?: Maybe<Scalars['String']['output']>;
  rotatorCaseStudies_TextField?: Maybe<Scalars['String']['output']>;
  rotatorCaseStudies_ValueField?: Maybe<Scalars['String']['output']>;
  rotatorDarkMode?: Maybe<Scalars['Boolean']['output']>;
  rotatorDesktopSpace?: Maybe<Scalars['String']['output']>;
  rotatorMobileSpace?: Maybe<Scalars['String']['output']>;
  rotatorTitle?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  thumbnailImage?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  topContent?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Link>;
};


export type Casestudy_FieldsCaseStudyChallengesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Casestudy_FieldsCaseStudyIndustriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Casestudy_FieldsMetricsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Casestudy_FieldsProductsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Casestudy_FieldsRelatedResourcesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Casestudy_FieldsRotatorCaseStudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Casestudychallenge = {
  __typename?: 'casestudychallenge';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudychallenge_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudychallenge_Fields = {
  __typename?: 'casestudychallenge_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Casestudycontentpanel = {
  __typename?: 'casestudycontentpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudycontentpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudycontentpanel_Fields = {
  __typename?: 'casestudycontentpanel_fields';
  caseStudies?: Maybe<Array<Maybe<Casestudy>>>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};


export type Casestudycontentpanel_FieldsCaseStudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Casestudydetails = {
  __typename?: 'casestudydetails';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudydetails_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudydetails_Fields = {
  __typename?: 'casestudydetails_fields';
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};

export type Casestudyindustry = {
  __typename?: 'casestudyindustry';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudyindustry_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudyindustry_Fields = {
  __typename?: 'casestudyindustry_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Casestudylisting = {
  __typename?: 'casestudylisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudylisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudylisting_Fields = {
  __typename?: 'casestudylisting_fields';
  cTAButton?: Maybe<Link>;
  caseCount?: Maybe<Scalars['Int']['output']>;
  caseStudies?: Maybe<Array<Maybe<Casestudy>>>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  testimonials?: Maybe<Array<Maybe<Testimonial>>>;
  testimonials_TextField?: Maybe<Scalars['String']['output']>;
  testimonials_ValueField?: Maybe<Scalars['String']['output']>;
};


export type Casestudylisting_FieldsCaseStudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Casestudylisting_FieldsTestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Casestudyproduct = {
  __typename?: 'casestudyproduct';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudyproduct_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudyproduct_Fields = {
  __typename?: 'casestudyproduct_fields';
  description?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Link>;
};

export type Casestudyrotator = {
  __typename?: 'casestudyrotator';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Casestudyrotator_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Casestudyrotator_Fields = {
  __typename?: 'casestudyrotator_fields';
  cTAbuttonText?: Maybe<Scalars['String']['output']>;
  caseStudies?: Maybe<Array<Maybe<Casestudy>>>;
  caseStudies_ValueField?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Casestudyrotator_FieldsCaseStudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Centeredcontentpanel = {
  __typename?: 'centeredcontentpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Centeredcontentpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Centeredcontentpanel_Fields = {
  __typename?: 'centeredcontentpanel_fields';
  cTA1?: Maybe<Link>;
  cTA2?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Centeredctapanel = {
  __typename?: 'centeredctapanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Centeredctapanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Centeredctapanel_Fields = {
  __typename?: 'centeredctapanel_fields';
  cTA1?: Maybe<Link>;
  cTA2?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Comparisonfeatures = {
  __typename?: 'comparisonfeatures';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Comparisonfeatures_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Comparisonfeatures_Fields = {
  __typename?: 'comparisonfeatures_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Comparisonplatform = {
  __typename?: 'comparisonplatform';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Comparisonplatform_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Comparisonplatform_Fields = {
  __typename?: 'comparisonplatform_fields';
  fullComparisonLink?: Maybe<Link>;
  logo?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Comparisonplatformfeatures = {
  __typename?: 'comparisonplatformfeatures';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Comparisonplatformfeatures_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Comparisonplatformfeatures_Fields = {
  __typename?: 'comparisonplatformfeatures_fields';
  feature?: Maybe<Comparisonfeatures>;
  featureName?: Maybe<Scalars['String']['output']>;
  feature_ValueField?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Comparisonplatform>;
  platformName?: Maybe<Scalars['String']['output']>;
  platform_ValueField?: Maybe<Scalars['String']['output']>;
  textValue?: Maybe<Scalars['String']['output']>;
  trueFalseValue?: Maybe<Scalars['Boolean']['output']>;
};

export type Contentpanel = {
  __typename?: 'contentpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Contentpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Contentpanel_Fields = {
  __typename?: 'contentpanel_fields';
  panel?: Maybe<Contentpanel>;
  panelID?: Maybe<Scalars['Int']['output']>;
};

export type Contentpanelform = {
  __typename?: 'contentpanelform';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Contentpanelform_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Contentpanelform_Fields = {
  __typename?: 'contentpanelform_fields';
  conversionScript?: Maybe<Scalars['String']['output']>;
  formID?: Maybe<Scalars['String']['output']>;
  landingLogo?: Maybe<Image>;
  panel?: Maybe<Contentpanelform>;
  panelID?: Maybe<Scalars['Int']['output']>;
  redirectURL?: Maybe<Link>;
  rightColumnTitle?: Maybe<Scalars['String']['output']>;
  submissionCopy?: Maybe<Scalars['String']['output']>;
  submissionPOSTURL?: Maybe<Scalars['String']['output']>;
  thanksMessage?: Maybe<Scalars['String']['output']>;
};

export type Ctablock = {
  __typename?: 'ctablock';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Ctablock_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Ctablock_Fields = {
  __typename?: 'ctablock_fields';
  image?: Maybe<Image>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Link>;
  richText?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Ctablocks = {
  __typename?: 'ctablocks';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Ctablocks_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Ctablocks_Fields = {
  __typename?: 'ctablocks_fields';
  cTABlocks?: Maybe<Array<Maybe<Ctablock>>>;
  heading?: Maybe<Scalars['String']['output']>;
  subHeading?: Maybe<Scalars['String']['output']>;
};


export type Ctablocks_FieldsCTaBlocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Customtag = {
  __typename?: 'customtag';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Customtag_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Customtag_Fields = {
  __typename?: 'customtag_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Dynamicpagemapping = {
  __typename?: 'dynamicpagemapping';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Dynamicpagemapping_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Dynamicpagemapping_Fields = {
  __typename?: 'dynamicpagemapping_fields';
  dynamicPagePath?: Maybe<Scalars['String']['output']>;
  dynamicPageReferenceName?: Maybe<Scalars['String']['output']>;
};

export type Event = {
  __typename?: 'event';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Event_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Event_Fields = {
  __typename?: 'event_fields';
  address?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  demioID?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventType?: Maybe<Eventtype>;
  eventTypeID?: Maybe<Scalars['Int']['output']>;
  eventTypeName?: Maybe<Scalars['String']['output']>;
  eventbriteID?: Maybe<Scalars['String']['output']>;
  externalLink?: Maybe<Link>;
  linkedInID?: Maybe<Scalars['String']['output']>;
  mainImage?: Maybe<Image>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  myNewField?: Maybe<Scalars['String']['output']>;
  noLinkText?: Maybe<Scalars['String']['output']>;
  organizer?: Maybe<Blogauthor>;
  organizerID?: Maybe<Scalars['Int']['output']>;
  organizerName?: Maybe<Scalars['String']['output']>;
  presenterIDs?: Maybe<Scalars['String']['output']>;
  presenterNames?: Maybe<Scalars['String']['output']>;
  presenters?: Maybe<Array<Maybe<Blogauthor>>>;
  subTitle?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
};


export type Event_FieldsPresentersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Eventlisting = {
  __typename?: 'eventlisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Eventlisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Eventlisting_Fields = {
  __typename?: 'eventlisting_fields';
  anchorName?: Maybe<Scalars['String']['output']>;
  backLabel?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Maybe<Event>>>;
  filterByType?: Maybe<Eventtype>;
  filterByTypeID?: Maybe<Scalars['Int']['output']>;
  registerLabel?: Maybe<Scalars['String']['output']>;
  showPastEventsOnly?: Maybe<Scalars['Boolean']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  viewDetailsLabel?: Maybe<Scalars['String']['output']>;
};


export type Eventlisting_FieldsEventsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Eventtype = {
  __typename?: 'eventtype';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Eventtype_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Eventtype_Fields = {
  __typename?: 'eventtype_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Faqitem = {
  __typename?: 'faqitem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Faqitem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Faqitem_Fields = {
  __typename?: 'faqitem_fields';
  answer?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};

export type Faqs = {
  __typename?: 'faqs';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Faqs_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Faqs_Fields = {
  __typename?: 'faqs_fields';
  faqs?: Maybe<Array<Maybe<Faqitem>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Faqs_FieldsFaqsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featureblock = {
  __typename?: 'featureblock';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featureblock_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featureblock_Fields = {
  __typename?: 'featureblock_fields';
  bottomLink?: Maybe<Link>;
  customTags?: Maybe<Array<Maybe<Customtag>>>;
  customTagsIDs?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Image>;
  subtitle?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featureblock_FieldsCustomTagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featureblocks = {
  __typename?: 'featureblocks';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featureblocks_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featureblocks_Fields = {
  __typename?: 'featureblocks_fields';
  background?: Maybe<Modulebackground>;
  backgroundID?: Maybe<Scalars['Int']['output']>;
  backgroundName?: Maybe<Scalars['String']['output']>;
  featureBlockIDs?: Maybe<Scalars['String']['output']>;
  featureBlockNames?: Maybe<Scalars['String']['output']>;
  featureBlocks?: Maybe<Array<Maybe<Featureblock>>>;
  primaryButton?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featureblocks_FieldsFeatureBlocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featureblockswithtext = {
  __typename?: 'featureblockswithtext';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featureblockswithtext_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featureblockswithtext_Fields = {
  __typename?: 'featureblockswithtext_fields';
  featureBlockIDs?: Maybe<Scalars['String']['output']>;
  featureBlockNames?: Maybe<Scalars['String']['output']>;
  featureBlocks?: Maybe<Array<Maybe<Featureblock>>>;
  sideBody?: Maybe<Scalars['String']['output']>;
  sideLink?: Maybe<Link>;
  sideTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featureblockswithtext_FieldsFeatureBlocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featurecomparisonchart = {
  __typename?: 'featurecomparisonchart';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featurecomparisonchart_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featurecomparisonchart_Fields = {
  __typename?: 'featurecomparisonchart_fields';
  bottomCTA?: Maybe<Link>;
  comparisonPlatformFeatures?: Maybe<Array<Maybe<Comparisonplatformfeatures>>>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  defaultcompetitors?: Maybe<Array<Maybe<Comparisonplatform>>>;
  defaultcompetitors_ValueField?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  fullComparisonLinkLabel?: Maybe<Link>;
  heading?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  viewFullComparisonLabel?: Maybe<Scalars['String']['output']>;
};


export type Featurecomparisonchart_FieldsComparisonPlatformFeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Featurecomparisonchart_FieldsDefaultcompetitorsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featuredcasestudies = {
  __typename?: 'featuredcasestudies';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featuredcasestudies_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featuredcasestudies_Fields = {
  __typename?: 'featuredcasestudies_fields';
  background?: Maybe<Modulebackground>;
  backgroundID?: Maybe<Scalars['Int']['output']>;
  backgroundName?: Maybe<Scalars['String']['output']>;
  caseStudies?: Maybe<Array<Maybe<Casestudy>>>;
  iDs?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Scalars['String']['output']>;
  primaryButton?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featuredcasestudies_FieldsCaseStudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featuredplancta = {
  __typename?: 'featuredplancta';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featuredplancta_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featuredplancta_Fields = {
  __typename?: 'featuredplancta_fields';
  primaryButton?: Maybe<Link>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Featuredresources = {
  __typename?: 'featuredresources';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featuredresources_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featuredresources_Fields = {
  __typename?: 'featuredresources_fields';
  iDs?: Maybe<Scalars['String']['output']>;
  names?: Maybe<Scalars['String']['output']>;
  readMoreLabel?: Maybe<Scalars['String']['output']>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featuredresources_FieldsResourcesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featurelist = {
  __typename?: 'featurelist';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featurelist_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featurelist_Fields = {
  __typename?: 'featurelist_fields';
  featureList?: Maybe<Array<Maybe<Featurelistitem>>>;
  featureListIDs?: Maybe<Scalars['String']['output']>;
  featureListNames?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featurelist_FieldsFeatureListArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featurelisting = {
  __typename?: 'featurelisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featurelisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featurelisting_Fields = {
  __typename?: 'featurelisting_fields';
  customTagsToHighlightIDs?: Maybe<Scalars['String']['output']>;
  customTagstoHighlight?: Maybe<Array<Maybe<Customtag>>>;
  featureBlocks?: Maybe<Array<Maybe<Featureblock>>>;
  leftButton?: Maybe<Link>;
  leftTypeTitle?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Featurelisting_FieldsCustomTagstoHighlightArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Featurelisting_FieldsFeatureBlocksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Featurelistitem = {
  __typename?: 'featurelistitem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Featurelistitem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Featurelistitem_Fields = {
  __typename?: 'featurelistitem_fields';
  moreInfoLink?: Maybe<Link>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type G2crowdreviewlisting = {
  __typename?: 'g2crowdreviewlisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<G2crowdreviewlisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type G2crowdreviewlisting_Fields = {
  __typename?: 'g2crowdreviewlisting_fields';
  gartnerSourcingLink?: Maybe<Scalars['String']['output']>;
  gartnerWidgetID?: Maybe<Scalars['String']['output']>;
  gartnerWidgetSize?: Maybe<Scalars['String']['output']>;
  gartnerWidgetTheme?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  subHeading?: Maybe<Scalars['String']['output']>;
  widgetCode?: Maybe<Scalars['String']['output']>;
};

export type Gartnerpeerinsightsbar = {
  __typename?: 'gartnerpeerinsightsbar';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Gartnerpeerinsightsbar_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Gartnerpeerinsightsbar_Fields = {
  __typename?: 'gartnerpeerinsightsbar_fields';
  cTAButton?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  gartnerLogo?: Maybe<Image>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  starsGraphic?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Gateddownload = {
  __typename?: 'gateddownload';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Gateddownload_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Gateddownload_Fields = {
  __typename?: 'gateddownload_fields';
  autopilotJourneyTrigger?: Maybe<Scalars['String']['output']>;
  backgroundColour?: Maybe<Scalars['String']['output']>;
  companyLabel?: Maybe<Scalars['String']['output']>;
  emailLabel?: Maybe<Scalars['String']['output']>;
  firstNameLabel?: Maybe<Scalars['String']['output']>;
  formID?: Maybe<Scalars['String']['output']>;
  lastNameLabel?: Maybe<Scalars['String']['output']>;
  leftColumnBody?: Maybe<Scalars['String']['output']>;
  leftColumnTitle?: Maybe<Scalars['String']['output']>;
  phoneLabel?: Maybe<Scalars['String']['output']>;
  redirectURL?: Maybe<Link>;
  rightColumnTitle?: Maybe<Scalars['String']['output']>;
  submissionCopy?: Maybe<Scalars['String']['output']>;
  submissionPOSTURL?: Maybe<Scalars['String']['output']>;
  submitButtonLabel?: Maybe<Scalars['String']['output']>;
};

export type Gettingstarted = {
  __typename?: 'gettingstarted';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Gettingstarted_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Gettingstarted_Fields = {
  __typename?: 'gettingstarted_fields';
  gettingStartedItems?: Maybe<Array<Maybe<Gettingstarteditem>>>;
  heading?: Maybe<Scalars['String']['output']>;
};


export type Gettingstarted_FieldsGettingStartedItemsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Gettingstarteditem = {
  __typename?: 'gettingstarteditem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Gettingstarteditem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Gettingstarteditem_Fields = {
  __typename?: 'gettingstarteditem_fields';
  cardImage?: Maybe<Image>;
  content?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  personaCookieValue?: Maybe<Scalars['String']['output']>;
  primaryButton?: Maybe<Link>;
  secondaryButton?: Maybe<Link>;
  thirdCTA?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Globalfooter = {
  __typename?: 'globalfooter';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Globalfooter_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Globalfooter_Fields = {
  __typename?: 'globalfooter_fields';
  bottomLinks?: Maybe<Array<Maybe<Link>>>;
  bottomLinksSortIDs?: Maybe<Scalars['String']['output']>;
  column1Links?: Maybe<Array<Maybe<Link>>>;
  column1SortIDs?: Maybe<Scalars['String']['output']>;
  column1Title?: Maybe<Scalars['String']['output']>;
  column2Links?: Maybe<Array<Maybe<Link>>>;
  column2SortIDs?: Maybe<Scalars['String']['output']>;
  column2Title?: Maybe<Scalars['String']['output']>;
  column3Links?: Maybe<Array<Maybe<Link>>>;
  column3Links_TextField?: Maybe<Scalars['String']['output']>;
  column3Links_ValueField?: Maybe<Scalars['String']['output']>;
  column3SortIDs?: Maybe<Scalars['String']['output']>;
  column3Title?: Maybe<Scalars['String']['output']>;
  column4Links?: Maybe<Array<Maybe<Link>>>;
  column4Links_TextField?: Maybe<Scalars['String']['output']>;
  column4Links_ValueField?: Maybe<Scalars['String']['output']>;
  column4SortIDs?: Maybe<Scalars['String']['output']>;
  column4Title?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  followLinks?: Maybe<Array<Maybe<Socialfollowlink>>>;
  followTitle?: Maybe<Scalars['String']['output']>;
  newsletterSignupForm?: Maybe<Scalars['String']['output']>;
  subscribeButtonLabel?: Maybe<Scalars['String']['output']>;
  subscribeConfirmationMessage?: Maybe<Scalars['String']['output']>;
  subscribeDescription?: Maybe<Scalars['String']['output']>;
  subscribeEmailPlaceholder?: Maybe<Scalars['String']['output']>;
  subscribePOSTUrl?: Maybe<Scalars['String']['output']>;
  subscribeRedirect?: Maybe<Scalars['String']['output']>;
  subscribeTitle?: Maybe<Scalars['String']['output']>;
};


export type Globalfooter_FieldsBottomLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Globalfooter_FieldsColumn1LinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Globalfooter_FieldsColumn2LinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Globalfooter_FieldsColumn3LinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Globalfooter_FieldsColumn4LinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Globalfooter_FieldsFollowLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Globalheader = {
  __typename?: 'globalheader';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Globalheader_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Globalheader_Fields = {
  __typename?: 'globalheader_fields';
  contactus?: Maybe<Link>;
  hideMarketingBanner?: Maybe<Scalars['Boolean']['output']>;
  logo?: Maybe<Image>;
  marketingBanner?: Maybe<Scalars['String']['output']>;
  marketingBannerButton?: Maybe<Link>;
  menuStructure?: Maybe<Array<Maybe<Navigation_Toplevel>>>;
  mobileLogo?: Maybe<Image>;
  preHeaderLinkSortIDs?: Maybe<Scalars['String']['output']>;
  preHeaderLinks?: Maybe<Array<Maybe<Link>>>;
  preHeaderPrimaryButton?: Maybe<Link>;
  primaryButton?: Maybe<Link>;
  sEOImage?: Maybe<Image>;
  secondaryButton?: Maybe<Link>;
  stickyLogo?: Maybe<Image>;
};


export type Globalheader_FieldsMenuStructureArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Globalheader_FieldsPreHeaderLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Guidelinks = {
  __typename?: 'guidelinks';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Guidelinks_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Guidelinks_Fields = {
  __typename?: 'guidelinks_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  guideIcon?: Maybe<Image>;
  heading?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Array<Maybe<Link>>>;
  mainCTA?: Maybe<Link>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};


export type Guidelinks_FieldsLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Hero = {
  __typename?: 'hero';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Hero_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Hero_Fields = {
  __typename?: 'hero_fields';
  animation?: Maybe<Scalars['String']['output']>;
  cTA?: Maybe<Link>;
  content?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  mediaType?: Maybe<Scalars['String']['output']>;
  subHeading?: Maybe<Scalars['String']['output']>;
  videoURL?: Maybe<Scalars['String']['output']>;
};

export type Infobox = {
  __typename?: 'infobox';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Infobox_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Infobox_Fields = {
  __typename?: 'infobox_fields';
  heading?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
};

export type Integrationitem = {
  __typename?: 'integrationitem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Integrationitem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Integrationitem_Fields = {
  __typename?: 'integrationitem_fields';
  description?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Link>;
};

export type Integrations = {
  __typename?: 'integrations';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Integrations_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Integrations_Fields = {
  __typename?: 'integrations_fields';
  banner?: Maybe<Image>;
  benefitsHeading?: Maybe<Scalars['String']['output']>;
  cTA?: Maybe<Link>;
  companyDescription?: Maybe<Scalars['String']['output']>;
  descriptionStepImplementation?: Maybe<Scalars['String']['output']>;
  documentationLinks?: Maybe<Array<Maybe<Link>>>;
  iNTERNALNOTES?: Maybe<Scalars['String']['output']>;
  integrationType?: Maybe<Array<Maybe<Integrationtype>>>;
  integrationType_TextField?: Maybe<Scalars['String']['output']>;
  integrationType_ValueField?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Image>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  metrics?: Maybe<Array<Maybe<Keyvaluepair>>>;
  metrics_SortIdField?: Maybe<Scalars['String']['output']>;
  overviewContent?: Maybe<Scalars['String']['output']>;
  overviewHeading?: Maybe<Scalars['String']['output']>;
  overviewItems?: Maybe<Array<Maybe<Integrationitem>>>;
  product?: Maybe<Scalars['String']['output']>;
  screenshots?: Maybe<Gallery>;
  setupHeading?: Maybe<Scalars['String']['output']>;
  similarList?: Maybe<Array<Maybe<Integrations>>>;
  simliarList_TextField?: Maybe<Scalars['String']['output']>;
  simliarList_ValueField?: Maybe<Scalars['String']['output']>;
  stepIcon?: Maybe<Image>;
  steps?: Maybe<Array<Maybe<Integrationitem>>>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};


export type Integrations_FieldsDocumentationLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Integrations_FieldsIntegrationTypeArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Integrations_FieldsMetricsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Integrations_FieldsOverviewItemsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Integrations_FieldsSimilarListArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Integrations_FieldsStepsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Integrationtype = {
  __typename?: 'integrationtype';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Integrationtype_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Integrationtype_Fields = {
  __typename?: 'integrationtype_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Job = {
  __typename?: 'job';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Job_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Job_Fields = {
  __typename?: 'job_fields';
  bottomLink?: Maybe<Link>;
  icon?: Maybe<Image>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Joblisting = {
  __typename?: 'joblisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Joblisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Joblisting_Fields = {
  __typename?: 'joblisting_fields';
  anchorName?: Maybe<Scalars['String']['output']>;
  jobs?: Maybe<Array<Maybe<Job>>>;
  sideBody?: Maybe<Scalars['String']['output']>;
  sideLink?: Maybe<Link>;
  sideTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Joblisting_FieldsJobsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Keyvaluepair = {
  __typename?: 'keyvaluepair';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Keyvaluepair_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Keyvaluepair_Fields = {
  __typename?: 'keyvaluepair_fields';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Landingpageheader = {
  __typename?: 'landingpageheader';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Landingpageheader_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Landingpageheader_Fields = {
  __typename?: 'landingpageheader_fields';
  backgroundImage?: Maybe<Image>;
  headerContent?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Image>;
  primaryButton?: Maybe<Link>;
};

export type Landingpageheaderform = {
  __typename?: 'landingpageheaderform';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Landingpageheaderform_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Landingpageheaderform_Fields = {
  __typename?: 'landingpageheaderform_fields';
  backgroundImage?: Maybe<Image>;
  formButtonLabel?: Maybe<Scalars['String']['output']>;
  formTitle?: Maybe<Scalars['String']['output']>;
  headerContent?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Image>;
  primaryButton?: Maybe<Link>;
};

export type Latestposts = {
  __typename?: 'latestposts';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Latestposts_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Latestposts_Fields = {
  __typename?: 'latestposts_fields';
  categories?: Maybe<Array<Maybe<Blogcategory>>>;
  categoryIDs?: Maybe<Scalars['String']['output']>;
  categoryNames?: Maybe<Scalars['String']['output']>;
  postCount?: Maybe<Scalars['Int']['output']>;
  posts?: Maybe<Array<Maybe<Blogpost>>>;
  primaryButton?: Maybe<Link>;
  readMoreLabel?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Latestposts_FieldsCategoriesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Latestposts_FieldsPostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Latestresources = {
  __typename?: 'latestresources';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Latestresources_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Latestresources_Fields = {
  __typename?: 'latestresources_fields';
  leftButton?: Maybe<Link>;
  leftTypeTitle?: Maybe<Scalars['String']['output']>;
  resources?: Maybe<Array<Maybe<Resource>>>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Latestresources_FieldsResourcesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Link = {
  __typename?: 'link';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Link_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Link_Fields = {
  __typename?: 'link_fields';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Link>;
};

export type Links = {
  __typename?: 'links';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Links_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Links_Fields = {
  __typename?: 'links_fields';
  uRL?: Maybe<Link>;
};

export type Logo = {
  __typename?: 'logo';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Logo_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Logo_Fields = {
  __typename?: 'logo_fields';
  description?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Link>;
};

export type Logolisting = {
  __typename?: 'logolisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Logolisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Logolisting_Fields = {
  __typename?: 'logolisting_fields';
  background?: Maybe<Modulebackground>;
  backgroundID?: Maybe<Scalars['Int']['output']>;
  backgroundName?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  logoCount?: Maybe<Scalars['Int']['output']>;
  logoIDs?: Maybe<Scalars['String']['output']>;
  logos?: Maybe<Array<Maybe<Logo>>>;
  primaryButton?: Maybe<Link>;
  renderType?: Maybe<Scalars['String']['output']>;
  secondaryButton?: Maybe<Link>;
  subHeading?: Maybe<Scalars['String']['output']>;
};


export type Logolisting_FieldsLogosArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Logolistingmodule = {
  __typename?: 'logolistingmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Logolistingmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Logolistingmodule_Fields = {
  __typename?: 'logolistingmodule_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  logos?: Maybe<Array<Maybe<Logo>>>;
  logos_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Logolistingmodule_FieldsLogosArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Logolistingmodulecopy = {
  __typename?: 'logolistingmodulecopy';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Logolistingmodulecopy_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Logolistingmodulecopy_Fields = {
  __typename?: 'logolistingmodulecopy_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  logos?: Maybe<Array<Maybe<Partner>>>;
  logos_TextField?: Maybe<Scalars['String']['output']>;
  logos_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Logolistingmodulecopy_FieldsLogosArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Logotags = {
  __typename?: 'logotags';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Logotags_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Logotags_Fields = {
  __typename?: 'logotags_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Marketplace_App = {
  __typename?: 'marketplace_app';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Marketplace_App_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Marketplace_App_Fields = {
  __typename?: 'marketplace_app_fields';
  categories_TextField?: Maybe<Scalars['String']['output']>;
  categories_ValueField?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gitRepoURL?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Image>;
  publisher_SortIdField?: Maybe<Scalars['String']['output']>;
  publisher_TextField?: Maybe<Scalars['String']['output']>;
  publisher_ValueField?: Maybe<Scalars['String']['output']>;
  screenshots?: Maybe<Array<Maybe<Marketplaceappscreenshot>>>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
  versions?: Maybe<Array<Maybe<Marketplaceappversion>>>;
};


export type Marketplace_App_FieldsScreenshotsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Marketplace_App_FieldsVersionsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Marketplaceappscreenshot = {
  __typename?: 'marketplaceappscreenshot';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Marketplaceappscreenshot_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Marketplaceappscreenshot_Fields = {
  __typename?: 'marketplaceappscreenshot_fields';
  screenshot?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Marketplaceappversion = {
  __typename?: 'marketplaceappversion';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Marketplaceappversion_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Marketplaceappversion_Fields = {
  __typename?: 'marketplaceappversion_fields';
  notes?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Marketplacecategory = {
  __typename?: 'marketplacecategory';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Marketplacecategory_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Marketplacecategory_Fields = {
  __typename?: 'marketplacecategory_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Marketplacepublisher = {
  __typename?: 'marketplacepublisher';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Marketplacepublisher_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Marketplacepublisher_Fields = {
  __typename?: 'marketplacepublisher_fields';
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
};

export type Modulebackground = {
  __typename?: 'modulebackground';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Modulebackground_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Modulebackground_Fields = {
  __typename?: 'modulebackground_fields';
  renderType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Mostviewedarticles = {
  __typename?: 'mostviewedarticles';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Mostviewedarticles_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Mostviewedarticles_Fields = {
  __typename?: 'mostviewedarticles_fields';
  postIDs?: Maybe<Scalars['String']['output']>;
  postNames?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Blogpost>>>;
  readMoreText?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Mostviewedarticles_FieldsPostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Navigation_Megamenucontent = {
  __typename?: 'navigation_megamenucontent';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Navigation_Megamenucontent_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Navigation_Megamenucontent_Fields = {
  __typename?: 'navigation_megamenucontent_fields';
  description?: Maybe<Scalars['String']['output']>;
  imageorIcon?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Link>;
};

export type Navigation_Toplevel = {
  __typename?: 'navigation_toplevel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Navigation_Toplevel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Navigation_Toplevel_Fields = {
  __typename?: 'navigation_toplevel_fields';
  linkorSpotlight?: Maybe<Scalars['String']['output']>;
  megaContent?: Maybe<Array<Maybe<Navigation_Megamenucontent>>>;
  megaContent_TextField?: Maybe<Scalars['String']['output']>;
  megaContent_ValueField?: Maybe<Scalars['String']['output']>;
  megaTitle?: Maybe<Scalars['String']['output']>;
  subNavigation?: Maybe<Array<Maybe<Link>>>;
  subNavigation_TextField?: Maybe<Scalars['String']['output']>;
  subNavigation_ValueField?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Link>;
};


export type Navigation_Toplevel_FieldsMegaContentArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Navigation_Toplevel_FieldsSubNavigationArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type New_Resourcetagtaglist = {
  __typename?: 'new_resourcetagtaglist';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<New_Resourcetagtaglist_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type New_Resourcetagtaglist_Fields = {
  __typename?: 'new_resourcetagtaglist_fields';
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};

export type New_Resourcetagtitle = {
  __typename?: 'new_resourcetagtitle';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<New_Resourcetagtitle_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type New_Resourcetagtitle_Fields = {
  __typename?: 'new_resourcetagtitle_fields';
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};

export type Newallresources = {
  __typename?: 'newallresources';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newallresources_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newallresources_Fields = {
  __typename?: 'newallresources_fields';
  categorySelectText?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  numberItemPerPage?: Maybe<Scalars['Int']['output']>;
  topicSelectText?: Maybe<Scalars['String']['output']>;
};

export type Newblogcategory = {
  __typename?: 'newblogcategory';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newblogcategory_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newblogcategory_Fields = {
  __typename?: 'newblogcategory_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Newdownloadableebooks = {
  __typename?: 'newdownloadableebooks';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newdownloadableebooks_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newdownloadableebooks_Fields = {
  __typename?: 'newdownloadableebooks_fields';
  cTAButton?: Maybe<Link>;
  content?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  listeBooks?: Maybe<Array<Maybe<Resource>>>;
  listeBooks_TextField?: Maybe<Scalars['String']['output']>;
  listeBooks_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};


export type Newdownloadableebooks_FieldsListeBooksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newfeaturedcasestudies = {
  __typename?: 'newfeaturedcasestudies';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newfeaturedcasestudies_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newfeaturedcasestudies_Fields = {
  __typename?: 'newfeaturedcasestudies_fields';
  cTAButton?: Maybe<Link>;
  content?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  listCaseStudies?: Maybe<Array<Maybe<Casestudy>>>;
  listCaseStudies_TextField?: Maybe<Scalars['String']['output']>;
  listCaseStudies_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};


export type Newfeaturedcasestudies_FieldsListCaseStudiesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newfeaturedresource = {
  __typename?: 'newfeaturedresource';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newfeaturedresource_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newfeaturedresource_Fields = {
  __typename?: 'newfeaturedresource_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  featuredResource?: Maybe<Resource>;
  featuredResource_TextField?: Maybe<Scalars['String']['output']>;
  featuredResource_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};

export type Newintegrationlistingmodule = {
  __typename?: 'newintegrationlistingmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newintegrationlistingmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newintegrationlistingmodule_Fields = {
  __typename?: 'newintegrationlistingmodule_fields';
  cTATitle?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  filterLabel?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  partners?: Maybe<Array<Maybe<Integrations>>>;
  partners_SortIdField?: Maybe<Scalars['String']['output']>;
  partners_TextField?: Maybe<Scalars['String']['output']>;
  partners_ValueField?: Maybe<Scalars['String']['output']>;
  showPagination?: Maybe<Scalars['Boolean']['output']>;
};


export type Newintegrationlistingmodule_FieldsPartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newintegrationmodule = {
  __typename?: 'newintegrationmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newintegrationmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newintegrationmodule_Fields = {
  __typename?: 'newintegrationmodule_fields';
  cTA1Optional?: Maybe<Link>;
  cTA2Optional?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  integrationPartners?: Maybe<Array<Maybe<Partner>>>;
  integrationPartners_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  textSide?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Newintegrationmodule_FieldsIntegrationPartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newpartnerlistingmodule = {
  __typename?: 'newpartnerlistingmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newpartnerlistingmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newpartnerlistingmodule_Fields = {
  __typename?: 'newpartnerlistingmodule_fields';
  cTATitle?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  partners?: Maybe<Array<Maybe<Partner>>>;
};


export type Newpartnerlistingmodule_FieldsPartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newpostlisting = {
  __typename?: 'newpostlisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newpostlisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newpostlisting_Fields = {
  __typename?: 'newpostlisting_fields';
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Blogpost>>>;
};


export type Newpostlisting_FieldsPostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newpostsfeatured = {
  __typename?: 'newpostsfeatured';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newpostsfeatured_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newpostsfeatured_Fields = {
  __typename?: 'newpostsfeatured_fields';
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Blogpost>>>;
  posts_TextField?: Maybe<Scalars['String']['output']>;
  posts_ValueField?: Maybe<Scalars['String']['output']>;
  readMoreLabel?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Newpostsfeatured_FieldsPostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newresourcetopic = {
  __typename?: 'newresourcetopic';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newresourcetopic_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newresourcetopic_Fields = {
  __typename?: 'newresourcetopic_fields';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Newstayintouch = {
  __typename?: 'newstayintouch';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newstayintouch_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newstayintouch_Fields = {
  __typename?: 'newstayintouch_fields';
  socialFollowLinks?: Maybe<Array<Maybe<Socialfollowlink>>>;
  socialFollowLinks_TextField?: Maybe<Scalars['String']['output']>;
  socialFollowLinks_ValueField?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Newstayintouch_FieldsSocialFollowLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Newwebinardownload = {
  __typename?: 'newwebinardownload';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Newwebinardownload_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Newwebinardownload_Fields = {
  __typename?: 'newwebinardownload_fields';
  buttonItemText?: Maybe<Scalars['String']['output']>;
  cTAButton?: Maybe<Link>;
  content?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  listWebinar?: Maybe<Array<Maybe<Resource>>>;
  listWebinar_TextField?: Maybe<Scalars['String']['output']>;
  listWebinar_ValueField?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};


export type Newwebinardownload_FieldsListWebinarArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Packagefeatures = {
  __typename?: 'packagefeatures';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Packagefeatures_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Packagefeatures_Fields = {
  __typename?: 'packagefeatures_fields';
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  isPrimary?: Maybe<Scalars['Boolean']['output']>;
  pricingCategory?: Maybe<Pricingcategories>;
  pricingCategory_ValueField?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Packagefeaturevalues = {
  __typename?: 'packagefeaturevalues';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Packagefeaturevalues_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Packagefeaturevalues_Fields = {
  __typename?: 'packagefeaturevalues_fields';
  featureName?: Maybe<Scalars['String']['output']>;
  packageFeature?: Maybe<Packagefeatures>;
  packageFeature_ValueField?: Maybe<Scalars['String']['output']>;
  packageName?: Maybe<Scalars['String']['output']>;
  pricingPackage?: Maybe<Pricingpackages>;
  pricingPackage_ValueField?: Maybe<Scalars['String']['output']>;
  textValue?: Maybe<Scalars['String']['output']>;
  trueFalseValue?: Maybe<Scalars['Boolean']['output']>;
};

export type Panelcontentitems = {
  __typename?: 'panelcontentitems';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Panelcontentitems_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Panelcontentitems_Fields = {
  __typename?: 'panelcontentitems_fields';
  description?: Maybe<Scalars['String']['output']>;
  graphic?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Panelitem = {
  __typename?: 'panelitem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Panelitem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Panelitem_Fields = {
  __typename?: 'panelitem_fields';
  checkedItems?: Maybe<Array<Maybe<Featurelistitem>>>;
  checkedItems_ValueField?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  graphic?: Maybe<Image>;
  graphicLocation?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Panelitem_FieldsCheckedItemsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Partner = {
  __typename?: 'partner';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Partner_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Partner_Fields = {
  __typename?: 'partner_fields';
  brandBGColor?: Maybe<Scalars['String']['output']>;
  brandFGColor?: Maybe<Scalars['String']['output']>;
  cTA?: Maybe<Link>;
  caseStuides?: Maybe<Array<Maybe<Links>>>;
  caseStuides_SortIdField?: Maybe<Scalars['String']['output']>;
  caseStuides_TextField?: Maybe<Scalars['String']['output']>;
  caseStuides_ValueField?: Maybe<Scalars['String']['output']>;
  contactURL?: Maybe<Link>;
  contentPanelCopy?: Maybe<Scalars['String']['output']>;
  customTags?: Maybe<Array<Maybe<Customtag>>>;
  customTagsIDs?: Maybe<Scalars['String']['output']>;
  customTagsNames?: Maybe<Scalars['String']['output']>;
  descriptionStepImplementation?: Maybe<Scalars['String']['output']>;
  documentationIntegration?: Maybe<Array<Maybe<Links>>>;
  documentationIntegration_SortIdField?: Maybe<Scalars['String']['output']>;
  documentationIntegration_TextField?: Maybe<Scalars['String']['output']>;
  documentationIntegration_ValueField?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  facebookURL?: Maybe<Scalars['String']['output']>;
  gallery?: Maybe<Gallery>;
  image?: Maybe<Image>;
  imagePosition?: Maybe<Scalars['String']['output']>;
  linkedInURL?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  metrics?: Maybe<Array<Maybe<Keyvaluepair>>>;
  partnerLogo?: Maybe<Image>;
  partnerTier?: Maybe<Partnertier>;
  partnerTier_SortIdField?: Maybe<Scalars['String']['output']>;
  partnerTier_TextField?: Maybe<Scalars['String']['output']>;
  partnerTier_ValueField?: Maybe<Scalars['String']['output']>;
  productIDs?: Maybe<Scalars['String']['output']>;
  productNames?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Casestudyproduct>>>;
  productsHeading?: Maybe<Scalars['String']['output']>;
  productsRenderType?: Maybe<Scalars['String']['output']>;
  productsSubHeading?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  rightContentCopy?: Maybe<Scalars['String']['output']>;
  servicesOffered?: Maybe<Scalars['String']['output']>;
  similarList?: Maybe<Array<Maybe<Partner>>>;
  similarList_SortIdField?: Maybe<Scalars['String']['output']>;
  similarList_TextField?: Maybe<Scalars['String']['output']>;
  similarList_ValueField?: Maybe<Scalars['String']['output']>;
  stepIcon?: Maybe<Image>;
  stepsImplementation?: Maybe<Array<Maybe<Stepforimplementation>>>;
  stepsImplementation_SortIdField?: Maybe<Scalars['String']['output']>;
  stepsImplementation_TextField?: Maybe<Scalars['String']['output']>;
  stepsImplementation_ValueField?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  titleStepImplementation?: Maybe<Scalars['String']['output']>;
  twitterURL?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Link>;
};


export type Partner_FieldsCaseStuidesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partner_FieldsCustomTagsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partner_FieldsDocumentationIntegrationArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partner_FieldsMetricsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partner_FieldsProductsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partner_FieldsSimilarListArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partner_FieldsStepsImplementationArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Partnerdetails = {
  __typename?: 'partnerdetails';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Partnerdetails_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Partnerdetails_Fields = {
  __typename?: 'partnerdetails_fields';
  cTAButton?: Maybe<Link>;
  cTAContent?: Maybe<Scalars['String']['output']>;
  exploreAllPartners?: Maybe<Link>;
  titleMorePartners?: Maybe<Scalars['String']['output']>;
};

export type Partnerlisting = {
  __typename?: 'partnerlisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Partnerlisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Partnerlisting_Fields = {
  __typename?: 'partnerlisting_fields';
  customTagsToHighlight?: Maybe<Array<Maybe<Customtag>>>;
  customTagsToHighlightIDs?: Maybe<Scalars['String']['output']>;
  leftButton?: Maybe<Link>;
  leftTypeTitle?: Maybe<Scalars['String']['output']>;
  partners?: Maybe<Array<Maybe<Partner>>>;
  showPagination?: Maybe<Scalars['Boolean']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Partnerlisting_FieldsCustomTagsToHighlightArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Partnerlisting_FieldsPartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Partnerlogolisting = {
  __typename?: 'partnerlogolisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Partnerlogolisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Partnerlogolisting_Fields = {
  __typename?: 'partnerlogolisting_fields';
  background?: Maybe<Modulebackground>;
  backgroundID?: Maybe<Scalars['Int']['output']>;
  backgroundName?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  logoCount?: Maybe<Scalars['Int']['output']>;
  partners?: Maybe<Array<Maybe<Partner>>>;
  partnersIDs?: Maybe<Scalars['String']['output']>;
  primaryButton?: Maybe<Link>;
  renderType?: Maybe<Scalars['String']['output']>;
  secondaryButton?: Maybe<Link>;
  subHeading?: Maybe<Scalars['String']['output']>;
};


export type Partnerlogolisting_FieldsPartnersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Partnertier = {
  __typename?: 'partnertier';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Partnertier_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Partnertier_Fields = {
  __typename?: 'partnertier_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Peoplelisting = {
  __typename?: 'peoplelisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Peoplelisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Peoplelisting_Fields = {
  __typename?: 'peoplelisting_fields';
  people?: Maybe<Array<Maybe<Person>>>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Peoplelisting_FieldsPeopleArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Person = {
  __typename?: 'person';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Person_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Person_Fields = {
  __typename?: 'person_fields';
  fullName?: Maybe<Scalars['String']['output']>;
  headshot?: Maybe<Image>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
};

export type Planfeaturescta = {
  __typename?: 'planfeaturescta';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Planfeaturescta_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Planfeaturescta_Fields = {
  __typename?: 'planfeaturescta_fields';
  cTAContent?: Maybe<Scalars['String']['output']>;
  planFeatureList?: Maybe<Pricingplantier>;
  planFeatureTierID?: Maybe<Scalars['Int']['output']>;
  planFeaturesTitle?: Maybe<Scalars['String']['output']>;
  primaryButton?: Maybe<Link>;
};

export type Podcast = {
  __typename?: 'podcast';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Podcast_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Podcast_Fields = {
  __typename?: 'podcast_fields';
  date?: Maybe<Scalars['String']['output']>;
  embed?: Maybe<Scalars['String']['output']>;
  episodeNumber?: Maybe<Scalars['Int']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  guest?: Maybe<Scalars['String']['output']>;
  listingImage?: Maybe<Image>;
  mainImage?: Maybe<Image>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
};

export type Podcastcontentpanel = {
  __typename?: 'podcastcontentpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Podcastcontentpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Podcastcontentpanel_Fields = {
  __typename?: 'podcastcontentpanel_fields';
  enableBackgroundImage?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Image>;
  imagePosition?: Maybe<Scalars['String']['output']>;
  podcastEmbedCode?: Maybe<Scalars['String']['output']>;
  primaryButton?: Maybe<Link>;
  secondaryButton?: Maybe<Link>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Podcastlisting = {
  __typename?: 'podcastlisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Podcastlisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Podcastlisting_Fields = {
  __typename?: 'podcastlisting_fields';
  items?: Maybe<Array<Maybe<Podcast>>>;
  itemsPerPage?: Maybe<Scalars['Int']['output']>;
  sortOrder?: Maybe<Scalars['String']['output']>;
};


export type Podcastlisting_FieldsItemsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Podcastsubscribe = {
  __typename?: 'podcastsubscribe';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Podcastsubscribe_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Podcastsubscribe_Fields = {
  __typename?: 'podcastsubscribe_fields';
  podcastPlatforms?: Maybe<Array<Maybe<Socialfollowlink>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Podcastsubscribe_FieldsPodcastPlatformsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Postdetails = {
  __typename?: 'postdetails';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Postdetails_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Postdetails_Fields = {
  __typename?: 'postdetails_fields';
  backButton?: Maybe<Link>;
  cTABlogPostdetailedpage?: Maybe<Image>;
  categoryLabel?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  relatedPostsCount?: Maybe<Scalars['Int']['output']>;
  relatedPostsLabel?: Maybe<Scalars['String']['output']>;
};

export type Postlisting = {
  __typename?: 'postlisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Postlisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Postlisting_Fields = {
  __typename?: 'postlisting_fields';
  postCount?: Maybe<Scalars['Int']['output']>;
  posts?: Maybe<Array<Maybe<Blogpost>>>;
};


export type Postlisting_FieldsPostsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingcategories = {
  __typename?: 'pricingcategories';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingcategories_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingcategories_Fields = {
  __typename?: 'pricingcategories_fields';
  category?: Maybe<Scalars['String']['output']>;
};

export type Pricingpackages = {
  __typename?: 'pricingpackages';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingpackages_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingpackages_Fields = {
  __typename?: 'pricingpackages_fields';
  cTAButton?: Maybe<Link>;
  cTAButtonLabel?: Maybe<Scalars['String']['output']>;
  chargifyName?: Maybe<Scalars['String']['output']>;
  cost?: Maybe<Scalars['String']['output']>;
  costLabel?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayInManager?: Maybe<Scalars['Boolean']['output']>;
  displayOnWebsite?: Maybe<Scalars['Boolean']['output']>;
  icon?: Maybe<Image>;
  isMostPopular?: Maybe<Scalars['Boolean']['output']>;
  isSaleOn?: Maybe<Scalars['Boolean']['output']>;
  pricingPlan?: Maybe<Scalars['String']['output']>;
  saleCost?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  upgradablePlans?: Maybe<Array<Maybe<Pricingpackages>>>;
  upgradablePlans_TextField?: Maybe<Scalars['String']['output']>;
  upgradablePlans_ValueField?: Maybe<Scalars['String']['output']>;
  yearlyCTAButton?: Maybe<Link>;
  yearlyCTAButtonLabel?: Maybe<Scalars['String']['output']>;
  yearlyCost?: Maybe<Scalars['String']['output']>;
  yearlyCostLabel?: Maybe<Scalars['String']['output']>;
  yearlyDescription?: Maybe<Scalars['String']['output']>;
  yearlyPricingPlan?: Maybe<Scalars['String']['output']>;
  yearlySaleCost?: Maybe<Scalars['String']['output']>;
};


export type Pricingpackages_FieldsUpgradablePlansArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingpackagesmodule = {
  __typename?: 'pricingpackagesmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingpackagesmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingpackagesmodule_Fields = {
  __typename?: 'pricingpackagesmodule_fields';
  comparePackagesTitle?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  loadsByDefault?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  packageFeatureLabels?: Maybe<Array<Maybe<Packagefeatures>>>;
  packageFeatureValues?: Maybe<Array<Maybe<Packagefeaturevalues>>>;
  pricingPackages?: Maybe<Array<Maybe<Pricingpackages>>>;
  primaryFeaturesTitle?: Maybe<Scalars['String']['output']>;
  saleOnText?: Maybe<Scalars['String']['output']>;
  saleOnTextYearly?: Maybe<Scalars['String']['output']>;
  secondaryFeaturesTitle?: Maybe<Scalars['String']['output']>;
  showlesstext?: Maybe<Scalars['String']['output']>;
  showmoretext?: Maybe<Scalars['String']['output']>;
};


export type Pricingpackagesmodule_FieldsPackageFeatureLabelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Pricingpackagesmodule_FieldsPackageFeatureValuesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Pricingpackagesmodule_FieldsPricingPackagesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingplan = {
  __typename?: 'pricingplan';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingplan_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingplan_Fields = {
  __typename?: 'pricingplan_fields';
  callToActionCDN?: Maybe<Link>;
  calltoAction?: Maybe<Link>;
  chargifyName?: Maybe<Scalars['String']['output']>;
  components?: Maybe<Array<Maybe<Pricingplancomponent>>>;
  componentsSortIDs?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Maybe<Pricingplanfeature>>>;
  featuresSortIDs?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Image>;
  isRecommended?: Maybe<Scalars['Boolean']['output']>;
  isVisible?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  priceCDN?: Maybe<Scalars['String']['output']>;
  pricePerUnitLabel?: Maybe<Scalars['String']['output']>;
  pricingPlanTier?: Maybe<Pricingplantier>;
  pricingPlanTierID?: Maybe<Scalars['Int']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Pricingplan_FieldsComponentsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Pricingplan_FieldsFeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingplancomponent = {
  __typename?: 'pricingplancomponent';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingplancomponent_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingplancomponent_Fields = {
  __typename?: 'pricingplancomponent_fields';
  description?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

export type Pricingplanfeature = {
  __typename?: 'pricingplanfeature';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingplanfeature_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingplanfeature_Fields = {
  __typename?: 'pricingplanfeature_fields';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Pricingplans = {
  __typename?: 'pricingplans';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingplans_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingplans_Fields = {
  __typename?: 'pricingplans_fields';
  disclaimer?: Maybe<Scalars['String']['output']>;
  planDetailsURL?: Maybe<Link>;
  plans?: Maybe<Array<Maybe<Pricingplan>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Pricingplans_FieldsPlansArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingplantier = {
  __typename?: 'pricingplantier';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingplantier_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingplantier_Fields = {
  __typename?: 'pricingplantier_fields';
  featureSortIDs?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Maybe<Pricingplantierfeature>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Pricingplantier_FieldsFeaturesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingplantierfeature = {
  __typename?: 'pricingplantierfeature';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingplantierfeature_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingplantierfeature_Fields = {
  __typename?: 'pricingplantierfeature_fields';
  title?: Maybe<Scalars['String']['output']>;
};

export type Pricingtable = {
  __typename?: 'pricingtable';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingtable_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingtable_Fields = {
  __typename?: 'pricingtable_fields';
  column1Link?: Maybe<Link>;
  column1Title?: Maybe<Scalars['String']['output']>;
  column2Link?: Maybe<Link>;
  column2Title?: Maybe<Scalars['String']['output']>;
  column3Link?: Maybe<Link>;
  column3Title?: Maybe<Scalars['String']['output']>;
  column4Link?: Maybe<Link>;
  column4Title?: Maybe<Scalars['String']['output']>;
  expandButtonLabel?: Maybe<Scalars['String']['output']>;
  tableValues?: Maybe<Array<Maybe<Pricingtableitem>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Pricingtable_FieldsTableValuesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Pricingtableitem = {
  __typename?: 'pricingtableitem';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Pricingtableitem_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Pricingtableitem_Fields = {
  __typename?: 'pricingtableitem_fields';
  column1Value?: Maybe<Scalars['String']['output']>;
  column2Value?: Maybe<Scalars['String']['output']>;
  column3Value?: Maybe<Scalars['String']['output']>;
  column4Value?: Maybe<Scalars['String']['output']>;
  rowLabel?: Maybe<Scalars['String']['output']>;
};

export type Productreleases = {
  __typename?: 'productreleases';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Productreleases_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Productreleases_Fields = {
  __typename?: 'productreleases_fields';
  date?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
};

export type Projecttemplate = {
  __typename?: 'projecttemplate';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Projecttemplate_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Projecttemplate_Fields = {
  __typename?: 'projecttemplate_fields';
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  documentationLink?: Maybe<Link>;
  environmentVariables?: Maybe<Scalars['String']['output']>;
  frameworks?: Maybe<Array<Maybe<Projecttemplateframework>>>;
  frameworks_ValueField?: Maybe<Scalars['String']['output']>;
  githubLink?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  moreinfoHere?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  previewURL?: Maybe<Scalars['String']['output']>;
  qATemplateID?: Maybe<Scalars['Int']['output']>;
  showInContentManager?: Maybe<Scalars['Boolean']['output']>;
  showOnWebsite?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  startfreeproject?: Maybe<Link>;
  templateID?: Maybe<Scalars['Int']['output']>;
};


export type Projecttemplate_FieldsFrameworksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Projecttemplateframework = {
  __typename?: 'projecttemplateframework';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Projecttemplateframework_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Projecttemplateframework_Fields = {
  __typename?: 'projecttemplateframework_fields';
  logo?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Relatedresources = {
  __typename?: 'relatedresources';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Relatedresources_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Relatedresources_Fields = {
  __typename?: 'relatedresources_fields';
  relatedResources?: Maybe<Array<Maybe<Resource>>>;
  relatedResources_TextField?: Maybe<Scalars['String']['output']>;
  relatedResources_ValueField?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Relatedresources_FieldsRelatedResourcesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Resource = {
  __typename?: 'resource';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Resource_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Resource_Fields = {
  __typename?: 'resource_fields';
  allowGmail?: Maybe<Scalars['Boolean']['output']>;
  author?: Maybe<Blogauthor>;
  authorID?: Maybe<Scalars['Int']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  autopilotJourneyTrigger?: Maybe<Scalars['String']['output']>;
  bookCover?: Maybe<Image>;
  buttonTextTopRead?: Maybe<Scalars['String']['output']>;
  buttonTextTopWebinar?: Maybe<Scalars['String']['output']>;
  cTAID?: Maybe<Scalars['Int']['output']>;
  cTAName?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  downloadButtonText?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  formTitle?: Maybe<Scalars['String']['output']>;
  gated?: Maybe<Scalars['Boolean']['output']>;
  headingTopReads?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  resourceButtonText?: Maybe<Scalars['String']['output']>;
  resourceHeading?: Maybe<Scalars['String']['output']>;
  resourceItem?: Maybe<Resource>;
  resourceItem_SortIdField?: Maybe<Scalars['String']['output']>;
  resourceItem_TextField?: Maybe<Scalars['String']['output']>;
  resourceItem_ValueField?: Maybe<Scalars['String']['output']>;
  resourceTopics?: Maybe<Array<Maybe<Newresourcetopic>>>;
  resourceTopics_SortIdField?: Maybe<Scalars['String']['output']>;
  resourceTopics_TextField?: Maybe<Scalars['String']['output']>;
  resourceTopics_ValueField?: Maybe<Scalars['String']['output']>;
  resourceType?: Maybe<Resourcetype>;
  resourceTypeID?: Maybe<Scalars['Int']['output']>;
  resourceTypeName?: Maybe<Scalars['String']['output']>;
  rightCTAButton?: Maybe<Link>;
  rightCTAContent?: Maybe<Scalars['String']['output']>;
  rightColumnCTATitle?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  thankYouContent?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topReads?: Maybe<Array<Maybe<Resource>>>;
  topReads_SortIdField?: Maybe<Scalars['String']['output']>;
  topReads_TextField?: Maybe<Scalars['String']['output']>;
  topReads_ValueField?: Maybe<Scalars['String']['output']>;
  topWebinars?: Maybe<Array<Maybe<Resource>>>;
  topWebinars_SortIdField?: Maybe<Scalars['String']['output']>;
  topWebinars_TextField?: Maybe<Scalars['String']['output']>;
  topWebinars_ValueField?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Scalars['String']['output']>;
  uRLGatedContent?: Maybe<Scalars['String']['output']>;
};


export type Resource_FieldsResourceTopicsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Resource_FieldsTopReadsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Resource_FieldsTopWebinarsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Resourcedetails = {
  __typename?: 'resourcedetails';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Resourcedetails_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Resourcedetails_Fields = {
  __typename?: 'resourcedetails_fields';
  backButton?: Maybe<Link>;
  companyLabel?: Maybe<Scalars['String']['output']>;
  emailLabel?: Maybe<Scalars['String']['output']>;
  firstNameLabel?: Maybe<Scalars['String']['output']>;
  hubspotForm?: Maybe<Scalars['String']['output']>;
  lastNameLabel?: Maybe<Scalars['String']['output']>;
  phoneLabel?: Maybe<Scalars['String']['output']>;
  redirectURL?: Maybe<Link>;
  submissionPOSTURL?: Maybe<Scalars['String']['output']>;
  submitButtonLabel?: Maybe<Scalars['String']['output']>;
};

export type Resourcetype = {
  __typename?: 'resourcetype';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Resourcetype_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Resourcetype_Fields = {
  __typename?: 'resourcetype_fields';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Reviewrotator = {
  __typename?: 'reviewrotator';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Reviewrotator_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Reviewrotator_Fields = {
  __typename?: 'reviewrotator_fields';
  collapseReviewText?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  expandReviewText?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Array<Maybe<Reviews>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Reviewrotator_FieldsReviewsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Reviews = {
  __typename?: 'reviews';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Reviews_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Reviews_Fields = {
  __typename?: 'reviews_fields';
  review?: Maybe<Scalars['String']['output']>;
  reviewDate?: Maybe<Scalars['String']['output']>;
  reviewURL?: Maybe<Link>;
  reviewer?: Maybe<Scalars['String']['output']>;
  starsGraphic?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Richtextarea = {
  __typename?: 'richtextarea';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Richtextarea_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Richtextarea_Fields = {
  __typename?: 'richtextarea_fields';
  textBlob?: Maybe<Scalars['String']['output']>;
};

export type Rightleftcontent = {
  __typename?: 'rightleftcontent';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Rightleftcontent_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Rightleftcontent_Fields = {
  __typename?: 'rightleftcontent_fields';
  background?: Maybe<Modulebackground>;
  backgroundID?: Maybe<Scalars['Int']['output']>;
  backgroundName?: Maybe<Scalars['String']['output']>;
  bullet1?: Maybe<Scalars['String']['output']>;
  bullet1Title?: Maybe<Scalars['String']['output']>;
  bullet2?: Maybe<Scalars['String']['output']>;
  bullet2Title?: Maybe<Scalars['String']['output']>;
  bullet3?: Maybe<Scalars['String']['output']>;
  bullet3Title?: Maybe<Scalars['String']['output']>;
  bullet4?: Maybe<Scalars['String']['output']>;
  bullet4Title?: Maybe<Scalars['String']['output']>;
  bullet5?: Maybe<Scalars['String']['output']>;
  bullet5Title?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  imagePlacement?: Maybe<Scalars['String']['output']>;
};

export type Rightorleftcasestudytestimonial = {
  __typename?: 'rightorleftcasestudytestimonial';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Rightorleftcasestudytestimonial_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Rightorleftcasestudytestimonial_Fields = {
  __typename?: 'rightorleftcasestudytestimonial_fields';
  cTA?: Maybe<Scalars['String']['output']>;
  casestudy?: Maybe<Casestudy>;
  casestudy_ValueField?: Maybe<Scalars['String']['output']>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  testimonial?: Maybe<Testimonial>;
  testimonial_ValueField?: Maybe<Scalars['String']['output']>;
  textSide?: Maybe<Scalars['String']['output']>;
};

export type Rightorleftcontentmodule = {
  __typename?: 'rightorleftcontentmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Rightorleftcontentmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Rightorleftcontentmodule_Fields = {
  __typename?: 'rightorleftcontentmodule_fields';
  breadcrumb?: Maybe<Scalars['String']['output']>;
  cTA1Optional?: Maybe<Link>;
  cTA2Optional?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  graphic?: Maybe<Image>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  textSide?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Rightorleftsteps = {
  __typename?: 'rightorleftsteps';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Rightorleftsteps_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Rightorleftsteps_Fields = {
  __typename?: 'rightorleftsteps_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  placeholderImage?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  textSide?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Scheduleademo = {
  __typename?: 'scheduleademo';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Scheduleademo_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Scheduleademo_Fields = {
  __typename?: 'scheduleademo_fields';
  leftPanelContent?: Maybe<Scalars['String']['output']>;
  schedulerIFrameURL?: Maybe<Scalars['String']['output']>;
};

export type Searchresults = {
  __typename?: 'searchresults';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Searchresults_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Searchresults_Fields = {
  __typename?: 'searchresults_fields';
  defaultContent?: Maybe<Scalars['String']['output']>;
  noResultsMessage?: Maybe<Scalars['String']['output']>;
  resultCount?: Maybe<Scalars['Int']['output']>;
};

export type Sectionbreadcrumbmodule = {
  __typename?: 'sectionbreadcrumbmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Sectionbreadcrumbmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Sectionbreadcrumbmodule_Fields = {
  __typename?: 'sectionbreadcrumbmodule_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  sectionBreadcrumb?: Maybe<Scalars['String']['output']>;
};

export type Sectionheading = {
  __typename?: 'sectionheading';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Sectionheading_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Sectionheading_Fields = {
  __typename?: 'sectionheading_fields';
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Seoimage = {
  __typename?: 'seoimage';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Seoimage_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Seoimage_Fields = {
  __typename?: 'seoimage_fields';
  image?: Maybe<Image>;
};

export type Share = {
  __typename?: 'share';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Share_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Share_Fields = {
  __typename?: 'share_fields';
  facebook?: Maybe<Scalars['Boolean']['output']>;
  linkedIn?: Maybe<Scalars['Boolean']['output']>;
  shareLabel?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['Boolean']['output']>;
};

export type Singletestimonialpanel = {
  __typename?: 'singletestimonialpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Singletestimonialpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Singletestimonialpanel_Fields = {
  __typename?: 'singletestimonialpanel_fields';
  cTAButton?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  testimonials?: Maybe<Array<Maybe<Testimonial>>>;
  testimonials_ValueField?: Maybe<Scalars['String']['output']>;
};


export type Singletestimonialpanel_FieldsTestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Sitesearchsettings = {
  __typename?: 'sitesearchsettings';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Sitesearchsettings_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Sitesearchsettings_Fields = {
  __typename?: 'sitesearchsettings_fields';
  searchProductPage?: Maybe<Scalars['String']['output']>;
};

export type Socialfollowlink = {
  __typename?: 'socialfollowlink';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Socialfollowlink_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Socialfollowlink_Fields = {
  __typename?: 'socialfollowlink_fields';
  followURL?: Maybe<Link>;
  logo?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Space = {
  __typename?: 'space';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Space_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Space_Fields = {
  __typename?: 'space_fields';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};

export type Startertemplatedetails = {
  __typename?: 'startertemplatedetails';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Startertemplatedetails_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Startertemplatedetails_Fields = {
  __typename?: 'startertemplatedetails_fields';
  starters?: Maybe<Array<Maybe<Projecttemplate>>>;
  starters_SortIdField?: Maybe<Scalars['String']['output']>;
};


export type Startertemplatedetails_FieldsStartersArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Startertemplatelisting = {
  __typename?: 'startertemplatelisting';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Startertemplatelisting_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Startertemplatelisting_Fields = {
  __typename?: 'startertemplatelisting_fields';
  description?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
  templates?: Maybe<Array<Maybe<Projecttemplate>>>;
  title?: Maybe<Scalars['String']['output']>;
  viewDetailsLabel?: Maybe<Scalars['String']['output']>;
};


export type Startertemplatelisting_FieldsTemplatesArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Stayintouch = {
  __typename?: 'stayintouch';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Stayintouch_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Stayintouch_Fields = {
  __typename?: 'stayintouch_fields';
  socialFollowLinks?: Maybe<Array<Maybe<Socialfollowlink>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Stayintouch_FieldsSocialFollowLinksArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Stepforimplementation = {
  __typename?: 'stepforimplementation';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Stepforimplementation_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Stepforimplementation_Fields = {
  __typename?: 'stepforimplementation_fields';
  excerpt?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Submissionform = {
  __typename?: 'submissionform';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Submissionform_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Submissionform_Fields = {
  __typename?: 'submissionform_fields';
  allowGmail?: Maybe<Scalars['Boolean']['output']>;
  autopilotJourneyTrigger?: Maybe<Scalars['String']['output']>;
  backgroundColour?: Maybe<Scalars['String']['output']>;
  companyLabel?: Maybe<Scalars['String']['output']>;
  componentName?: Maybe<Scalars['String']['output']>;
  conversionScript?: Maybe<Scalars['String']['output']>;
  countryLabel?: Maybe<Scalars['String']['output']>;
  emailLabel?: Maybe<Scalars['String']['output']>;
  firstNameLabel?: Maybe<Scalars['String']['output']>;
  formID?: Maybe<Scalars['String']['output']>;
  hubspotForm?: Maybe<Scalars['String']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  jobFunctionLabel?: Maybe<Scalars['String']['output']>;
  jobFunctionOptions?: Maybe<Scalars['String']['output']>;
  jobTitleLabel?: Maybe<Scalars['String']['output']>;
  jobTitleOptions?: Maybe<Scalars['String']['output']>;
  lastNameLabel?: Maybe<Scalars['String']['output']>;
  leftColumnBody?: Maybe<Scalars['String']['output']>;
  leftColumnTitle?: Maybe<Scalars['String']['output']>;
  phoneLabel?: Maybe<Scalars['String']['output']>;
  redirectURL?: Maybe<Link>;
  rightColumnTitle?: Maybe<Scalars['String']['output']>;
  submissionCopy?: Maybe<Scalars['String']['output']>;
  submissionPOSTURL?: Maybe<Scalars['String']['output']>;
  submitButtonLabel?: Maybe<Scalars['String']['output']>;
  thanksMessage?: Maybe<Scalars['String']['output']>;
  useSalesRepSpecificRedirect?: Maybe<Scalars['Boolean']['output']>;
};

export type Subscribedthankyou = {
  __typename?: 'subscribedthankyou';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Subscribedthankyou_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Subscribedthankyou_Fields = {
  __typename?: 'subscribedthankyou_fields';
  textBlob?: Maybe<Scalars['String']['output']>;
};

export type Tabpanel = {
  __typename?: 'tabpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Tabpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Tabpanel_Fields = {
  __typename?: 'tabpanel_fields';
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  labelInternal?: Maybe<Scalars['String']['output']>;
  primaryButton?: Maybe<Link>;
  tabIcon?: Maybe<Link>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Tabpanels = {
  __typename?: 'tabpanels';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Tabpanels_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Tabpanels_Fields = {
  __typename?: 'tabpanels_fields';
  subTitle?: Maybe<Scalars['String']['output']>;
  tabPanelIDs?: Maybe<Scalars['String']['output']>;
  tabPanelNames?: Maybe<Scalars['String']['output']>;
  tabPanels?: Maybe<Array<Maybe<Tabpanel>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Tabpanels_FieldsTabPanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Temp = {
  __typename?: 'temp';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Temp_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Temp_Fields = {
  __typename?: 'temp_fields';
  dec?: Maybe<Scalars['Decimal']['output']>;
  drop?: Maybe<Scalars['String']['output']>;
  dsfasdfasdf?: Maybe<Scalars['Int']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  fileattachmenbt?: Maybe<File>;
  galleryfield?: Maybe<Gallery>;
  imageattachment?: Maybe<Image>;
  link?: Maybe<Link>;
  listofFiles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  richtext?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  true?: Maybe<Scalars['Boolean']['output']>;
};

export type Testimonial = {
  __typename?: 'testimonial';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Testimonial_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Testimonial_Fields = {
  __typename?: 'testimonial_fields';
  companyLogo?: Maybe<Image>;
  companyName?: Maybe<Scalars['String']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  headshot?: Maybe<Image>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  textBlob?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Testimonials = {
  __typename?: 'testimonials';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Testimonials_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Testimonials_Fields = {
  __typename?: 'testimonials_fields';
  bottomLink?: Maybe<Link>;
  header?: Maybe<Scalars['String']['output']>;
  subHeading?: Maybe<Scalars['String']['output']>;
  testimonialIDs?: Maybe<Scalars['String']['output']>;
  testimonials?: Maybe<Array<Maybe<Testimonial>>>;
};


export type Testimonials_FieldsTestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Testimonialslogos = {
  __typename?: 'testimonialslogos';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Testimonialslogos_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Testimonialslogos_Fields = {
  __typename?: 'testimonialslogos_fields';
  header?: Maybe<Scalars['String']['output']>;
  logoIDs?: Maybe<Scalars['String']['output']>;
  logos?: Maybe<Array<Maybe<Logo>>>;
  testimonialIDs?: Maybe<Scalars['String']['output']>;
  testimonials?: Maybe<Array<Maybe<Testimonial>>>;
};


export type Testimonialslogos_FieldsLogosArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Testimonialslogos_FieldsTestimonialsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Triplepanelcomparisonmodule = {
  __typename?: 'triplepanelcomparisonmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Triplepanelcomparisonmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Triplepanelcomparisonmodule_Fields = {
  __typename?: 'triplepanelcomparisonmodule_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  panel1CheckedContent?: Maybe<Scalars['String']['output']>;
  panel1Graphic?: Maybe<Image>;
  panel1Title?: Maybe<Scalars['String']['output']>;
  panel1UncheckedContent?: Maybe<Scalars['String']['output']>;
  panel2CheckedContent?: Maybe<Scalars['String']['output']>;
  panel2Graphic?: Maybe<Image>;
  panel2Title?: Maybe<Scalars['String']['output']>;
  panel2UncheckedContent?: Maybe<Scalars['String']['output']>;
  panel3CheckedContent?: Maybe<Scalars['String']['output']>;
  panel3Graphic?: Maybe<Image>;
  panel3Title?: Maybe<Scalars['String']['output']>;
  panel3UncheckedContent?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Triplepanelmodule = {
  __typename?: 'triplepanelmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Triplepanelmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Triplepanelmodule_Fields = {
  __typename?: 'triplepanelmodule_fields';
  cTAButton?: Maybe<Link>;
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  triplePanelItems?: Maybe<Array<Maybe<Panelcontentitems>>>;
};


export type Triplepanelmodule_FieldsTriplePanelItemsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Twopanelfeaturecomparison = {
  __typename?: 'twopanelfeaturecomparison';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Twopanelfeaturecomparison_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Twopanelfeaturecomparison_Fields = {
  __typename?: 'twopanelfeaturecomparison_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  group1Panels?: Maybe<Array<Maybe<Panelitem>>>;
  group1Title?: Maybe<Scalars['String']['output']>;
  group2Panels?: Maybe<Array<Maybe<Panelitem>>>;
  group2Title?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
};


export type Twopanelfeaturecomparison_FieldsGroup1PanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type Twopanelfeaturecomparison_FieldsGroup2PanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Typeformmodule = {
  __typename?: 'typeformmodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Typeformmodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Typeformmodule_Fields = {
  __typename?: 'typeformmodule_fields';
  buttonColor?: Maybe<Scalars['String']['output']>;
  buttonLabel?: Maybe<Scalars['String']['output']>;
  display?: Maybe<Scalars['String']['output']>;
  form?: Maybe<Scalars['String']['output']>;
};

export type Urllist = {
  __typename?: 'urllist';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Urllist_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Urllist_Fields = {
  __typename?: 'urllist_fields';
  title?: Maybe<Scalars['String']['output']>;
  uRL?: Maybe<Link>;
};

export type Verticalcontentpanel = {
  __typename?: 'verticalcontentpanel';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Verticalcontentpanel_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Verticalcontentpanel_Fields = {
  __typename?: 'verticalcontentpanel_fields';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  textSide?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  verticalContentPanels?: Maybe<Array<Maybe<Panelcontentitems>>>;
};


export type Verticalcontentpanel_FieldsVerticalContentPanelsArgs = {
  contentID?: InputMaybe<Scalars['Int']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Videomodule = {
  __typename?: 'videomodule';
  /** The unique identifier of the item. */
  contentID?: Maybe<Scalars['Int']['output']>;
  fields?: Maybe<Videomodule_Fields>;
  properties?: Maybe<PropertiesType>;
  seo?: Maybe<SeoType>;
};

export type Videomodule_Fields = {
  __typename?: 'videomodule_fields';
  desktopSpace?: Maybe<Scalars['String']['output']>;
  mobileSpace?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Image>;
  videoPath?: Maybe<Link>;
  videointrotext?: Maybe<Scalars['String']['output']>;
};

export type SupportingQueryVariables = Exact<{ [key: string]: never; }>;


export type SupportingQuery = { __typename?: 'Root', casestudyindustries?: Array<{ __typename?: 'casestudyindustry', contentID?: number | null, fields?: { __typename?: 'casestudyindustry_fields', title?: string | null } | null } | null> | null, casestudychallenges?: Array<{ __typename?: 'casestudychallenge', contentID?: number | null, fields?: { __typename?: 'casestudychallenge_fields', title?: string | null } | null } | null> | null };

export type IntegrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type IntegrationsQuery = { __typename?: 'Root', integrations?: Array<{ __typename?: 'integrations', contentID?: number | null, fields?: { __typename?: 'integrations_fields', title?: string | null, companyDescription?: string | null, uRL?: string | null, integrationType?: Array<{ __typename?: 'integrationtype', contentID?: number | null, fields?: { __typename?: 'integrationtype_fields', title?: string | null } | null } | null> | null, logo?: { __typename?: 'Image', label?: string | null, url: string, height: number, width: number } | null } | null } | null> | null };


export const SupportingDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "supporting" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "casestudyindustries" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contentID" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fields" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "casestudychallenges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contentID" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fields" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }] } }] } }] } as unknown as DocumentNode<SupportingQuery, SupportingQueryVariables>;
export const IntegrationsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "integrations" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "integrations" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contentID" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fields" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "companyDescription" } }, { "kind": "Field", "name": { "kind": "Name", "value": "integrationType" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contentID" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fields" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "uRL" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "url" } }, { "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "width" } }] } }] } }] } }] } }] } as unknown as DocumentNode<IntegrationsQuery, IntegrationsQueryVariables>;