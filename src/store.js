import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// create a state to hold all data
const state = {
    currentUser: null
}

// update state data using mutations
const mutations = {
    SET_USER(state, user) {
        state.currentUser = user
    }
}

// create actions for mutations for necessary changes
const actions = {
    setUser(state, user) {
        state.commit('SET_USER', user)
    }
}

// get data from state
const getters = {
    currentUser: state => state.currentUser
}

// create vuex store
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store