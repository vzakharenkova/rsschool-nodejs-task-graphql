import { GraphQLList } from 'graphql';
import { memberTypesResolver } from '../resolvers/memberTypesResolver';
import { memberTypeType } from '../types/memberTypeType';

export const memberTypesQuery = {
  type: new GraphQLList(memberTypeType),
  resolve: memberTypesResolver,
};
