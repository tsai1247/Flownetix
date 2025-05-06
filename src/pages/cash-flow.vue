<template>
  <div class="ma-0">
    <!-- title and subtitle -->
    <div class="text-h4 font-weight-bold">{{ $t('cashFlow.title') }}</div>
    <div class="text-subtitle-1 text-grey-darken-3">{{ $t('cashFlow.subtitle') }}</div>

    <!-- main content -->
    <v-container class="pa-0 mt-3" fluid>
      <v-row align="center" class="ma-0 pa-0" justify="center">
        <v-col class="pa-2" cols="4">
          <monthly-income :income="0" />
        </v-col>
        <v-col class="pa-2" cols="4">
          <monthly-expenses :expense="0" />
        </v-col>
        <v-col class="pa-2" cols="4">
          <net-flow :flow="0" />
        </v-col>
        <v-col class="pa-2" cols="8">
          <div />
        </v-col>
        <v-col class="pa-2" cols="4">
          <div />
        </v-col>
        <v-col class="pa-2" cols="4">
          <div />
        </v-col>
        <v-col class="pa-2" cols="4">
          <div />
        </v-col>
        <v-col class="pa-2" cols="4">
          <div />
        </v-col>
      </v-row>
    </v-container></div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
