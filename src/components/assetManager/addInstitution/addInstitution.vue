<template>
  <v-card class="elevation-1 pa-6 mb-4" rounded="xl">
    <div class="text-center">
      <v-icon
        color="teal"
        :size="50"
      >
        mdi-bank-circle
      </v-icon>
      <div class="mb-2 text-h6">
        {{ $t('assetManager.addInstitution.title') }}
      </div>
      <div class="mb-2 text-subtitle-2 text-grey-darken-1">
        {{ $t('assetManager.addInstitution.description') }}
      </div>
      <v-btn class="text-none" color="teal" @click="showDialog = true">
        {{ $t('assetManager.addInstitution.action') }}
      </v-btn>
    </div>
    <add-institution-dialog v-model="showDialog" />
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showDialog = ref(false)
</script>

<style scoped>
</style>
