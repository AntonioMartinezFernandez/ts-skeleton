import { injectable } from 'inversify';

import { Uuid } from '@utils/Uuid/uuid';
import { ItemDB } from '@src/database/memoryDB/ItemDB';

import { IExampleItem } from './entity/IExampleItem';
import { IStoreExampleItemDTO } from './dto/IStoreExampleItemDto';
import { IUpdateExampleItemDTO } from './dto/IUpdateExampleItemDto';
import { IExampleItemRepository } from './dao/IExampleItemRepository';

@injectable()
export class ExampleMemoryRepository implements IExampleItemRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _data = new ItemDB(),
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
