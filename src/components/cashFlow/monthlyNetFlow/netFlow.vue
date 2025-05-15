<template>
  <v-card class="elevation-1 pa-4 mb-4" rounded="xl">
    <div :class="flow >= 0 ? `text-green-darken-4` : `text-red`">
      <div class="text-subtitle-1">{{ $t('cashFlow.monthlyNewFlow.newFlow') }}</div>
      <div class="text-h5 font-weight-bold">{{ formattedValue }}</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    flow: {
      type: Number,
      required: true,
    },
  })

  const formattedValue = computed(() => {
    const prefix = props.flow >= 0 ? '+$' : '-$';
    return prefix + props.flow.toLocaleString(
      undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 }
    );
  })

</script>

<style scoped>
</style>
