import { injectable } from 'inversify';

import { IExampleItem } from './entities/IExampleItem';
import { IStoreExampleItemDTO } from './dtos/IStoreExampleItemDTO';
import { Uuid } from '../Utils/Uuid/Uuid';
import { MemoryDB } from '../database/memory/MemoryDB';
import { IUpdateExampleItemDTO } from './dtos/IUpdateExampleItemDTO';

@injectable()
export class ExampleRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _data = new MemoryDB(),
  ) {}

  async findAll() {
    return this._data.findAll();
  }

  async findById(id: string) {
    return this._data.findById(id);
  }

  async save(item: IStoreExampleItemDTO) {
    const newItem: IExampleItem = this._data.save({
      id: this._uuid.generate(),
      name: item.name,
    });
    return newItem;
  }

  async update(item: IUpdateExampleItemDTO) {
    const updatedItem: IExampleItem | undefined = this._data.update(item);
    return updatedItem;
  }

  async delete(id: string) {
    const deletedItem: IExampleItem | undefined = this._data.delete(id);
    return deletedItem;
  }
}
