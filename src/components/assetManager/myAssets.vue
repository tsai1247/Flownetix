<template>
  <v-card class="elevation-1 pa-3 mb-4">
    <v-card-title class=" text-h5 mb-2">
      <div class="d-flex justify-space-between">
        <span>{{ $t('assetManager.myAssets.title') }}</span>
        <v-btn class="text-none" color="blue-accent-4" @click="showDialog = true">
          {{ $t('assetManager.addNewAsset.action') }}
        </v-btn>
        <add-new-asset-dialog v-model="showDialog" @update:assets="updateAssets" />
      </div>
    </v-card-title>
    <v-card-item>
      <v-data-table
        class="elevation-1"
        dense
        :headers="[
          { title: $t('assetManager.myAssets.name'), value: 'name', align: 'start' },
          { title: $t('assetManager.myAssets.type'), value: 'type', align: 'start' },
          { title: $t('assetManager.myAssets.institution'), value: 'institution.name', align: 'start' },
          { title: $t('assetManager.myAssets.balance'), value: 'balance', align: 'end' },
          { title: $t('assetManager.myAssets.lastUpdated'), value: 'last_updated', align: 'start' },
          { title: $t('assetManager.myAssets.actions'), value: 'actions', align: 'end' },
        ]"
        hide-default-footer
        :items="assets"
      >
        <!-- Type-->
        <template #item.type="{ item }">
          <v-chip
            class="ma-1"
            :color="$t(`assetManager.myAssets.assetTypes.${item.type}.color`)"
            size="small"
          >
            {{ $t(`assetManager.myAssets.assetTypes.${item.type}.name`) }}
          </v-chip>
        </template>

        <!-- Balance -->
        <template #item.balance="{ item }">
          <span>{{ item.currency }} {{ Number(item.balance).toLocaleString() }}</span>
        </template>

        <!-- Last Updated -->
        <template #item.last_updated="{ item }">
          <span>{{ dayDiffFormat(item.modi_time) }}</span>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <v-icon class="text-grey-darken-1 mx-1" disabled @click="() => editAsset(item)">mdi-pencil-off</v-icon>
          <v-icon class="text-grey-darken-1 mx-1" @click="() => deleteAsset(item)">mdi-delete</v-icon>
          <v-icon class="text-grey-darken-1 mx-1" @click="() => openInNew(item)">mdi-open-in-new</v-icon>
        </template>
      </v-data-table>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type { Asset } from '../../common/indexedDB';
  import apis from '../../api';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const assets = ref<Asset[]>([]);

  onMounted(() => {
    updateAssets();
  });

  const updateAssets = () => {
    apis.assets.getAll().then((data: Asset[]) => {
      assets.value = data;
    }).catch(error => {
      console.error('Error fetching assets:', error);
    });
  };

  const showDialog = ref(false);

  const editAsset = (item: Asset) => {
    // Logic to edit asset goes here
    console.log('Edit asset:', item);
  };
  const deleteAsset = (item: Asset) => {
    // Logic to delete asset goes here
    apis.assets.remove(item).then(() => {
      updateAssets();
    }).catch(error => {
      console.error('Error deleting asset:', error);
    });
  };
  const openInNew = (item: Asset) => {
    const website = item.institution.website;
    const url = new URL(website);
    window.open(url.href, '_blank');
  };

  const dayDiffFormat = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    const years = Math.floor(diff / 31536000);
    if (years > 0) {
      return `${years} ${t('common.timeDelta.yearsAgo')}`;
    }

    const months = Math.floor(diff / 2592000);
    if (months > 0) {
      return `${months} ${t('common.timeDelta.monthsAgo')}`;
    }

    const days = Math.floor(diff / 86400);
    if (days > 0) {
      return `${days} ${t('common.timeDelta.daysAgo')}`;
    }

    const hours = Math.floor((diff / 3600) % 24);
    if (hours > 0) {
      return `${hours} ${t('common.timeDelta.hoursAgo')}`;
    }

    const minutes = Math.floor((diff / 60) % 60);
    if (minutes > 0) {
      return `${minutes} ${t('common.timeDelta.minutesAgo')}`;
    }

    const seconds = Math.floor(diff % 60);
    if (seconds > 0) {
      return `${seconds} ${t('common.timeDelta.secondsAgo')}`;
    }

    return `${t('common.timeDelta.justNow')}`;
  };

  defineExpose({
    updateAssets,
  });
</script>

<style scoped>
</style>
