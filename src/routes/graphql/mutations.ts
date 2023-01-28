import { createUserResolver } from './resolvers';
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
