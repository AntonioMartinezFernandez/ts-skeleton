import { IExampleItem } from '@src/ExampleModule/entity/IExampleItem';

export interface IExampleItemRepository {
  findAll(): Promise<IExampleItem[]>;
  findById(id: string): Promise<IExampleItem | undefined>;
  save(item: any): Promise<IExampleItem>;
  update(item: any): Promise<IExampleItem | undefined>;
  delete(id: string): Promise<IExampleItem | undefined>;
}
