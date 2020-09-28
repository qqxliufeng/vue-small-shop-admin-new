<template>
  <div class='a-s-container'>
    <my-navi title="个人设置"></my-navi>
    <div class="item" @click="accountInfo">
      <span class="title">账号信息</span>
      <span class="el-icon-arrow-right arrow"></span>
    </div>
    <div class="item" @click="authInfo">
      <span class="title">认证信息</span>
      <span class="el-icon-arrow-right arrow"></span>
    </div>
    <div class="logout" @click="logout">
      退出登录
    </div>
    <confirm-dialog content="是否要退出登录？" @dialogConfirm="dialogConfirm" ref="confrimDialog"></confirm-dialog>
  </div>
</template>

<script>
import ConfirmDialog from 'common/components/confirm-dialog'
export default {
  name: '',
  components: {
    ConfirmDialog
  },
  data () {
    return {
    }
  },
  methods: {
    accountInfo () {
      this.$router.push({name: 'personalInfo'})
    },
    authInfo () {
      this.$router.push({name: 'authInfo'})
    },
    logout () {
      this.$refs.confrimDialog.showDialog()
    },
    dialogConfirm () {
      this.$http(this.$urlPath.logoutUrl, {
      }, '正在退出…', (data) => {
        this.$root.userInfo.clearInfoAction()
        this.$router.replace({name: 'login'})
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.item
    border-bottom 1px solid #f5f5f5
    overflow hidden
    padding rem(.3)
    line-height rem(.4)
    .title
        vertical-align middle
    .arrow
        vertical-align middle
        color #888
        float right
        line-height rem(.4)
        font-size rem(.3)
.logout
    border-top 1px solid #f5f5f5
    border-bottom 1px solid #f5f5f5
    line-height $headerHeight
    margin-top rem(1)
    text-align center
    color $primary
</style>
