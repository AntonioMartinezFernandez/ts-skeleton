import 'reflect-metadata';

import { ExampleService } from '../exampleService';
import { ExampleMemoryRepository } from '../exampleMemoryRepository';
import { ItemDB } from '@src/database/memoryDB/ItemDB';
import { Uuid } from '@src/utils/Uuid/uuid';

// Uuid Class Mocked
const spyGenerate = jest.spyOn(new Uuid(), 'generate');

const mockUuid = {
  generate: spyGenerate,
};

// Uuid regex
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// SuT
const sut = new ExampleService(
  new ExampleMemoryRepository(mockUuid as unknown as Uuid, new ItemDB()),
);

// Integration Tests Suite
describe('Example Service and Example Repository Integration Tests', () => {
  it('should return empty array', async () => {
    const data = await sut.index();

    expect(data).toEqual([]);
  });

  it('should insert and return a new value', async () => {
    const data = await sut.store({
      name: 'Antonio',
    });

    expect(spyGenerate).toHaveBeenCalledTimes(1);
    expect(data).toEqual({
      id: expect.stringMatching(uuidRegex),
      name: 'Antonio',
    });
  });

  it('should return all results in an array', async () => {
    const data = await sut.index();

    expect(data).toEqual([
      {
        id: expect.stringMatching(uuidRegex),
        name: 'Antonio',
      },
    ]);
  });

  it('should insert and return a new value', async () => {
    const data = await sut.store({
      name: 'Carmen',
    });

    expect(spyGenerate).toHaveBeenCalledTimes(1);
    expect(data).toEqual({
      id: expect.stringMatching(uuidRegex),
      name: 'Carmen',
    });
  });

  it('should return all results in an array', async () => {
    const data = await sut.index();

    expect(data).toEqual([
      {
        id: expect.stringMatching(uuidRegex),
        name: 'Antonio',
      },
      {
        id: expect.stringMatching(uuidRegex),
        name: 'Carmen',
      },
    ]);
  });
});
