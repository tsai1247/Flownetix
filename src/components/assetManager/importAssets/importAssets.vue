<template>
  <v-card class="elevation-1 pa-3 mb-4">
    <div class="text-center">
      <v-icon
        color="orange-lighten-4"
        :size="50"
      >
        mdi-upload-circle
      </v-icon>
      <div class="mb-2 text-h6">
        {{ $t('assetManager.importAssets.title') }}
      </div>
      <div class="mb-2 text-subtitle-2 text-grey-darken-1">
        {{ $t('assetManager.importAssets.description') }}
      </div>
      <v-btn class="text-none" color="orange-darken-2" disabled @click="showDialog = true">
        {{ $t('assetManager.importAssets.action') }}
      </v-btn>
    </div>
    <import-assets-dialog v-model="showDialog" />
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showDialog = ref(false)
</script>

<style scoped>
</style>
