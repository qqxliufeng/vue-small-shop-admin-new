import myNavi from './MyNavigation.vue'

const navi = {
  install (Vue) {
    Vue.component('myNavi', myNavi)
  }
}

export default navi
