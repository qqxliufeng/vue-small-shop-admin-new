<template>
<div class='login-container'>
  <div class="input-container">
      <div>
          <el-input placeholder="请输入手机号" class="user-name" maxlength="11" v-model="userName" clearable />
      </div>
      <div class="input-password-container">
          <el-input placeholder="请输入密码" class="user-password" maxlength="16" v-model="userPassword" type="password" clearable />
          <span class="input-forget-password" @click="forgetPassword">忘记密码</span>
      </div>
      <el-button type="primary" class="input-login" @click="login">登录</el-button>
  </div>
  <el-dialog :visible.sync="showVerifyDialog" modal width="80%">
    <slide-verify
    :w="width"
    @success="onSlideSuccess"
    ref="slideVerfiy"></slide-verify>
  </el-dialog>
</div>
</template>

<script>

export default {
  name: 'login',
  props: {
    backName: Object
  },
  methods: {
    goHome () {
      this.$router.push({name: 'home'})
    },
    onSlideSuccess () {
      if (this.$refs.slideVerfiy) {
        this.$refs.slideVerfiy.reset()
      }
      this.showVerifyDialog = false
      this.$http(this.$urlPath.loginUrl, {
        mobile: this.userName,
        password: this.userPassword
      }, '正在登录…', (data) => {
        if (data.data) {
          this.$root.$data.userInfo.setUserInfo(data.data.distributorinfo)
          this.$router.replace({path: '/'})
        } else {
          this.$toast('登录失败')
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    login () {
      if (!this.userName) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.$utils.validator.isPhone(this.userName)) {
        this.$toast('请输入合法的手机号')
        return
      }
      if (!this.userPassword) {
        this.$toast('请输入密码')
        return
      }
      this.showVerifyDialog = true
    },
    fastLogin () {
      this.$router.push({name: 'fastLogin'})
    },
    forgetPassword () {
      this.$router.push({name: 'forgetPassword'})
    }
  },
  data () {
    return {
      showVerifyDialog: false,
      userName: '',
      userPassword: '',
      width: document.body.clientWidth * 0.8 - 40
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$root.userInfo.isLogin()) {
        vm.$router.replace({name: 'home'})
      }
    })
  },
  mounted () {
    window.onresize = () => {
      this.width = document.body.clientWidth * 0.8 - 40
      if (this.$refs.slideVerfiy) {
        this.$refs.slideVerfiy.reset()
      }
    }
  },
  destroyed () {
    window.onresize = null
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.login-container
    & >>> .slide-verify
        width 100%
    & >>> .slide-verify-slider
        width 100%
    & >>> .el-input__inner
        border 0
        height 30px
        line-height 30px
    .input-container
        margin 1rem .5rem
        position relative
        .user-name
            width 100%
            border: 0 none
            border-bottom: 1px solid #ccc
            border-radius: 0px
            padding-bottom .1rem
            font-size .3rem
        .input-close
            font-size .5rem
            position absolute
            right 0
            top 0
            color #aaaaaa
        .user-password
            font-size .3rem
            width 70%
        .input-password-container
            margin-top .6rem
            border: 0 none
            border-bottom: 1px solid #ccc
            border-radius: 0px
            padding-bottom .1rem
            position relative
            overflow hidden
          .input-forget-password
              position absolute
              right 0
              margin-top .1rem
              margin-right .3rem
              color $primary
              &::before
                  content '|'
                  margin-right .5rem
        .input-login
            background-color $primary
            border 0 none
            width 100%
            margin-top 1rem
            margin-bottom .5rem
        .input-fast-phone
            float left
            font-size .3rem
            color #ccc
        .input-regist
            float right
            font-size .3rem
            color #ccc
</style>
