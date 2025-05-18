<template>
  <v-dialog v-model="showDialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('assetManager.addNewAsset.title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="asset.name"
              dense
              disabled
              label="Asset Name"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="asset.type"
              dense
              disabled
              item-title="text"
              item-value="value"
              :items="assetTypes"
              label="Asset Type"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="asset.balance"
              dense
              label="Asset Balance"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="asset.currency"
              dense
              :items="currencies"
              label="Asset Currency"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="asset.institution"
              dense
              disabled
              item-title="name"
              :items="institutions"
              label="Institution"
              outlined
              required
              return-object
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="showDialog = false">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="updateAsset">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { type Asset, type Institution } from '@/common/indexedDB'
  import { onMounted, ref, watch } from 'vue'
  import apis from '../../../api';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  })

  const emits = defineEmits(['update:modelValue', 'update:assets'])

  const showDialog = ref(false)

  watch(() => props.modelValue, newValue => {
    showDialog.value = newValue
  })

  watch(showDialog, newValue => {
    if (newValue !== props.modelValue) {
      emits('update:modelValue', newValue)
    }
    if (newValue) {
      updateInstitutions();
    }
  })

  const currencies = ref<string[]>([]);
  onMounted(() => {
    apis.common.getCurrencyList().then(data => {
      currencies.value = data;
    })
  })

  const asset = ref<Asset>({
    name: '',
    type: '',
    balance: 0,
    currency: '',
    institution: {
      id: 0,
      name: '',
      website: '',
    } as Institution,
  } as Asset);

  const assetTypes = ref([
    { text: 'Stock', value: 'stock' },
    { text: 'Cash', value: 'cash' },
    { text: 'Crypto', value: 'crypto' },
  ]);

  const institutions = ref<Institution[]>([]);
  const updateInstitutions = () => {
    apis.institutions.getAll().then(data => {
      institutions.value = data;
    });
  }

  const updateAsset = () => {
    if (asset.value.name === '' || asset.value.type === '' || asset.value.balance <= 0 || asset.value.currency === '') {
      alert('Please fill in all fields correctly.');
      return;
    }
    apis.assets.update(asset.value).then(() => {
      showDialog.value = false;
      emits('update:assets');
    }).catch(error => {
      console.error('Error adding new asset:', error);
    });
  }

  const fillAsset = (selectedAsset: Asset) => {
    asset.value = selectedAsset;
  }

  defineExpose({
    fillAsset,
  })
</script>

<style scoped>
</style>
