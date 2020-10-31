<template>
  <transition name="slide-fade" @before-enter="opacity = 1" @before-leave="opacity = 0">
      <div class='pop-up-container' v-if="showPop" >
        <div class="_mask" @click="showPop = false"></div>
        <div class="_content-wrapper">
          <slot></slot>
        </div>
      </div>
  </transition>
</template>

<script>

export default {
  name: 'popup',
  data () {
    return {
      showPop: false,
      opacity: 0
    }
  },
  methods: {
    open () {
      this.showPop = true
    },
    close () {
      this.showPop = false
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY(-100%)
    opacity 0
.pop-up-container
    position fixed
    top $headerHeight
    bottom 0
    left 0
    right 0
    z-index 9999
    ._mask
        background rgba(0, 0, 0, 0.4)
        opacity 1
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        z-index 99997
    ._content-wrapper
        position absolute
        top 0
        left 0
        width 100%
        min-height rem(3)
        background-color #fff
        z-index 99998
</style>
