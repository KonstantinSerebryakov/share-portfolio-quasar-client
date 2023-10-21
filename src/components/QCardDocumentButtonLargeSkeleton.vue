<template>
  <q-card bordered class="q-pa-sm col-sm-3">
    <q-responsive :ratio="16 / 16">
      <q-skeleton width="100%"> </q-skeleton>
    </q-responsive>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QCardDocumentButtonLargeSkeleton',
  setup() {
    return {};
  },
  methods: {},
});
</script>
<style scoped></style>
