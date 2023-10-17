<template>
  <q-layout view="lhr LpR lfr">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AuthLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>
