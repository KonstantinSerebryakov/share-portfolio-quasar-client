<template>
  <q-btn
    v-bind="$attrs"
    label="LogOut"
    icon="logout"
    class="q-ma-xs q-pa-xs"
    @click="handleClick"
  >
    <slot></slot>
  </q-btn>
</template>

<script>
import { removeJWT } from '../../utility/jwtLocalStorage';

export default {
  name: 'QBtnLogout',
  computed: {},
  methods: {
    handleClick() {
      removeJWT();
      this.$router.push('/signin');
    },
  },
};
</script>

<style scoped></style>
