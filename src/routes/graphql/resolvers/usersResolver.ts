import { FastifyInstance } from 'fastify';

export async function usersResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await context.db.users.findMany();
}
