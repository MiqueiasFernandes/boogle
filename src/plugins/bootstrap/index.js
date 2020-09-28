import "bootstrap/dist/css/bootstrap.min.css"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"


import Icon from './Icon.component.vue'
import Alert from './Alert.component.vue'
import Dialog from './Dialog.component.vue'
import Toast from './Toast.component.vue'
import Dropdown from './Dropdown.component.vue'

// install: npm install bootstrap@next bootstrap-icons
// icons:   cp node_modules/bootstrap-icons/bootstrap-icons.svg src/assets/
// usage:   main.js => `.use(boostrap)`
// App-Main.vue => `` <Dialog />
//                    <Alert />
//                    <Toast />  ``
// this.$alert( ... ...  => call alert
// this.$dialog( ... ... => show dialog
// this.$toast( ... ...  => display toast

// Alerts       OK
// Badge        OK
// Breadcrumb   CSS
// Buttons      OK
// Button group CSS
// Card         CSS
// Carousel      X
// Close button CSS
// Collapse     --- (complexo)
// Dropdowns     X
// List group   CSS
// Modal        OK
// Navs         --- (complexo)
// Navbar       OK
// Pagination   --- (facil)
// Popovers     OK
// Progress     --- (facil)
// Scrollspy    ---
// Spinners     OK
// Toasts       OK
// Tooltips     OK



export default {
    install(app) {

        app.config.globalProperties.$bootstrap = bootstrap

        //Icon
        app.component("Icon", Icon)

        //Button
        app.directive('btn', {
            mounted(el, b) {
                var type = b.arg || 'primary'
                type = b.modifiers && b.modifiers.outline ? 'outline-' + type : type
                el.className += 'btn btn-' + type
            }
        })

        //Badge
        app.directive('badge', {
            mounted(el, b) {
                const color = 'bg-' + (b.arg || 'primary')
                const type = b.modifiers && b.modifiers.rounded ? 'rounded-pill' : ''
                el.className += ['badge', color, type].join(' ')
            }
        })

        //Tooltip
        app.directive('tooltip', {
            mounted(el, b) {
                if (b.value) {
                    el.title = b.value
                    if (b.arg) {
                        el.setAttribute('data-placement', b.arg)
                    }
                    el.setAttribute('data-container', "body")
                    el.setAttribute('data-toggle', "tooltip")
                    new bootstrap.Tooltip(el);
                }
            }
        })

        //Popover
        app.directive('popover', {
            mounted(el, b) {
                if (b.value) {
                    if (typeof b.value === 'string') {
                        el.setAttribute('data-content', b.value)
                    } else {
                        if (b.value.title) {
                            el.title = b.value.title
                        }
                        if (b.value.content) {
                            el.setAttribute('data-content', b.value.content)
                        }
                    }
                    if (b.arg) {
                        el.setAttribute('data-placement', b.arg)
                    }
                    el.setAttribute('data-container', "body")
                    el.setAttribute('data-toggle', "popover")
                    new bootstrap.Popover(el);
                }
            }
        })

        //Spiner
        app.directive('spiner', {
            mounted(el, b) {
                var type = 'spinner-' + (b.modifiers.grow ? 'grow' : 'border')
                type += b.modifiers.sm ? (' ' + type + '-sm') : ''
                const color = b.arg ? (' text-' + b.arg) : ''
                el.className += type + color
                el.setAttribute('role', "status")
                el.innerHtml = '<span class="sr-only">Loading...</span>'
            }
        })

        //Alert
        app.directive('alert', {
            mounted(el, b) {
                const color = 'alert-' + (b.arg || 'warning')
                el.className += ' alert fade show ' + color
                if (b.modifiers && b.modifiers.closeable) {
                    el.className += ' alert-dismissible'
                    el.innerHTML += ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                }
            }
        })
        app.component("Alert", Alert)
        app.config.globalProperties.$alert_handler = (ac) => this.alert_component = ac;
        app.config.globalProperties.$alert = (prefix, message, btn, color, time) => {
            if (this.alert_component) {
                this.alert_component.show(prefix, message, btn, color, time);
            }
        };

        //Dialog
        app.component("Dialog", Dialog)
        app.config.globalProperties.$dialog_handler = (dc) => this.dialog_component = dc;
        app.config.globalProperties.$dialog = (config, action) => {
            if (this.dialog_component) {
                this.dialog_component.open(config, action);
            }
        };

        //Dropdown
        app.component("Dropdown", Dropdown)

        //Toast
        app.component("Toast", Toast)
        app.config.globalProperties.$toast_handler = (tc) => this.toast_component = tc;
        app.config.globalProperties.$toast = (title, text, detail) => {
            if (this.toast_component) {
                this.toast_component.push(title, text, detail);
            }
        };

        // Helpers
        // Login Dialog
        app.config.globalProperties.$login_dialog = cb => app.config.globalProperties.$dialog(
            {
                width: "20em",
                btn_center: true,
                title: "Login",
                icon: "lock-fill",
                centered: true,
                btns: [
                    {
                        label: "Register",
                        action: "register",
                        color: "info",
                        close: true,
                        icon: "person-plus",
                    },
                    { label: "Login", action: "login", close: true, icon: "power" },
                ],
                form: [
                    {
                        icon: "person-fill",
                        label: "login",
                        placeholder: "user@mail.com",
                        type: "text",
                        label_style:
                            "border-bottom-left-radius: 0 !important; border-bottom: 0 !important;",
                        style:
                            "border-bottom-right-radius: 0 !important; border-bottom: 0 !important;",
                    },
                    {
                        icon: "key",
                        label: "password",
                        placeholder: "•••••",
                        type: "password",
                        style: "border-top-right-radius: 0 !important;",
                        label_style: "border-top-left-radius: 0 !important;",
                    },
                ],
            },
            (action, form) => {
                if (cb) {
                    cb(action, form)
                }
            }
        );
    }
}