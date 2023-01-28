import { FastifyInstance } from 'fastify';
import { ChangeMemberTypeDTO } from '../../utils/DB/entities/DBMemberTypes';

export async function getMemberTypes(fastify: FastifyInstance) {
  return await fastify.db.memberTypes.findMany();
}

export async function getMemberTypeById(fastify: FastifyInstance, id: string) {
  const memberType = await fastify.db.memberTypes.findOne({
    key: 'id',
    equals: id,
  });

  if (!memberType) {
    throw fastify.httpErrors.notFound();
  }

  return memberType;
}

export async function updateMemberType(
  fastify: FastifyInstance,
  id: string,
  memberTypeData: ChangeMemberTypeDTO
) {
  const memberType = await fastify.db.memberTypes.findOne({
    key: 'id',
    equals: id,
  });

  if (!memberType) {
    throw fastify.httpErrors.badRequest();
  }

  return await fastify.db.memberTypes.change(id, memberTypeData);
}
