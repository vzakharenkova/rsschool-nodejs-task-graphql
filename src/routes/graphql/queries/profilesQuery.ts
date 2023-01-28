import { GraphQLList } from 'graphql';
import { profilesResolver } from '../resolvers/profilesResolver';

import { profileType } from '../types/profileType';

export const profilesQuery = {
  type: new GraphQLList(profileType),
  resolve: profilesResolver,
};
