import { GraphQLID, GraphQLList } from 'graphql';
import {
  usersResolver,
  profilesResolver,
  postsResolver,
  memberTypesResolver,
  userResolver,
  profileResolver,
  postResolver,
  memberTypeResolver,
} from './resolvers';
import { memberTypeType } from './types/memberTypeType';
import { postType } from './types/postType';
import { profileType } from './types/profileType';
import { userType } from './types/userType';

export const usersQuery = {
  type: new GraphQLList(userType),
  resolve: usersResolver,
};

export const userQuery = {
  type: userType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: userResolver,
};

export const profilesQuery = {
  type: new GraphQLList(profileType),
  resolve: profilesResolver,
};

export const profileQuery = {
  type: profileType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: profileResolver,
};

export const postsQuery = {
  type: new GraphQLList(postType),
  resolve: postsResolver,
};

export const postQuery = {
  type: postType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: postResolver,
};

export const memberTypesQuery = {
  type: new GraphQLList(memberTypeType),
  resolve: memberTypesResolver,
};

export const memberTypeQuery = {
  type: memberTypeType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: memberTypeResolver,
};
