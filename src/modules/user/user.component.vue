<template>
  <div class="d-flex justify-content-between">
    <h1 class="display-6">Usuários</h1>
    <router-link :to="'/user/novo/edit'" append>
      <button v-btn:success><Icon icon="plus" /> Novo</button>
    </router-link>
  </div>

  <div class="progress">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      aria-valuenow="100"
      aria-valuemin="0"
      aria-valuemax="100"
      style="width: 100%"
    ></div>
  </div>

  <table class="table table-sm table-striped table-hover align-middle">
    <caption>
      List of users [1..50] de 300
    </caption>
    <thead class="table-light">
      <tr>
        <th scope="col">
          <button v-btn:none.sm>Id <Icon icon="arrow-down" btn /></button>
        </th>
        <th>
          <button v-btn:none.sm>Nome <Icon icon="arrow-up" btn /></button>
        </th>
        <th>
          <button v-btn:none.sm>Idade <Icon icon="arrow-up" btn /></button>
        </th>
        <th class="center"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(usuario, index) in user" v-bind:key="usuario.id">
        <th scope="row">
          <span v-tooltip:left="index + 1">{{ usuario.id }}</span>
        </th>
        <td>{{ usuario.nome }}</td>
        <td>{{ usuario.idade }}</td>
        <td class="text-right">
          <div class="btn-group" role="group">
            <router-link :to="'/user/' + usuario.id" append v-btn.sm
              ><Icon icon="eye" fill btn /> View</router-link
            >
            <router-link
              :to="'/user/' + usuario.id + '/edit'"
              append
              v-btn:secondary.sm
              ><Icon icon="pencil" fill btn /> Edit</router-link
            >
            <router-link
              :to="'/user/' + usuario.id + '/delete'"
              append
              v-btn:danger.sm
              ><Icon icon="trash" fill btn /> Delete</router-link
            >
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
    ref="pagination"
    :pages="10"
    :current="currentPage"
    @page="paginar"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "TODOS_USUARIOS",
    }),
  },
  data: () => ({ currentPage: 3 }),
  methods: {
    paginar(page) {
      this.currentPage = page;
    },
  },
};
</script>