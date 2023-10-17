<template>
  <q-input
    v-model="inputValue"
    label="Email"
    type="email"
    outlined
    bottom-slots
    class="q-mt-md"
    :error="isShowError"
  >
    <template v-slot:error> {{ errorMessage }} </template>
  </q-input>
</template>

<script lang="ts">
import { useFormChild } from 'quasar';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'EmailInput',
  setup() {
    const inputValue = ref('');
    const isShowError = ref(false);

    watch(inputValue, (newValue, oldValue) => {
      isShowError.value = false;
      if (newValue.length > 0 && !isValid()) {
        isShowError.value = true;
      }
    });

    const isValid = (): boolean => {
      const regExp = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
      const inputString = inputValue.value.toLowerCase().trim();
      return regExp.test(inputString);
    };

    const isNotEmpty = (): boolean => {
      return inputValue.value.length > 0;
    };

    const getValue = (): string => {
      return inputValue.value.trim();
    };
    const showError = (): void => {
      isShowError.value = true;
    };

    return {
      inputValue,
      isShowError,
      isValid,
      isNotEmpty,
      getValue,
      showError,
    };
  },
  computed: {
    errorMessage() {
      if (!this.isShowError) return '';

      let message = '';
      if (this.isNotEmpty()) {
        message = 'Invalid email';
      } else {
        message = 'Email should not be empty';
      }

      return message;
    },
  },
});
</script>
