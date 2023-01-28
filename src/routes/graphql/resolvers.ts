import { FastifyInstance } from 'fastify';
import { getMemberTypes } from '../member-types/memberTypesHandlers';
import { getPosts } from '../posts/postsHandlers';
import { getProfiles } from '../profiles/profilesHandlers';
import { getUsers } from '../users/usersHandlers';

export async function usersResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getUsers(context);
}

export async function profilesResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getProfiles(context);
}

export async function postsResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getPosts(context);
}

export async function memberTypesResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getMemberTypes(context);
}
