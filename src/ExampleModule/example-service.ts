import { injectable } from 'inversify';
import { IStoreExampleItemDTO } from './dtos/IStoreExampleItemDTO';
import { IUpdateExampleItemDTO } from './dtos/IUpdateExampleItemDTO';
import { ExampleRepository } from './example-repository';

@injectable()
export class ExampleService {
  constructor(private readonly _exampleRepository: ExampleRepository) {}

  async index() {
    return this._exampleRepository.findAll();
  }

  async find(id: string) {
    return this._exampleRepository.findById(id);
  }

  async store(item: IStoreExampleItemDTO) {
    return this._exampleRepository.save(item);
  }

  async update(item: IUpdateExampleItemDTO) {
    return this._exampleRepository.update(item);
  }

  async delete(id: string) {
    return this._exampleRepository.delete(id);
  }
}
