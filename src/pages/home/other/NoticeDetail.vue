<template>
  <div class='n-d-container'>
    <my-navi title="公告详情" :isFixed="true"></my-navi>
    <div class="content-wrapper" v-if="noticeInfo">
      <p class="title">{{noticeInfo.title}}</p>
      <p class="time">{{"时间："+noticeInfo.create_time}}</p>
      <p class="content" v-html="noticeInfo.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noticeDetail',
  data () {
    return {
      noticeInfo: null
    }
  },
  mounted () {
    this.$http(this.$urlPath.getMessageDetails, {
      id: this.$route.query.mid
    }, '', (data) => {
      this.noticeInfo = data.data
    }, (errorCode, error) => {
      this.$toast('加载失败')
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.content-wrapper
    padding-top $headerHeight
    .title
        padding rem(.2)
        text-align center
        textStyle(#333, .32)
    .time
        padding rem(.2)
        text-align right
        textStyle(#888, .2)
    .content
        padding rem(.2)
        textStyle(#888, .28)
        line-height rem(.5)
</style>
