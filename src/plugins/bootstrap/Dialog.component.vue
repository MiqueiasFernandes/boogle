<template>
  <div ref="dialog" class="modal fade" tabindex="-1" aria-hidden="true">
    <div
      class="modal-dialog"
      :class="{ 'modal-dialog-centered': config && config.centered }"
      :style="{ width: config && config.width }"
    >
      <div class="modal-content shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" v-if="config">
            <Icon v-if="config.icon" :icon="config.icon" />
            {{ config.title }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="config">
          <p v-if="config.text">
            {{ config.text }}
          </p>

          <form v-if="config.form" @submit="close('default')" novalidate>
            <div
              :style="input.style_div"
              class="mb-3 input-group"
              v-for="(input, i) in config.form"
              :key="i"
            >
              <span
                v-if="input.icon"
                class="input-group-text"
                :style="input.label_style"
              >
                <Icon :icon="input.icon" :style="input.icon_style"
              /></span>
              <span
                v-else
                class="input-group-text"
                id="addon-wrapping"
                :style="input.label_style"
              >
                {{ input.label }}
              </span>
              <input
                :id="input.id"
                :style="input.style"
                class="form-control"
                :class="{
                  'is-valid': config.form_val && input.val,
                  'is-invalid': config.form_val && !input.val,
                }"
                :type="input.type"
                :placeholder="input.placeholder"
                :aria-label="input.label"
                v-model="input.value"
                :required="input.required"
                aria-describedby="addon-wrapping"
                @keydown.enter="close('default')"
              />
              <div
                v-if="config.form_val && input.val && input.val_text"
                class="valid-feedback"
              >
                {{ input.val_text }}
              </div>
              <div
                v-if="config.form_val && !input.val && input.inval_text"
                class="invalid-feedback"
              >
                {{ input.inval_text }}
              </div>
            </div>
          </form>
        </div>
        <div
          class="modal-footer border-top-0"
          :class="{ btn_center: config.btn_center }"
          v-if="config"
        >
          <button
            v-for="(btn, index) in config.btns"
            v-bind:key="index"
            class="btn"
            :class="'btn-' + btn.color"
            @click="handleBtn(btn)"
          >
            <Icon v-if="btn.icon" :icon="btn.icon" btn />
            {{ btn.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const INTERVAL_INTERDIALOG = 500;

export default {
  created() {
    this.dialog_queue = [];
    this.$dialog_handler(this);
  },
  data: () => {
    return {
      config: undefined,
      action: undefined,
      wait_cancel: false,
      instance: undefined,
    };
  },
  methods: {
    getInstance() {
      if (this.instance) {
        return this.instance;
      }
      const elem = this.$refs.dialog;
      elem.addEventListener("hidden.bs.modal", () => this.close(null, true));
      return (this.instance = new this.$bootstrap.Modal(elem));
    },

    show() {
      this.wait_cancel = true;
      const i = this.getInstance();
      if (i) {
        i.show();
      }
    },

    hide() {
      const i = this.getInstance();
      if (i) {
        i.hide();
      }
    },

    btn(label, action = "none", color = "primary", close = true, icon = "app") {
      return { label, action, color, close, icon };
    },

    btnCancel(label = "Cancel") {
      return this.btn(label, "cancel", "danger", true, "x");
    },

    btnOk(label = "Ok") {
      return this.btn(label, "ok", "primary", true, "check2");
    },

    btnsDefault() {
      return [this.btnCancel(), this.btnOk()];
    },

    parseConfig(config) {
      if (!config || !config.title) {
        console.war("Dialog without config!");
        return null;
      }

      if (!config.cancel) {
        config.cancel = "cancel";
      }

      if (!config.btns) {
        config.btns = this.btnsDefault();
      } else {
        config.btns.forEach((btn) => {
          btn.icon = btn.icon || "app";
          btn.color = btn.color || "primary";
        });
      }

      if (config.form) {
        let val = false;
        config.form.forEach((input) => {
          if (!input.id) {
            input.id = input.label;
          }
          if (!input.label) {
            input.label = input.id;
          }
          val = val || input.validate;
        });
        config.form_validate = val;
      }

      if (!config.events) {
        config.events = [];
      }
      if (!config.text && !config.form) {
        config.text = config.title;
      }
      return config;
    },

    open(config, action) {
      this.enqueue(config, action);
    },

    handleBtn(btn) {
      if (btn.close) {
        this.close(btn.action);
      } else {
        this.sendAction(btn.action);
      }
    },

    sendAction(action) {
      if (this.config) {
        if (this.config.events.includes(action)) {
          this.$emit(action);
        }
        if (this.action && action) {
          this.action(
            action,
            this.config.form
              ? this.config.form.reduce(
                  (o, key) => ({ ...o, [key.id]: key.value }),
                  {}
                )
              : null
          );
        }
      }
    },

    close(action = "close", cancel = false) {
      if (!this.wait_cancel && cancel) {
        // triged by addEventListener .hidden
        this.config = null;
        this.action = null;
        return;
      }
      if (this.config) {
        if (!action) {
          action = this.config.cancel;
        } else if (action !== this.config.cancel) {
          if (
            this.config.form_validate &&
            this.config.form
              .map(
                /// use `map` to test all validators
                /// true if has validate and not validate with current value
                (i) => i.validate && !(i.val = i.validate(i.value))
              )
              .some((v) => v)
          ) {
            this.config.form_val = true;
            return;
          }
        }
      }
      this.wait_cancel = false;
      this.hide();
      this.sendAction(action);
      setTimeout(() => {
        this.config = null;
        this.action = null;
        this.next();
      }, INTERVAL_INTERDIALOG);
    },

    enqueue(config, action) {
      config = this.parseConfig(config);
      if (config) {
        this.dialog_queue.push({ config, action });
        setTimeout(() => {
          if (!this.config && this.dialog_queue.length > 0) {
            this.next();
          }
        }, 200);
      }
    },

    next() {
      if (this.dialog_queue.length > 0 && this.config == null) {
        const data = this.dialog_queue[0];
        this.dialog_queue.splice(0, 1);
        this.config = data.config;
        this.action = data.action;
        this.show();
      }
    },
  },
};
</script>

<style scoped>
.btn_center {
  justify-content: space-evenly;
}
</style>