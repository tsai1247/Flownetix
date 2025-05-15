<template>
  <v-card class="elevation-1 pa-4 mb-4" rounded="xl">
    <div class="text-red-darken-4">
      <div class="text-subtitle-1">{{ $t('cashFlow.monthlyNewFlow.monthlyExpenses') }}</div>
      <div class="text-h5 font-weight-bold">{{ formattedValue }}</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    expense: {
      type: Number,
      required: true,
    },
  })

  const formattedValue = computed(() => {
    return '-$' + props.expense.toLocaleString(
      undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 }
    );
  })
</script>

<style scoped>
</style>
