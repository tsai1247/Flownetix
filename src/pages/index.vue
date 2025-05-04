<template>
  <div class="text-center justify-center">
    <div class="text-h3 mb-3">{{ $t('home.title') }}</div>
    <div class="text-h5">{{ $t('home.description') }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  // Redirect to the snapshot route
  router.push('/snapshot');
</script>
