<template>
  <!-- https://loremflickr.com/320/240 -->
  <q-card bordered class="q-pa-sm col-sm-3 row">
    <q-btn class="col-12 q-pa-none" flat @click="handleNavigate">
      <q-img v-bind:src="img" :ratio="16 / 16" style="width: 100%" />
    </q-btn>
    <q-card-section
      class="q-pa-none row wrap items-center row ellipsis col-12"
      size="lg"
    >
      <div class="col items-center no-wrap ellipsis">
        <div class="text-h6 ellipsis">{{ name }}</div>
        <div class="text-subtitle2 ellipsis">{{ subName }}</div>
      </div>
      <q-space />
      <q-btn color="grey-7" round flat icon="more_vert" class="col-fit">
        <q-menu fit auto-close anchor="top right" self="bottom right">
          <q-list>
            <!-- <q-item clickable>
              <q-item-section>Rename</q-item-section>
            </q-item> -->
            <q-item clickable class="" @click="handleDuplicate">
              <q-item-section>Duplicate document</q-item-section>
            </q-item>
            <q-item clickable class="bg-negative" @click="handleDelete">
              <q-item-section>Delete document</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { ProfileEntity } from 'src/entities';
import { ProfileStoreApi } from 'src/services/axios/profile-store-api';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'QCardDocumentButtonLarge',
  props: {
    data: { type: ProfileEntity, required: true },
  },
  setup(props) {
    const profile = props.data;
    const img = ref('https://loremflickr.com/500/500' as string);
    const name = ref('' as string);
    const subName = ref('' as string);

    name.value = profile.essentialInfo?.position ?? 'New Document';
    subName.value = profile.credential?.getFullNameOrEmpty() ?? '';

    return { img, name, subName };
  },
  methods: {
    handleNavigate() {
      this.$router.push(`/document/${this.data.id}`);
    },
    handleDuplicate() {
      //
    },
    handleDelete() {
      ProfileStoreApi.deleteProfile(this.data.id).then((isDeleted) => {
        if (isDeleted) {
          this.$emit('profile-deleted', this.data.id);
        }
      });
    },
  },
});
</script>
<style scoped></style>
