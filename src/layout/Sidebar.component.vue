<template>
  <Icon
    @click="toggle"
    size="40"
    class="btnToggle bg-light rounded-circle"
    :class="{ fechars: opened }"
    icon="chevron-left"
  />
  <nav class="shadow sidebar bg-light" :class="{ hidden: opened }">
    <div class="container-fluid">
      use info {{ opened }}
      <div class="accordion" id="accordion">
        <div
          class="card"
          v-for="collapse in collapses"
          v-bind:key="collapse.id"
        >
          <div class="card-header" :id="`${'heading' + collapse.id}`">
            <h2 class="mb-0">
              <button
                class="btn btn-block text-left collapsed collapse-menu d-inline-flex align-items-center justify-content-between"
                type="button"
                data-toggle="collapse"
                :data-target="`${'#' + collapse.id}`"
                aria-expanded="false"
                :aria-controls="collapse.id"
                :ref="`${collapse.id + '-btn'}`"
                @click="mudar(collapse)"
              >
                {{ collapse.title }}
                <Icon
                  icon="chevron-down"
                  class="alter"
                  :class="{ opened: collapse.open }"
                />
              </button>
            </h2>
          </div>
          <div
            :ref="collapse.id"
            :id="collapse.id"
            class="collapse show"
            :aria-labelledby="`${'heading' + collapse.id}`"
            data-parent="#accordion"
          >
            <div class="card-body">{{ collapse.text }} {{ collapse.id }}</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    opened: false,
    collapses: "A,B,C,D,E".split(",").map((c, i) => ({
      title: "title" + c,
      text: "text" + c,
      id: "collapse-" + i,
    })),
  }),
  mounted() {
    this.close();
    this.mudar(this.collapses[0]);
  },

  methods: {
    openFirst() {
      setTimeout(() => {
        this.collapses[0].collapse.show();
        this.collapses[0].open = true;
      }, 600);
    },
    hideAll() {
      this.collapses.forEach((c) => {
        c.open = false;
        if (!c.collapse) {
          const el = this.$refs[c.id];
          c.collapse = new this.$bootstrap.Collapse(el);
        }
        c.collapse.hide();
      });
    },
    mudar(collapse) {
      this.hideAll();
      collapse.open =
        "true" ===
        this.$refs[collapse.id + "-btn"].getAttribute("aria-expanded");
      if (!collapse.open) {
        this.openFirst();
      }
    },
    open() {
      return (this.opened = true);
    },
    close() {
      this.opened = false;
      return this.opened;
    },
    toggle() {
      return (this.opened = this.opened ? this.close() : this.open());
    },
    status() {
      return this.opened;
    },
  },
};
</script>

<style scoped>
.hidden {
  right: 0 !important;
}

.fechars {
  transform: rotate(180deg);
  right: 21rem !important;
}

.opened {
  transform: rotate(180deg);
}

.alter {
  transition: transform 0.5s;
}

.sidebar {
  width: 20rem;
  height: 100vh;
  position: fixed;
  z-index: 1029;
  top: 0;
  padding: 6rem 0 0 0.3rem;
  right: -100%;
  transition: right 1s;
}

.btnToggle {
  z-index: 1029;
  transition: all 0.5s;
  position: fixed;
  right: 2rem;
  top: 8rem;
}
</style>