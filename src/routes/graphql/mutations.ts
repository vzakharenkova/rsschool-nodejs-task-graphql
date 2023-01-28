import {
  createPostResolver,
  createProfileResolver,
  createUserResolver,
} from './resolvers';
import { createPostInputType, postType } from './types/postType';
import { createProfileInputType, profileType } from './types/profileType';
import { createUserInputType, userType } from './types/userType';

export const createUserMutation = {
  type: userType,
  args: {
    data: {
      name: 'data',
      type: createUserInputType,
    },
  },
  resolve: createUserResolver,
};

export const createProfileMutation = {
  type: profileType,
  args: {
    data: {
      name: 'data',
      type: createProfileInputType,
    },
  },
  resolve: createProfileResolver,
};

export const createPostMutation = {
  type: postType,
  args: {
    data: {
      name: 'data',
      type: createPostInputType,
    },
  },
  resolve: createPostResolver,
};
