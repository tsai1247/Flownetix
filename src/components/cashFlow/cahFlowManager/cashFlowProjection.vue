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
  import { computed, onMounted, ref } from 'vue';
  import apis from '../../../api';
  import { useLocale } from 'vuetify';
  import { FlowType } from '@/dataType';

  const { current } = useLocale();
  const chartData = ref([]);
  const progressiveChartData = computed(() => {
    const result = [];
    for(let i=0; i<chartData.value.length; i++) {
      const lastValue = i == 0 ? 0 : result[i-1].value;

      result.push({
        ...chartData.value[i],
        value: chartData.value[i].value + lastValue,
      })
    }
    return result;
  });

  onMounted(() => {
    apis.cashFlow.getOneYearList(localStorage.getItem('currentCurrency') ?? 'USD').then(result => {
      chartData.value = result.data.map(item => {
        return {
          ...item,
        }
      });
    });
  });

  const color = localStorage.getItem('selectedColorType') === '0'
    ? {
      income: '#089981',
      expenses: '#f23645',
    }
    : {
      income: '#f23645',
      expenses: '#089981',
    }

  const getToolTipHtml = (xAxis, keyList, valueList) => {
    return `
      <div style="margin: 0px 0 0;line-height:1;">
        <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">
          ${xAxis}
        </div>
        ${keyList.reduce((sum, _, index) =>
          `${sum}
          <div style="margin: 10px 0 0;line-height:1;">
            <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${valueList[index] >= 0 ? color.income: color.expenses};">
            </span>
            <span style="float:right;margin-left:10px;font-size:14px;color:#666;font-weight:900">
              ${keyList[index]} ${valueList[index]}
            </span>
          </div>`, '')}
    `
  }

  const option = computed(() => {
    const xAxisData = progressiveChartData.value.map(item => item.date.toLocaleDateString(current.value).split('T')[0])
    return {
      grid: [
        {
          left: 60,
          right: 50,
          height: '35%',
        },
        {
          left: 60,
          right: 50,
          top: '60%',
          height: '35%',
        },
      ],
      tooltip:{
        trigger: 'axis',
        formatter: axisList => {
          if(axisList.length === 0) {
            return ''
          }

          if ( !isNaN(Number(axisList[0].value) ) ){
            // gridIndex 0
            return getToolTipHtml(axisList[0].axisValue, [''], [axisList.map(axis => axis.value)]);
          }
          else {
            // gridIndex 1
            return getToolTipHtml(
              axisList[0].axisValue,
              axisList.map(axis => axis.value[1]),
              axisList.map(axis => axis.value[2])
            );
          }
        },
      },
      xAxis: [
        {
          type: 'category',
          axisLine: { onZero: true },
          boundaryGap: false,
          data: xAxisData,
        },
        {
          gridIndex: 1,
          type: 'category',
          axisLine: { onZero: true },
          boundaryGap: false,
          position: 'top',
          data: xAxisData,
          show: false,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
        {
          gridIndex: 1,
          type: 'category',
          inverse: true,
        },
      ],
      series: [
        {
          data: progressiveChartData.value.map(item => item.value),
          type: 'line',
          areaStyle: {},
          smooth: true,
        },
        {
          xAxisIndex: 1,
          yAxisIndex: 1,
          name: 'Income',
          type: 'scatter',
          symbolSize (val) {
            return 10;
          },
          itemStyle: {
            color: color.income,
          },
          data: chartData.value.reduce((sum, dataInaDay, index) => {
            dataInaDay.data.forEach(data => {
              if(data.flowType === FlowType.Income) {
                sum.push([index, data.name, data.amount])
              }
            });
            return sum
          }, []),
        },
        {
          xAxisIndex: 1,
          yAxisIndex: 1,
          name: 'Expenses',
          type: 'scatter',
          symbolSize (val) {
            return 10;
          },
          itemStyle: {
            color: color.expenses,
          },
          data: chartData.value.reduce((sum, dataInaDay, index) => {
            dataInaDay.data.forEach(data => {
              if(data.flowType === FlowType.Expense) {
                sum.push([index, data.name, data.amount])
              }
            });
            return sum
          }, []),
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
