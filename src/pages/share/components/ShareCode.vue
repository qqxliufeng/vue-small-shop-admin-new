<template>
  <div class="info-content-wrapper">
      <div class="post-logo">
          <img src="../../../assets/images/img_logo_icon.png">
      </div>
      <div class="post-info">
        <p class="tip">{{$isWeiXin ? '微信识别二维码' : '长按识别二维码'}}</p>
        <p class="tip tip1">{{tip}}</p>
        <p class="tip tip2">分销号：{{$root.userInfo.state.id}}</p>
      </div>
      <div class="post-code-wrapper">
        <div class="post-code">
          <canvas ref="codeCanvas" class="code-canvas"></canvas>
        </div>
      </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'shareCode',
  props: {
    logo: String,
    url: String,
    tip: {
      type: String,
      default: '即可下单'
    }
  },
  components: {},
  data () {
    return {
    }
  },
  methods: {
    creatQrCode () {
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.codeCanvas, this.url, (data) => {
        })
      })
    }
  },
  mounted () {
    this.creatQrCode()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.info-content-wrapper
    display flex
    width 100%
    box-sizing border-box
    padding rem(.15) rem(.35)
    .post-logo
        width rem(1.5)
        height rem(1.5)
        margin-top rem(.15)
        display flex
        justify-content center
        align-items center
        border-radius 5px
        & img
            width 100%
            height 100%
            object-fit cover
            border-radius 5px
    .post-info
        flex 1
        display flex
        justify-content center
        flex-direction column
        color #333
        font-size rem(.3)
        .icon
            color #EEA53A
            font-size rem(.35)
            margin-right rem(.1)
        .tip
            text-align center
            font-size rem(.32)
        .tip1
            font-size rem(.5)
            font-weight bold
            margin-top rem(.2)
        .tip2
            text-align center
            margin-top rem(.1)
            textStyle(#ddd, .25)
    .post-code-wrapper
        text-align center
        width rem(1.8)
        overflow hidden
        .post-code
            text-align center
            .code-canvas
                width rem(1.8) !important
                height rem(1.8) !important
        & p
            color red
            font-size rem(.25)
</style>
