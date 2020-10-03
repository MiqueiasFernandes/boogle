import axios from 'axios'
import types from './mutation-types'
import auth_types from '../auth/mutation-types'
import API from '../../shared/api'

const state = ({
    current_user: null,
    usuarios: [
        { id: '001', nome: 'Mikeias', idade: 27 },
        { id: '002', nome: 'Alda', idade: 35 }
    ]
})

const getters = {
    USER_CURRENT: state => state.current_user,
    USER_ALL: state => state.usuarios,
    USER_BY_ID: (state, getters) => (id) => {
        const u = getters.TODOS_USUARIOS.find(u => u.id === id)
        return u;
    }
}

const mutations = {
    [types.ADD_USER](state, payload) {
        payload.id = (payload.idade + '').padStart(3, '0');
        state.usuarios.push(payload)
    },
    [types.CURRENT_USER](state, payload) {
        state.current_user = payload
    }
}

const actions = {

    addUser(context, payload) {
        console.log('register user', context, payload)
        // return axios.post('/api/users/register/', payload)
        //   .then(response => {
        //     if (response.data.status === 210) {
        //       context.commit('setValidationEmail', false)
        //     } else {
        //       context.commit('setValidationEmail', true)
        //       context.commit('login')
        //       context.commit('setProfile', response.data)
        //     }
        //   })
        //   .catch(e => { console.log(e) })
    },

    async getCurrentUser(context, discrete) {
        return axios.get(API.API_USER + '/profile')
            .then(response => {
                context.commit(types.CURRENT_USER, response.data)
                context.commit(auth_types.LOGGED)
            })
            .catch(() => discrete ?
                console.log('faça login para continuar.') :
                context.commit('logout'))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}