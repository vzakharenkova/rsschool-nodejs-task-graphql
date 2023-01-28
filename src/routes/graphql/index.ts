import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { queryType } from './types/queryType';

const schemaGQL = new GraphQLSchema({
  query: queryType,
});

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const source: string = String(request.body.query);
      const variableValues = request.body.variables;

      return await graphql({
        schema: schemaGQL,
        source,
        variableValues,
        contextValue: fastify,
      });
    }
  );
};

export default plugin;
