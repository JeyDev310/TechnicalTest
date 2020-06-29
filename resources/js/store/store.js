import Vue from 'vue'
import Vuex from 'vuex'

import CompaniesIndex from './modules/Companies'
import CompaniesSingle from './modules/Companies/single'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        CompaniesIndex,
        CompaniesSingle,
    },
    strict: debug,
})