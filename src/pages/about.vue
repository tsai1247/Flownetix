<template>
  <div class="about-page ma-0 pa-4">
    <h1 class="mb-4">{{ $t('about.title') }}</h1>

    <div class="social-links mb-4">
      <h2 class="text-h6 mb-2">{{ $t('about.copyRight.title') }}</h2>

    </div>

    <div class="license-info text-caption text-disabled">
      <a
        v-for="item in items"
        :key="item.title"
        class="d-inline-block mr-2 social-link"
        :href="item.href"
        rel="noopener noreferrer"
        target="_blank"
        :title="item.title"
      >
        <v-icon
          :icon="item.icon"
          :size="item.icon === '$vuetify' ? 24 : 16"
        />
      </a>
      <span>&copy; 2025-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">tsai1247</span></span>
      <p>
        Licensed under
        <a
          class="text-decoration-none on-surface"
          href="https://github.com/tsai1247/flownetix/blob/main/LICENSE"
          rel="noopener noreferrer"
          target="_blank"
        >
          Apache License 2.0
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const items = [
    {
      title: 'GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/tsai1247/flownetix',
    },
  ]
</script>

<style scoped>
</style>
