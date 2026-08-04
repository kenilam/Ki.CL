/** Internal type. DO NOT USE DIRECTLY. */
type Exact<
  T extends {
    [key: string]: unknown;
  },
> = {
  [K in keyof T]: T[K];
};
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import { EmailAddress, UUID } from '../scalars';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ActivateInput = {
  RegistrationGUID: UUID;
  Secret: string;
  UserGUID: UUID;
};
export type Provider = 'apple' | 'google';
export type RegisterInput = {
  Email: EmailAddress;
  FirstName?: string | null | undefined;
  LastName?: string | null | undefined;
  Password: string;
};
export type SignInInput = {
  Email: EmailAddress;
  Password: string;
};
export type SocialSignInInput = {
  Provider: Provider;
  Token: string;
};
export type TaxonSearchSource =
  /** Already known — matched against stored nodes. */
  | 'DATABASE'
  /** Matched against Open Tree's taxonomy because nothing was stored. */
  | 'OPEN_TREE';
export type TaxonVisualStatus = 'ERROR' | 'EXHAUSTED' | 'PENDING' | 'READY';
export type Kicl_AssetQueryVariables = Exact<{
  id: string | number;
}>;
export type Kicl_AssetQuery = {
  Asset: {
    id: string;
    url: string;
    generator: string | null;
  } | null;
};
export type Kicl_MeQueryVariables = Exact<{
  [key: string]: never;
}>;
export type Kicl_MeQuery = {
  Me: {
    UserGUID: UUID | null;
    Email: EmailAddress | null;
    FirstName: string | null;
    LastName: string | null;
    Avatar: string | null;
    Active: boolean | null;
    aud: string | null;
  } | null;
};
export type Kicl_TaxonSearchQueryVariables = Exact<{
  query: string;
  limit?: number | null | undefined;
}>;
export type Kicl_TaxonSearchQuery = {
  TaxonSearch: Array<{
    nodeId: string | null;
    ottId: number | null;
    name: string;
    rank: string | null;
    source: TaxonSearchSource;
  }>;
};
export type Kicl_TaxonVisualQueryVariables = Exact<{
  ottId: number;
  name: string;
  rank?: string | null | undefined;
}>;
export type Kicl_TaxonVisualQuery = {
  TaxonVisual: {
    status: TaxonVisualStatus;
    ottId: number;
    nodeId: string | null;
    assetId: string | null;
    description: string | null;
    visualScore: {
      overall: number;
      taxonMatch: number;
      pass: boolean;
    } | null;
  };
};
export type Kicl_TreeOfLifeSubtreeQueryVariables = Exact<{
  ottId?: number | null | undefined;
  nodeId?: string | null | undefined;
  heightLimit?: number | null | undefined;
}>;
export type Kicl_TreeOfLifeSubtreeQuery = {
  TreeOfLifeSubtree: {
    nodeId: string;
    ottId: number | null;
    name: string | null;
    rank: string | null;
    numTips: number | null;
    assetId: string | null;
    description: string | null;
    visualStatus: TaxonVisualStatus | null;
    visualScore: {
      overall: number;
      taxonMatch: number;
      pass: boolean;
    } | null;
    ancestor: {
      nodeId: string;
      ottId: number | null;
      name: string | null;
      rank: string | null;
      numTips: number | null;
      assetId: string | null;
      description: string | null;
      visualStatus: TaxonVisualStatus | null;
      descendants: Array<{
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
        numTips: number | null;
        assetId: string | null;
        description: string | null;
        visualStatus: TaxonVisualStatus | null;
      }> | null;
      ancestor: {
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
        numTips: number | null;
        assetId: string | null;
        description: string | null;
        visualStatus: TaxonVisualStatus | null;
        descendants: Array<{
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
          numTips: number | null;
          assetId: string | null;
          description: string | null;
          visualStatus: TaxonVisualStatus | null;
        }> | null;
        ancestor: {
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
          numTips: number | null;
          assetId: string | null;
          description: string | null;
          visualStatus: TaxonVisualStatus | null;
          descendants: Array<{
            nodeId: string;
            ottId: number | null;
            name: string | null;
            rank: string | null;
            numTips: number | null;
            assetId: string | null;
            description: string | null;
            visualStatus: TaxonVisualStatus | null;
          }> | null;
          ancestor: {
            nodeId: string;
            ottId: number | null;
            name: string | null;
            rank: string | null;
            numTips: number | null;
            assetId: string | null;
            description: string | null;
            visualStatus: TaxonVisualStatus | null;
            descendants: Array<{
              nodeId: string;
              ottId: number | null;
              name: string | null;
              rank: string | null;
              numTips: number | null;
              assetId: string | null;
              description: string | null;
              visualStatus: TaxonVisualStatus | null;
            }> | null;
            ancestor: {
              nodeId: string;
              ottId: number | null;
              name: string | null;
              rank: string | null;
              numTips: number | null;
              assetId: string | null;
              description: string | null;
              visualStatus: TaxonVisualStatus | null;
              descendants: Array<{
                nodeId: string;
                ottId: number | null;
                name: string | null;
                rank: string | null;
                numTips: number | null;
                assetId: string | null;
                description: string | null;
                visualStatus: TaxonVisualStatus | null;
              }> | null;
              ancestor: {
                nodeId: string;
                ottId: number | null;
                name: string | null;
                rank: string | null;
                numTips: number | null;
                assetId: string | null;
                description: string | null;
                visualStatus: TaxonVisualStatus | null;
                descendants: Array<{
                  nodeId: string;
                  ottId: number | null;
                  name: string | null;
                  rank: string | null;
                  numTips: number | null;
                  assetId: string | null;
                  description: string | null;
                  visualStatus: TaxonVisualStatus | null;
                }> | null;
                ancestor: {
                  nodeId: string;
                  ottId: number | null;
                  name: string | null;
                  rank: string | null;
                  numTips: number | null;
                  assetId: string | null;
                  description: string | null;
                  visualStatus: TaxonVisualStatus | null;
                  descendants: Array<{
                    nodeId: string;
                    ottId: number | null;
                    name: string | null;
                    rank: string | null;
                    numTips: number | null;
                    assetId: string | null;
                    description: string | null;
                    visualStatus: TaxonVisualStatus | null;
                  }> | null;
                  ancestor: {
                    nodeId: string;
                    ottId: number | null;
                    name: string | null;
                    rank: string | null;
                    numTips: number | null;
                    assetId: string | null;
                    description: string | null;
                    visualStatus: TaxonVisualStatus | null;
                    descendants: Array<{
                      nodeId: string;
                      ottId: number | null;
                      name: string | null;
                      rank: string | null;
                      numTips: number | null;
                      assetId: string | null;
                      description: string | null;
                      visualStatus: TaxonVisualStatus | null;
                    }> | null;
                    ancestor: {
                      nodeId: string;
                      ottId: number | null;
                      name: string | null;
                      rank: string | null;
                      numTips: number | null;
                      assetId: string | null;
                      description: string | null;
                      visualStatus: TaxonVisualStatus | null;
                      descendants: Array<{
                        nodeId: string;
                        ottId: number | null;
                        name: string | null;
                        rank: string | null;
                        numTips: number | null;
                        assetId: string | null;
                        description: string | null;
                        visualStatus: TaxonVisualStatus | null;
                      }> | null;
                      ancestor: {
                        nodeId: string;
                        ottId: number | null;
                        name: string | null;
                        rank: string | null;
                        numTips: number | null;
                        assetId: string | null;
                        description: string | null;
                        visualStatus: TaxonVisualStatus | null;
                        descendants: Array<{
                          nodeId: string;
                          ottId: number | null;
                          name: string | null;
                          rank: string | null;
                          numTips: number | null;
                          assetId: string | null;
                          description: string | null;
                          visualStatus: TaxonVisualStatus | null;
                        }> | null;
                        ancestor: {
                          nodeId: string;
                          ottId: number | null;
                          name: string | null;
                          rank: string | null;
                          numTips: number | null;
                          assetId: string | null;
                          description: string | null;
                          visualStatus: TaxonVisualStatus | null;
                          descendants: Array<{
                            nodeId: string;
                            ottId: number | null;
                            name: string | null;
                            rank: string | null;
                            numTips: number | null;
                            assetId: string | null;
                            description: string | null;
                            visualStatus: TaxonVisualStatus | null;
                          }> | null;
                          ancestor: {
                            nodeId: string;
                            ottId: number | null;
                            name: string | null;
                            rank: string | null;
                            numTips: number | null;
                            assetId: string | null;
                            description: string | null;
                            visualStatus: TaxonVisualStatus | null;
                            descendants: Array<{
                              nodeId: string;
                              ottId: number | null;
                              name: string | null;
                              rank: string | null;
                              numTips: number | null;
                              assetId: string | null;
                              description: string | null;
                              visualStatus: TaxonVisualStatus | null;
                            }> | null;
                          } | null;
                        } | null;
                      } | null;
                    } | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
    asset: {
      id: string;
      url: string;
      generator: string | null;
    } | null;
    descendants: Array<{
      nodeId: string;
      ottId: number | null;
      name: string | null;
      rank: string | null;
      numTips: number | null;
      assetId: string | null;
      description: string | null;
      visualStatus: TaxonVisualStatus | null;
      visualScore: {
        overall: number;
        taxonMatch: number;
        pass: boolean;
      } | null;
      ancestor: {
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
      } | null;
      asset: {
        id: string;
        url: string;
        generator: string | null;
      } | null;
      descendants: Array<{
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
        numTips: number | null;
        assetId: string | null;
        description: string | null;
        visualStatus: TaxonVisualStatus | null;
        visualScore: {
          overall: number;
          taxonMatch: number;
          pass: boolean;
        } | null;
        ancestor: {
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
        } | null;
        asset: {
          id: string;
          url: string;
          generator: string | null;
        } | null;
        descendants: Array<{
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
          numTips: number | null;
          assetId: string | null;
          description: string | null;
          visualStatus: TaxonVisualStatus | null;
          visualScore: {
            overall: number;
            taxonMatch: number;
            pass: boolean;
          } | null;
          ancestor: {
            nodeId: string;
            ottId: number | null;
            name: string | null;
            rank: string | null;
          } | null;
          asset: {
            id: string;
            url: string;
            generator: string | null;
          } | null;
        }> | null;
      }> | null;
    }> | null;
  } | null;
};
export type Kicl_TreeOfLifeSubtreesQueryVariables = Exact<{
  ottIds?: Array<number> | number | null | undefined;
  nodeIds?: Array<string> | string | null | undefined;
  heightLimit?: number | null | undefined;
}>;
export type Kicl_TreeOfLifeSubtreesQuery = {
  TreeOfLifeSubtrees: Array<{
    nodeId: string;
    ottId: number | null;
    name: string | null;
    rank: string | null;
    numTips: number | null;
    assetId: string | null;
    description: string | null;
    visualStatus: TaxonVisualStatus | null;
    visualScore: {
      overall: number;
      taxonMatch: number;
      pass: boolean;
    } | null;
    ancestor: {
      nodeId: string;
      ottId: number | null;
      name: string | null;
      rank: string | null;
      numTips: number | null;
      assetId: string | null;
      description: string | null;
      visualStatus: TaxonVisualStatus | null;
      descendants: Array<{
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
        numTips: number | null;
        assetId: string | null;
        description: string | null;
        visualStatus: TaxonVisualStatus | null;
      }> | null;
      ancestor: {
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
        numTips: number | null;
        assetId: string | null;
        description: string | null;
        visualStatus: TaxonVisualStatus | null;
        descendants: Array<{
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
          numTips: number | null;
          assetId: string | null;
          description: string | null;
          visualStatus: TaxonVisualStatus | null;
        }> | null;
        ancestor: {
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
          numTips: number | null;
          assetId: string | null;
          description: string | null;
          visualStatus: TaxonVisualStatus | null;
          descendants: Array<{
            nodeId: string;
            ottId: number | null;
            name: string | null;
            rank: string | null;
            numTips: number | null;
            assetId: string | null;
            description: string | null;
            visualStatus: TaxonVisualStatus | null;
          }> | null;
          ancestor: {
            nodeId: string;
            ottId: number | null;
            name: string | null;
            rank: string | null;
            numTips: number | null;
            assetId: string | null;
            description: string | null;
            visualStatus: TaxonVisualStatus | null;
            descendants: Array<{
              nodeId: string;
              ottId: number | null;
              name: string | null;
              rank: string | null;
              numTips: number | null;
              assetId: string | null;
              description: string | null;
              visualStatus: TaxonVisualStatus | null;
            }> | null;
            ancestor: {
              nodeId: string;
              ottId: number | null;
              name: string | null;
              rank: string | null;
              numTips: number | null;
              assetId: string | null;
              description: string | null;
              visualStatus: TaxonVisualStatus | null;
              descendants: Array<{
                nodeId: string;
                ottId: number | null;
                name: string | null;
                rank: string | null;
                numTips: number | null;
                assetId: string | null;
                description: string | null;
                visualStatus: TaxonVisualStatus | null;
              }> | null;
              ancestor: {
                nodeId: string;
                ottId: number | null;
                name: string | null;
                rank: string | null;
                numTips: number | null;
                assetId: string | null;
                description: string | null;
                visualStatus: TaxonVisualStatus | null;
                descendants: Array<{
                  nodeId: string;
                  ottId: number | null;
                  name: string | null;
                  rank: string | null;
                  numTips: number | null;
                  assetId: string | null;
                  description: string | null;
                  visualStatus: TaxonVisualStatus | null;
                }> | null;
                ancestor: {
                  nodeId: string;
                  ottId: number | null;
                  name: string | null;
                  rank: string | null;
                  numTips: number | null;
                  assetId: string | null;
                  description: string | null;
                  visualStatus: TaxonVisualStatus | null;
                  descendants: Array<{
                    nodeId: string;
                    ottId: number | null;
                    name: string | null;
                    rank: string | null;
                    numTips: number | null;
                    assetId: string | null;
                    description: string | null;
                    visualStatus: TaxonVisualStatus | null;
                  }> | null;
                  ancestor: {
                    nodeId: string;
                    ottId: number | null;
                    name: string | null;
                    rank: string | null;
                    numTips: number | null;
                    assetId: string | null;
                    description: string | null;
                    visualStatus: TaxonVisualStatus | null;
                    descendants: Array<{
                      nodeId: string;
                      ottId: number | null;
                      name: string | null;
                      rank: string | null;
                      numTips: number | null;
                      assetId: string | null;
                      description: string | null;
                      visualStatus: TaxonVisualStatus | null;
                    }> | null;
                    ancestor: {
                      nodeId: string;
                      ottId: number | null;
                      name: string | null;
                      rank: string | null;
                      numTips: number | null;
                      assetId: string | null;
                      description: string | null;
                      visualStatus: TaxonVisualStatus | null;
                      descendants: Array<{
                        nodeId: string;
                        ottId: number | null;
                        name: string | null;
                        rank: string | null;
                        numTips: number | null;
                        assetId: string | null;
                        description: string | null;
                        visualStatus: TaxonVisualStatus | null;
                      }> | null;
                      ancestor: {
                        nodeId: string;
                        ottId: number | null;
                        name: string | null;
                        rank: string | null;
                        numTips: number | null;
                        assetId: string | null;
                        description: string | null;
                        visualStatus: TaxonVisualStatus | null;
                        descendants: Array<{
                          nodeId: string;
                          ottId: number | null;
                          name: string | null;
                          rank: string | null;
                          numTips: number | null;
                          assetId: string | null;
                          description: string | null;
                          visualStatus: TaxonVisualStatus | null;
                        }> | null;
                        ancestor: {
                          nodeId: string;
                          ottId: number | null;
                          name: string | null;
                          rank: string | null;
                          numTips: number | null;
                          assetId: string | null;
                          description: string | null;
                          visualStatus: TaxonVisualStatus | null;
                          descendants: Array<{
                            nodeId: string;
                            ottId: number | null;
                            name: string | null;
                            rank: string | null;
                            numTips: number | null;
                            assetId: string | null;
                            description: string | null;
                            visualStatus: TaxonVisualStatus | null;
                          }> | null;
                          ancestor: {
                            nodeId: string;
                            ottId: number | null;
                            name: string | null;
                            rank: string | null;
                            numTips: number | null;
                            assetId: string | null;
                            description: string | null;
                            visualStatus: TaxonVisualStatus | null;
                            descendants: Array<{
                              nodeId: string;
                              ottId: number | null;
                              name: string | null;
                              rank: string | null;
                              numTips: number | null;
                              assetId: string | null;
                              description: string | null;
                              visualStatus: TaxonVisualStatus | null;
                            }> | null;
                          } | null;
                        } | null;
                      } | null;
                    } | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
    asset: {
      id: string;
      url: string;
      generator: string | null;
    } | null;
    descendants: Array<{
      nodeId: string;
      ottId: number | null;
      name: string | null;
      rank: string | null;
      numTips: number | null;
      assetId: string | null;
      description: string | null;
      visualStatus: TaxonVisualStatus | null;
      visualScore: {
        overall: number;
        taxonMatch: number;
        pass: boolean;
      } | null;
      ancestor: {
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
      } | null;
      asset: {
        id: string;
        url: string;
        generator: string | null;
      } | null;
      descendants: Array<{
        nodeId: string;
        ottId: number | null;
        name: string | null;
        rank: string | null;
        numTips: number | null;
        assetId: string | null;
        description: string | null;
        visualStatus: TaxonVisualStatus | null;
        visualScore: {
          overall: number;
          taxonMatch: number;
          pass: boolean;
        } | null;
        ancestor: {
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
        } | null;
        asset: {
          id: string;
          url: string;
          generator: string | null;
        } | null;
        descendants: Array<{
          nodeId: string;
          ottId: number | null;
          name: string | null;
          rank: string | null;
          numTips: number | null;
          assetId: string | null;
          description: string | null;
          visualStatus: TaxonVisualStatus | null;
          visualScore: {
            overall: number;
            taxonMatch: number;
            pass: boolean;
          } | null;
          ancestor: {
            nodeId: string;
            ottId: number | null;
            name: string | null;
            rank: string | null;
          } | null;
          asset: {
            id: string;
            url: string;
            generator: string | null;
          } | null;
        }> | null;
      }> | null;
    }> | null;
  } | null>;
};
export type Kicl_ActivateMutationVariables = Exact<{
  Activate: ActivateInput;
}>;
export type Kicl_ActivateMutation = {
  Activate: boolean | null;
};
export type Kicl_ExchangeTokenMutationVariables = Exact<{
  [key: string]: never;
}>;
export type Kicl_ExchangeTokenMutation = {
  ExchangeToken: boolean | null;
};
export type Kicl_RefreshTokenMutationVariables = Exact<{
  [key: string]: never;
}>;
export type Kicl_RefreshTokenMutation = {
  RefreshToken: boolean | null;
};
export type Kicl_RegisterMutationVariables = Exact<{
  Register: RegisterInput;
}>;
export type Kicl_RegisterMutation = {
  Register: boolean | null;
};
export type Kicl_SignInMutationVariables = Exact<{
  SignIn: SignInInput;
}>;
export type Kicl_SignInMutation = {
  SignIn: boolean | null;
};
export type Kicl_SignOutMutationVariables = Exact<{
  [key: string]: never;
}>;
export type Kicl_SignOutMutation = {
  SignOut: boolean | null;
};
export type Kicl_SocialSignInMutationVariables = Exact<{
  SocialSignIn: SocialSignInInput;
}>;
export type Kicl_SocialSignInMutation = {
  SocialSignIn: boolean | null;
};
export type Kicl_TaxonVisualUpdatedSubscriptionVariables = Exact<{
  ottId: number;
}>;
export type Kicl_TaxonVisualUpdatedSubscription = {
  TaxonVisualUpdated: {
    status: TaxonVisualStatus;
    ottId: number;
    nodeId: string | null;
    assetId: string | null;
    description: string | null;
    visualScore: {
      overall: number;
      taxonMatch: number;
      pass: boolean;
    } | null;
  };
};
export declare const Kicl_AssetDocument: DocumentNode<
  Kicl_AssetQuery,
  Kicl_AssetQueryVariables
>;
export declare const Kicl_MeDocument: DocumentNode<
  Kicl_MeQuery,
  Kicl_MeQueryVariables
>;
export declare const Kicl_TaxonSearchDocument: DocumentNode<
  Kicl_TaxonSearchQuery,
  Kicl_TaxonSearchQueryVariables
>;
export declare const Kicl_TaxonVisualDocument: DocumentNode<
  Kicl_TaxonVisualQuery,
  Kicl_TaxonVisualQueryVariables
>;
export declare const Kicl_TreeOfLifeSubtreeDocument: DocumentNode<
  Kicl_TreeOfLifeSubtreeQuery,
  Kicl_TreeOfLifeSubtreeQueryVariables
>;
export declare const Kicl_TreeOfLifeSubtreesDocument: DocumentNode<
  Kicl_TreeOfLifeSubtreesQuery,
  Kicl_TreeOfLifeSubtreesQueryVariables
>;
export declare const Kicl_ActivateDocument: DocumentNode<
  Kicl_ActivateMutation,
  Kicl_ActivateMutationVariables
>;
export declare const Kicl_ExchangeTokenDocument: DocumentNode<
  Kicl_ExchangeTokenMutation,
  Kicl_ExchangeTokenMutationVariables
>;
export declare const Kicl_RefreshTokenDocument: DocumentNode<
  Kicl_RefreshTokenMutation,
  Kicl_RefreshTokenMutationVariables
>;
export declare const Kicl_RegisterDocument: DocumentNode<
  Kicl_RegisterMutation,
  Kicl_RegisterMutationVariables
>;
export declare const Kicl_SignInDocument: DocumentNode<
  Kicl_SignInMutation,
  Kicl_SignInMutationVariables
>;
export declare const Kicl_SignOutDocument: DocumentNode<
  Kicl_SignOutMutation,
  Kicl_SignOutMutationVariables
>;
export declare const Kicl_SocialSignInDocument: DocumentNode<
  Kicl_SocialSignInMutation,
  Kicl_SocialSignInMutationVariables
>;
export declare const Kicl_TaxonVisualUpdatedDocument: DocumentNode<
  Kicl_TaxonVisualUpdatedSubscription,
  Kicl_TaxonVisualUpdatedSubscriptionVariables
>;
export {};
