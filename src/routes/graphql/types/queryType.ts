import { GraphQLObjectType } from 'graphql';
import {
  usersQuery,
  postsQuery,
  profilesQuery,
  memberTypesQuery,
} from '../queries';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: usersQuery,
    posts: postsQuery,
    profiles: profilesQuery,
    memberTypes: memberTypesQuery,
  },
});
