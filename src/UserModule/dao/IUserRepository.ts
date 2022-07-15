import { IUser } from '@src/UserModule/entity/IUser';

export interface IUserRepository {
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(user: any): Promise<Record<string, string>>;
  update(user: any): Promise<Record<string, any> | undefined>;
  delete(id: string): Promise<IUser | undefined>;
}
