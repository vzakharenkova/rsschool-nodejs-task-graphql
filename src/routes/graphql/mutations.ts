import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  createPostResolver,
  createProfileResolver,
  createUserResolver,
  subscribeResolver,
  unsubscribeResolver,
  updateMemberTypeResolver,
  updatePostResolver,
  updateProfileResolver,
  updateUserResolver,
} from './resolvers';
import {
  memberTypeType,
  updateMemberTypeInputType,
} from './types/memberTypeType';
import {
  createPostInputType,
  postType,
  updatePostInputType,
} from './types/postType';
import {
  createProfileInputType,
  profileType,
  updateProfileInputType,
} from './types/profileType';
import { subscribeInputType } from './types/subscribeType';
import {
  createUserInputType,
  updateUserInputType,
  userType,
} from './types/userType';

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

export const updateUserMutation = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(updateUserInputType),
    },
  },
  resolve: updateUserResolver,
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

export const updateProfileMutation = {
  type: profileType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(updateProfileInputType),
    },
  },
  resolve: updateProfileResolver,
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

export const updatePostMutation = {
  type: postType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(updatePostInputType),
    },
  },
  resolve: updatePostResolver,
};

export const updateMemberTypeMutation = {
  type: memberTypeType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(updateMemberTypeInputType),
    },
  },
  resolve: updateMemberTypeResolver,
};

export const subscribeToMutation = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(subscribeInputType),
    },
  },
  resolve: subscribeResolver,
};

export const unsubscribeFromMutation = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(subscribeInputType),
    },
  },
  resolve: unsubscribeResolver,
};
