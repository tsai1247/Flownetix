<template>
  <v-card class="elevation-1 pa-2 mb-2 " rounded="xl">
    <!-- title -->
    <v-card-title class=" text-h5 mb-2">
      <div class="d-flex justify-space-between">
        <span>
          {{ $t('cashFlow.cashFlowManager.upcomingCashFlows.title') }}
        </span>
        <v-btn
          class="text-none"
          color="secondary"
          prepend-icon="mdi-plus"
          rounded="lg"
          @click="showDialog = true"
        >
          {{ $t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.title') }}
        </v-btn>
        <add-cash-flow-dialog v-model="showDialog" />
      </div>
    </v-card-title>

    <!-- content -->
    <v-card-item>
      <cash-flow-item
        v-for="(item, index) in cashFlowList"
        :key="index"
        :cash-flow="item"
        @update:cash-flow="updateCashFlow"
      />


    </v-card-item></v-card>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import apis from '../../../api';
  import type { CashFlow } from '../../../dataType';
  import { useAppStore } from '@/stores/app';
  const store = useAppStore();

  const showDialog = ref(false);

  const cashFlowList = ref<CashFlow[]>([]);

  const updateCashFlow = () => {
    apis.cashFlow.getAll().then((data: CashFlow[]) => {
      const currency = localStorage.getItem('currentCurrency') ?? 'USD'
      cashFlowList.value = data.filter(item => item.currency === currency);
    })
  }

  watch(() => [store.cashFlowCurrency, store.cashFlow], () => {
    updateCashFlow()
  }, { immediate: true })
</script>

<style scoped>
.corner-triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  overflow: hidden;
}

.corner-triangle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 50px 50px 0 0;
  border-color: #d5e5f9 transparent transparent transparent;
  z-index: 1;
}

.corner-triangle span {
  position: absolute;
  top: 9px;
  left: 4px;
  transform: rotate(-45deg);
  color: #1a3b76;
  font-size: 12px;
  z-index: 2;
}
</style>
