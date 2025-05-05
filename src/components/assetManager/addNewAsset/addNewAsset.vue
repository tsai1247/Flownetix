<template>
  <v-card class="elevation-1 pa-3 mb-4">
    <div class="text-center">
      <v-icon
        color="blue-accent-4"
        :size="50"
      >
        mdi-plus-circle
      </v-icon>
      <div class="mb-2 text-h6">
        {{ $t('assetManager.addNewAsset.title') }}
      </div>
      <div class="mb-2 text-subtitle-2 text-grey-darken-1">
        {{ $t('assetManager.addNewAsset.description') }}
      </div>
      <v-btn class="text-none" color="blue-accent-4" @click="showDialog">
        {{ $t('assetManager.addNewAsset.action') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  const emits = defineEmits(['show-add-new-asset-dialog'])

  const showDialog = () => {
    // dialog is opened in the parent component
    // emit an event to open the dialog in the parent component
    emits('show-add-new-asset-dialog');
  }
</script>

<style scoped>
</style>
