<template>
  <q-input
    v-model="inputValue"
    label="Password"
    type="password"
    outlined
    bottom-slots
    class="q-mt-md"
    :error="isShowError"
    :maxlength="32"
  >
    <template v-slot:error> {{ errorMessage }} </template>
  </q-input>
</template>

<script lang="ts">
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
      /*
      This regular expression enforces the following criteria:
      At least one alphabetical character.
      At least one digit.
      At least one special character from @$!%*#?&.
      Minimum length of 8 characters.
      Maximum length of 32 characters.
       */
      const regExp = new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,32}$/
      );
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
      if (this.inputValue.length === 0) {
        message = 'Password should not be empty';
      } else if (this.inputValue.length < 8) {
        message = 'Password should be at least 8 characters';
      } else if (!this.inputValue.match(/[A-Za-z]/)) {
        message = 'Password should include at least 1 letter';
      } else if (!this.inputValue.match(/[0-9]/)) {
        message = 'Password should include at least 1 digit';
      } else if (!this.inputValue.match(/[@$!%*#?&]/)) {
        message = 'Password should include at least 1 special symbol: @$!%*#?&';
      } else if (this.inputValue.length > 32) {
        message = 'Password should not be longer then 32 symbols';
      }

      return message;
    },
  },
});
</script>
