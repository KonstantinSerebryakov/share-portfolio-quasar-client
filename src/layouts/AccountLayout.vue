<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-btn icon="account_circle" :label="email" flat>
          <!-- <q-menu fit anchor="bottom right" self="top middle"> -->
          <q-menu fit anchor="bottom right" self="top right">
            <q-menu-profile></q-menu-profile>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import QMenuProfile from 'src/components/QListProfileMenu.vue';
import { useProfileStore } from 'src/stores/profile-store';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { QMenuProfile },
  name: 'AccountLayout',
  setup() {
    const userStore = useUserStore();
    const email = ref(userStore.$state.user?.email);
    return { email };
  },
  computed: {
    isHomeRoute() {
      // Check if the current route is the home route
      return this.$route.path === '/';
    },
  },
});
</script>
src/stores/profile-store
