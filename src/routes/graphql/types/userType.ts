import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  memberTypeByUserIdResolver,
  postsByUserIdResolver,
  profileByUserIdResolver,
} from '../resolvers';
import { memberTypeType } from './memberTypeType';
import { postType } from './postType';
import { profileType } from './profileType';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLID) },
    profile: {
      type: profileType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: profileByUserIdResolver,
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: postsByUserIdResolver,
    },
    memberType: {
      type: memberTypeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: memberTypeByUserIdResolver,
    },
  },
});
