<template>
  <div class='share-tip-container'>
    <div class="tip" v-if="$isWeiXin">此二维码只能在微信客户端分享</div>
  </div>
</template>

<script>

export default {
  name: 'shareTip',
  components: {},
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-tip-container
    .tip
        height rem(.6)
        line-height rem(.6)
        background-color #eea53a
        text-align center
        color #ffffff
        font-size rem(.25)
        z-index 1
</style>
