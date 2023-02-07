import { GraphQLInputObjectType, GraphQLID, GraphQLNonNull } from 'graphql';

export const subscribeInputType = new GraphQLInputObjectType({
  name: 'subscribeInput',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
});
