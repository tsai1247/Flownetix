<template>
  <div class="ma-0">
    <!-- title and subtitle -->
    <div class="text-h4 font-weight-bold">{{ $t("cashFlow.title") }}</div>
    <div class="text-subtitle-1 text-grey-darken-3">
      {{ $t("cashFlow.subtitle") }}
    </div>

    <!-- main content -->
    <v-container class="pa-0 mt-3" fluid>
      <v-row align="start" class="ma-0 pa-0" justify="start">
        <v-col class="pa-2" cols="8">
          <cash-flow-setting />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-2" cols="8">
          <cash-flow-projection />
        </v-col>
        <v-col class="pa-2" cols="4">
          <upcoming-cash-flows />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import apis from '../api';
  const totalValue = ref({
    income: 0,
    expenses: 0,
    flow: 0,
  });
  const totalCount = ref(12);

  const averageValue = computed(() => {
    return {
      income: totalValue.value.income * 1.0 / totalCount.value,
      expenses: totalValue.value.expenses * 1.0 / totalCount.value,
      flow:totalValue.value.flow * 1.0 / totalCount.value,
    }
  });

  onMounted(() => {
    apis.cashFlow.getOneYearList().then(result => {
      totalValue.value = {
        income: result.totalIncome,
        expenses: result.totalExpenses,
        flow: result.totalIncome - result.totalExpenses,
      }
    });

  });

</script>
<style scoped></style>
