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
    "\n\t\t\tquery integrations {\n\t\t\t\tintegrations {\n\t\t\t\t\tcontentID\n\t\t\t\t\tfields {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcompanyDescription\n\t\t\t\t\t\tintegrationType {\n\t\t\t\t\t\t\tcontentID\n\t\t\t\t\t\t\tfields {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tuRL\n\t\t\t\t\t\tlogo {\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.IntegrationsDocument,
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
export function gql(source: "\n\t\t\tquery integrations {\n\t\t\t\tintegrations {\n\t\t\t\t\tcontentID\n\t\t\t\t\tfields {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcompanyDescription\n\t\t\t\t\t\tintegrationType {\n\t\t\t\t\t\t\tcontentID\n\t\t\t\t\t\t\tfields {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tuRL\n\t\t\t\t\t\tlogo {\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery integrations {\n\t\t\t\tintegrations {\n\t\t\t\t\tcontentID\n\t\t\t\t\tfields {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcompanyDescription\n\t\t\t\t\t\tintegrationType {\n\t\t\t\t\t\t\tcontentID\n\t\t\t\t\t\t\tfields {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tuRL\n\t\t\t\t\t\tlogo {\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\turl\n\t\t\t\t\t\t\theight\n\t\t\t\t\t\t\twidth\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;