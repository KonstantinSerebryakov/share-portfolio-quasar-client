<template>
  <div ref="container">
    <q-resize-observer @resize="onResize" />
    <span ref="text">
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
    const container = ref(null as HTMLElement | null);
    const isScaled = ref(false);
    const baseFontSize = ref(9999999);
    const prevWidth1 = ref(9999999);
    const prevWidth2 = ref(9999999);
    return { text, container, isScaled, baseFontSize, prevWidth1, prevWidth2 };
  },
  methods: {
    onResize({ height, width }: { height: number; width: number }) {
      if (!this.text) return;
      if (!this.container) return;
      if (width === this.prevWidth2) return;
      this.prevWidth2 = this.prevWidth1;
      this.prevWidth1 = width;

      const textWidth = this.text.offsetWidth;
      if (width > textWidth && !this.isScaled) return;
      const scale = width / textWidth;

      const fontSizeStr = window
        .getComputedStyle(this.text, null)
        .getPropertyValue('font-size');
      const fontSize = parseInt(
        fontSizeStr.substring(0, fontSizeStr.length - 2)
      );
      if (!this.isScaled) {
        this.isScaled = true;
        this.baseFontSize = fontSize;
      }

      const newSize = Math.floor(fontSize * scale);
      this.text.style.fontSize = `${Math.max(
        1,
        Math.min(newSize - 1, this.baseFontSize)
      )}px`;
      this.container.style.lineHeight = `${Math.max(
        1,
        Math.min(newSize - 1, this.baseFontSize)
      )}px`;
    },
  },
});
</script>
