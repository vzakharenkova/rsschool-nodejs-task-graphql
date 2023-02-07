import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const profileFields = {
  avatar: { type: new GraphQLNonNull(GraphQLString) },
  sex: { type: new GraphQLNonNull(GraphQLString) },
  birthday: { type: new GraphQLNonNull(GraphQLInt) },
  country: { type: new GraphQLNonNull(GraphQLString) },
  street: { type: new GraphQLNonNull(GraphQLString) },
  city: { type: new GraphQLNonNull(GraphQLString) },
  memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  userId: { type: new GraphQLNonNull(GraphQLID) },
};

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ...profileFields,
  },
});

export const createProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: profileFields,
});

export const updateProfileInputType = new GraphQLInputObjectType({
  name: 'UpdateProfileInput',
  fields: {
    avatar: { type: GraphQLString },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLInt },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
  },
});
