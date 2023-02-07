import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema, validate, parse } from 'graphql';
import depthLimit = require('graphql-depth-limit');
import { graphqlBodySchema } from './schema';
import { mutationType } from './types/mutationType';
import { queryType } from './types/queryType';

const schemaGQL = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
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

      const errValidation = validate(schemaGQL, parse(source), [depthLimit(3)]);

      return errValidation.length
        ? { errors: errValidation }
        : await graphql({
            schema: schemaGQL,
            source,
            variableValues,
            contextValue: fastify,
          });
    }
  );
};

export default plugin;
