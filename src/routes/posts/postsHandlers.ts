import { FastifyInstance } from 'fastify';
import { ChangePostDTO, CreatePostDTO } from '../../utils/DB/entities/DBPosts';

export async function getPosts(fastify: FastifyInstance) {
  return await fastify.db.posts.findMany();
}

export async function getPostById(fastify: FastifyInstance, id: string) {
  const post = await fastify.db.posts.findOne({ key: 'id', equals: id });

  if (!post) {
    throw fastify.httpErrors.notFound(`Post with id ${id} is not found`);
  }

  return post;
}

export async function getPostsByUserId(
  fastify: FastifyInstance,
  userId: string
) {
  const post = await fastify.db.posts.findMany({
    key: 'userId',
    equals: userId,
  });

  if (!post.length) {
    throw fastify.httpErrors.notFound(
      `Posts for user with id ${userId} are not found`
    );
  }

  return post;
}

export async function createPost(
  fastify: FastifyInstance,
  postData: CreatePostDTO
) {
  return await fastify.db.posts.create(postData);
}

export async function deletePost(fastify: FastifyInstance, id: string) {
  const post = await fastify.db.posts.findOne({ key: 'id', equals: id });

  if (!post) {
    throw fastify.httpErrors.badRequest(`Post with id ${id} is not found`);
  }

  return await fastify.db.posts.delete(id);
}

export async function updatePost(
  fastify: FastifyInstance,
  id: string,
  postData: ChangePostDTO
) {
  const post = await fastify.db.posts.findOne({ key: 'id', equals: id });

  if (!post) {
    throw fastify.httpErrors.badRequest(`Post with id ${id} is not found`);
  }

  return await fastify.db.posts.change(id, postData);
}
