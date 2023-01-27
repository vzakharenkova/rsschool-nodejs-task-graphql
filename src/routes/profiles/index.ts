import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<ProfileEntity[]> {
    return await fastify.db.profiles.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const { id } = request.params;
      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: id,
      });

      if (!profile) {
        throw fastify.httpErrors.notFound();
      }

      return profile;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await fastify.db.profiles.findOne({
        key: 'userId',
        equals: request.body.userId,
      });
      const memberType = ['basic', 'business'];

      if (profile || !memberType.includes(request.body.memberTypeId)) {
        throw fastify.httpErrors.badRequest();
      }

      return await fastify.db.profiles.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const { id } = request.params;

      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: id,
      });

      if (!profile) {
        throw fastify.httpErrors.badRequest();
      }

      return await fastify.db.profiles.delete(id);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const { id } = request.params;
      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: id,
      });

      if (!profile) {
        throw fastify.httpErrors.badRequest();
      }

      return await fastify.db.profiles.change(id, request.body);
    }
  );
};

export default plugin;
