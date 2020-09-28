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
      console.log(this.code)
      this.$http(this.$urlPath.wxLogin, {
        code: this.code
      }, '正在授权登录…', (data) => {
        if (data.code === 1) {
          this.$root.userInfo.setUserInfo(data.data.distributorinfo)
          window.location.href = 'http://www.yixinglvxing.com/distributor_manage'
        } else {
          this.$toast(data.msg)
        }
      }, (errorCode, error) => {
        this.$toast('授权登录失败…')
      })
    }
  },
  mounted() {
    this.code = this.$route.query.code
    this.wxLogin()
  }
}
</script>
