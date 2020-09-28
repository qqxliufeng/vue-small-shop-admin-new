<template>
<div class='m-b-balance-container'>
  <div class="header-container">
    <div class="navigation">
      <span class="iconfont navi-back" @click="back">&#xe625;</span>
      <span class="details" @click="rebateDetail">明细</span>
    </div>
    <div class="balance-container" v-if="info">
      <p class="balance">￥{{Number(info.now_rebate).toFixed(2) || '0.00'}}</p>
      <p class="balance-tip">当前返利</p>
      <div class="balance-wrapper">
        <div @click="rebateDetail">
          <p class="total-money">￥{{Number(info.rebate_total).toFixed(2)}}</p>
          <p class="total-tip">累计返利</p>
        </div>
        <span class="sperator"></span>
        <div @click="rebateDetail">
          <p class="total-money">￥{{Number(info.estimate_rebate_total).toFixed(2)}}</p>
          <p class="total-tip">预计返利</p>
        </div>
      </div>
    </div>
  </div>
  <div class="recharge-wrapper" @click="rebateToBalance">
    <img v-webp="rechargeIcon" class="img">
    <span class="tip">返利转余额</span>
    <span class="el-icon-arrow-right right-arrow"></span>
  </div>
  <p class="question" @click="balanceQuestion">常见问题<span class="el-icon-question"></span></p>
</div>
</template>

<script>
import rechargeIcon from 'images/img_charge_icon.png'
export default {
  name: 'myRebate',
  components: {},
  data () {
    return {
      rechargeIcon,
      info: null
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    rebateDetail () {
      this.$router.push({name: 'rebateList'})
    },
    rebateToBalance () {
      this.$router.push({name: 'rebateToBalance'})
    },
    balanceQuestion () {
      // 返利常见问题
      this.$router.push({name: 'protocol', params: {title: '常见问题', qtype: 1}})
    },
    getData () {
      this.$http(this.$urlPath.rebateStatistics, {}, '', (data) => {
        this.info = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.m-b-balance-container
    position relative
    height 100vh
    .header-container
        background #74D8C9
        .navigation
            height $headerHeight
            line-height $headerHeight
            .navi-back
                float left
                color #ffffff
                width rem(.5)
                padding-left rem(.2)
                box-sizing border-box
            .details
                textStyle(#ffffff, .3)
                float right
                margin-right rem(.2)
        .balance-container
            .balance
                textStyle(#fff, .6)
                text-align center
                margin rem(.2) 0
            .balance-tip
                textStyle(#fff, .25)
                text-align center
            .balance-wrapper
                display flex
                flex-direction row
                justify-content space-around
                align-items center
                height rem(1.5)
                margin-top rem(.4)
                .total-money
                    textStyle(#fff, .32)
                    text-align center
                    margin rem(.15) 0
                .total-tip
                    textStyle(#fff, .25)
                    text-align center
                .sperator
                    display inline-block
                    width rem(.03)
                    height 40%
                    background #f5f5f5
    .recharge-wrapper
        height $headerHeight
        borderBottom()
        line-height $headerHeight
        padding 0 rem(.2)
        .img
            width rem(.4)
            height rem(.4)
        .tip
            textStyle(#333, .3)
            vertical-align middle
            margin-left rem(.3)
        .right-arrow
            float right
            line-height $headerHeight
            color #888
    .question
        position absolute
        left 0
        right 0
        text-align center
        bottom rem(.5)
        textStyle(#888, .3)
        & span
            margin-left rem(.2)
</style>
