<template>
  <div class='o-i-container' v-if="detail">
    <order-info-header :stateTip="title">
        <template slot="headerTitleInfo" >
            <span class="o-i-release-pay-time">
                剩余支付时间：
                <count-down :time="releasePayTime" @end="countDownEnd">
                  <template slot-scope="props">
                      <span class="time-wrapper">
                          {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                      </span>
                  </template>
                </count-down>
            </span>
        </template>
        <template slot="headerBottomInfo">
            <p class="o-i-pay" @click="goPay" v-if="!hasDownEnd">立即支付</p>
            <p v-else class="auto-cancel-tip">订单长时间未支付，已自动取消。</p>
        </template>
    </order-info-header>
    <order-info-content :scenic="detail.scenic" :voucher="detail.voucher" :ticketName="detail.ord_product_name" :ticketNum="detail.ord_ticket_num" :timeLog="detail.order_log"></order-info-content>
    <ticket-notice-wrapper :goodsInfo="detail.goods"></ticket-notice-wrapper>
    <order-business-info :store="detail.store"></order-business-info>
    <order-detail :detail="detail"></order-detail>
    <div class="sperator-3"></div>
    <div class="bottom-action-wrapper">
      <span class="back-top" @click="backTop">
        返回到顶部
      </span>
      <span class="back-money" @click="goPay" v-if="!hasDownEnd">
        立即支付
      </span>
      <span class="comment" @click="cancelOrder" v-if="!hasDownEnd">
        取消订单
      </span>
    </div>
  </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderInfoContent from './components/OrderInfoContent'
import ticketNoticeWrapper from 'common/components/ticket-notice-wrapper'
import orderBusinessInfo from '../components/OrderBusinessInfo'
import orderDetail from './components/OrderDetail'
import orderMixin from 'common/mixins/order-mixin'
import CountDown from 'common/components/countdown/countdown'
export default {
  name: 'orderInfoUse',
  mixins: [orderMixin],
  props: {
    detail: Object
  },
  components: {
    orderInfoHeader,
    orderInfoContent,
    ticketNoticeWrapper,
    orderBusinessInfo,
    orderDetail,
    CountDown
  },
  data () {
    return {
      hasDownEnd: false
    }
  },
  watch: {
    detail (newVal, oldVal) {
      if (newVal.status !== 'PAY_STATUS_NO') {
        this.$router.go(-1)
      }
    }
  },
  computed: {
    releasePayTime () {
      return Math.max(0, (Number(this.detail.timeout_express) - Number(this.detail.time)) * 1000)
    },
    title () {
      return this.hasDownEnd ? '已取消' : '待付款'
    }
  },
  methods: {
    countDownEnd () {
      this.hasDownEnd = true
    },
    backTop () {
      this.$emit('backTop')
    },
    goPay () {
      if (this.releasePayTime === 0 || this.hasDownEnd) {
        this.$toast('订单长时间未支付，已自动取消')
        return
      }
      this.$router.push({name: 'orderInfoPay', query: {no: this.detail.out_trade_no}})
    },
    cancelOrder () {
      let confrim = window.confirm('是否取消此订单？')
      if (confrim) {
        this.$http(this.$urlPath.orderCancel, {
          ord_id: this.detail.ord_id
        }, '正在取消…', (result) => {
          this.$toast('订单取消成功')
          this.$root.$emit('onReload')
          this.$router.go(-1)
        }, (errorCode, error) => {
          this.$toast(error)
        })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-container
    .o-i-release-pay-time
        color #ffffff
        font-size .25rem
        float right
        line-height .3rem
    .o-i-pay
        border .01rem solid #ffffff
        margin 0 auto
        color #ffffff
        text-align center
        padding .2rem 0
        border-radius .1rem
        margin-top .5rem
        font-size .3rem
    .auto-cancel-tip
        color #fff
        margin-top .2rem
        font-size rem(.25)
    .o-i-use-info
        color #eeeeee
        font-size .25rem
        margin-top .2rem
        line-height .3rem
    .after-service-wrapper
        margin-top rem(.2)
        border-radius rem(.08)
        background #ffffff
        opacity .8
        line-height rem(.3)
        padding rem(.2)
        overflow hidden
        color #888
        font-size rem(.25)
        & span:nth-of-type(1)
            float left
        & span:nth-of-type(2)
            float right
    .sperator-1
        background-color #f5f5f5
        height 2px
        width 90%
        margin 0 auto
    .sperator-3
        height $headerHeight
    .bottom-action-wrapper
        overflow hidden
        padding rem(.2)
        box-sizing border-box
        border-top 1px solid #f5f5f5
        background-color #ffffff
        height $headerHeight
        position fixed
        left 0
        right 0
        bottom 0
        font-size rem(.25)
        .back-top
            border-radius rem(.3)
            border 1px solid $primary
            padding rem(.1) rem(.2)
            color $primary
            float left
        .comment
            border-radius rem(.3)
            border 1px solid $primary
            padding rem(.1) rem(.2)
            float right
            color $primary
            margin-right rem(.3)
        .back-money
            border-radius rem(.3)
            background-color $primary
            padding rem(.1) rem(.2)
            float right
            color #fff
</style>
