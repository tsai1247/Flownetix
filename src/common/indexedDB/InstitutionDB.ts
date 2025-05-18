import type { BaseDBDataType } from './IDatabase';
import BaseDB from './BaseDB';

interface Institution extends BaseDBDataType {
  name: string;
  website: string;
}

class InstitutionDB extends BaseDB<Institution> {
  constructor () {
    const dbName = 'flownetix';
    const tableName = 'institutions';
    const pk = 'id';
    const columns = [
      { key: 'name', unique: false },
      { key: 'website', unique: false },
      { key: 'cons_date', unique: false },
      { key: 'modi_date', unique: false },
    ];
    super(dbName, tableName, pk, columns);
  }
}

const institutionDB = new InstitutionDB();

export default institutionDB;
export type { Institution };
