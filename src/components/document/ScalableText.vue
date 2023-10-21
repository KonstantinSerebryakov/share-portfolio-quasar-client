<template>
  <div class="text-wrapper">
    <q-resize-observer @resize="onResize" />
    <span class="resizable-text" ref="text">
      {{ value }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},
  name: 'ScalableText',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const text = ref(null as HTMLElement | null);
    const initialFontSize = ref(0);
    const initialTextWidth = ref(0);
    return { text, initialFontSize, initialTextWidth };
  },
  methods: {
    onResize({ height, width }: { height: number; width: number }) {
      if (!this.text || !this.initialFontSize) {
        this.$nextTick(() => {
          this.onResize({ height, width });
        });
        return;
      }

      const scaleFactor = width / this.initialTextWidth;

      this.text.style.fontSize = `${scaleFactor * this.initialFontSize}px`;
    },
  },
  mounted() {
    if (this.text) {
      const fontSize = window
        .getComputedStyle(this.text, null)
        .getPropertyValue('font-size');
      const numStr = fontSize.substring(0, fontSize.length - 2);
      this.initialFontSize = parseInt(numStr);
      this.initialTextWidth = this.text.offsetWidth;
    }
  },
});
</script>
