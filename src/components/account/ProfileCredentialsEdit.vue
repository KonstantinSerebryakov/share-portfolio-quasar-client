<template>
  <q-form @submit="submitForm">
    <q-card-section>
      <q-list class="fit row wrap items-center">
        <q-item class="col-12 col-md-6 q-pa-none q-pr-sm q-pt-sm" inline>
          <q-input
            v-bind="INPUT_ATTRS"
            label="Given Name"
            v-model="data.firstName"
            :error="isShowFirstNameError"
          >
            <template v-slot:error> {{ firstNameErrorMessage }} </template>
          </q-input>
        </q-item>
        <q-item class="col-12 col-md-6 q-pa-none q-pr-sm q-pt-sm" inline>
          <q-input
            v-bind="INPUT_ATTRS"
            label="Family Name"
            v-model="data.lastName"
            :error="isShowLastNameError"
          >
            <template v-slot:error> {{ lastNameErrorMessage }} </template>
          </q-input>
        </q-item>
        <q-item class="col-12 q-pa-none items-end">
          <div class="text row items-end q-pr-sm">Birthday</div>
          <q-chip
            v-if="isShowBirthdayError"
            dense
            square
            color="red"
            class="q-px-sm q-py-none q-ma-none text-bold text-uppercase ellipsis non-selectable items-end"
            :ripple="false"
          >
            {{ birthdayErrorMessage }}
          </q-chip>
        </q-item>
        <q-item class="col-12 col-md-4 q-pa-none q-pr-sm q-pt-sm">
          <q-select
            v-bind="SELECT_DATE_ATTRS"
            label="Year"
            :options="birth_years"
            v-model="data.birthday.year"
          >
          </q-select>
        </q-item>
        <q-item class="col-12 col-md-4 q-pa-none q-pr-sm q-pt-sm">
          <q-select
            v-bind="SELECT_DATE_ATTRS"
            label="Month"
            :options="months"
            v-model="data.birthday.month"
          >
          </q-select>
        </q-item>
        <q-item class="col-12 col-md-4 q-pa-none q-pr-sm q-pt-sm">
          <q-select
            v-bind="SELECT_DATE_ATTRS"
            label="Day"
            :options="days"
            v-model="data.birthday.day"
          >
          </q-select>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator class="q-mt-md" />
    <q-card-actions align="right">
      <q-btn type="submit">Save</q-btn>
      <q-btn @click="handleCancel">Cancel</q-btn>
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {
  days,
  months,
  birth_years,
  PROFILE_INPUT_MAX_LENGTH,
} from 'src/services/utility/constants';
import { Emitter } from 'mitt';
import { EditableCardEvents } from 'src/components/account/events';
import { CredentialEditEntity, CredentialEntity } from 'src/entities';
import { ProfileStoreApi } from 'src/services/axios/profile-store-api';
import { CredentialValidation } from 'src/services/validation/profile/credential';
import { getCredentialClonePromise } from 'src/stores/profile/profile-store.service';
import { useProfileStore } from 'src/stores/profile-store';

export default defineComponent({
  name: 'ProfileCredentialsEdit',
  props: {
    emitter: {
      type: Object as () => Emitter<EditableCardEvents> | null,
      default: null,
    },
  },
  async setup(props) {
    const profileStore = useProfileStore();
    const data = ref(CredentialEditEntity.getEmpty());
    const profileId = ref('' as string | undefined);

    const storePromise = getCredentialClonePromise();
    storePromise.then((credential) => {
      if (credential) {
        profileId.value = profileStore.$state.data?.id;
        data.value = new CredentialEditEntity(credential);
      }
    });

    const isShowFirstNameError = ref(false);
    const isShowLastNameError = ref(false);
    const isShowBirthdayError = ref(false);

    const isFirstNameValid = CredentialValidation.isFirstNameValid;
    const isLastNameValid = CredentialValidation.isLastNameValid;
    const isBirthdayFilled = CredentialValidation.isBirthdayFilled;
    const isBirthdayValid = (): boolean => {
      const birthday = data.value.birthday;
      if (!isBirthdayFilled(birthday)) return false;
      return birthday.day === null || !!data.value.getBirthdayDate();
    };
    const validate = () => {
      isShowFirstNameError.value = false;
      isShowLastNameError.value = false;
      isShowBirthdayError.value = false;
      let isValid = true;

      isShowFirstNameError.value = !isFirstNameValid(data.value.firstName);
      isValid &&= !isShowFirstNameError.value;
      isShowLastNameError.value = !isLastNameValid(data.value.lastName);
      isValid &&= !isShowLastNameError.value;
      isShowBirthdayError.value = !isBirthdayValid();
      isValid &&= !isShowBirthdayError.value;
      return isValid;
    };

    return {
      storePromise,
      profileId,
      data,
      isShowFirstNameError,
      isShowLastNameError,
      isShowBirthdayError,
      days,
      months,
      birth_years,
      validate,
      validateFirstName: isFirstNameValid,
      validateLastName: isLastNameValid,
      validateBirthday: isBirthdayValid,
    };
  },
  data() {
    return {
      SELECT_DATE_ATTRS: {
        'menu-anchor': 'bottom left',
        'menu-self': 'top left',
        standout: 'bg-grey text-white text-lg',
        'stack-label': true,
        'fill-input': true,
        clearable: true,
        'emit-value': true,
        'map-options': true,
        'hide-bottom-space': true,
        color: 'primary',
        class: 'non-selectable ellipsis',
        style: 'width: 100%;',
        'popup-content-style': 'height:16em; max-height:100vh;',
        'popup-content-class': 'text-bold non-selectable',
      },
      INPUT_ATTRS: {
        standout: 'bg-grey text-white text-lg',
        'stack-label': true,
        'hide-bottom-space': true,
        class: 'text-h6',
        style: 'width: 100%',
      },
    };
  },
  methods: {
    handleCancel() {
      this.exitEditMode();
    },
    exitEditMode() {
      this.emitter?.emit('ExitEdit', '');
    },
    submitForm(event: SubmitEvent | Event) {
      event.preventDefault();
      if (!this.profileId) {
        console.error('unknown profileId');
        return;
      }

      const isValid = this.validate();
      if (!isValid) return;

      const credentialEntity = this.data.getCredentialEntity();
      ProfileStoreApi.updateCredential(this.profileId, credentialEntity).then(
        (isUpdated) => {
          if (isUpdated) {
            this.exitEditMode();
          }
        }
      );
    },
  },
  computed: {
    firstNameErrorMessage() {
      if (!this.isShowFirstNameError) return '';
      if (this.data.firstName.length > PROFILE_INPUT_MAX_LENGTH)
        return `Input length must be less ${PROFILE_INPUT_MAX_LENGTH}`;
      return '';
    },
    lastNameErrorMessage() {
      if (!this.isShowLastNameError) return '';
      if (this.data.lastName.length > PROFILE_INPUT_MAX_LENGTH)
        return `Input length must be less ${PROFILE_INPUT_MAX_LENGTH}`;
      return '';
    },
    birthdayErrorMessage() {
      if (!this.isShowBirthdayError) return '';
      return 'Invalid date';
    },
  },
  mounted() {
    watch(this.data, () => {
      this.isShowFirstNameError = false;
      this.isShowLastNameError = false;
      this.isShowBirthdayError = false;
    });
  },
  beforeUnmount() {
    // this.storePromise.cancel();
  },
});
</script>
<style scoped>
.hover-underline:hover {
  text-decoration: underline; /* Underline the text on hover */
}
</style>
src/stores/profile/profile-store
