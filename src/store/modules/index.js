// initial state
const state = {
  uuid: 1,
  componentList:[
  ],
  code:'',
  //当前操作的项目及文件
  project:{},
  //缩略图预览图资源
  viewImgSrc:'',
}

// getters
const getters = {}

// actions
const actions = {
  //uuid递增
  uuidAdd({ commit }) {
    commit('uuidAdd')
  },
  //设置组件列表
  setComponent({ commit },componentList) {
    commit('setComponent', componentList)
  },
  //添加组件
  addComponent({ commit }, value) {
    commit('addComponent', value)
  },
  //设置源码
  setCode({commit},value){
    commit('setCode',value)
  },
  //当前操作的项目及文件
  setProject({ commit }, value) {
    commit('setProject', value)
  },
  //设置预览图资源
  setViewImgSrc({ commit }, value) {
    console.log(value)
    commit('setViewImgSrc', value)
  },
}

// mutations
const mutations = {
  //uuid递增
  uuidAdd(state) {
    state.uuid += 1
  },
  //设置组件列表
  setComponent(state, componentList){
    state.componentList = [...componentList]
  },
  //添加组件
  addComponent(state, value) {
    state.componentList.push(value)
  },
  //设置源码
  setCode(state,value){
    state.code = value
  },
  //设置当前操作的项目及文件
  setProject(state, value) {
    state.project = {...value}
  },
  //设置预览图资源
  setViewImgSrc(state, value) {
    state.viewImgSrc = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}