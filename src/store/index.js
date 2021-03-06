import Vue from 'vue'
import Vuex from 'vuex'
import components from './modules/components'
import index from './modules/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        components,
        index
    },
    strict: debug,
})