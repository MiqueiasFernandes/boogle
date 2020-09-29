import { createStore } from 'vuex'

import UsuarioStore from '@/modules/user/user.store'

export default createStore({
  modules: {
    UsuarioStore
  }
})
