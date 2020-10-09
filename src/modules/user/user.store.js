import axios from 'axios'
import types from './mutation-types'
import auth_types from '../auth/mutation-types'
import API from '../../shared/api'

const state = ({
    current_user: null,
    activated: true,
    usuarios: [],
    permissions: [],
    users: null
})

const getters = {
    USER_CURRENT: state => state.current_user,
    USER_PERM: state => state.permissions,
    USER_LIST: state => state.users,
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
    },
    [types.ACTIVATED](state, payload) {
        state.activated = payload
    },
    [types.SET_ALL_USERS](state, payload) {
        state.users = payload
    },
    [types.PERMISSIONS](state, payload) {
        state.permissions = payload
    },
}

const actions = {

    setPermissions(context, payload) {
        return axios.post(`${API.API_USER}/setpermissions`, payload)
            .then(response => {
                if (response && response.status === 200) {
                    return true
                }
                return false
            })
    },

    getPermissions(context) {
        return axios.get(`${API.API_USER}/permission`)
            .then(response => {
                if (response.status === 200 && response.data && response.data.permissions) {
                    console.log(response.data.permissions)
                    context.commit(types.PERMISSIONS, response.data.permissions)
                    console.log(context.permissions)
                } else {
                    context.commit(types.PERMISSIONS, [])
                }
                
            }).catch(() => context.commit(types.PERMISSIONS, []))
    },

    addUser(context, payload) {
        return axios.post(API.API_USER + '/register/', payload)
            .then(response => {
                if (response) {
                    if (response.status) {
                        if (response.status === 201) {
                            return 201;
                        } else if (response.data && response.data.status) {
                            return response.data.status;
                        }
                        return response.status
                    }
                    return 1
                }
                return 2
            })
    },

    activateUser(context, payload) {
        return axios.post(API.API_USER + '/activate/', payload)
            .then(response => {
                if (response) {
                    if (response.status) {
                        if (response.status === 200) {
                            context.commit(types.ACTIVATED, true)
                        }
                        return response.status
                    }
                    return 1
                }
                return 2
            })
    },

    updateUserPassword(context, payload) {
        return axios.post(API.API_USER + '/password_change/', payload)
            .then(response => {
                if (response) {
                    if (response.status) {
                        if (response.status === 200) {
                            return 'OK'
                        }
                    }
                }
                return null
            })
    },

    updateUserPasswordEmail(context, payload) {
        return axios.post(API.API_USER + '/password_reset/', payload)
            .then(response => {
                if (response) {
                    if (response.status) {
                        if (response.status === 200) {
                            return 'OK'
                        }
                    }
                }
                return null
            })
    },

    async getCurrentUser(context) {
        return axios.get(API.API_USER + '/profile')
            .then(response => {
                context.commit(types.CURRENT_USER, response.data)
                context.commit(auth_types.LOGGED)
            })
            .then(() =>  context.dispatch('getPermissions'))
    },

    async list(context) {
        return axios
            .get(API.API_USER)
            .then(response => context.commit(types.SET_ALL_USERS, response.data))
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}