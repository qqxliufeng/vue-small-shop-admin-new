<template>
<div class='h-navigation-container'>
  <span>个人主页</span>
  <div class="message-wrapper" @click="messageClick">
    <span class="iconfont">&#xe60c;</span>
  </div>
</div>
</template>

<script>

export default {
  name: 'homeNavigation',
  components: {},
  data () {
    return {
      showRedNotify: true
    }
  },
  methods: {
    messageClick () {
      this.showRedNotify = false
      this.$router.push({name: 'message'})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-navigation-container
    position fixed
    top 0
    left 0
    right 0
    height $headerHeight
    line-height $headerHeight
    background #74D8C9
    text-align center
    color #fff
    z-index 2
    .message-wrapper
        position absolute
        top 0
        right rem(.25)
        .red-notify
            display inline-block
            position absolute
            top rem(.2)
            right 0
            width rem(.1)
            height rem(.1)
            border-radius 50%
            background red
</style>
