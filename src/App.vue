<template>
  <v-app id="app">
    <v-navigation-drawer v-model="isDrawerOpen" color="primary px-2 pa-4" permanent>
      <v-spacer />
      <!-- logo and title -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-medium">
            <v-icon class="mr-2">mdi-bank</v-icon>
            <span class="text-black">{{ title }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-spacer class="ma-3" />
      <!-- navigation items -->
      <v-list-item-group>
        <v-list-item
          v-for="(item, index) in routeInfo"
          :key="index"
          class="mx-2 py-3"
          link
          :prepend-icon="item.icon"
          rounded="lg"
          :title="item.title"
          :to="item.path"
        />
      </v-list-item-group>
      <v-list-item-group class="position-absolute bottom-0">
        <v-list-item
          v-for="(item, index) in preferenceInfo"
          :key="index"
          class="mx-2 py-3"
          link
          :prepend-icon="item.icon"
          rounded="lg"
          :title="item.title"
          :to="item.path"
        />
        <v-spacer class="my-2" />
      </v-list-item-group>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar class="elevation-0 text-primary" color="secondary" prominent>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-bell</v-icon> <!-- Notification Icon -->
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account</v-icon> <!-- User Icon -->
        </v-btn>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const title = ref('Nexus Finance');
  const isDrawerOpen = ref(true);

  const routeInfo = ref([
    {
      title: 'Snapshot',
      icon: 'mdi-view-dashboard',
      path: '/snapshot',
    },
    {
      title: 'Prediction',
      icon: 'mdi-chart-bar',
      path: '/prediction',
    },
    {
      title: 'Cash Flow',
      icon: 'mdi-chart-line-variant',
      path: '/cash-flow',
    },
    {
      title: 'Asset Manager',
      icon: 'mdi-bank',
      path: '/asset-manager',
    },
  ]);

  const preferenceInfo = ref([
    {
      title: 'Settings',
      icon: 'mdi-cog',
      path: '/settings',
    },
    {
      title: 'Help',
      icon: 'mdi-help-circle',
      path: '/help',
    },
  ]);

</script>
<style scoped></style>
