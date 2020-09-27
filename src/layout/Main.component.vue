<template>
  <Navbar ref="navbar" />
  <Sidebar ref="sidebar" />
  <div class="container container-nav-fix">
    <Alert />
    <router-view />
  </div>
  <Footer ref="footer" />
</template>

<script>
import Navbar from "./Navbar.component";
import Sidebar from "./Sidebar.component";
import Footer from "./Footer.component";

export default {
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
};
</script>

<style scoped>
.container-nav-fix {
  padding-top: 2.5rem;
}
</style>