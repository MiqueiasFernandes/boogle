<template>
  <div hidden>editar usuario {{ userId }}</div>
</template>

<script>
import { mapGetters } from "vuex";
import GoTo from "@/shared/utils/go.to.router";
import EditDialog from "@/shared/utils/edit.entity.dialog";
import ChangeEntityAlert from "@/shared/utils/change.entity.alert";
import UserMutations from "./mutation-types";

export default {
  props: ["userId"],
  computed: {
    ...mapGetters({
      userById: "BY_ID",
    }),
    novo: (c) => c.userId === "novo",
  },
  mounted() {
    this.user = this.novo ? null : this.userById(this.userId);
    EditDialog.show(
      this,
      this.novo ? "novo User" : "User " + this.user.id,
      this.buildForm(this.novo ? {} : this.user),
      this.novo ? this.createUser : this.editUserByFormm,
      () => GoTo.back(this.$router)
    );
  },
  methods: {
    buildForm(user) {
      return [
        {
          label: "Nome",
          placeholder: "nome",
          id: "nome",
          type: "text",
          value: user.nome,
          validate: (v) => {
            const val = v
            console.log(val)
            return true
          },
          val_text: "Nome esta correto!",
          inval_text: "Nomer ruin!",
        },
        {
          label: "Idade",
          type: "number",
          id: "idade",
          value: user.idade,
          validate: (v) => v && parseInt(v) > 5,
          val_text: "Boa idade",
          inval_text: "muito novo",
        },
      ];
    },
    editUserByFormm(user_data) {
      this.user.nome = user_data.nome;
      this.user.idade = user_data.idade;
      ChangeEntityAlert.alert(this, "User", this.userId, "alterado");
      GoTo.back(this.$router);
    },
    createUser(user_data) {
      this.$store.commit(UserMutations.ADD_USER, user_data);
      ChangeEntityAlert.alert(this, "User", "novo", "criado");
      GoTo.back(this.$router);
    },
  },
};
</script>
