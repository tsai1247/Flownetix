<template>
  <v-card class="elevation-1 pa-4 mb-4" rounded="lg">
    <v-card-title class=" text-h5 mb-2">
      <div class="d-flex justify-space-between">
        <span>
          {{ $t('cashFlow.cashFlowSetting.title') }}
        </span>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">

          <div>
            <div class="text-h6 mb-2 zd-flex justify-space-between">
              {{ $t('cashFlow.cashFlowSetting.subtitle.assetCurrency') }}
            </div>
            <v-autocomplete
              v-model="currentCurrency"
              dense
              :items="currencies"
              :label="$t('cashFlow.cashFlowSetting.content.assetCurrency')"
              outlined
              required
            />
          </div>
        </v-col>
        <v-col cols="8">
          <div>
            <div class="text-h6 mb-2 zd-flex justify-space-between">
              {{ $t('cashFlow.cashFlowSetting.subtitle.colorConfig') }}
            </div>
            <v-radio-group v-model="selectedColorType" inline>
              <v-radio class="mr-5" value="0">
                <template #label>
                  <v-icon class="bg-teal-darken-1 pa-5 mr-2 rounded-lg" size="x-large">mdi-trending-up</v-icon>
                  <v-icon class="bg-red-darken-1 pa-5 mr-2 rounded-lg" size="x-large">mdi-trending-down</v-icon>
                </template>
              </v-radio>
              <v-radio value="1">
                <template #label>
                  <v-icon class="bg-red-darken-1 pa-5 mr-2 rounded-lg" size="x-large">mdi-trending-up</v-icon>
                  <v-icon class="bg-teal-darken-1 pa-5 mr-2 rounded-lg" size="x-large">mdi-trending-down</v-icon>
                </template>
              </v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import apis from '../../../api';
  import { useAppStore } from '@/stores/app';
  const store = useAppStore();

  const currencies = ref<Array<string>>([]);
  const currentCurrency = ref('USD');
  const selectedColorType = ref('0');
  onMounted(() => {
    apis.cashFlow.getAll().then(data => {
      currencies.value = data.reduce((sum: Array<string>, cur) => {
        if (!sum.includes(cur.currency)) {
          sum.push(cur.currency)
        }
        return sum;
      }, []);
    })

    console.log(localStorage.getItem('selectedColorType'))
    selectedColorType.value = localStorage.getItem('selectedColorType') ?? '0';
    currentCurrency.value = localStorage.getItem('currentCurrency') ?? 'USD';
  })

  watch(() => selectedColorType.value, () => {
    localStorage.setItem('selectedColorType', selectedColorType.value)
    store.onCashFlowColorConfigChanged();
  })

  watch(() => currentCurrency.value, () => {
    localStorage.setItem('currentCurrency', currentCurrency.value)
    store.onCashFlowCurrencyChanged();
  })

</script>

<style scoped>
</style>
