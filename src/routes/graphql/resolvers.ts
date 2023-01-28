import { FastifyInstance } from 'fastify';
import {
  getMemberTypeById,
  getMemberTypes,
} from '../member-types/memberTypesHandlers';
import { getPostById, getPosts } from '../posts/postsHandlers';
import { getProfileById, getProfiles } from '../profiles/profilesHandlers';
import { getUserById, getUsers } from '../users/usersHandlers';

export async function usersResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getUsers(context);
}

export async function userResolver(
  _parent: any,
  args: { id: string },
  context: FastifyInstance
) {
  return await getUserById(context, args.id);
}

export async function profilesResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getProfiles(context);
}

export async function profileResolver(
  _parent: any,
  args: { id: string },
  context: FastifyInstance
) {
  return await getProfileById(context, args.id);
}

export async function postsResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getPosts(context);
}

export async function postResolver(
  _parent: any,
  args: { id: string },
  context: FastifyInstance
) {
  return await getPostById(context, args.id);
}

export async function memberTypesResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getMemberTypes(context);
}

export async function memberTypeResolver(
  _parent: any,
  args: { id: string },
  context: FastifyInstance
) {
  return await getMemberTypeById(context, args.id);
}
