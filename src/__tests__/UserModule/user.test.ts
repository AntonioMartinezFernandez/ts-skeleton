import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config({ path: 'development.env' });

import mongoose from 'mongoose';
import { UserService } from '@src/UserModule/userService';
import { UserMongoRepository } from '@src/UserModule/userMongoRepository';
import { userModel } from '@database/mongoDB/models/User';
import { Uuid } from '@utilities/Uuid/Uuid';
import { Bcrypt } from '@utilities/Bcrypt/bcrypt';
import { JWT } from '@utilities/JWT/jwt';

// Connect MongoDB
const mongodbConnect = async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`,
  );
};

(async function connectMongo() {
  await mongodbConnect();
})();

// Mocks
const spyGenerate = jest.spyOn(new Uuid(), 'generate');

const mockUuid = {
  generate: spyGenerate,
};

const mockedJwt = {
  async encrypt() {
    return 'encrypted';
  },
  async decrypt() {
    return 'decrypted';
  },
};

// Uuid regex
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// SuT
const sut = new UserService(
  new UserMongoRepository(mockUuid as unknown as Uuid, userModel),
  new Bcrypt(),
  mockedJwt as unknown as JWT,
);

let userId = '';

// Integration Tests Suite
describe('Example Service and Example Repository Integration Tests', () => {
  it('should delete all collection data and return undefined', async () => {
    const data = await sut.deleteAll();

    expect(data).toBe(undefined);
  });

  it('should insert and return a new user', async () => {
    const data = await sut.store({
      email: 'my@email.com',
      name: 'My Name',
      password: 'mypassword',
    });

    userId = data.id;

    expect(spyGenerate).toHaveBeenCalledTimes(1);
    expect(data).toEqual({
      id: expect.stringMatching(uuidRegex),
      name: 'My Name',
      email: 'my@email.com',
    });
  });

  it('should login and return a JWT', async () => {
    const data = await sut.login('my@email.com', 'mypassword');

    expect(data!.token).toBe('encrypted');
  });

  it('should return profile data', async () => {
    const data = await sut.profile(userId);

    expect(data?.name).toBe('My Name');
  });

  it('should update the user data and return new data', async () => {
    const data = await sut.update({
      id: userId,
      name: 'John',
      surname: 'Doe',
      phone: '600600600',
      town: 'Paris',
      city: 'Paris',
      country: 'France',
      birthdate: '1988-2-16',
    });

    expect(data?.name).toBe('John');
    expect(data?.birthdate).toEqual(new Date('1988-2-16'));
  });

  test('should delete and return user', async () => {
    const data = await sut.delete(userId);

    expect(data?.name).toBe('John');
  });

  test('should return undefined', async () => {
    const data = await sut.profile(userId);

    expect(data).toBe(undefined);
  });
});
