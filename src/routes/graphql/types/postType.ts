import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const postFields = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  content: { type: new GraphQLNonNull(GraphQLString) },
  userId: { type: new GraphQLNonNull(GraphQLID) },
};

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ...postFields,
  },
});

export const createPostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: postFields,
});

export const updatePostInputType = new GraphQLInputObjectType({
  name: 'UpdatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
