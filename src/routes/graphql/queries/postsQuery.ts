import { GraphQLList } from 'graphql';
import { postsResolver } from '../resolvers/postsResolver';
import { postType } from '../types/postType';

export const postsQuery = {
  type: new GraphQLList(postType),
  resolve: postsResolver,
};
