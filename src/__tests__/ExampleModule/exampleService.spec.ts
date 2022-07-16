import 'reflect-metadata';

import { ExampleService } from '@src/ExampleModule/exampleService';
import { ExampleMemoryRepository } from '@src/ExampleModule/exampleMemoryRepository';

// ExampleMemoryRepository Mocked
const mockedRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// SuT
const sut = new ExampleService(
  mockedRepository as unknown as ExampleMemoryRepository,
);

// Unit Tests Suite
describe('Example Service Unit Tests', () => {
  it('should call findAll repository method', async () => {
    await sut.index();

    expect(mockedRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call findById repository method with "id" parameter', async () => {
    await sut.find('entity_id');

    expect(mockedRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockedRepository.findById).toHaveBeenCalledWith('entity_id');
  });

  it('should call save repository method with "name" parameter', async () => {
    await sut.store({ name: 'Name' });

    expect(mockedRepository.save).toHaveBeenCalledTimes(1);
    expect(mockedRepository.save).toHaveBeenCalledWith({ name: 'Name' });
  });

  it('should call update repository method with "id" and "name" parameters', async () => {
    await sut.update({ id: 'entity_id', name: 'New_name' });

    expect(mockedRepository.update).toHaveBeenCalledTimes(1);
    expect(mockedRepository.update).toHaveBeenCalledWith({
      id: 'entity_id',
      name: 'New_name',
    });
  });

  it('should call delete repository method with "id" parameter', async () => {
    await sut.delete('entity_id');

    expect(mockedRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockedRepository.delete).toHaveBeenCalledWith('entity_id');
  });
});
