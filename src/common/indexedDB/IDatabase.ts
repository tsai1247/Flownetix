import type { BaseDBDataType } from '@/dataType';

interface ColumnDataType {
  key: string;
  unique?: boolean;
  multiEntry?: boolean;
  locale?: boolean;
}
class IDatabase {
  static version: number = 1;
  private dbName: string;
  private tableName: string;
  private pk: string;
  private columns: ColumnDataType[];
  private db: IDBDatabase | null;

  constructor (dbName: string, tableName: string, pk: string = 'id', columns: ColumnDataType[]) {
    this.dbName = dbName;
    this.tableName = tableName;
    this.pk = pk;
    this.columns = columns;
    this.db = null;
    const version = localStorage.getItem('dbVersion');
    if (version) {
      IDatabase.version = parseInt(version, 10);
    }
  }

  // 開啟資料庫
  open () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, IDatabase.version);
      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.tableName)) {
          const objectStore = db.createObjectStore(this.tableName, { keyPath: this.pk });
          this.columns.forEach(column => {
            objectStore.createIndex(column.key, column.key, { unique: column.unique || false });
          });
          IDatabase.version += 1;
          localStorage.setItem('dbVersion', IDatabase.version.toString());
        }
      };
      request.onsuccess = event => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };
      request.onerror = event => {
        console.error('Error opening database:', event);
        reject(event);
      };
    });
  }

  // 新增資料
  addData (data: BaseDBDataType) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db!.transaction(this.tableName, 'readwrite').objectStore(this.tableName);
      const clonedData = JSON.parse(JSON.stringify(data));
      const request = objectStore.add(clonedData);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = event => {
        console.error('Error adding data:', event);
        reject(event);
      };
    });
  }

  // 更新資料
  updateData (id: number, data: BaseDBDataType) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db!.transaction(this.tableName, 'readwrite').objectStore(this.tableName);
      const clonedData = JSON.parse(JSON.stringify(data));
      const request = objectStore.put({ ...clonedData, [this.pk]: id });
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = event => {
        console.error('Error updating data:', event);
        reject(event);
      };
    });
  }

  // 取得資料
  getData (id: number) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db!.transaction(this.tableName, 'readonly').objectStore(this.tableName);
      const request = objectStore.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = event => {
        console.error('Error getting data:', event);
        reject(event);
      };
    });
  }

  // 取得所有資料
  getAllData () {
    return new Promise((resolve, reject) => {
      const objectStore = this.db!.transaction(this.tableName, 'readonly').objectStore(this.tableName);
      const request = objectStore.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = event => {
        console.error('Error getting all data:', event);
        reject(event);
      };
    });
  }

  // 刪除資料
  deleteData (id: number) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db!.transaction(this.tableName, 'readwrite').objectStore(this.tableName);
      const request = objectStore.delete(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = event => {
        console.error('Error deleting data:', event);
        reject(event);
      };
    });
  }

  // 關閉資料庫
  close () {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export default IDatabase;
export type { BaseDBDataType };
export type { ColumnDataType };
