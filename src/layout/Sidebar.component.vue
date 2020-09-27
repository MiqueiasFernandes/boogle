<template>sidebar works, is {{ opened ? "open" : "close" }}</template>

<script>
export default {
  data: () => ({ opened: false }),
  methods: {
    open() {
      return (this.opened = true);
    },
    close() {
      return (this.opened = false);
    },
    toogle() {
      return (this.opened = this.opened ? this.close() : this.open());
    },
    status() {
      return this.opened;
    },
  },
};
</script>