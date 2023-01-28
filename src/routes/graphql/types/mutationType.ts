import { GraphQLObjectType } from 'graphql';
import { createUserMutation } from '../mutations';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: createUserMutation,
  },
});
