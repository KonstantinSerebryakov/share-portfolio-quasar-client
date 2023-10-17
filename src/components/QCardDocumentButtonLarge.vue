<template>
  <!-- https://loremflickr.com/320/240 -->
  <q-card bordered class="q-pa-sm col-sm-3">
    <q-img
      src="https://loremflickr.com/500/500"
      :ratio="16 / 16"
      style="width: 100%"
    />
    <q-card-section class="q-pa-none row wrap items-center row" size="lg">
      <div class="col items-center no-wrap ellipsis">
        <div class="text-h6 ellipsis">Our Planet</div>
        <div class="text-subtitle2 ellipsis">by John Doe</div>
      </div>
      <q-space></q-space>
      <q-btn color="grey-7" round flat icon="more_vert">
        <q-menu cover auto-close>
          <q-list>
            <q-item clickable>
              <q-item-section>Remove Card</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Send Feedback</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Share</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QCardDocumentButtonLarge',
  setup() {
    return {};
  },
  methods: {},
});
</script>
<style scoped></style>
