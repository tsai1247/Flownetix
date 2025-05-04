import IDatabase from './IDatabase';
import type { BaseDBDataType } from './IDatabase';
import type { ColumnDataType } from './IDatabase';

class BaseDB<T extends BaseDBDataType> {
  private db: IDatabase;

  constructor (dbName: string, tableName: string, pk: string = 'id', columns: ColumnDataType[]) {
    this.db = new IDatabase(dbName, tableName, pk, columns);
  }
  async add (row: T): Promise<T | null> {
    await this.db.open();
    const result = await this.db.addData(row) as T | null;
    this.db.close();
    return result;
  }

  async update (id: number, row: T): Promise<T | null> {
    await this.db.open();
    const result = await this.db.updateData(id, row) as T | null;
    this.db.close();
    return result;
  }

  async get (id: number): Promise<T | null> {
    await this.db.open();
    const result = await this.db.getData(id) as T | null;
    this.db.close();
    return result;
  }

  async getAll (): Promise<T[]> {
    await this.db.open();
    const result = await this.db.getAllData() as T[];
    this.db.close();
    return result;
  }

  async delete (id: number): Promise<number> {
    await this.db.open();
    const result = await this.db.deleteData(id) as number;
    this.db.close();
    return result;
  }
}

export default BaseDB;
