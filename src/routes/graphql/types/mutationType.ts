import { GraphQLObjectType } from 'graphql';
import {
  createPostMutation,
  createProfileMutation,
  createUserMutation,
  subscribeToMutation,
  unsubscribeFromMutation,
  updateMemberTypeMutation,
  updatePostMutation,
  updateProfileMutation,
  updateUserMutation,
} from '../mutations';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,
    updateUser: updateUserMutation,
    updateProfile: updateProfileMutation,
    updatePost: updatePostMutation,
    updateMemberType: updateMemberTypeMutation,
    subscribeTo: subscribeToMutation,
    unsubscribeFrom: unsubscribeFromMutation,
  },
});
