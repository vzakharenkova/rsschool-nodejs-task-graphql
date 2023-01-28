import { GraphQLObjectType } from 'graphql';
import { memberTypesQuery } from '../queries/memberTypesQuery';
import { postsQuery } from '../queries/postsQuery';
import { profilesQuery } from '../queries/profilesQuery';
import { usersQuery } from '../queries/usersQuery';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: usersQuery,
    posts: postsQuery,
    profiles: profilesQuery,
    memberTypes: memberTypesQuery,
  },
});
