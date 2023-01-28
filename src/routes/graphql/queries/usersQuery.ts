import { GraphQLList } from 'graphql';
import { usersResolver } from '../resolvers/usersResolver';
import { userType } from '../types/userType';

export const usersQuery = {
  type: new GraphQLList(userType),
  resolve: usersResolver,
};
