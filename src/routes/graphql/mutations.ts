import { createProfileResolver, createUserResolver } from './resolvers';
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
