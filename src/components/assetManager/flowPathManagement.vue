<template>
  <v-card class="elevation-1 pa-3 mb-4">
    <!-- title -->
    <v-card-title class="text-h5 mb-2">
      {{ $t('assetManager.flowPathManagement.title') }}
    </v-card-title>

    <!-- content -->
    <v-card-item>
      <div class="text-subtitle-1 text-grey-darken-1 mb-2">
        {{ $t('assetManager.flowPathManagement.description') }}
      </div>
      <v-sheet
        class="pa-3 my-2"
        color="grey-lighten-5"
      >
        <div class="text-h6 mb-2">
          {{ $t('assetManager.flowPathManagement.instruction.title') }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-1 mb-2">
          {{ $t('assetManager.flowPathManagement.instruction.description') }}
        </div>
      </v-sheet>
      <v-btn
        class="text-none"
        color="blue-accent-4"
        disabled
        prepend-icon="mdi-plus"
        @click="showDialog = true"
      >
        {{ $t('assetManager.flowPathManagement.action') }}
      </v-btn></v-card-item>

  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showDialog = ref(false);
</script>

<style scoped>
</style>
