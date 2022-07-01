import 'reflect-metadata';

import { ExampleService } from './example-service';
import { ExampleRepository } from './example-repository';
import { MemoryDB } from '../database/memory/MemoryDB';
import { Uuid } from '../Utils/Uuid/Uuid';

const sut = new ExampleService(
  new ExampleRepository(new Uuid(), new MemoryDB()),
);

describe('My Service', () => {
  it('should return empty object', async () => {
    const data = await sut.index();

    expect(data).toEqual([]);
  });

  it('should insert and return a new value', async () => {
    const data = await sut.store({
      name: 'Antonio',
    });

    expect(data.name).toEqual('Antonio');
  });

  it('should return all results in an array', async () => {
    const data = await sut.index();

    expect(data[0].name).toEqual('Antonio');
  });

  it('should insert and return a new value', async () => {
    const data = await sut.store({
      name: 'Carmen',
    });

    expect(data.name).toEqual('Carmen');
  });

  it('should return all results in an array', async () => {
    const data = await sut.index();

    expect(typeof data[0].id).toEqual('string');
    expect(data[0].name).toEqual('Antonio');
    expect(typeof data[1].id).toEqual('string');
    expect(data[1].name).toEqual('Carmen');
  });
});
