<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title clickable @click="console.log(data)">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-btn
          icon="account_circle"
          :label="data?.email"
          flat
          class="text-lowercase"
        >
          <q-skeleton v-if="!data" type="text" width="100px" />
          <!-- <q-menu fit anchor="bottom right" self="top middle"> -->
          <q-menu fit anchor="bottom right" self="top right">
            <q-menu-profile></q-menu-profile>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view style="max-width: 1024px" class="q-mx-auto q-my-none" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import QMenuProfile from 'src/components/QListProfileMenu.vue';
import { UserEntity } from 'src/entities';
import { getUserClonePromise } from 'src/stores/services/user-store.service';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { QMenuProfile },
  name: 'MainLayout',
  setup() {
    const userStore = useUserStore();
    userStore.synchronizeWithSessionStorage();

    const data = ref(null as UserEntity | null);
    const storePromise = getUserClonePromise();
    storePromise.then((user) => {
      console.log(user);
      data.value = user;
    });

    return { storePromise, data };
  },
  computed: {
    isHomeRoute() {
      // Check if the current route is the home route
      return this.$route.path === '/';
    },
  },
  // mounted() {
  // },
  beforeUnmount() {
    this.storePromise.cancel();
  },
});
</script>
