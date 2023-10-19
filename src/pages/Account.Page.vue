<template>
  <q-page class="q-px-md q-pb-md row wrap items-start content-start">
    <div class="col-12 col-sm-6 q-pa-sm">
      <account-profile-card>
        <template v-slot:header>Profile credentials</template>
        <template v-slot:content-view>
          <profile-credentials-view></profile-credentials-view>
        </template>
        <template v-slot:content-edit="slotProps">
          <profile-credentials-edit
            :emitter="slotProps.emitter"
          ></profile-credentials-edit>
        </template>
      </account-profile-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountProfileCard from 'src/components/account/AccountProfileCard.vue';
import ProfileCredentialsEdit from 'src/components/account/ProfileCredentialsEdit.vue';
import ProfileCredentialsView from 'src/components/account/ProfileCredentialsView.vue';
import { useProfileStore } from 'src/stores/profile-store';

export default defineComponent({
  components: {
    AccountProfileCard,
    ProfileCredentialsEdit,
    ProfileCredentialsView,
  },
  name: 'AccountPage',
  setup() {
    const profileStore = useProfileStore();
    profileStore.synchronizeDefault();
  },
  methods: {},
});
</script>
