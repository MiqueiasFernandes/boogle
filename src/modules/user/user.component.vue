<template>
  <h3>Lista de Todos usuarios:</h3>
  <div class="list-group col-6 center">
    <div
      v-for="(usuario, index) in usuarios"
      v-bind:key="index"
      class="list-group-item"
    >
      ({{ usuario.id }}) {{ usuario.nome }} => {{ usuario.idade }}
      <router-link :to="'/usuarios/' + usuario.id" append>View</router-link>
      <span style="margin-right: 10px"></span>
      <router-link :to="'/usuarios/' + usuario.id + '/edit'" append
        >Edit</router-link
      >
      <span style="margin-right: 10px"></span>
      <router-link :to="'/usuarios/' + usuario.id + '/delete'" append
        >Delete</router-link
      >
    </div>
  </div>

  <router-link :to="'/usuarios/novo/edit'" append>
    <button>Novo</button>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      usuarios: "TODOS_USUARIOS",
    }),
  },
};
</script>