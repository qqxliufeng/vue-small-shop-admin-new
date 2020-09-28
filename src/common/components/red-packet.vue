<template>
  <div class='red-packet-container'>
    <div class="bg" @click="touchDismiss"></div>
    <div class="content">
      <span class="close el-icon-circle-close" @click="close"></span>
      <div class="img-wrapper" @click="open">
        <img :src="redPacketSrc" class="img-red-packet"/>
      </div>
    </div>
  </div>
</template>

<script>
import redPacketSrc from 'images/img_red_pack.png'
export default {
  name: 'redPacket',
  props: {
    canTouchDismiss: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      redPacketSrc
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    open () {
      this.$emit('open')
    },
    touchDismiss () {
      if (this.canTouchDismiss) {
        this.$emit('close')
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.red-packet-container
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    z-index 1001
    .bg
        background #000
        opacity .5
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        z-index 0
    .content
        width 70%
        height 50%
        position relative
        margin 0 auto
        margin-top 15%
        z-index 1
        text-align right
        .close
            width rem(.7)
            height rem(.7)
            text-align center
            color #cccccc
            font-size rem(.7)
            margin-bottom rem(.2)
            margin-right rem(-.5)
        .img-wrapper
            width 150%
            height 100%
            margin-left -25%
            margin-top -10%
            .img-red-packet
                width 100%
                object-fit cover
</style>
