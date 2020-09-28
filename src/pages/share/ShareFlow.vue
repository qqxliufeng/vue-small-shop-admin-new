<template>
  <div class='share-flow-container'>
    <my-navi :isFixed="true" title="分享流程"></my-navi>
    <div class="share-content-wrapper">
      <img src="../../assets/images/img_share_flow.png">
    </div>
  </div>
</template>

<script>

export default {
  name: 'share-flow'
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-flow-container
    position relative
    .share-content-wrapper
        margin-top $headerHeight
        & img
            width 100%
</style>
