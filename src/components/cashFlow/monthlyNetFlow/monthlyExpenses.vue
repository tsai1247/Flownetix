<template>
  <v-card class="elevation-1 pa-4 mb-4" rounded="xl">
    <div class="text-red-darken-4">
      <div class="text-subtitle-1">{{ $t('cashFlow.monthlyNewFlow.monthlyExpenses') }}</div>
      <div class="text-h5 font-weight-bold">-${{ expense.toLocaleString() }}</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  defineProps({
    expense: {
      type: Number,
      required: true,
    },
  })
</script>

<style scoped>
</style>
