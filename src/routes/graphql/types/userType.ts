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

const basicUserFields = {
  id: { type: GraphQLID },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
  email: { type: GraphQLString },
  subscribedToUserIds: { type: new GraphQLList(GraphQLID) },
};

const basicUserType = new GraphQLObjectType({
  name: 'BasicUser',
  fields: basicUserFields,
});

const subscriptionInfoFields = {
  userSubscribedTo: {
    type: new GraphQLList(basicUserType),
    resolve: userSubscribedToResolver,
  },
  subscribedToUser: {
    type: new GraphQLList(basicUserType),
    resolve: subscribedToUserResolver,
  },
};

const basicUserWithSubsType = new GraphQLObjectType({
  name: 'BasicUserWithSubs',
  fields: { ...basicUserFields, ...subscriptionInfoFields },
});

const subscriptionInfoNestedFields = {
  userSubscribedTo: {
    type: new GraphQLList(basicUserWithSubsType),
    resolve: userSubscribedToResolver,
  },
  subscribedToUser: {
    type: new GraphQLList(basicUserWithSubsType),
    resolve: subscribedToUserResolver,
  },
};

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    ...basicUserFields,
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
    ...subscriptionInfoNestedFields,
  },
});
