import { FastifyInstance } from 'fastify';

export async function postsResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await context.db.posts.findMany();
}
