import { FastifyInstance } from 'fastify';

export async function profilesResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await context.db.profiles.findMany();
}
