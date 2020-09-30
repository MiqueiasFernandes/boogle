
import { ADD_USER } from './mutation-types'


const state = ({
    usuarios: [
        { id: '001', nome: 'Mikeias', idade: 27 },
        { id: '002', nome: 'Alda', idade: 35 }
    ]
})

const getters = {
    TODOS_USUARIOS: state => state.usuarios,
    BY_ID: (state, getters) => (id) => {
        const u = getters.TODOS_USUARIOS.find(u => u.id === id)
        return u;
    }
}

const mutations = {
    [ADD_USER]: (state, payload) => {
        payload.id = (payload.idade + '').padStart(3, '0');
        state.usuarios.push(payload)
    }
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}