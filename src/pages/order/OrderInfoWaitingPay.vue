<template>
    <div v-if="detail" class="container">
        <order-info-header stateTip="待付款">
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
               <p class="o-i-pay" @click="goPay">立即支付</p>
            </template>
        </order-info-header>
        <order-ticket-money-info :storeInfo="storeInfo">
            <template slot="ticketMoneyDetail" slot-scope="props">
                <div>
                    <p v-for="(item,index) of props.moneyDetail" :key="index" class="o-i-info-money-detail">
                        <span class="span-color-1" :class="{'span-color-3': index == props.moneyDetail.length - 1}">{{item.key}}</span>
                        <span class="span-color-2" :class="{'span-color-4': index == props.moneyDetail.length - 1}">{{item.value}}</span>
                    </p>
                </div>
            </template>
        </order-ticket-money-info>
        <div class="sperator-line"></div>
        <order-info-user-info title="收票人信息" :username="detail.ord_check_taker_name" :phone="detail.ord_check_taker_phone">
        </order-info-user-info>
        <order-info-user-info title="预定须知" :remarks="remarks">
        </order-info-user-info>
        <div class="sperator-line"></div>
        <order-time-info :shopName="detail.shop_name" :outTradeNo="detail.out_trade_no" :remarks="times"></order-time-info>
        <div class="o-i-pay-action-wrapper">
            <span @click="cancelOrder">取消订单</span>
            <span @click="goPay">去支付</span>
        </div>
    </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderTicketMoneyInfo from './components/OrderTicketMoneyInfo'
import orderTicketInfo from './components/OrderTicketInfo'
import orderInfoKeyValue from './components/orderInfoKeyValue'
import orderInfoUserInfo from './components/orderInfoUserInfo'
import OrderTimeInfo from './components/OrderTimeInfo'
import TicketRemark from 'common/components/ticket-remark'
import CountDown from 'common/components/countdown/countdown'
import orderMixin from 'common/mixins/order-mixin'
export default {
  name: 'orderInfoWaitingPay',
  mixins: [orderMixin],
  props: {
    detail: Object
  },
  components: {
    orderInfoHeader,
    orderTicketMoneyInfo,
    orderTicketInfo,
    orderInfoKeyValue,
    orderInfoUserInfo,
    TicketRemark,
    OrderTimeInfo,
    CountDown
  },
  data () {
    return {
      hasDownEnd: false
    }
  },
  computed: {
    releasePayTime () {
      return Math.max(0, (Number(this.detail.timeout_express) - Number(this.detail.time)) * 1000)
    }
  },
  watch: {
    detail (newVal, oldVal) {
      if (newVal.status !== 'PAY_STATUS_NO') {
        this.$router.go(-1)
      }
    }
  },
  methods: {
    countDownEnd () {
      this.hasDownEnd = true
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
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.container >>> .remark-key
    font-size .25rem
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
.o-i-info-money-detail
    overflow hidden
    margin .2rem 0
    line-height .3rem
    & span:nth-child(1)
        float left
    & span:nth-child(2)
        float right
    .span-color-1
        color #888888
        font-size .25rem
    .span-color-2
        color #333333
        font-size .25rem
    .span-color-3
        color #333333
        font-size .28rem
    .span-color-4
        color $orangeColor
        font-size .28rem
.sperator-line
    background-color #f5f5f5
    height .1rem
.o-i-time-contianer
    padding .2rem
.o-i-pay-action-wrapper
    display flex
    border-top .01rem solid #cccccc
    height .8rem
    text-align center
    & span
        flex 1
        display flex
        flex-direction column
        justify-content center
        font-size .3rem
    & span:nth-child(1)
        color #333333
    & span:nth-child(2)
        background-color $orangeColor
        color #ffffff
</style>
