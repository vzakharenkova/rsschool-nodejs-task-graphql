import { FastifyInstance } from 'fastify';
import { CreateUserDTO } from '../../utils/DB/entities/DBUsers';
import {
  getMemberTypeById,
  getMemberTypes,
} from '../member-types/memberTypesHandlers';
import {
  getPostById,
  getPosts,
  getPostsByUserId,
} from '../posts/postsHandlers';
import {
  getProfileById,
  getProfileByUserId,
  getProfiles,
} from '../profiles/profilesHandlers';
import { createUser, getUserById, getUsers } from '../users/usersHandlers';

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

export async function createUserResolver(
  _parent: any,
  args: { data: CreateUserDTO },
  context: FastifyInstance
) {
  const user: CreateUserDTO = {
    ...args.data,
  };

  return await createUser(context, user);
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

export async function profileByUserIdResolver(
  parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getProfileByUserId(context, parent.id);
}

export async function postsResolver(
  _parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getPosts(context);
}

export async function postsByUserIdResolver(
  parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getPostsByUserId(context, parent.id);
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

export async function memberTypeByUserIdResolver(
  parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await getMemberTypeById(context, parent.profile.memberTypeId);
}

export async function userSubscribedToResolver(
  parent: any,
  _args: any,
  context: FastifyInstance
) {
  return await context.db.users.findMany({
    key: 'subscribedToUserIds',
    inArray: parent.id,
  });
}

export async function subscribedToUserResolver(
  parent: any,
  _args: any,
  context: FastifyInstance
) {
  return parent.subscribedToUserIds.map(async (id: string) => {
    return await context.db.users.findOne({
      key: 'id',
      equals: id,
    });
  });
}
