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
    apis.cashFlow.getOneYearList().then(yearList => {
      chartData.value = yearList;
    });
  });

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
