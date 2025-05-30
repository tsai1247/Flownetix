<template>
  <v-dialog v-model="showDialog" max-width="800px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="cashFlow.name"
              dense
              :label="$t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.flowName')"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="cashFlow.flowType"
              dense
              item-title="title"
              item-value="value"
              :items="flowTypeList"
              :label="$t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.flowType.title')"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="cashFlow.amount"
              dense
              :label="$t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.flowAmount')"
              outlined
              required
              type="number"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="cashFlow.currency"
              dense
              :items="currencies"
              :label="$t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.Currency')"
              outlined
              required
            />
          </v-col>
          <v-col cols="12">
            <v-date-input
              v-model="cashFlow.startDate"
              dense
              :label="$t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.Date')"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-checkbox
              v-model="cashFlow.isRecurring"
              dense
              :label="$t('cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.Recurring')"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="recurringRate.per"
              dense
              :disabled="!cashFlow.isRecurring"
              outlined
              required
              type="number"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="recurringRate.unit"
              dense
              :disabled="!cashFlow.isRecurring"
              :item-title="(item) => $t(`common.unit.${item[0].toLowerCase()}`)"
              :item-value="(item) => item[1]"
              :items="Object.entries(Interval).filter(([_, value]) => !isNaN(Number(value)))"
              outlined
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="showDialog = false">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="addCashFlow">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { VDateInput } from 'vuetify/labs/VDateInput'
  import { computed, onMounted, ref, watch } from 'vue'
  import apis from '../../../api';
  import type { CashFlow } from '../../../dataType';
  import { FlowType, Interval } from '../../../dataType';
  import { useAppStore } from '@/stores/app';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const store = useAppStore();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  })

  const emits = defineEmits(['update:modelValue'])

  const showDialog = ref(false)

  watch(() => props.modelValue, newValue => {
    showDialog.value = newValue
  })

  watch(showDialog, newValue => {
    if (newValue !== props.modelValue) {
      emits('update:modelValue', newValue)
    }
    if (newValue) {
      clearCashFlow();
    }
  })

  const currencies = ref<string[]>([]);
  onMounted(() => {
    apis.common.getCurrencyList().then(data => {
      currencies.value = data;
    })
  })

  const cashFlow = ref<CashFlow>({
    name: '',
    flowType: FlowType.Income,
    amount: 0,
    currency: '',
    startDate: new Date(),
    isRecurring: false,
    recurringRate: {
      per: 1,
      unit: Interval.Day,
    },
  } as CashFlow);

  const clearCashFlow = () => {
    cashFlow.value = {
      name: '',
      flowType: FlowType.Income,
      amount: 0,
      currency: '',
      startDate: new Date(),
      isRecurring: false,
      recurringRate: null,
    } as CashFlow;
  }

  const recurringRate = ref({
    per: 1,
    unit: Interval.Day,
  });

  const originFlowTypeList = Object.entries(FlowType).filter(([_, value]) => !isNaN(Number(value)));

  const flowTypeList = computed(() => {
    return originFlowTypeList.map( item => ({
      title: t(`cashFlow.cashFlowManager.upcomingCashFlows.addNewFlow.flowType.${item[0].toLowerCase()}`),
      value: item[1],
    }))
  });


  const addCashFlow = () => {
    const newCashFlow = cashFlow.value;
    newCashFlow.recurringRate = recurringRate.value;
    newCashFlow.amount = Math.abs( newCashFlow.amount );

    if (newCashFlow.name === '' || newCashFlow.currency === '') {
      alert('Please fill in all fields correctly.');
      return;
    }
    if (newCashFlow.isRecurring) {
      if (newCashFlow.recurringRate.per <= 0) {
        alert('Recurring interval should be greater than 0')
        return;
      }
    }

    apis.cashFlow.add(newCashFlow).then(() => {
      showDialog.value = false;
      store.onCashFlowChanged();
    }).catch(error => {
      console.error('Error adding cash flow:', error);
    });
  }
</script>

<style scoped>
</style>
