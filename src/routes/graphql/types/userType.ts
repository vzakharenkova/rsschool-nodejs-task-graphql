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
  subscribedToUserResolver,
  userSubscribedToResolver,
} from '../resolvers';
import { memberTypeType } from './memberTypeType';
import { postType } from './postType';
import { profileType } from './profileType';

const basicUserType = new GraphQLObjectType({
  name: 'BasicUser',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLID) },
  },
});

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
      resolve: profileByUserIdResolver,
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: postsByUserIdResolver,
    },
    memberType: {
      type: memberTypeType,
      resolve: memberTypeByUserIdResolver,
    },
    userSubscribedTo: {
      type: new GraphQLList(basicUserType),
      resolve: userSubscribedToResolver,
    },
    subscribedToUser: {
      type: new GraphQLList(basicUserType),
      resolve: subscribedToUserResolver,
    },
  },
});
