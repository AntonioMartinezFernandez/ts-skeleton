import 'reflect-metadata';

import { UserService } from '../userService';
import { UserMemoryRepository } from '../userMemoryRepository';
import { JWT } from '@src/utils/JWT/jwt';

// Uuid regex
const hashedPasswordRegex = /^.{60}$/;

// ExampleMemoryRepository Mocked
const mockedRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockedBcrypt = {
  async encrypt() {
    return '$2b$10$R7G2YPBZ9/ZQzJCel50NVOnB19/aU5Sjffvy4yHonh61.3NoZc9DS';
  },
  async match() {
    return true;
  },
};

const mockedJwt = {
  async encrypt() {
    return 'encrypted';
  },
  async decrypt() {
    return 'decrypted';
  },
};

// SuT
const sut = new UserService(
  mockedRepository as unknown as UserMemoryRepository,
  mockedBcrypt,
  mockedJwt as unknown as JWT,
);

// Unit Tests Suite
describe('Example Service Unit Tests', () => {
  it('should call save repository method with "email", "name" and encrypted "password"', async () => {
    await sut.store({
      email: 'hola@mundo.com',
      name: 'Antonio',
      password: 'mypassword',
    });

    expect(mockedRepository.save).toHaveBeenCalledTimes(1);
    expect(mockedRepository.save).toHaveBeenCalledWith({
      email: 'hola@mundo.com',
      name: 'Antonio',
      password: expect.stringMatching(hashedPasswordRegex),
    });
  });

  it('should call findByEmail repository method with "email" parameter', async () => {
    await sut.login('email@email.com', 'mypassword');

    expect(mockedRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockedRepository.findByEmail).toHaveBeenCalledWith(
      'email@email.com',
    );
  });

  it('should call findById repository method with "id" parameter', async () => {
    await sut.profile('user_id');

    expect(mockedRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockedRepository.findById).toHaveBeenCalledWith('user_id');
  });

  it('should call findById repository method with "id" parameter', async () => {
    const result = await sut.update({ id: 'user_id', name: 'New_name' });

    expect(mockedRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockedRepository.findById).toHaveBeenCalledWith('user_id');
    expect(result).toEqual(undefined);
  });

  it('should call delete repository method with "id" parameter', async () => {
    await sut.delete('user_id');

    expect(mockedRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockedRepository.delete).toHaveBeenCalledWith('user_id');
  });
});
