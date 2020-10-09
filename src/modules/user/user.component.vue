<template>


<ul>
  <li v-for="p in nperm" :key="p">{{p}}</li>
</ul>


  <div class="d-flex justify-content-between">
    <h1 class="display-6">Usuários</h1>
    <router-link :to="'/user/novo/edit'" append>
      <Button success><Icon name="plus" /> Novo</Button>
    </router-link>
  </div>


<input v-model="perms"/>
<span>{{perms}}</span>
<Button @click="enviar">enviar</Button>


  <ProgressBar
    label
    color="success"
    ref="progessbar"
    @click="$refs.progessbar.setValue((this.v += 20))"
  />

  <table class="table table-sm table-striped table-hover align-middle">
    <caption>
      List of users [1..50] de 300
    </caption>
    <thead class="table-light">
      <tr>
        <th scope="col">
          <Button color="none" sm>Id <Icon name="arrow-down" btn /></Button>
        </th>
        <th>
          <Button color="none" sm>Nome <Icon name="arrow-up" btn /></Button>
        </th>
        <th>
          <Button color="none" sm>Idade <Icon name="arrow-up" btn /></Button>
        </th>
        <th class="center"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(usuario, index) in users" v-bind:key="usuario.id">
        <th scope="row">
          <span v-tooltip:left="index + 1">{{ usuario.email }}</span>
        </th>
        <td>{{ usuario.short_name }}</td>
        <td>{{ usuario.registered_at }}</td>
        <td class="text-right">
          <div class="btn-group" role="group">
            <router-link :to="'/user/' + usuario.id" append
              ><Icon class="btn" name="eye" fill btn /> View</router-link
            >
            <router-link
              :to="'/user/' + usuario.id + '/edit'"
              append
              class="btn"
              ><Icon class="btn" name="pencil" fill btn /> Edit</router-link
            >
            <router-link
              :to="'/user/' + usuario.id + '/delete'"
              append
              class="btn"
              ><Icon class="btn" name="trash" fill btn /> Delete</router-link
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
      users: "USER_LIST",
      nperm: "USER_PERM"
    }),
  },
  data: () => ({ currentPage: 3, v: 2 , perms: ''}),
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('list')
    },
    paginar(page) {
      this.currentPage = page;
    },
    enviar() {
      this.$store.dispatch('setPermissions', {permissions: this.perms}).
      then(r => console.log(r)).catch( console.log('ERRO'))
    }
  },
};
</script>