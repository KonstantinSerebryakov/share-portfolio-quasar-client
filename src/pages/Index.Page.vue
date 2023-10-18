<template>
  <q-page class="q-px-md q-pb-md row wrap items-start content-start">
    <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
      <q-card-document-button-large
        class="col-sm-3"
      ></q-card-document-button-large>
    </div>
    <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
      <q-card-document-button-large
        class="col-sm-3"
      ></q-card-document-button-large>
    </div>
    <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
      <q-card-document-button-large
        class="col-sm-3"
      ></q-card-document-button-large>
    </div>
    <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
      <q-card-document-button-large
        class="col-sm-3"
      ></q-card-document-button-large>
    </div>
    <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
      <q-card-document-button-large
        class="col-sm-3"
      ></q-card-document-button-large>
    </div>
  </q-page>
</template>

<script lang="ts">
import QCardDocumentButtonLarge from 'src/components/QCardDocumentButtonLarge.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { QCardDocumentButtonLarge },
  name: 'IndexPage',
  setup() {
    return {};
  },
  methods: {},
});
</script>
