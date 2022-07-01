import { IExampleItem } from 'ExampleModule/entities/IExampleItem';

export class MemoryDB {
  data: IExampleItem[] = [];

  findAll(): IExampleItem[] {
    return this.data;
  }

  findById(id: string): IExampleItem | undefined {
    const item: IExampleItem | undefined = this.data.find(
      (item) => item.id === id,
    );
    return item;
  }

  save(item: IExampleItem): IExampleItem {
    this.data.push(item);
    return item;
  }

  update(item: IExampleItem): IExampleItem | undefined {
    let found = false;

    this.data = this.data.map((element) => {
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
    const item: IExampleItem | undefined = this.data.find(
      (item) => item.id === id,
    );

    this.data = this.data.filter((e) => e.id !== id);

    return item;
  }
}
