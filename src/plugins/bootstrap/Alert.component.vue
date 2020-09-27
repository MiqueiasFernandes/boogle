<template>
  <div
    v-for="(alert, index) in alerts"
    v-bind:key="index"
    :id="alert.id"
    class="text-left alert alert-dismissible fade show"
    :class="'alert-' + alert.color"
    role="alert"
  >
    <strong class="ml-2" v-if="alert.prefix">{{ alert.prefix }}</strong>
    {{ alert.message }}
    <button v-if="alert.btn" class="btn btn-sm" :class="'btn-' + alert.color"
    style="padding-top: .07rem; padding-bottom: .07rem; margin-left: 1em">
      {{ alert.btn }}
    </button>
    <button
      type="button"
      class="close"
      aria-label="Close"
      @click="close(alert.id)"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },

  created() {
    this.alert_queue = [];
    this.$alert_handler(this);
  },

  data: () => ({
    alert_id: "alert-" + Date.now(),
    alerts: [],
    alert_count: 1,
  }),

  methods: {
    show(prefix, message, btn, color = "warning", time = 0) {
      const id = this.alert_id + "-" + this.count++;
      this.alerts.push({ id, color, prefix, message, btn });
      const t = time ? time : this.time;
      if (t && t > 0) {
        setTimeout(() => this.close(id), t * 1000);
      }
    },

    close(id) {
      const elem = document.getElementById(id);
      const instance = new this.$bootstrap.Alert(elem);
      instance.close();
    },
  },
};
</script>