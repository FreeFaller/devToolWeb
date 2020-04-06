// initial state
const state = {
  uuid:5,
  componentList:[
    
  ],
  address:'',
  code:''
}

// getters
const getters = {}

// actions
const actions = {
  //uuid递增
  uuidAdd({ commit }){
    commit('uuidAdd')
  },
  //设置组件列表
  setComponent({ commit },componentList) {
    commit('setComponent', componentList)
  },
  //变更文件地址
  editAddress({commit},value){
    commit('editAddress', value)
  },
  //设置源码
  setCode({commit},value){
    commit('setCode',value)
  }
}

// mutations
const mutations = {
  //uuid递增
  uuidAdd(state){
    state.uuid += 1
  },
  //设置组件列表
  setComponent(state, componentList){
    state.componentList = [...componentList]
  },
  //变更文件地址
  editAddress(state,value){
    state.address = value
  },
  //设置源码
  setCode(state,value){
    state.code = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}