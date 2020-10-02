import axios from 'axios'
import types from './mutation-types'
import auth_state from './auth.state'


const DEV_P = 'http://localhost:8000'

const state = {
    AUTH_STATE: auth_state.UNAUTH
}

const getters = {
    IS_AUTH: state => state.AUTH_STATE === auth_state.AUTHSUCESS
}

const mutations = {
    [types.AUTH](state, new_state) {
        state.AUTH_STATE = new_state
    }
}

const actions = {
    async login(context, payload) {
        context.commit(types.AUTH, auth_state.TRYAUTH)
        return axios.post(DEV_P + '/api/users/login/', payload)
            .then(() => context.commit(types.AUTH, auth_state.AUTHSUCESS))
            .catch(() => context.commit(types.AUTH, auth_state.ERRORAUTH))

    },
    async logout(context) {
        return axios.get(DEV_P + '/api-auth/logout/')
            .then(() => context.commit(types.AUTH, auth_state.UNAUTH))
            .catch(e => { console.log(e) })
    },
    // postRegister(context, payload) {
    //     return axios.post(DEV_P + '/api/users/register/', payload)
    //         .then(response => {
    //             if (response.data.status === 210) {
    //                 context.commit('setValidationEmail', false)
    //             } else {
    //                 context.commit('setValidationEmail', true)
    //                 context.commit('login')
    //                 context.commit('setProfile', response.data)
    //             }
    //         })
    //         .catch(e => { console.log(e) })
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}