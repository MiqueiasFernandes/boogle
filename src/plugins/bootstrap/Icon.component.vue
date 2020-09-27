<template>
  <svg ref="svg"
    :class="'bi' + (color ? ' text-' + color : '')"
    :width="btn ? '20' : size"
    :height="btn ? '20' : size"
    fill="currentColor"
  >
    <use
      :xlink:href="
        require('@/assets/bootstrap-icons.svg') +
        '#' +
        icon +
        (fill ? '-fill' : '')
      "
    />
  </svg>
</template>

<script>
export default {
  props: {
    icon: String,
    fill: Boolean,
    color: {
      type: String,
    },
    size: {
      default: '32'
    },
    btn: Boolean
  },
};
</script>