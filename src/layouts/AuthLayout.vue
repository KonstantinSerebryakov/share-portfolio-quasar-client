<template>
  <q-layout view="lhr LpR lfr">
    <!-- <q-page-container
      class=""
      style="
        background-color: rgb(38, 0, 2);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
      "
    > -->
    <div class="particles-container bg-amber">
      <vue-particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        url="/particles.json"
      />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Particles from 'vue3-particles';
import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.
import type { Engine } from 'tsparticles-engine';

export default defineComponent({
  name: 'AuthLayout',

  components: {},

  setup() {
    return {};
  },
  methods: {
    async particlesInit(engine: Engine) {
      await loadFull(engine);
      // await loadSlim(engine);
    },

    async particlesLoaded(container: unknown) {
      console.log('Particles container loaded', container);
    },
  },
});
</script>
<style scoped>
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* Set a negative z-index to position particles behind other content */
}
</style>
