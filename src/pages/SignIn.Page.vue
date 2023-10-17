<template>
  <q-page class="window-height">
    <q-form class="window-height container" @submit="submitLogin">
      <q-card class="auth-card">
        <q-card-section class="q-px-md">
          <div class="text-h6 text-center">Login</div>
          <email-input ref="emailInputRef"> </email-input>
          <password-input ref="passwordInputRef" />
        </q-card-section>
        <q-card-actions align="right" class="q-px-md q-mb-md">
          <q-btn type="submit" label="Login" color="primary" />
        </q-card-actions>
        <div class="text-h7 text-center">
          Already have an account?
          <q-btn
            to="/signup"
            label="Sign Up"
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
import EmailInput from 'src/components/auth/EmailInput.vue';
import PasswordInput from 'src/components/auth/PasswordInput.vue';
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import { IEventPayloadLoginSuccess } from 'src/interfaces/application-event.interface';
import { AuthApi } from 'src/services/axios/auth.api';
import { useProfileStore } from 'src/stores/profile-store';

export default defineComponent({
  name: 'SignInPage',
  components: { EmailInput, PasswordInput },

  setup() {
    const emailInputRef = ref();
    const passwordInputRef = ref();
    const profileStore = useProfileStore();
    const userStore = useUserStore();

    const getEmailInputRefInstance = () => {
      return emailInputRef.value as InstanceType<typeof EmailInput> | undefined;
    };
    const getPasswordInputRefInstance = () => {
      return passwordInputRef.value as
        | InstanceType<typeof PasswordInput>
        | undefined;
    };

    return {
      emailInputRef,
      passwordInputRef,
      profileStore,
      userStore,
      getEmailInputRefInstance,
      getPasswordInputRefInstance,
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
    navigateToApplication() {
      const query = this.$router.currentRoute.value.query;
      const path = query.prev?.toString() ?? '/';
      this.$router.push(path);
    },
    async submitLogin(event: SubmitEvent | Event) {
      event.preventDefault();

      const emailInputRefInstance = this.getEmailInputRefInstance();
      const passwordInputRefInstance = this.getPasswordInputRefInstance();
      if (!emailInputRefInstance) return;
      if (!passwordInputRefInstance) return;

      if (!this.validateForm(emailInputRefInstance, passwordInputRefInstance))
        return;

      AuthApi.login({
        email: emailInputRefInstance.getValue(),
        password: passwordInputRefInstance.getValue(),
      });
    },
    handleLoginSuccess(data: unknown) {
      const payload = data as IEventPayloadLoginSuccess;
      this.navigateToApplication();
    },
  },
  mounted() {
    eventBus.on(EVENT_APPLICATION.LOGIN_SUCCESS, this.handleLoginSuccess);
  },
  unmounted() {
    eventBus.off(EVENT_APPLICATION.LOGIN_SUCCESS, this.handleLoginSuccess);
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes up the entire viewport height */
}

.auth-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
