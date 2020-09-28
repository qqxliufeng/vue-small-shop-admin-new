<template>
  <div class="mobile-container">
    <canvas ref="codeCanvas" class="code-canvas"></canvas>
    <p class="title">请使用手机浏览器打开此页面</p>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: '',
  components: {},
  data () {
    return {

    }
  },
  methods: {
    creatQrCode () {
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.codeCanvas, window.location.href, (data) => {
        })
      })
    }
  },
  created () {
    this.creatQrCode()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mobile-container
    display flex
    height 100vh
    justify-content center
    align-items center
    flex-direction column
    .code-canvas
        display block
        width rem(4) !important
        height rem(4) !important
    .title
        textStyle($orangeColor, .32)
</style>
