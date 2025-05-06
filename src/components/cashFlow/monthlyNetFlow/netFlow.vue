<template>
  <v-card class="elevation-1 pa-4 mb-4" rounded="xl">
    <div v-if="flow >= 0" class="text-green-darken-4">
      <div class="text-subtitle-1">{{ $t('cashFlow.monthlyNewFlow.newFlow') }}</div>
      <div class="text-h5 font-weight-bold">+${{ flow.toLocaleString() }}</div>
    </div>
    <div v-else class="text-red">
      <div class="text-subtitle-1">{{ $t('cashFlow.monthlyNewFlow.newFlow') }}</div>
      <div class="text-h5 font-weight-bold">-${{ flow.toLocaleString() }}</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  defineProps({
    flow: {
      type: Number,
      required: true,
    },
  })

</script>

<style scoped>
</style>
