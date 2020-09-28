<template>
    <div class='loading-container'>
      <div class="loading-wrapper">
        <span class="el-icon-loading loading-icon"></span>
        <span class="loading-tip">{{loadingTip}}</span>
      </div>
    </div>
</template>

<script>

export default {
  name: 'loading',
  props: {
    loadingTip: {
      type: String,
      default: '正在加载…'
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.loading-container
    position fixed
    top 35%
    left 35%
    bottom 0
    background-color rgba(0,0,0,.5)
    width 30%
    height 0
    padding-bottom 30%
    border-radius rem(.1)
    z-index 2000
    .loading-wrapper
        display flex
        width 100%
        position absolute
        top 0
        right 0
        left 0
        bottom 0
        align-items center
        justify-content center
        flex-direction column
        .loading-icon
            textStyle(#fff, .8)
        .loading-tip
            margin-top rem(.4)
            textStyle(#fff, .3)
</style>
