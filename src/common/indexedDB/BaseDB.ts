import IDatabase from './IDatabase';
import type { BaseDBDataType } from './IDatabase';
import type { ColumnDataType } from './IDatabase';

class BaseDB<T extends BaseDBDataType> {
  private db: IDatabase;
  private lock = false;

  constructor (dbName: string, tableName: string, pk: string = 'id', columns: ColumnDataType[]) {
    this.db = new IDatabase(dbName, tableName, pk, columns);
  }

  async acquireLock (): Promise<void> {
    while (this.lock) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    this.lock = true;
  }

  private releaseLock (): void {
    this.lock = false;
  }

  async getNewId (): Promise<number> {
    await this.acquireLock();
    try {
      await this.db.open();
      const allData = await this.db.getAllData() as T[];
      const maxId = allData.reduce((max, item) => Math.max(max, item.id ?? 0), 0);
      this.db.close();
      return maxId + 1;
    }
    catch {
      return 1;
    }
    finally {
      this.releaseLock();
    }
  }

  async add (row: T): Promise<T | null> {
    row.id = await this.getNewId() as number;
    row.cons_time = new Date();
    row.modi_time = new Date();
    await this.acquireLock();
    try {
      await this.db.open();
      const result = await this.db.addData(row) as T | null;
      this.db.close();
      return result;
    } finally {
      this.releaseLock();
    }
  }

  async update (id: number, row: T): Promise<T | null> {
    row.modi_time = new Date();
    await this.acquireLock();
    try {
      await this.db.open();
      const result = await this.db.updateData(id, row) as T | null;
      this.db.close();
      return result;
    } finally {
      this.releaseLock();
    }
  }

  async get (id: number): Promise<T | null> {
    await this.acquireLock();
    try {
      await this.db.open();
      const result = await this.db.getData(id) as T | null;
      this.db.close();
      return result;
    } finally {
      this.releaseLock();
    }
  }

  async getAll (): Promise<T[]> {
    await this.acquireLock();
    try {
      await this.db.open();
      const result = await this.db.getAllData() as T[];
      this.db.close();
      return result;
    } finally {
      this.releaseLock();
    }
  }

  async delete (id: number): Promise<number> {
    await this.acquireLock();
    try {
      await this.db.open();
      const result = await this.db.deleteData(id) as number;
      this.db.close();
      return result;
    } finally {
      this.releaseLock();
    }
  }
}

export default BaseDB;
