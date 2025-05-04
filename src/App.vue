<template>
  <v-app id="app" :locale="current">
    <v-navigation-drawer v-model="isDrawerOpen" color="primary px-2 pa-4" permanent>
      <v-spacer />
      <!-- logo and title -->
      <v-list-item>
        <v-list-item-title class="text-h6 font-weight-medium">
          <v-icon class="mr-2">mdi-bank</v-icon>
          <span class="text-black">{{ title }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-spacer class="ma-3" />
      <!-- navigation items -->
      <div>
        <v-list-item
          v-for="(item, index) in routeInfo"
          :key="index"
          class="mx-2 py-3"
          link
          :prepend-icon="item.icon"
          rounded="lg"
          :title="$t(item.value)"
          :to="item.path"
        />
      </div>
      <div class="position-absolute bottom-0">
        <v-list-item
          v-for="(item, index) in preferenceInfo"
          :key="index"
          class="mx-2 py-3"
          link
          :prepend-icon="item.icon"
          rounded="lg"
          :title="$t(item.value)"
          :to="item.path"
        />
        <v-spacer class="my-2" />
      </div>
    </v-navigation-drawer>
    <v-main class="pa-0 ma-5">
      <v-app-bar class="elevation-0 text-primary" color="secondary" prominent>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              class="mx-2 py-3"
              link
              rounded="lg"
            >
              <v-list-item-title>
                <v-icon>mdi-translate</v-icon>
                <span class="ml-2">{{ currentLocale }}</span>
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(locale, index) in locales"
              :key="index"
              @click="changeLocale(locale)"
            >
              <v-list-item-title>{{ locale.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

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
  import { computed, ref } from 'vue';
  import { useLocale } from 'vuetify'
  const { current } = useLocale()
  const title = ref('Nexus Finance');
  const isDrawerOpen = ref(true);

  const routeInfo = ref([
    {
      value: 'snapshot',
      icon: 'mdi-view-dashboard',
      path: '/snapshot',
    },
    {
      value: 'prediction',
      icon: 'mdi-chart-bar',
      path: '/prediction',
    },
    {
      value: 'cashFlow',
      icon: 'mdi-chart-line-variant',
      path: '/cash-flow',
    },
    {
      value: 'assetManager',
      icon: 'mdi-bank',
      path: '/asset-manager',
    },
  ]);

  const preferenceInfo = ref([
    {
      value: 'settings',
      icon: 'mdi-cog',
      path: '/settings',
    },
    {
      value: 'help',
      icon: 'mdi-help-circle',
      path: '/help',
    },
    {
      value: 'about.navigator',
      icon: 'mdi-information',
      path: '/about',
    },
  ]);

  // Language selection
  interface Locale {
    title: string;
    key: string;
  }

  const locales = ref<Locale[]>([
    {
      title: 'English',
      key: 'en',
    },
    {
      title: '繁體中文',
      key: 'zhHant',
    },
  ]);

  const currentLocale = computed(() => {
    const locale = locales.value.find(locale => locale.key === current.value);
    return locale ? locale.title : 'English';
  });

  function changeLocale (locale: Locale) {
    current.value = locale.key;
  }
</script>
<style scoped></style>
