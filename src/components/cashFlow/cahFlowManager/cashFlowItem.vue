<template>
  <v-card
    class="elevation-0 py-4 mb-4 border-thin rounded-xl"
  >

    <v-tooltip
      v-if="cashFlow.isRecurring"
      location="left"
    >
      <template #activator="{ props }">
        <div
          v-bind="props"
          class="corner-triangle"
        >
          <span>{{ $t('cashFlow.cashFlowManager.upcomingCashFlows.recur') }}</span>
        </div>
      </template>
      <span>{{ tooltipString }}</span>
    </v-tooltip>

    <v-card-item class="pa-0">
      <div class="d-flex justify-center align-center">
        <div class="d-flex justify-center" style="flex: 2">
          <v-icon
            v-if="isProfit"
            class="text-green-darken-4 bg-green-accent-1 rounded-circle elevation-2 pa-4 ml-2"
            size="small"
          >mdi-arrow-up-thin-circle-outline</v-icon>
          <v-icon
            v-else
            class="text-red-darken-4 bg-red-lighten-4 rounded-circle elevation-2 pa-4 ml-2"
            size="small"
          >mdi-arrow-down-thin-circle-outline</v-icon>
        </div>
        <div style="flex: 6">
          <div class="text-h6">
            <span>{{ cashFlow.name }}</span>
          </div>
          <div class="text-body-2 text-grey-darken-1">{{ formattedDate }}</div>
        </div>
        <div class="d-flex text-subtitle-1 align-end justify-end mr-2" style="flex: 2">
          <div
            :class="isProfit ? `text-green-darken-1` : `text-red-darken-1`"
          >{{ formattedValue }}</div>
        </div>
        <div style="flex: 1">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-icon
                class="text-grey"
                v-bind="props"
              >
                mdi-dots-horizontal
              </v-icon>
            </template>
            <v-list>
              <v-list-item :disabled="true" @click="null">
                <div>Edit</div>
              </v-list-item>
              <v-list-item @click="deleteCashFlow">
                <div>Delete</div>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import apis from '../../../api';
  import { useI18n } from 'vue-i18n';
  import type { CashFlow } from '../../../dataType';
  import { useLocale } from 'vuetify'
  import { FlowType, Interval } from '../../../dataType';
  const { current } = useLocale()
  const { t } = useI18n();

  const props = defineProps({
    cashFlow: {
      type: Object as PropType<CashFlow>,
      required: true,
    },
  })

  const emits = defineEmits(['update:cash-flow']);

  const formattedDate = computed(() => {
    return new Date(props.cashFlow.startDate).toLocaleDateString(current.value).split('T')[0];
  })

  const isProfit = computed(() => {
    return props.cashFlow.flowType == FlowType.Income;
  });

  const pureValue = computed(() => Math.abs(props.cashFlow.amount));
  const financialValue = computed(()=> pureValue.value.toLocaleString());
  const formattedValue = computed(() => {
    return `${isProfit.value? '+': '-'}$${financialValue.value}`
  });

  const interval = computed(() => {
    if (props.cashFlow.recurringRate) {
      return `${Interval[props.cashFlow.recurringRate?.unit]}`;
    }
    return '';
  });

  const tooltipString = computed(() => {
    const tooltipIntervalPath = `common.interval.${interval.value.toLowerCase()}`
    const tooltipInterval = t(tooltipIntervalPath, { per: props.cashFlow.recurringRate?.per });
    return t(
      'cashFlow.cashFlowManager.upcomingCashFlows.recurTooltip',
      {
        interval: tooltipInterval,
      }
    );
  })

  const deleteCashFlow = () => {
    apis.cashFlow.remove(props.cashFlow).then(() => {
      emits('update:cash-flow');
    }).catch(error => {
      console.error('Error deleting asset:', error);
    });
  }

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
