<template>
  <Toast style="z-index:100"/>
  <Sidebar ref="sidebar" />
  <Navbar ref="navbar" :fixed="nav_fixed" />
  <div
    class="container shadow-sm"
    :class="{ container_nav_fix: nav_fixed, container_nav: !nav_fixed }"
  >
    <Alert />
    <Dialog />
    <router-view />
  </div>
  <Footer ref="footer" />
</template>

<script>
import Navbar from "./Navbar.component";
import Sidebar from "./Sidebar.component";
import Footer from "./Footer.component";

export default {
  data: () => ({ nav_fixed: false }),
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.nav_fixed =
        (document.documentElement.scrollTop || document.body.scrollTop) > 0;
    },
  },
};
</script>

<style scoped>
.container_nav {
  margin-top: 0.3rem;
  padding-top: 2rem;
}
.container_nav_fix {
  margin-top: 2.5rem;
  padding-top: 1rem;
}
</style>