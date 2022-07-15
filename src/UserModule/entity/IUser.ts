export interface IUser {
  id: string;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  town?: string;
  city?: string;
  country?: string;
  birthdate?: Date;
  rol: 'user' | 'admin';
  password: string;
}
