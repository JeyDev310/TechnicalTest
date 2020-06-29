function initialState() {
    return {
        all: [],
        query: {},
        loading: false
    }
}

const getters = {
    data: state => {
        let rows = _.clone(state.all)

        // if (state.query.sort) {
        //     rows = _.orderBy(state.all, state.query.sort, state.query.order)
        // }

        // return rows.slice(state.query.offset, state.query.offset + state.query.limit)
        return rows;
    },
    total:         state => state.all.length,
    loading:       state => state.loading,
}

const actions = {
    fetchData({ commit, state }) {
        commit('setLoading', true)

        axios.get('/api/v1/companies')
            .then(response => {
                commit('setAll', response.data)
            })
            .catch(error => {
                message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    setQuery({ commit }, value) {
        commit('setQuery', purify(value))
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAll(state, items) {
        state.all = items

    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setQuery(state, query) {
        state.query = query
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
