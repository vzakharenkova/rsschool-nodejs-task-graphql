import { FastifyInstance } from 'fastify';

export async function memberTypesResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await context.db.memberTypes.findMany();
}
