<template>
  <q-page
    class="q-px-md q-pt-md q-pb-md row wrap items-start content-start bg-blue-1"
  >
    <!-- intro block start -->
    <div
      class="col-12 items-stretch row bg-grey-5 rounded-borders background-image"
      style="background-image: url('https://loremflickr.com/300/400')"
    >
      <q-img
        src="https://loremflickr.com/300/400"
        :ratio="3 / 4"
        class="rounded-borders full-height col-12 col-sm-4 col-md-3"
        style="max-height: calc(100vh - 50px - $space-md)"
      >
        <div v-if="$q.screen.lt.sm" class="absolute-bottom">
          <scalable-text
            value="Konstantin Serebryakov"
            class="text-h1 text-no-wrap non-selectable text-weight-bolder"
          ></scalable-text>
          <scalable-text
            value="JavaScript developer"
            class="text-h5 text-no-wrap non-selectable"
          ></scalable-text>
        </div>
      </q-img>
      <div v-if="$q.screen.gt.xs" class="col-12 col-sm content-around row">
        <div class="col-12">
          <scalable-text
            value="Namee and anawfawfawfaw"
            class="text-h1 text-no-wrap non-selectable text-weight-bolder"
          ></scalable-text>
          <scalable-text
            value="JavaScript developer"
            class="text-h5 text-no-wrap non-selectable text-weight-bolder"
          ></scalable-text>
        </div>
        <div class="col-12"></div>
      </div>
    </div>
    <!-- intro block end -->
    <!-- main description block start -->
    <div class="col-12 items-stretch row bg-grey rounded-borders q-mt-md">
      contacts
    </div>
    <!-- main description block end -->
  </q-page>
</template>

<script lang="ts">
import ScalableText from 'src/components/document/ScalableText.vue';
import { useProfileStore } from 'src/stores/profile-store';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: { ScalableText },
  name: 'DocumentEditPage',
  setup(props, context) {
    const route = useRoute();
    const profileId = route.params.id as string;
    const profileStore = useProfileStore();
    profileStore.synchronizeById(profileId, true);
    return {};
  },
  methods: {
    tmp() {
      console.log(this.$q.screen.gt);
    },
  },
});
</script>
<style scoped>
.background-image {
  background-image: url('path-to-your-image.jpg');
  background-size: cover;
  background-position: center;
}
</style>
