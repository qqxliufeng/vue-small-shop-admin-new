<!--
 * @Author: your name
 * @Date: 2019-04-28 14:33:42
 * @LastEditTime: 2020-05-14 12:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop-admin/src/App.vue
 -->
<template>
  <div id="app">
    <div v-if="this.$isMobile() || this.NODE_DEVELOPMENT">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <open-mobile v-else></open-mobile>
    <div class="sperator" v-show="$route.meta.showTab"></div>
    <home-navi v-show="$route.meta.showTab"></home-navi>
  </div>
</template>

<script>
import OpenMobile from 'common/components/open-mobile'
import HomeNavi from './pages/home/components/BottomNavigation'
export default {
  name: 'App',
  components: {
    OpenMobile,
    HomeNavi
  }
}
</script>
<style lang="stylus" scoped>
.sperator
    height $headerHeight
</style>
