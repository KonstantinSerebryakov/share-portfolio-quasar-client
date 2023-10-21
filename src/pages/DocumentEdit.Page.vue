<template>
  <q-page class="q-px-md q-pb-md row wrap items-start content-start">
    <div class="col-12 items-stretch row bg-orange">
      <div class="col-12 col-sm-4">
        <q-img src="https://loremflickr.com/300/400" :ratio="3 / 4" class="" />
      </div>
      <div class="col-12 col-sm content-around row">
        <div class="col-12">
          <scalable-text
            value="Konstantin Serebryakov"
            class="text-h1 text-no-wrap non-selectable text-weight-bolder"
          ></scalable-text>
        </div>
      </div>
    </div>
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
