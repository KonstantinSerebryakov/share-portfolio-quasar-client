<template>
  <q-list class="non-selectable min-width-240">
    <q-item clickable @click="handleDashboardClick">
      <q-item-section avatar dense class="disable-min-width">
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>My Documents</q-item-section>
    </q-item>
    <q-item clickable @click="handleSettingsClick">
      <q-item-section avatar dense class="disable-min-width">
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>Account settings</q-item-section>
    </q-item>
    <q-item clickable @click="handleAboutClick">
      <q-item-section avatar dense class="disable-min-width">
        <q-icon name="info" />
      </q-item-section>
      <q-item-section>About</q-item-section>
    </q-item>
    <q-item clickable @click="handleLogoutClick">
      <q-item-section avatar dense class="disable-min-width">
        <q-icon name="logout" />
      </q-item-section>
      <q-item-section>LogOut</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'QListProfileMenu',
  setup() {
    return {};
  },
  methods: {
    handleDashboardClick() {
      this.$router.push('/');
    },
    handleSettingsClick() {
      this.$router.push('/account');
    },
    handleAboutClick() {
      this.$router.push('/about');
    },
    handleLogoutClick() {
      eventBus.emit(EVENT_APPLICATION.LOGOUT_SUCCESS);
      this.$router.push('/signin');
    },
  },
});
</script>
<style scoped>
.disable-min-width {
  min-width: unset !important;
}
.min-width-240 {
  min-width: 240px;
}
</style>
../utility/jwtLocalStorage ../services/utility/jwtLocalStorage
