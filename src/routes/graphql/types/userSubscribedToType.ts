import { GraphQLID, GraphQLInt, GraphQLObjectType } from 'graphql';

export const memberTypeType = new GraphQLObjectType({
  name: 'UserSubscribedTo',
  fields: {
    id: { type: GraphQLID },
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt },
  },
});
