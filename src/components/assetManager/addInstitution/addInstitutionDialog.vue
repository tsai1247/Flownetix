<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('assetManager.addInstitution.title') }}</span>
      </v-card-title>
      <v-card-text>
        <div />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="showDialog = false">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="addInstitution">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
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
  })

  const addInstitution = () => {
    // Logic to add institution goes here
    showDialog.value = false
  }
</script>

<style scoped>
</style>
