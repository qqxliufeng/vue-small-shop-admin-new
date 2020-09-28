<template>
  <div class='l-c-container'>
    <my-navi title="登录" :isShowBack="false"></my-navi>
    <el-tabs :stretch="true" v-model="activeName">
      <el-tab-pane label="账号登录" name="first">
        <login></login>
      </el-tab-pane>
      <el-tab-pane label="快捷登录" name="second">
        <fast-login></fast-login>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FastLogin from './FastLogin'
import Login from './login'
export default {
  name: '',
  components: {
    FastLogin,
    Login
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'forgetPassword') {
        vm.activeName = 'first'
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
</style>
