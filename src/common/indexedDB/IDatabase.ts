interface BaseDBDataType {
  id: number;
  cons_time: Date;
  modi_time: Date;
}

interface ColumnDataType {
  key: string;
  unique?: boolean;
  multiEntry?: boolean;
  locale?: boolean;
}

class IDatabase {
  private dbName: string;
  private tableName: string;
  private pk: string;
  private columns: ColumnDataType[];
  private version: number;
  private db: IDBDatabase | null;

  constructor (dbName: string, tableName: string, pk: string = 'id', columns: ColumnDataType[], version = 1) {
    this.dbName = dbName;
    this.tableName = tableName;
    this.pk = pk
    this.columns = columns
    this.version = version;
    this.db = null;
  }

  // 開啟資料庫
  open () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onsuccess = event => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };
      request.onerror = event => {
        console.error('Error opening database:', event);
        reject(event);
      };
      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.tableName)) {
          const objectStore = db.createObjectStore(this.tableName, { keyPath: this.pk });
          this.columns.forEach(column => {
            objectStore.createIndex(column.key, column.key, { unique: column.unique, multiEntry: column.multiEntry });
          });
        }
      };
    });
  }

  // 新增資料
  addData (data: BaseDBDataType) {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.tableName, 'readwrite');
      const objectStore = transaction.objectStore(this.tableName);
      const request = objectStore.add(data);
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
      const transaction = this.db!.transaction(this.tableName, 'readwrite');
      const objectStore = transaction.objectStore(this.tableName);
      const request = objectStore.put({ ...data, [this.pk]: id });
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
      const transaction = this.db!.transaction(this.tableName, 'readonly');
      const objectStore = transaction.objectStore(this.tableName);
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
      const transaction = this.db!.transaction(this.tableName, 'readonly');
      const objectStore = transaction.objectStore(this.tableName);
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
      const transaction = this.db!.transaction(this.tableName, 'readwrite');
      const objectStore = transaction.objectStore(this.tableName);
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
