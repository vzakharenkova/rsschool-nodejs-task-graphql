import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return await fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });

      if (!user) {
        throw fastify.httpErrors.notFound();
      }

      return user;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return await fastify.db.users.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;

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
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      const sub = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });

      if (!user || !sub) {
        throw fastify.httpErrors.notFound();
      }

      await fastify.db.users.change(request.body.userId, {
        subscribedToUserIds: [...sub.subscribedToUserIds, id],
      });

      return await fastify.db.users.change(id, {
        subscribedToUserIds: [...user.subscribedToUserIds, request.body.userId],
      });
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | null> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      const sub = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });

      if (!user || !sub) {
        throw fastify.httpErrors.notFound();
      }

      const index_user = user.subscribedToUserIds.findIndex(
        (i) => i === request.body.userId
      );

      const index_sub = sub.subscribedToUserIds.findIndex((i) => i === id);

      if (index_user < 0 || index_sub < 0) {
        throw fastify.httpErrors.badRequest();
      }

      const subs_user = [...user.subscribedToUserIds];
      const subs_sub = [...sub.subscribedToUserIds];

      subs_user.splice(index_user, 1);
      subs_sub.splice(index_sub, 1);

      await fastify.db.users.change(request.body.userId, {
        subscribedToUserIds: subs_sub,
      });

      return await fastify.db.users.change(id, {
        subscribedToUserIds: subs_user,
      });
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });

      if (!user) {
        throw fastify.httpErrors.badRequest();
      }

      return await fastify.db.users.change(id, request.body);
    }
  );
};

export default plugin;
