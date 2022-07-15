import { IExampleItem } from '@src/ExampleModule/entity/IExampleItem';
import { injectable } from 'inversify';

@injectable()
export class ItemDB {
  item: IExampleItem[] = [];

  findAll(): IExampleItem[] {
    return this.item;
  }

  findById(id: string): IExampleItem | undefined {
    const item: IExampleItem | undefined = this.item.find(
      (item) => item.id === id,
    );
    return item;
  }

  save(item: IExampleItem): IExampleItem {
    this.item.push(item);
    return item;
  }

  update(item: IExampleItem): IExampleItem | undefined {
    let found = false;

    this.item = this.item.map((element) => {
      if (element.id === item.id) {
        element.name = item.name;
        found = true;
      }
      return element;
    });

    if (!found) return undefined;
    return item;
  }

  delete(id: string): IExampleItem | undefined {
    const item: IExampleItem | undefined = this.item.find(
      (item) => item.id === id,
    );

    this.item = this.item.filter((e) => e.id !== id);

    return item;
  }
}
