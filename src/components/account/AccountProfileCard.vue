<template>
  <q-card style="max-width: 600px" bordered class="q-pa-sm">
    <q-card-section class="q-pa-sm row wrap items-center" size="lg">
      <div class="row items-center no-wrap ellipsis">
        <q-icon name="person" size="lg"></q-icon>
        <div class="ellipsis text-h6 text-bold q-mr-md">
          <slot name="header"></slot>
        </div>
      </div>
      <q-space />
      <q-btn
        v-if="!isEditMode"
        inline
        dense
        :ripple="false"
        color="purple"
        class="hover-underline q-px-md q-py-none"
        style=""
        @click="enableEditMode()"
        >Edit</q-btn
      >
    </q-card-section>
    <q-separator />
    <slot v-if="!isEditMode" name="content-view"></slot>
    <Suspense>
      <slot v-if="isEditMode" name="content-edit" :emitter="emitter"></slot>
    </Suspense>
  </q-card>
</template>

<script lang="ts">
import mitt from 'mitt';
import { defineComponent, onMounted, ref } from 'vue';
import { EditableCardEvents } from './events';

export default defineComponent({
  name: 'AccountProfileCard',
  setup() {
    const isEditMode = ref(false);
    const emitter = mitt<EditableCardEvents>();

    return { isEditMode, emitter };
  },
  methods: {
    enableEditMode() {
      this.isEditMode = true;
    },
    disableEditMode() {
      this.isEditMode = false;
    },
  },
  mounted() {
    this.emitter.on('ExitEdit', this.disableEditMode);
  },
  unmounted() {
    this.emitter.off('ExitEdit', this.disableEditMode);
  },
});
</script>
<style scoped>
.hover-underline:hover {
  text-decoration: underline; /* Underline the text on hover */
}
</style>
