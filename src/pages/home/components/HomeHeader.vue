<template>
<div class='h-header-container'>
  <div class="circle-bg"></div>
  <div class="content-wrapper">
      <div class="face-wrapper">
        <img :src="$utils.image.getImagePath($root.userInfo.state.avatar)">
      </div>
      <span class="nick-name">{{$root.userInfo.state.name}}</span>
      <home-shop-num title="会 员 号：" :num="Number($root.userInfo.state.id)"></home-shop-num>
      <div class="num-wraper">
        <home-shop-num title="店铺粉丝：" :num="amount ? amount.user_num : 0"></home-shop-num>
        <div style="color:#ccc">|</div>
        <home-shop-num title="今日新增：" :num="amount ? amount.today_add : 0"></home-shop-num>
      </div>
      <div class="other-money-wrapper">
        <div class="money-info-wrapper" @click="accountRelease">
          <p class="money-title">账户余额</p>
          <p class="money">￥{{(amount && Number(amount.balance).toFixed(2)) || '0.00'}}</p>
        </div>
        <div class="money-info-wrapper" @click="accountRebate">
          <p class="money-title">账户返利</p>
          <p class="money">￥{{(amount && Number(amount.rebate).toFixed(2)) || '0.00'}}</p>
        </div>
        <div class="money-info-wrapper" @click="willRebate">
          <p class="money-title">预计返利</p>
          <p class="money">￥{{(amount && Number(amount.estimate_rebate).toFixed(2)) || '0.00'}}</p>
        </div>
        <div class="money-info-wrapper">
          <p class="money-title">授信额度</p>
          <p class="money">￥{{(amount && Number(amount.line_of_credit).toFixed(2)) || '0.00'}}</p>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import HomeShopNum from './HomeShopNum'
export default {
  name: 'homeHeader',
  props: {
    amount: Object
  },
  components: {
    HomeShopNum
  },
  data () {
    return {
    }
  },
  methods: {
    myBalance () {
    },
    accountRelease () {
      this.$router.push({name: 'myBalance'})
    },
    accountRebate () {
      this.$router.push({name: 'myRebate'})
    },
    willRebate () {
      this.$router.push({name: 'myRebate'})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-header-container
    // margin-top $headerHeight * 1.5
    height rem(4.2)
    background #74D8C9
    overflow hidden
    position relative
    border-bottom rem(.1) solid #f5f5f5
    z-index 1
    padding-bottom rem(.22)
    .circle-bg
        position absolute
        height 700%
        width  300%
        top 0
        left -100%
        border-radius 50%
        background #ffffff
        margin-top $headerHeight
        border 1px solid #fff
        -webkit-font-smoothing antialiased
        z-index 1
    .content-wrapper
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        display flex
        flex-direction column
        align-items center
        z-index 10
        .face-wrapper
            margin-top rem(.32)
            background #f5f5f5
            height rem(1.2)
            width rem(1.2)
            border-radius 50%
            border 2px solid #ffffff
            overflow hidden
            & img
                width 100%
                height 100%
                object-fit cover
        .nick-name
            normalTextStyle(#333, .32)
        .nick-vip-no
            normalTextStyle(#888, .25)
        .num-wraper
            display flex
            justify-content space-around
            align-items center
            width 100%
            margin-top rem(.2)
        .other-money-wrapper
            font-size rem(.3)
            display flex
            flex-direction row
            margin-top rem(.2)
            width 100%
            .money-info-wrapper
                flex 1
                text-align center
                .money-title
                    color #666
                    font-size rem(.28)
                .money
                    color $primary
                    margin-top rem(.2)
</style>
