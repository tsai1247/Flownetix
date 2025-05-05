<template>
  <div class="ma-0">
    <!-- title and subtitle -->
    <div class="text-h4 font-weight-bold">{{ $t('assetManager.title') }}</div>
    <div class="text-subtitle-1 text-grey-darken-3">{{ $t('assetManager.subtitle') }}</div>

    <!-- main content -->
    <v-container class="pa-0 ma-0" fluid>
      <v-row align="center" class="ma-0 pa-0" justify="center">
        <v-col class="pa-2" cols="4">
          <add-new-asset @show-add-new-asset-dialog="showAddNewAssetDialog = true" />
          <add-new-asset-dialog v-model="showAddNewAssetDialog" @update:assets="updateAssets" />
        </v-col>
        <v-col class="pa-2" cols="4">
          <add-institution />
        </v-col>
        <v-col class="pa-2" cols="4">
          <import-assets />
        </v-col>
        <v-col class="pa-2" cols="12">
          <my-assets ref="myAssetsRef" />
        </v-col>

        <v-col class="pa-2" cols="12">
          <flow-path-management />
        </v-col>
      </v-row>
    </v-container></div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showAddNewAssetDialog = ref(false)
  const myAssetsRef = ref(null);

  const updateAssets = () => {
    if (myAssetsRef.value) {
      myAssetsRef.value.updateAssets()
    }
  }

</script>

<style scoped>
</style>
