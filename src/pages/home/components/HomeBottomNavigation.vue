<template>
<div class='h-bottom-navigation-container'>
    <span @click="shareShop">分享小店</span>
    <i class="separator"></i>
    <span>商家中心</span>
    <i class="separator"></i>
    <span @click="logout">退出</span>
    <i class="separator"></i>
    <router-link tag="span" :to="{name: 'customService'}">
      <span>联系客服</span>
    </router-link>
</div>
</template>

<script>
export default {
  name: 'homeBottomNavigation',
  components: {},
  data () {
    return {

    }
  },
  methods: {
    shareShop () {
      this.$router.push({name: 'shareShop'})
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-bottom-navigation-container
    position fixed
    bottom 0
    left 0
    right 0
    height $headerHeight
    background-color #ffffff
    border-top 1px solid #f5f5f5
    display flex
    justify-content space-around
    line-height $headerHeight
    color $primary
    z-index 999
    .separator
        width 1px
        background-color #f5f5f5
        display inline-block
        margin rem(.25) 0
    & span
        flex 1
        text-align center
</style>
