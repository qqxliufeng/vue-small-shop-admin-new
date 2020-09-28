<template>
  <div class='home-shop-num-container'>
    <span>{{title}}</span><span class="num">{{num}}</span>
  </div>
</template>

<script>

export default {
  name: 'homeShopNum',
  props: {
    num: Number,
    title: String
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.home-shop-num-container
    textStyle(#888, .25)
    padding rem(.1) 0
    .num
        textStyle($orangeColor, .28)
        font-weight bold
</style>
