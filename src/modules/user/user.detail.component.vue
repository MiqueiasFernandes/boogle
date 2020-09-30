<template>
  <div class="card" v-if="user">
    Home do Usuario id: {{ userId }}
    <table>
      <tr>
        <td>nome</td>
        <td>{{ user.nome }}</td>
      </tr>
      <tr>
        <td>idadae</td>
        <td>{{ user.idade }}</td>
      </tr>
    </table>

    <hr />

    <div class="btn-group" role="group">
      <router-link :to="`${'/user/' + userId + '/edit'}`">
        <button v-btn>Edit</button>
      </router-link>

      <router-link :to="`${'/user/' + userId + '/delete'}`">
        <button v-btn:danger>Delete</button>
      </router-link>
    </div>

    <hr />
  </div>
  <div v-else-if="novo">Criar um novo usuario</div>
  <div v-else>o usuario {{ userId }} nao existe</div>

  <router-view></router-view>

  <button @click="goBack" v-btn>Voltar</button>
</template>

<script>
import { mapGetters } from "vuex";
import GoTo from "@/shared/utils/go.to.router";

export default {
  props: ["userId"],
  computed: {
    ...mapGetters({
      userById: "BY_ID"
    }),
    novo: (c) => c.userId === "novo",
  },
  data: () => ({ user: null }),
  mounted() {
    this.user = this.novo ? this.userById(this.userId) : null;
  },
  methods: {
    goBack() {
      GoTo.back(this.$router);
    },
  },
};
</script>