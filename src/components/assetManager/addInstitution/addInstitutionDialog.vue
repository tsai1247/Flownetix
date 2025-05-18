<template>
  <v-dialog v-model="showDialog" max-width="800px" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">{{ $t('assetManager.addInstitution.title') }}</span>
        <v-spacer />
        <v-btn
          icon
          @click="showDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col
              cols="5"
            >
              <v-text-field
                v-model="institution.name"
                counter
                :label="$t('assetManager.addInstitution.name')"
                maxlength="50"
                variant="underlined"
              />
            </v-col>
            <v-col
              class="d-flex justify-center align-center"
              cols="5"
            >
              <v-text-field
                v-model="institution.website"
                counter
                :label="$t('assetManager.addInstitution.website')"
                maxlength="100"
                variant="underlined"
              />
            </v-col>
            <v-col
              class="d-flex justify-center align-center"
              cols="1"
            >
              <v-btn
                color="blue darken-1"
                icon
                size="small"
                @click="addInstitution"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <!-- display all institutions -->
              <v-data-table
                :headers="[
                  { title: $t('assetManager.addInstitution.name'), value: 'name', align: 'start' },
                  { title: $t('assetManager.addInstitution.website'), value: 'website', align: 'start' },
                  { title: $t('assetManager.addInstitution.actions'), value: 'actions', align: 'center' },
                ]"
                :items="institutions"
              >
                <!-- actions -->
                <template #item.actions="{ item }">
                  <v-btn
                    class="mx-2"
                    color="red"
                    icon
                    size="x-small"
                    text
                    @click="deleteInstitution(item)"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>

                  <!-- open in new -->
                  <v-btn
                    class="mx-2"
                    color="primary"
                    icon
                    size="x-small"
                    text
                    @click="openInNew(item)"
                  >
                    <v-icon>
                      mdi-open-in-new
                    </v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { Institution } from '../../../common/indexedDB';
  import apis from '../../../api';
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  })

  const emits = defineEmits(['update:modelValue'])

  const showDialog = ref(false)

  watch(() => props.modelValue, newValue => {
    showDialog.value = newValue
  })

  watch(showDialog, newValue => {
    if (newValue !== props.modelValue) {
      emits('update:modelValue', newValue)
    }
    if (newValue) {
      updateInstitutions()
    }
  })

  const institution = ref<Institution>({
    name: '',
    website: '',
  } as Institution);

  const institutions = ref<Institution[]>([])

  const addInstitution = () => {
    if (institution.value.name === '') {
      return
    }
    apis.institutions.add(institution.value).then(() => {
      institution.value = { name: '', website: '' } as Institution
      updateInstitutions()
    })
  }

  const deleteInstitution = (institution: Institution) => {
    apis.institutions.remove(institution).then(() => {
      updateInstitutions()
    })
  }

  const updateInstitutions = () => {
    apis.institutions.getAll().then((data: Institution[]) => {
      institutions.value = data
    })
  }

  const openInNew = (item: Institution) => {
    const website = item.website;
    const url = new URL(website);
    window.open(url.href, '_blank');
  };
</script>

<style scoped>
</style>
