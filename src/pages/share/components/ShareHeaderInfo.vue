<template>
  <div class='share-header-info'>
    <div class="money-flag">￥</div>
    <div class="money-info">
      <p class="sales" v-if="sales > 0">已售：<i>{{sales}}</i>&nbsp;张</p>
      <p class="money">分享佣金<i>{{goods.price}}</i></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'shareHeaderInfo',
  props: {
    goods: Object
  },
  computed: {
    sales () {
      if (this.goods) {
        if (!this.goods.is_virtual_sales) {
          return 0
        }
        if (this.goods.is_virtual_sales === 0) {
          return this.$utils.common.trasformNum(this.goods.totalSales)
        } else {
          return this.$utils.common.trasformNum(this.goods.virtual_sales)
        }
      } else {
        return 0
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-header-info
    display flex
    flex-direction row
    padding rem(.2)
    border-bottom #f5f5f5 solid 5px
    .money-flag
        color #fff
        border-radius 50%
        font-size rem(.6)
        background-color $orangeColor
        padding rem(.1)
        box-sizing border-box
    .money-info
        display flex
        justify-content space-around
        flex-direction column
        margin-left rem(.2)
        .sales
            textStyle(#333, .3)
        .money
            textStyle(#888, .25)
        & i
            color $orangeColor
</style>
