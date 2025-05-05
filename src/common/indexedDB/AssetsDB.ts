import type { BaseDBDataType } from './IDatabase';
import BaseDB from './BaseDB';
import type { Institution } from './InstitutionDB';

interface Asset extends BaseDBDataType {
  name: string;
  type: string;
  institution: Institution;
  balance: number;
  currency: string;
}

class AssetsDB extends BaseDB<Asset> {
  constructor () {
    const dbName = 'nexus-finance';
    const tableName = 'assets';
    const pk = 'id';
    const columns = [
      { key: 'name', unique: false },
      { key: 'type', unique: false },
      { key: 'institution', unique: false },
      { key: 'balance', unique: false },
      { key: 'currency', unique: false },
      { key: 'cons_date', unique: false },
      { key: 'modi_date', unique: false },
    ];
    super(dbName, tableName, pk, columns);
  }
}

const assetsDB = new AssetsDB();

export default assetsDB;
export type { Asset };
