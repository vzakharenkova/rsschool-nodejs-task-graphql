import { GraphQLList } from 'graphql';
import {
  usersResolver,
  profilesResolver,
  postsResolver,
  memberTypesResolver,
} from './resolvers';
import { memberTypeType } from './types/memberTypeType';
import { postType } from './types/postType';
import { profileType } from './types/profileType';
import { userType } from './types/userType';

export const usersQuery = {
  type: new GraphQLList(userType),
  resolve: usersResolver,
};

export const profilesQuery = {
  type: new GraphQLList(profileType),
  resolve: profilesResolver,
};

export const postsQuery = {
  type: new GraphQLList(postType),
  resolve: postsResolver,
};

export const memberTypesQuery = {
  type: new GraphQLList(memberTypeType),
  resolve: memberTypesResolver,
};
