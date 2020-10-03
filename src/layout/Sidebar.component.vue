<template>
  <nav class="shadow sidebar bg-light" :class="{ hidden: opened }">
    <div class="container-fluid">
<span v-if="current_user">
      nome: {{ current_user.full_name  }}
      email: {{ current_user.email }}
      <Button>logout</Button>
</span>
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
                  name="chevron-down"
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      is_authenticated: "IS_AUTH",
      current_user: "USER_CURRENT",
    }),
  },

  data: () => ({
    opened: false,
    collapses: "A,B,C".split(",").map((c, i) => ({
      title: "title" + c,
      text: "text" + c,
      id: "collapse-" + i,
    })),
  }),

  mounted() {
    this.close();
    this.mudar(this.collapses[0]);
  },
  watch: {
    current_user(user) {
      if (user) {
        console.log(user)
        this.open();
        setTimeout(this.close, 1000);
      }
    },
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
      if (!this.is_authenticated) {
        return false;
      }
      return (this.opened = true);
    },

    close() {
      return (this.opened = false);
    },

    toggle() {
      this.opened = this.opened ? this.close() : this.open();
      return this.toggle;
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
  transition: transform 0.3s;
}

.sidebar {
  width: 20rem;
  height: 100vh;
  position: fixed;
  z-index: 1029;
  top: 0;
  padding: 6rem 0 0 0.3rem;
  right: -100%;
  transition: right 0.5s;
}
</style>