import { injectable } from 'inversify';
import { IStoreExampleItemDTO } from './dto/IStoreExampleItemDto';
import { IUpdateExampleItemDTO } from './dto/IUpdateExampleItemDto';
import { ExampleMemoryRepository } from './exampleMemoryRepository';

@injectable()
export class ExampleService {
  constructor(
    private readonly _ExampleMemoryRepository: ExampleMemoryRepository,
  ) {}

  async index() {
    return this._ExampleMemoryRepository.findAll();
  }

  async find(id: string) {
    return this._ExampleMemoryRepository.findById(id);
  }

  async store(item: IStoreExampleItemDTO) {
    return this._ExampleMemoryRepository.save(item);
  }

  async update(item: IUpdateExampleItemDTO) {
    return this._ExampleMemoryRepository.update(item);
  }

  async delete(id: string) {
    return this._ExampleMemoryRepository.delete(id);
  }
}
