<template>
  <div v-if="!text_muted">
    <span v-if="onLogin">Faça login para continuar ...</span>
    <span v-else-if="onLogout"
      >Aguarde que vc sera redirecionado em breve ...</span
    >
    <span v-else>ERRO innesperado! :(</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({ dialog: null }),
  props: ["text_muted"],
  computed: {
    ...mapGetters({
      success: "IS_AUTH",
    }),
    onLogin: (t) => t.$route.path === "/login",
    onLogout: (t) => t.$route.path === "/logout",
  },
  mounted() {
    if (this.onLogin) {
      this.showDialog();
    }
    if (this.onLogout) {
      this.$sore.dispatch("logout").then(() => this.$router.push("/"));
    }
  },
  methods: {
    loading(status) {
      if (this.dialog) {
        this.dialog.setLoading(status);
      }
    },

    showDialog() {
      this.dialog = this.$login_dialog(this.loginHandler, this.registerHandler);
    },

    loginHandler(form) {
      if (this.dialog && this.dialog.validateForm()) {
        this.loading(true),
          this.$store
            .dispatch("login", { email: form.login, password: form.password })
            .then(this.verify, this.verify);
      }
    },

    registerHandler() {
      this.$router.push("register");
      return "cancel";
    },

    verify() {
      this.loading(false);
      if (this.success) {
        if (this.dialog) {
          this.dialog.close();
        }
        this.$router.push("/");
      } else if (this.dialog) {
        this.dialog.resetValidation();
        this.dialog.notify("Tente nvamente!");
      }
    },
  },
};
</script>