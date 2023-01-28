import { GraphQLObjectType } from 'graphql';
import {
  usersQuery,
  postsQuery,
  profilesQuery,
  memberTypesQuery,
  userQuery,
  profileQuery,
  postQuery,
  memberTypeQuery,
} from '../queries';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: usersQuery,
    user: userQuery,
    posts: postsQuery,
    post: postQuery,
    profiles: profilesQuery,
    profile: profileQuery,
    memberTypes: memberTypesQuery,
    memberType: memberTypeQuery,
  },
});
