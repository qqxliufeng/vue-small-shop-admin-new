<template>
  <div class=''></div>
</template>

<script>

export default {
  name: 'auth',
  components: {},
  data() {
    return {
      code: ''
    }
  },
  methods: {
    wxLogin() {
      this.$http(this.$urlPath.wxLogin, {
        code: this.code
      }, '正在授权登录…', (data) => {
        if (data.code === 1) {
          this.$root.userInfo.setUserInfo(data.data.distributorinfo)
          window.location.href = this.$urlPath.baseAddress
        } else {
          this.$toast(data.msg)
        }
      }, (errorCode, error) => {
        if (error === '账号不存在或未绑定微信') {
          window.location.href = this.$urlPath.baseAddress + '/#/login'
        } else {
          this.$toast('授权登录失败…')
        }
      })
    },
    bindWX() {
      this.$http(this.$urlPath.bindWX, {
        code: this.code
      }, '正在绑定微信…', (data) => {
        if (data.code === 1) {
          this.$root.userInfo.setUserInfo(data.data.distributorinfo)
          window.location.href = this.$urlPath.baseAddress
        } else {
          this.$toast(data.msg)
        }
      }, (errorCode, error) => {
        this.$toast('绑定微信失败…')
      })
    }
  },
  mounted() {
    this.code = this.$route.query.code
    if (this.$root.userInfo.state.token) {
      this.bindWX()
    } else {
      this.wxLogin()
    }
  }
}
</script>
