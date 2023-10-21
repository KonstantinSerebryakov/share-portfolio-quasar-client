<template>
  <div class="text-wrapper">
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
    return { text };
  },
  methods: {
    onResize({ height, width }: { height: number; width: number }) {
      if (!this.text) return;

      const textWidth = this.text.offsetWidth;
      const scale = width / textWidth;

      const fontSizeStr = window
        .getComputedStyle(this.text, null)
        .getPropertyValue('font-size');
      const fontSize = fontSizeStr.substring(0, fontSizeStr.length - 2);
      const newSize = Math.floor(parseInt(fontSize) * scale);
      this.text.style.fontSize = `${newSize - 1}px`;
    },
  },
});
</script>
