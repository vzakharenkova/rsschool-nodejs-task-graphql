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

  user.subscribedToUserIds.forEach(async (i) => {
    const sub = await fastify.db.users.findOne({ key: 'id', equals: i });

    if (sub) {
      const index = sub.subscribedToUserIds.findIndex((n) => n === id);
      const subs = [...sub.subscribedToUserIds];

      subs.splice(index, 1);

      await fastify.db.users.change(i, {
        subscribedToUserIds: subs,
      });
    }
  });

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

export async function subscrideToUser(
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

  await fastify.db.users.change(subId, {
    subscribedToUserIds: [...sub.subscribedToUserIds, userId],
  });

  return await fastify.db.users.change(userId, {
    subscribedToUserIds: [...user.subscribedToUserIds, subId],
  });
}

export async function unsubscrideFromUser(
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

  const index_user = user.subscribedToUserIds.findIndex((i) => i === subId);

  const index_sub = sub.subscribedToUserIds.findIndex((i) => i === userId);

  if (index_user < 0 || index_sub < 0) {
    throw fastify.httpErrors.badRequest();
  }

  const subs_user = [...user.subscribedToUserIds];
  const subs_sub = [...sub.subscribedToUserIds];

  subs_user.splice(index_user, 1);
  subs_sub.splice(index_sub, 1);

  await fastify.db.users.change(subId, {
    subscribedToUserIds: subs_sub,
  });

  return await fastify.db.users.change(userId, {
    subscribedToUserIds: subs_user,
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
