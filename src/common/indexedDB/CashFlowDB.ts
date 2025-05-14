import type { CashFlow } from '@/dataType';
import BaseDB from './BaseDB';

class CashFlowDB extends BaseDB<CashFlow> {
  constructor () {
    const dbName = 'nexus-finance';
    const tableName = 'cashflow';
    const pk = 'id';
    const columns = [
      { key: 'name', unique: false },
      { key: 'value', unique: false },
      { key: 'currency', unique: false },
      { key: 'isRecurring', unique: false },
      { key: 'startDate', unique: false },
      { key: 'recurringRate', unique: false },
      { key: 'cons_date', unique: false },
      { key: 'modi_date', unique: false },
    ];
    super(dbName, tableName, pk, columns);
  }
}

const cashFlowDB = new CashFlowDB();

export default cashFlowDB;
