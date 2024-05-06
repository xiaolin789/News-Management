import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {}
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },

    // 控制侧边栏展开
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },

    changeInfo(state, value) {
      // console.log('value',value);
      // state.userInfo = value

      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },

    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ["isCollapsed", "userInfo"] // 控制是否持久化
  })]
})
