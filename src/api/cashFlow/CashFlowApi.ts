import { cashFlowDB } from '@/common/indexedDB';
import type { CashFlow } from '@/dataType';
import { FlowType, Interval } from '@/dataType';
import { useLocale } from 'vuetify';

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

async function getOneYearList () {
  const chartData = [];
  const { current } = useLocale();

  const addData = cashFlow => {
    const yearId = new Date(cashFlow.startDate).getFullYear();
    const monthId = new Date(cashFlow.startDate).getMonth();
    const targetIndex = chartData.findIndex(item => item.yearId === yearId && item.monthId === monthId);
    if (targetIndex === -1) return false;
    if(cashFlow.flowType === FlowType.Income) {
      chartData[targetIndex] = {
        ...chartData[targetIndex],
        value: chartData[targetIndex].value + parseInt(cashFlow.amount, 10),
        income: chartData[targetIndex].income + parseInt(cashFlow.amount, 10),
      };
    }
    else {
      chartData[targetIndex] = {
        ...chartData[targetIndex],
        value: chartData[targetIndex].value - parseInt(cashFlow.amount, 10),
        expenses: chartData[targetIndex].expenses + parseInt(cashFlow.amount, 10),
      };
    }
    return true;
  }

  for (let i = 0; i < 12; i++) {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + i)
    targetDate.setDate(1)
    const month = targetDate.toLocaleString(current.value, { month: 'short' });
    const yearId = targetDate.getFullYear();
    const monthId = targetDate.getMonth();
    chartData.push({
      yearId,
      monthId,
      xAxis: month,
      value: 0,
      income: 0,
      expenses: 0,
    });
  }

  await getAll().then(data => {
    data.forEach(cashFlow => {
      if(cashFlow.isRecurring) {
        while(true){
          // just add to target month
          if(!addData(cashFlow)){
            break;
          }

          const newDate = new Date(cashFlow.startDate);
          switch (cashFlow.recurringRate?.unit) {
            case Interval.Day:
              newDate.setDate(newDate.getDate() + cashFlow.recurringRate.per);
              break;
            case Interval.Month:
              newDate.setMonth(newDate.getMonth() + cashFlow.recurringRate.per);
              break;
            case Interval.Quarter:
              newDate.setMonth(newDate.getMonth() + cashFlow.recurringRate.per * 3);
              break;
            case Interval.Year:
              newDate.setFullYear(newDate.getFullYear() + cashFlow.recurringRate.per);
              break;
          }

          cashFlow.startDate = newDate;
        }
      }
      else {
        addData(cashFlow);
      }
    })
  })
  return chartData;
}

export default {
  getAll,
  add,
  update,
  remove,
  getOneYearList,
};
