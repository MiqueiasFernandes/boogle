<template>
  <svg
    ref="svg"
    :class="'bi' + (color ? ' text-' + color : '')"
    :width="btn ? '20' : size"
    :height="btn ? '20' : size"
    fill="currentColor"
  >
    <use
      :xlink:href="
        require('@/assets/bootstrap-icons.svg') +
        '#' +
        name +
        (fill ? '-fill' : '')
      "
    />
  </svg>
</template>

<script>
export default {
  props: {
    fill: Boolean,
    color: {
      type: String,
    },
    name: {
      type: String,
    },
    size: {
      default: "32",
    },
    btn: Boolean,
  },
  mounted() {
    // new this.$bootstrap.Tooltip(this.$refs.svg, {
    //   container: "body",
    //   placement: "bottom",
    // });
  },
};
</script>