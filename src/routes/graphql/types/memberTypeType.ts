import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const memberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: GraphQLString },
    discount: { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt },
  },
});
