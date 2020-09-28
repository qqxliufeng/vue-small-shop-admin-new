<template>
<div class='l-m-scenic-info' v-if="scenicInfo">
  <div class="a-m-message-scenic-info-wrapper">
    <div class="a-m-message-scenic-info-img-wrapper">
      <img v-lazy="$utils.image.getImagePath(scenicInfo.scenicimages)">
    </div>
    <div class="a-m-message-scenic-info-content-wrapper">
      <p class="title">{{scenicInfo.s_title}}</p>
      <p class="info">{{scenicInfo.mark}}分 | 已售{{$utils.common.trasformNum(scenicInfo.total_sales)}}</p>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'leaveMessageScenicInfo',
  components: {},
  data () {
    return {
      scenicInfo: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.askAnserGetScenicUrl, {
        s_id: this.$route.query.s_id
      }, null, (data) => {
        this.scenicInfo = data.data.scenic
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
.l-m-scenic-info
    .a-m-message-scenic-info-wrapper
        display flex
        .a-m-message-scenic-info-img-wrapper
            height rem(1.3)
            width rem(1.5)
            overflow hidden
            & img
                width 100%
                height 100%
                object-fit cover
                border-radius rem(.1)
        .a-m-message-scenic-info-content-wrapper
            flex 1
            display flex
            flex-direction column
            justify-content space-around
            overflow hidden
            padding-left rem(.2)
            .title
                textStyle(#333, .3)
                ellipsis()
            .info
                textStyle(#888, .28)
</style>
