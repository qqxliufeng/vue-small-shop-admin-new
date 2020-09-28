<template>
<div class='a-m-message-container'>
  <navi title="我要提问"></navi>
  <div class="a-m-message-content-wrapper">
    <el-card :body-style="{ padding: '.2rem' }" shadow="always">
      <scenic-info></scenic-info>
    </el-card>
    <el-card :body-style="{ padding: '.2rem' }" shadow="always" class="ask-content-card">
      <div class="a-m-message-ask-info-wrapper">
        <div class="ask-title-wrapper">
            <span>问</span>
            <span>我的提问</span>
        </div>
        <textarea cols="30" rows="10" class="ask-content" placeholder="请输入您的问题哦~，最多100字" maxlength="100" v-model="askContent"></textarea>
      </div>
    </el-card>
  </div>
  <div class="a-m-message-submit" @click="submitAsk">发 布</div>
</div>
</template>
<script>
import navi from 'common/components/navigation'
import scenicInfo from './components/LeaveMessageScenicInfo'
export default {
  name: 'askMessage',
  components: {
    navi,
    scenicInfo
  },
  data () {
    return {
      showLoading: false,
      askContent: ''
    }
  },
  methods: {
    submitAsk () {
      if (this.askContent.length < 10) {
        this.$toast('提问的内容至少10个字')
        return
      }
      this.$http(this.$urlPath.askAddUrl, {
        s_id: this.$route.query.s_id,
        content: this.askContent
      }, '正在发布…', (data) => {
        this.$message({
          message: '恭喜, 提问成功~',
          type: 'success'
        })
        this.$router.go(-1)
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
@media (max-height: 400px)
    .a-m-message-submit
        display none
.a-m-message-container
    & >>> .el-dialog__header
        padding 0
    .a-m-message-submit
        position fixed
        left 0
        right 0
        bottom 0
        background-color $primary
        textStyle(#fff, .32)
        text-align center
        line-height $headerHeight
    .a-m-message-content-wrapper
        padding rem(.3)
        .ask-content-card
            margin-top rem(.2)
            .a-m-message-ask-info-wrapper
                .ask-title-wrapper
                    askAnswerWrapper($primary)
                    borderBottom()
                    padding-bottom rem(.2)
                .ask-content
                    border 1px solid #f5f5f5
                    width 100%
                    margin-top rem(.2)
                    background-color #F7F5F5
                    border-radius rem(.1)
                    padding rem(.2)
                    box-sizing border-box
                    display inline-block
</style>
