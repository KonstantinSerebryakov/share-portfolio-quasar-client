<template>
  <q-card-section class="q-pa-none">
    <q-list class="fit row wrap items-center">
      <q-item
        class="col-12 col-sm-6 q-pa-none q-pt-sm non-selectable"
        inline
        clickable
        style="border-radius: 5px"
        @click="copyToClipboard(getFirstName)"
      >
        <q-item-section>
          <q-item-label overline>Given Name</q-item-label>
          <q-item-label class="text-h5 ellipsis">{{
            getFirstName
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        class="col-12 col-sm-6 q-pa-none q-pt-sm non-selectable"
        inline
        clickable
        style="border-radius: 5px"
        @click="copyToClipboard(getLastName)"
      >
        <q-item-section>
          <q-item-label overline>Family Name</q-item-label>
          <q-item-label class="text-h5 ellipsis">{{
            getLastName
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        class="col-12 q-pa-none q-pt-sm non-selectable"
        inline
        clickable
        style="border-radius: 5px"
        @click="copyToClipboard(getFullDate)"
      >
        <q-item-section>
          <q-item-label overline>Birthday</q-item-label>
          <q-item-label class="text-h5 ellipsis">{{
            getFullDate
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { CredentialEntity } from 'src/entities';
import { copyToClipboardNotify } from 'src/services/utility/copyToClipboardNotify';
import { useProfileStore } from 'src/stores/profile-store';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ProfileCredentialsView',
  setup() {
    const profileStore = useProfileStore();
    const data = ref(CredentialEntity.getEmpty());

    const storePromise = profileStore.credentialClonePromise;
    storePromise.then((credential) => {
      if (credential) {
        data.value = credential;
      }
    });

    return { storePromise, data };
  },
  methods: {
    copyToClipboard(value: string) {
      copyToClipboardNotify(value);
    },
  },
  computed: {
    getFullDate() {
      const str = this.data?.getBirthdayString();
      return str ? str : 'Not Given';
    },
    getFirstName() {
      const str = this.data?.getFirstName();
      return str ? str : 'Not Given';
    },
    getLastName() {
      const str = this.data?.getLastName();
      return str ? str : 'Not Given';
    },
  },
  beforeUnmount() {
    this.storePromise.cancel();
  },
});
</script>
<style scoped>
.hover-underline:hover {
  text-decoration: underline; /* Underline the text on hover */
}
</style>
