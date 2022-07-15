import { injectable } from 'inversify';

import { Uuid } from '@utils/Uuid/uuid';
import { userModel } from '@database/mongoDB/models/User';

import { IUser } from './entity/IUser';
import { IStoreUserDTO } from './dto/IStoreUserDto';
import { IUserRepository } from './dao/IUserRepository';

@injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _data = userModel,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this._data.find().lean();
  }

  async findById(id: string): Promise<IUser | undefined> {
    return await this._data.findOne({ id: id }).lean();
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this._data.findOne({ email: email }).lean();

    if (user) {
      return user as unknown as IUser;
    } else {
      return undefined;
    }
  }

  async save(user: IStoreUserDTO) {
    const newUser: IUser = await this._data.create({
      id: this._uuid.generate(),
      rol: 'user',
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

  async update(user: IUser): Promise<Record<string, any> | undefined> {
    const dbUser = await this._data.findOne({ id: user.id }).exec();

    if (dbUser) {
      user.birthdate ? (dbUser.birthdate = user.birthdate) : null;
      user.name ? (dbUser.name = user.name) : null;
      user.surname ? (dbUser.surname = user.surname) : null;
      user.phone ? (dbUser.phone = user.phone) : null;
      user.town ? (dbUser.town = user.town) : null;
      user.city ? (dbUser.city = user.city) : null;
      user.country ? (dbUser.country = user.country) : null;
      user.password ? (dbUser.password = user.password) : null;
      dbUser.save();
    }

    if (dbUser === null) {
      return undefined;
    } else {
      return {
        id: dbUser.id,
        name: dbUser.name,
        surname: dbUser.surname,
        email: dbUser.email,
        phone: dbUser.phone,
        town: dbUser.town,
        city: dbUser.city,
        country: dbUser.country,
        birthdate: dbUser.birthdate,
        rol: dbUser.rol,
      };
    }
  }

  async delete(id: string): Promise<IUser | undefined> {
    let deletedUser: IUser | null | undefined =
      await this._data.findOneAndDelete({ id: id });
    deletedUser === null ? (deletedUser = undefined) : null;
    return deletedUser;
  }
}
