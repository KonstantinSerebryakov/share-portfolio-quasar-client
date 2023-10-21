<template>
  <!-- https://loremflickr.com/320/240 -->
  <q-card bordered class="q-pa-none ellipsis row">
    <q-btn class="ellipsis col-12" flat style="" no-caps @click="handleClick">
      <q-img
        src="https://img.icons8.com/512/add.png"
        :ratio="16 / 16"
        style="width: 100%"
      />
      <!-- <div class="text-h5 ellipsis">Create Profile</div> -->
      <div class="text-h6 ellipsis">Create Profile</div>
    </q-btn>
  </q-card>
</template>

<script lang="ts">
import { ProfileStoreApi } from 'src/services/axios/profile-store-api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QCardDocumentButtonLargeEdit',
  setup() {
    return {};
  },
  methods: {
    handleClick() {
      ProfileStoreApi.createProfile().then((isCreated) => {
        if (isCreated) {
          this.$emit('profile-created');
        }
      });
    },
  },
});
</script>
<style scoped></style>
