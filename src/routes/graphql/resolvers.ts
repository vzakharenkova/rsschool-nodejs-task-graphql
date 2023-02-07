import { FastifyInstance } from 'fastify';
import { ChangeMemberTypeDTO } from '../../utils/DB/entities/DBMemberTypes';
import { ChangePostDTO, CreatePostDTO } from '../../utils/DB/entities/DBPosts';
import {
  ChangeProfileDTO,
  CreateProfileDTO,
} from '../../utils/DB/entities/DBProfiles';
import { ChangeUserDTO, CreateUserDTO } from '../../utils/DB/entities/DBUsers';
import {
  getMemberTypeById,
  getMemberTypes,
  updateMemberType,
} from '../member-types/memberTypesHandlers';
import {
  createPost,
  getPostById,
  getPosts,
  getPostsByUserId,
  updatePost,
} from '../posts/postsHandlers';
import {
  createProfile,
  getProfileById,
  getProfileByUserId,
  getProfiles,
  updateProfile,
} from '../profiles/profilesHandlers';
import {
  createUser,
  getUserById,
  getUsers,
  subscribeToUser,
  unsubscribeFromUser,
  updateUser,
} from '../users/usersHandlers';

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

export async function updateUserResolver(
  _parent: any,
  args: { id: string; data: ChangeUserDTO },
  context: FastifyInstance
) {
  const user: ChangeUserDTO = {
    ...args.data,
  };

  return await updateUser(context, args.id, user);
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

export async function createProfileResolver(
  _parent: any,
  args: { data: CreateProfileDTO },
  context: FastifyInstance
) {
  const profile: CreateProfileDTO = {
    ...args.data,
  };

  return await createProfile(context, profile);
}

export async function updateProfileResolver(
  _parent: any,
  args: { id: string; data: ChangeProfileDTO },
  context: FastifyInstance
) {
  const profile: ChangeProfileDTO = {
    ...args.data,
  };

  return await updateProfile(context, args.id, profile);
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

export async function createPostResolver(
  _parent: any,
  args: { data: CreatePostDTO },
  context: FastifyInstance
) {
  const post: CreatePostDTO = {
    ...args.data,
  };

  return await createPost(context, post);
}

export async function updatePostResolver(
  _parent: any,
  args: { id: string; data: ChangePostDTO },
  context: FastifyInstance
) {
  const post: ChangePostDTO = {
    ...args.data,
  };

  return await updatePost(context, args.id, post);
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

export async function updateMemberTypeResolver(
  _parent: any,
  args: { id: string; data: ChangeMemberTypeDTO },
  context: FastifyInstance
) {
  const memberType: ChangeMemberTypeDTO = {
    ...args.data,
  };

  return await updateMemberType(context, args.id, memberType);
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

export async function subscribeResolver(
  _parent: any,
  args: { id: string; data: { userId: string } },
  context: FastifyInstance
) {
  const sub: { userId: string } = {
    ...args.data,
  };

  return await subscribeToUser(context, args.id, sub.userId);
}

export async function unsubscribeResolver(
  _parent: any,
  args: { id: string; data: { userId: string } },
  context: FastifyInstance
) {
  const sub: { userId: string } = {
    ...args.data,
  };

  return await unsubscribeFromUser(context, args.id, sub.userId);
}
