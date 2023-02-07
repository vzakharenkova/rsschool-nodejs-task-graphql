import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type UserEntity = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscribedToUserIds: string[];
};
export type CreateUserDTO = Omit<UserEntity, 'id' | 'subscribedToUserIds'>;
export type ChangeUserDTO = Partial<Omit<UserEntity, 'id'>>;

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  constructor() {
    super();
    this.create({ firstName: 'Tom', lastName: 'Ssfs', email: 'dddd' });
    this.create({ firstName: 'Aw', lastName: 'swSsfs', email: 'ddssdd' });
  }

  async create(dto: CreateUserDTO) {
    const created: UserEntity = {
      ...dto,
      subscribedToUserIds: [],
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
