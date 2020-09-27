<template>
  <div class="dropdown">
    <button @click="toggle" ref="togglebtn" id="dropdownMenuButton" v-btn>
      Menu
    </button>

    <ul
      ref="menu"
      class="dropdown-menu"
      :class="{ show: opened }"
      aria-labelledby="dropdownMenuButton"
    >
      <li><a class="dropdown-item" href="#" @click="close">Action</a></li>
      <li>
        <a class="dropdown-item" href="#" @click="close">Another action</a>
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="close">Something else here</a>
      </li>
    </ul>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  data: () => ({ instance: null, opened: false }),

  mounted() {
    //setInterval(this.toggle, 5000)
    const elem = this.$refs.togglebtn;
    elem.className += " dropdown-toggle";
    //elem.setAttribute("data-toggle", "dropdown");
    this.instance = new bootstrap.Dropdown(elem);
  },

  methods: {
    toggle() {
      if (this.$refs.menu.className.includes("show")) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      this.$refs.menu.className += "show";
    },
    close() {
      this.$refs.menu.className = this.$refs.menu.className.replace("show", "");
    },
  },
};
</script>