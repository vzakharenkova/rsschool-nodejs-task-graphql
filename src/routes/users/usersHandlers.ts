import { FastifyInstance } from 'fastify';
import { ChangeUserDTO, CreateUserDTO } from '../../utils/DB/entities/DBUsers';

export async function getUsers(fastify: FastifyInstance) {
  return await fastify.db.users.findMany();
}

export async function getUserById(fastify: FastifyInstance, id: string) {
  const user = await fastify.db.users.findOne({ key: 'id', equals: id });

  if (!user) {
    throw fastify.httpErrors.notFound();
  }

  return user;
}

export async function createUser(
  fastify: FastifyInstance,
  userData: CreateUserDTO
) {
  return await fastify.db.users.create(userData);
}

export async function deleteUser(fastify: FastifyInstance, id: string) {
  const user = await fastify.db.users.findOne({ key: 'id', equals: id });

  if (!user) {
    throw fastify.httpErrors.badRequest();
  }

  const subs = await fastify.db.users.findMany({
    key: 'subscribedToUserIds',
    inArray: id,
  });

  if (subs.length) {
    subs.forEach(async (sub) => {
      const index = sub.subscribedToUserIds.findIndex((n) => n === id);
      const sub_subs = [...sub.subscribedToUserIds];

      sub_subs.splice(index, 1);

      await fastify.db.users.change(sub.id, {
        subscribedToUserIds: sub_subs,
      });
    });
  }

  const profile = await fastify.db.profiles.findOne({
    key: 'userId',
    equals: id,
  });

  if (profile) {
    fastify.db.profiles.delete(profile.id);
  }

  const posts = await fastify.db.posts.findMany({
    key: 'userId',
    equals: id,
  });

  if (posts.length) {
    posts.forEach((post) => fastify.db.posts.delete(post.id));
  }

  return await fastify.db.users.delete(id);
}

export async function subscribeToUser(
  fastify: FastifyInstance,
  userId: string,
  subId: string
) {
  const user = await fastify.db.users.findOne({ key: 'id', equals: userId });
  const sub = await fastify.db.users.findOne({
    key: 'id',
    equals: subId,
  });

  if (!user || !sub) {
    throw fastify.httpErrors.notFound();
  }

  return await fastify.db.users.change(subId, {
    subscribedToUserIds: [...sub.subscribedToUserIds, userId],
  });
}

export async function unsubscribeFromUser(
  fastify: FastifyInstance,
  userId: string,
  subId: string
) {
  const user = await fastify.db.users.findOne({ key: 'id', equals: userId });
  const sub = await fastify.db.users.findOne({
    key: 'id',
    equals: subId,
  });

  if (!user || !sub) {
    throw fastify.httpErrors.notFound();
  }

  const index_sub = sub.subscribedToUserIds.findIndex((i) => i === userId);

  if (index_sub < 0) {
    throw fastify.httpErrors.badRequest();
  }

  const subs_sub = [...sub.subscribedToUserIds];

  subs_sub.splice(index_sub, 1);

  return await fastify.db.users.change(subId, {
    subscribedToUserIds: subs_sub,
  });
}

export async function updateUser(
  fastify: FastifyInstance,
  id: string,
  userData: ChangeUserDTO
) {
  const user = await fastify.db.users.findOne({ key: 'id', equals: id });

  if (!user) {
    throw fastify.httpErrors.badRequest();
  }

  return await fastify.db.users.change(id, userData);
}
