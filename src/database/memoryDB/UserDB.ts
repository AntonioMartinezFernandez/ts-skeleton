import { IProfileUserDTO } from '@src/UserModule/dto/IProfileUserDto';
import { IUser } from '@src/UserModule/entity/IUser';
import { injectable } from 'inversify';

@injectable()
export class UserDB {
  users: IUser[] = [];

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async findById(id: string): Promise<IUser | undefined> {
    const user: IUser | undefined = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user: IUser | undefined = this.users.find(
      (user) => user.email === email,
    );
    return user;
  }

  async save(user: IUser): Promise<IUser> {
    this.users.push(user);
    return user;
  }

  async update(
    user: Record<string, any>,
  ): Promise<IProfileUserDTO | undefined> {
    let userUpdated: IProfileUserDTO | undefined = undefined;

    this.users = this.users.map((element) => {
      if (element.id === user.id) {
        user.name ? (element.name = user.name) : null;
        user.password ? (element.password = user.password) : null;
        user.surname ? (element.surname = user.surname) : null;
        user.birthdate ? (element.birthdate = user.birthdate) : null;
        user.town ? (element.town = user.town) : null;
        user.city ? (element.city = user.city) : null;
        user.country ? (element.country = user.country) : null;
        user.phone ? (element.phone = user.phone) : null;
        user.rol ? (element.rol = user.rol) : null;

        userUpdated = {
          id: element.id,
          name: element.name,
          email: element.email,
          surname: element.surname,
          birthdate: element.birthdate,
          town: element.town,
          city: element.city,
          country: element.country,
          phone: element.phone,
          rol: element.rol,
        };
      }
      return element;
    });

    return userUpdated;
  }

  async delete(id: string): Promise<IUser | undefined> {
    const user: IUser | undefined = this.users.find((user) => user.id === id);

    this.users = this.users.filter((e) => e.id !== id);

    return user;
  }
}
