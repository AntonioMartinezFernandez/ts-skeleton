import { injectable } from 'inversify';
import { IStoreUserDTO } from './dto/IStoreUserDto';
import { IUpdateUserDTO } from './dto/IUpdateUserDto';
import { Bcrypt } from '@src/utils/Bcrypt/bcrypt';
import { JWT } from '@src/utils/JWT/jwt';
import { IProfileUserDTO } from './dto/IProfileUserDto';
import { UserMemoryRepository } from './userMemoryRepository';
import { UserMongoRepository } from './userMongoRepository';

@injectable()
export class UserService {
  constructor(
    private readonly _UserRepository: UserMemoryRepository,
    private readonly _crypto: Bcrypt,
    private readonly _jwt: JWT,
  ) {}

  async store(user: IStoreUserDTO) {
    user.password = await this._crypto.encrypt(user.password);
    return await this._UserRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this._UserRepository.findByEmail(email);

    if (user === undefined) return undefined;

    const matchPassword = await this._crypto.match(password, user.password);

    if (matchPassword) {
      return {
        token: await this._jwt.encrypt({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      };
    } else {
      return undefined;
    }
  }

  async profile(id: string): Promise<IProfileUserDTO | undefined> {
    const user = await this._UserRepository.findById(id);
    if (!user) return undefined;

    const userProfile: IProfileUserDTO = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      town: user.town,
      city: user.city,
      country: user.country,
      birthdate: user.birthdate,
      rol: user.rol,
    };

    return userProfile;
  }

  async update(user: IUpdateUserDTO) {
    const actualUser = await this._UserRepository.findById(user.id);

    if (!actualUser) {
      return undefined;
    }

    user.name ? (actualUser.name = user.name) : null;
    user.surname ? (actualUser.surname = user.surname) : null;
    user.phone ? (actualUser.phone = user.phone) : null;
    user.town ? (actualUser.town = user.town) : null;
    user.city ? (actualUser.city = user.city) : null;
    user.country ? (actualUser.country = user.country) : null;
    user.birthdate ? (actualUser.birthdate = new Date(user.birthdate)) : null;
    user.password
      ? (actualUser.password = await this._crypto.encrypt(user.password))
      : null;

    return await this._UserRepository.update(actualUser);
  }

  async delete(id: string) {
    return await this._UserRepository.delete(id);
  }
}
