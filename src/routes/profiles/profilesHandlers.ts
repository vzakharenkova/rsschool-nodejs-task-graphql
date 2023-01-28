import { FastifyInstance } from 'fastify';
import {
  ChangeProfileDTO,
  CreateProfileDTO,
} from '../../utils/DB/entities/DBProfiles';

export async function getProfiles(fastify: FastifyInstance) {
  return await fastify.db.profiles.findMany();
}

export async function getProfileById(fastify: FastifyInstance, id: string) {
  const profile = await fastify.db.profiles.findOne({
    key: 'id',
    equals: id,
  });

  if (!profile) {
    throw fastify.httpErrors.notFound();
  }

  return profile;
}

export async function getProfileByUserId(
  fastify: FastifyInstance,
  userId: string
) {
  const profile = await fastify.db.profiles.findOne({
    key: 'userId',
    equals: userId,
  });

  if (!profile) {
    throw fastify.httpErrors.notFound();
  }

  return profile;
}

export async function createProfile(
  fastify: FastifyInstance,
  profileData: CreateProfileDTO
) {
  const profile = await fastify.db.profiles.findOne({
    key: 'userId',
    equals: profileData.userId,
  });
  const memberType = ['basic', 'business'];

  if (profile || !memberType.includes(profileData.memberTypeId)) {
    throw fastify.httpErrors.badRequest();
  }

  return await fastify.db.profiles.create(profileData);
}

export async function deleteProfile(fastify: FastifyInstance, id: string) {
  const profile = await fastify.db.profiles.findOne({
    key: 'id',
    equals: id,
  });

  if (!profile) {
    throw fastify.httpErrors.badRequest();
  }

  return await fastify.db.profiles.delete(id);
}

export async function updateProfile(
  fastify: FastifyInstance,
  id: string,
  profileData: ChangeProfileDTO
) {
  const profile = await fastify.db.profiles.findOne({
    key: 'id',
    equals: id,
  });

  if (!profile) {
    throw fastify.httpErrors.badRequest();
  }

  return await fastify.db.profiles.change(id, profileData);
}