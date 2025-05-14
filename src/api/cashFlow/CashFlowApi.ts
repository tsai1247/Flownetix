import { cashFlowDB } from '@/common/indexedDB';
import type { CashFlow } from '@/dataType';

function getAll (): Promise<CashFlow[]> {
  return new Promise((resolve, reject) => {
    cashFlowDB.getAll()
      .then(cashFlow => {
        resolve(cashFlow);
      })
      .catch(error => {
        console.error('get CashFlows error', error);
        reject(error);
      });
  });
}

function add (cashFlow: CashFlow) {
  return new Promise((resolve, reject) => {
    cashFlowDB.add(cashFlow)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function update (cashFlow: CashFlow) {
  return new Promise((resolve, reject) => {
    if (!cashFlow.id) {
      reject(new Error('CashFlow ID is required to update'));
      return;
    }
    cashFlowDB.update(cashFlow.id, cashFlow)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function remove (cashFlow: CashFlow) {
  return new Promise((resolve, reject) => {
    if (!cashFlow.id) {
      reject(new Error('CashFlow ID is required for deletion'));
      return;
    }
    cashFlowDB.delete(cashFlow.id)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  getAll,
  add,
  update,
  remove,
};
