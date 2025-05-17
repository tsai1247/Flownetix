// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const cashFlow = ref(0)
  function onCashFlowChanged () {
    cashFlow.value++
  }

  const cashFlowColorConfig = ref(0);
  function onCashFlowColorConfigChanged () {
    cashFlowColorConfig.value++
  }

  const cashFlowCurrency = ref(0);
  function onCashFlowCurrencyChanged () {
    cashFlowCurrency.value++
  }

  return {
    cashFlow,
    onCashFlowChanged,
    cashFlowColorConfig,
    onCashFlowColorConfigChanged,
    cashFlowCurrency,
    onCashFlowCurrencyChanged,
  }
})
