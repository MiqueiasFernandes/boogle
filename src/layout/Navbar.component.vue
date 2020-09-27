<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light shadow"
    :class="{
      lg: !fixed,
      'fixed-top': fixed,
      container: !fixed,
    }"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="https://v5.getbootstrap.com/docs/5.0/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        Boogle
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              <Icon icon="house" btn fill />Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user" class="nav-link" active-class="active">
              <Icon icon="people" btn fill />Users
            </router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control mr-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button v-btn:success.outline>
            <Icon icon="search" btn />
          </button>
        </form>
        <button @click="login" v-btn.outline>
          <Icon icon="person" btn />
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    login() {
      this.$login_dialog((a, r) => console.log(a, r));
    },
  },
};
</script>

<style scoped>
.lg {
  height: 5rem;
}
</style>