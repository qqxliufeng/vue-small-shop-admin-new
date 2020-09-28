<template>
   <div :class="[isFixed ? 'navi-fixed' : 'navi-relative','navi-container']">
      <span v-if="isShowBack" class="iconfont navi-back" @click="back">&#xe625;</span>
      <span v-if="isShowTitle" class="navi-title">
          {{title}}
      </span>
      <div class="navi-right-action">
        <slot name="rightAction"></slot>
      </div>
   </div>
</template>
<script>
export default {
  name: 'navi',
  props: {
    title: {
      type: String,
      default: ''
    },
    isRightAction: {
      type: Boolean,
      default: false
    },
    isShowTitle: {
      type: Boolean,
      default: true
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$emit('onBackCallBack')
      this.$router.back()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.navi-container
    height $headerHeight
    line-height $headerHeight
    background-color #f5f5f5
    opacity 1
    text-align center
    font-size .32rem
    top 0
    left 0
    right 0
    z-index 999
    .navi-back
        font-size .4rem
        position absolute
        left 0
        top 0
        margin-left .3rem
    .navi-right-action
        position absolute
        right  0
        top 0
        margin-right .3rem
        font-size .3rem
.navi-relative
    position relative
.navi-fixed
    position fixed
</style>
