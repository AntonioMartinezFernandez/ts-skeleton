import { injectable } from 'inversify';

import { Uuid } from '@utils/Uuid/uuid';
import { UserDB } from '@src/database/memoryDB/UserDB';

import { IUser } from './entity/IUser';
import { IStoreUserDTO } from './dto/IStoreUserDto';
import { IUserRepository } from './dao/IUserRepository';
import { IProfileUserDTO } from './dto/IProfileUserDto';

@injectable()
export class UserMemoryRepository implements IUserRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _data = new UserDB(),
  ) {}

  async findAll(): Promise<IUser[]> {
    return this._data.findAll();
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this._data.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this._data.findByEmail(email);
    if (user) {
      return user;
    } else {
      return undefined;
    }
  }

  async save(user: IStoreUserDTO) {
    const newUser: IUser = await this._data.save({
      id: this._uuid.generate(),
      rol: 'user',
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

  async update(user: IUser) {
    const userData: Record<string, any> = {
      id: user.id,
    };

    user.birthdate ? (userData.birthdate = user.birthdate) : null;
    user.name ? (userData.name = user.name) : null;
    user.surname ? (userData.surname = user.surname) : null;
    user.phone ? (userData.phone = user.phone) : null;
    user.town ? (userData.town = user.town) : null;
    user.city ? (userData.city = user.city) : null;
    user.country ? (userData.country = user.country) : null;
    user.password ? (userData.password = user.password) : null;

    const updatedUser: IProfileUserDTO | undefined = await this._data.update(
      userData,
    );
    return updatedUser;
  }

  async delete(id: string): Promise<IUser | undefined> {
    const deletedUser: IUser | undefined = await this._data.delete(id);
    return deletedUser;
  }
}
