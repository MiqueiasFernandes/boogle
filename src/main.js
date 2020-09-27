import { createApp } from 'vue'
import App from './layout/Main.component'
import router from './plugins/router'
import store from './plugins/store'
import boostrap from './plugins/bootstrap'

const root = createApp(App)
    .use(store)
    .use(router)
    .use(boostrap)
    .mount('#app')

if (root) {
    console.log('\n\
    ██████╗ ██╗      ██████╗  ██████╗  ██████╗ \n\
    ██╔══██╗██║     ██╔═══██╗██╔═══██╗██╔════╝ \n\
    ██████╔╝██║     ██║   ██║██║   ██║██║  ███╗\n\
    ██╔══██╗██║     ██║   ██║██║   ██║██║   ██║\n\
    ██████╔╝███████╗╚██████╔╝╚██████╔╝╚██████╔╝\n\
    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ \n\
                                               \n\
    developed by bio@mikeias.net')
}
