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
  import { ref } from 'vue';

  const option = ref({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {},
        smooth: true,
      },
    ],
  });
</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>
