<template>
  <v-card class="elevation-1 pa-4 mb-4 " rounded="xl">
    <!-- title -->
    <v-card-title class="text-h5 mb-2">
      {{ $t('cashFlow.cashFlowManager.cashFlowProjection.title') }}
    </v-card-title>

    <!-- content -->
    <v-card-item>
      <div>
        <v-chart autoresize class="chart" :option="option" />
      </div>
    </v-card-item>
  </v-card>

</template>

<script setup lang="ts">
  import VChart from 'vue-echarts';
  import { computed, onMounted, reactive } from 'vue';
  import apis from '../../../api';
  import { useLocale } from 'vuetify';
  import { FlowType, Interval } from '@/dataType';
  const { current } = useLocale();

  const chartData = reactive([]);
  const progressiveChartData = computed(() => {
    const result = [];
    for(let i=0; i<chartData.length; i++) {
      const lastValue = i == 0 ? 0 : result[i-1].value;

      result.push({
        ...chartData[i],
        value: chartData[i].value + lastValue,
      })
    }
    return result;
  });

  onMounted(() => {
    const now = new Date();
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
      });
    }

    apis.cashFlow.getAll().then(data => {
      data.forEach(cashFlow => {
        console.log(cashFlow);
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
  });

  const addData = cashFlow => {
    const yearId = new Date(cashFlow.startDate).getFullYear();
    const monthId = new Date(cashFlow.startDate).getMonth();
    const targetIndex = chartData.findIndex(item => item.yearId === yearId && item.monthId === monthId);
    if (targetIndex === -1) return false;
    if(cashFlow.flowType === FlowType.Income) {
      chartData[targetIndex] = {
        ...chartData[targetIndex],
        value: chartData[targetIndex].value + parseInt(cashFlow.amount, 10),
      };
    }
    else {
      chartData[targetIndex] = {
        ...chartData[targetIndex],
        value: chartData[targetIndex].value - parseInt(cashFlow.amount, 10),
      };
    }
    return true;
  }

  const option = computed(() => {
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: progressiveChartData.value.map(item => item.xAxis),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: progressiveChartData.value.map(item => item.value),
          type: 'line',
          areaStyle: {},
          smooth: true,
        },
      ],
    }
  });
</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>
