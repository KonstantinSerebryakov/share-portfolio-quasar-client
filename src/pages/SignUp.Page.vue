<template>
  <q-page class="auth-page">
    <q-form class="container" @submit="submitRegister">
      <q-card class="auth-card">
        <q-card-section class="q-px-md">
          <div class="text-h6 text-center">Register</div>
          <email-input ref="emailInputRef"> </email-input>
          <password-input ref="passwordInputRef" />
        </q-card-section>
        <q-card-actions align="right" class="q-px-md q-mb-md">
          <q-btn type="submit" label="Register" color="primary" />
        </q-card-actions>
        <div class="text-h7 text-center">
          Already have an account?
          <q-btn
            to="/signin"
            label="Sign In"
            flat
            unelevated
            rounded
            dense
            color="purple"
          />
        </div>

        <q-separator inset spaced size="3px" />
        <div class="text-h7 text-center">OR</div>
        <q-separator inset spaced size="3px" />
      </q-card>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import EmailInput from 'src/components/auth/EmailInput.vue';
import PasswordInput from 'src/components/auth/PasswordInput.vue';
import { IEventPayloadLoginSuccess } from 'src/interfaces/application-event.interface';
import { AuthApi } from 'src/services/axios/auth.api';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SignUpPage',
  components: { EmailInput, PasswordInput },

  setup() {
    const emailInputRef = ref();
    const passwordInputRef = ref();
    const $q = useQuasar();

    const getEmailInputRefInstance = () => {
      return emailInputRef.value as InstanceType<typeof EmailInput> | undefined;
    };
    const getPasswordInputRefInstance = () => {
      return passwordInputRef.value as
        | InstanceType<typeof PasswordInput>
        | undefined;
    };

    const notify = (type: string, message: string) => {
      $q.notify({
        type: type,
        message: message,
      });
    };

    return {
      emailInputRef,
      passwordInputRef,
      getEmailInputRefInstance,
      getPasswordInputRefInstance,
      notify,
    };
  },
  methods: {
    validateForm(
      emailInputRefInstance: InstanceType<typeof EmailInput>,
      passwordInputRefInstance: InstanceType<typeof PasswordInput>
    ): boolean {
      let isValid = true;
      if (!emailInputRefInstance.isValid()) {
        emailInputRefInstance.showError();
        isValid = false;
      }
      if (!passwordInputRefInstance.isValid()) {
        passwordInputRefInstance.showError();
        isValid = false;
      }

      return isValid;
    },
    async submitRegister(event: SubmitEvent | Event) {
      event.preventDefault();

      const emailInputRefInstance = this.getEmailInputRefInstance();
      const passwordInputRefInstance = this.getPasswordInputRefInstance();
      if (!emailInputRefInstance) return;
      if (!passwordInputRefInstance) return;

      if (!this.validateForm(emailInputRefInstance, passwordInputRefInstance))
        return;

      AuthApi.register({
        email: emailInputRefInstance.getValue(),
        password: passwordInputRefInstance.getValue(),
      });
    },
    handleRegisterSuccess(data: unknown) {
      const payload = data as IEventPayloadLoginSuccess;
    },
    mounted() {
      eventBus.on(
        EVENT_APPLICATION.REGISTER_SUCCESS,
        this.handleRegisterSuccess
      );
    },
    unmounted() {
      eventBus.off(
        EVENT_APPLICATION.REGISTER_SUCCESS,
        this.handleRegisterSuccess
      );
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes up the entire viewport height */

  /* Apply background color or other styling */
}

.auth-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.auth-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
