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
              label="Asset Currency"
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
              <v-radio class="mr-10" value="0">
                <template #label>
                  <v-img
                    aspect-ratio="16/9"
                    cover
                    :src="greenIncome"
                    :width="150"
                  />
                  <!-- <img alt="Radio One" src="path/to/image1.png" style="width: 24px; height: 24px;"> -->
                </template>
              </v-radio>
              <v-radio value="1">
                <template #label>
                  <v-img
                    aspect-ratio="16/9"
                    cover
                    :src="redIncome"
                    :width="150"
                  />
                  <!-- <img alt="Radio Two" src="path/to/image2.png" style="width: 24px; height: 24px;"> -->
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
  import greenIncome from '@/assets/greenIncome.png';
  import redIncome from '@/assets/redIncome.png';

  const currencies = ref([]);
  const currentCurrency = ref('USD');
  const selectedColorType = ref('0');
  onMounted(() => {
    apis.common.getCurrencyList().then(data => {
      currencies.value = data;
    })

    console.log(localStorage.getItem('selectedColorType'))
    selectedColorType.value = localStorage.getItem('selectedColorType') ?? '0';
    currentCurrency.value = localStorage.getItem('currentCurrency') ?? 'USD';
  })

  watch(() => selectedColorType.value, () => {
    localStorage.setItem('selectedColorType', selectedColorType.value)
  })

  watch(() => currentCurrency.value, () => {
    localStorage.setItem('currentCurrency', currentCurrency.value)
  })

</script>

<style scoped>
</style>
