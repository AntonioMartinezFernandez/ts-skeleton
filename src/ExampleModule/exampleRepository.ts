import { injectable } from 'inversify';

import { Uuid } from '@utils/Uuid/uuid';
import { MemoryDB } from '@connectors/MemoryDB';

import { IExampleItem } from './entity/IExampleItem';
import { IStoreExampleItemDTO } from './dto/IStoreExampleItemDto';
import { IUpdateExampleItemDTO } from './dto/IUpdateExampleItemDto';
import { IExampleItemRepository } from './dao/IExampleItemRepository';

@injectable()
export class ExampleRepository implements IExampleItemRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _data = new MemoryDB(),
  ) {}

  async findAll(): Promise<IExampleItem[]> {
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
