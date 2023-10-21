<template>
  <q-page class="q-px-md q-pb-md row wrap items-start content-start">
    <template v-if="profileList">
      <div
        v-for="profile in profileList"
        :key="profile.id"
        class="col-6 col-xs-4 col-sm-3 q-pa-sm"
      >
        <q-card-document-button-large
          @profileDeleted="handleProfileDeleted"
          :data="profile"
          class="col-sm-3"
        ></q-card-document-button-large>
      </div>
      <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
        <q-card-document-button-large-create
          @profileCreated="handleProfileCreated"
          class="col-sm-3"
        ></q-card-document-button-large-create>
      </div>
    </template>
    <template v-else>
      <div class="col-6 col-xs-4 col-sm-3 q-pa-sm">
        <q-card-document-button-large-skeleton
          class="col-sm-3"
        ></q-card-document-button-large-skeleton>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import QCardDocumentButtonLarge from 'src/components/QCardDocumentButtonLarge.vue';
import QCardDocumentButtonLargeCreate from 'src/components/QCardDocumentButtonLargeCreate.vue';
import QCardDocumentButtonLargeSkeleton from 'src/components/QCardDocumentButtonLargeSkeleton.vue';
import { ProfileEntity } from 'src/entities';
import { ProfileStoreApi } from 'src/services/axios/profile-store-api';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    QCardDocumentButtonLarge,
    QCardDocumentButtonLargeSkeleton,
    QCardDocumentButtonLargeCreate,
  },
  name: 'IndexPage',
  setup() {
    const profileList = ref(null as ProfileEntity[] | null);
    ProfileStoreApi.getProfilesList().then((profiles) => {
      profileList.value = profiles;
    });
    return { profileList };
  },
  methods: {
    handleProfileCreated() {
      this.profileList = null;
      ProfileStoreApi.getProfilesList().then((profiles) => {
        this.profileList = profiles;
      });
    },
    handleProfileDeleted(id: string) {
      if (this.profileList) {
        this.profileList = this.profileList.filter(
          (profile) => profile.id !== id
        );
      }
    },
  },
});
</script>
