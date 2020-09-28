<template>
<div class='l-m-info-container'>
  <my-navi title="留言板详情" :isFixed="true"></my-navi>
  <div class="content-container" v-if="ask">
      <el-card :body-style="{ padding: '.2rem' }" shadow="always">
        <scenic-info :scenicInfo="scenicInfo"></scenic-info>
        <div class="reply-title-wrapper">
              <span>问</span>
              <span>{{ask.content}}</span>
          </div>
      </el-card>
      <el-card :body-style="{ padding: '.2rem' }" shadow="always" class="ask-content-card" >
          <div class="a-m-message-ask-info-wrapper">
            <div class="ask-title-wrapper">
                <span>答</span>
                <span>共计{{ask.answer.length}}条回复</span>
            </div>
            <ul>
              <li v-for="item of ask.answer" :key="item.aid">
                <div class="item-container">
                  <div class="user-info-container">
                    <img v-lazy="$utils.image.getImagePath(item.avatar)">
                    <span>{{$utils.common.hiddenMobile(item.username)}}</span>
                  </div>
                  <p class="item-content">{{item.answer_text}}</p>
                  <div class="item-info-container">
                    <span class="iconfont l-q-footer-time">&#xe790; {{item.create_time}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </el-card>
  </div>
</div>
</template>

<script>
import scenicInfo from './components/LeaveMessageScenicInfo'
export default {
  name: 'leaveMessageInfo',
  components: {
    scenicInfo
  },
  data () {
    return {
      ask: null,
      scenicInfo: null
    }
  },
  methods: {
    reply () {
      if (this.ask) {
        this.$router.push({name: 'replyMessage', query: {aid: this.ask.aid}, params: {askTitle: this.ask.content, scenicInfo: this.scenicInfo}})
      }
    },
    getData () {
      this.$http(this.$urlPath.askAnswerListUrl, {
        s_id: this.$route.query.s_id,
        aid: this.$route.query.aid
      }, '', (data) => {
        if (data.data) {
          this.ask = data.data.ask
          this.scenicInfo = data.data.scenic
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.l-m-info-container
    padding $headerHeight 0
    .content-container
        padding rem(.3)
      .reply-title-wrapper
          askAnswerWrapper($primary)
          border-top 1px solid #f5f5f5
          padding-top rem(.2)
          margin-top rem(.2)
      .ask-content-card
          margin-top rem(.3)
          .a-m-message-ask-info-wrapper
              .ask-title-wrapper
                  askAnswerWrapper(#EA741F)
                  borderBottom()
                  padding-bottom rem(.2)
          .item-container
              padding rem(.2)
              borderBottom()
              .user-info-container
                  & img
                      width rem(.5)
                      height rem(.5)
                      border-radius 50%
                      vertical-align middle
                  & span
                      margin-left rem(.2)
                      vertical-align middle
              .item-content
                  textStyle(#888, .28)
                  padding rem(.2)
                  line-height rem(.32)
              .item-info-container
                  margin-top rem(.2)
                  overflow hidden
                  .l-q-footer-time
                      color #D0D0D0
                      font-size .25rem
                  .zan
                      float right
                      color $primary
                      font-size .3rem
    .reply
        position fixed
        left 0
        right 0
        bottom 0
        height $headerHeight
        line-height $headerHeight
        background $primary
        color #fff
        text-align center
        font-size rem(.34)
</style>
