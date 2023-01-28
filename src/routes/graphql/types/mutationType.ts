import { GraphQLObjectType } from 'graphql';
import {
  createPostMutation,
  createProfileMutation,
  createUserMutation,
} from '../mutations';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,
  },
});
