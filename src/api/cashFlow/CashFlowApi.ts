import { cashFlowDB } from '@/common/indexedDB';
import type { CashFlow } from '@/dataType';
import { FlowType, Interval } from '@/dataType';

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

  const cashFlowToData = (cashFlow: CashFlow) => {
    const date = new Date(cashFlow.startDate);
    return {
      date,
      value: Math.abs(cashFlow.amount) * (cashFlow.flowType === FlowType.Income ? 1 : -1),
      data: [
        {
          name: cashFlow.name,
          amount: Math.abs(cashFlow.amount) * (cashFlow.flowType === FlowType.Income ? 1 : -1),
          flowType: cashFlow.flowType,
        },
      ],
    };
  }

  const today = new Date();
  const Milliseconds_Per_Year = 365*24*60*60*1000;
  const addData = cashFlow => {
    const targetDate = new Date(cashFlow.startDate);
    if ((targetDate.getTime() - today.getTime()) > Milliseconds_Per_Year) {
      return false;
    }
    const data = cashFlowToData(cashFlow);
    const targetIndex = chartData.findIndex(item => item.date.getTime() === data?.date.getTime());
    if (targetIndex == -1) {
      chartData.push(data)
    }
    else {
      chartData[targetIndex] = {
        ...chartData[targetIndex],
        value: chartData[targetIndex].value + data?.value,
        data: [
          ...chartData[targetIndex].data,
          ...data.data,
        ],
      }
    }
    return true;
  };

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
  return chartData.sort((a, b) => a.date.getTime() - b.date.getTime() );
}

export default {
  getAll,
  add,
  update,
  remove,
  getOneYearList,
};
