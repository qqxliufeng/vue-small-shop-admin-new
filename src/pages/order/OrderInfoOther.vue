<template>
    <div v-if="detail">
      <order-info-header :stateTip="stateModel.stateTip">
            <template slot="headerTitleInfo">
                <p class="o-i-use-info">
                    {{stateModel.discription}}
                </p>
            </template>
            <template slot="headerBottomInfo" v-if="detail.refund_mark !== 0">
                <div class="after-service-wrapper">
                    <span>退款记录：{{detail.refund_count}}</span>
                    <span @click="orderBackProgress">查看进度></span>
                </div>
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
        <order-ticket-info v-for="item of detail.voucher" :key="item.v_id" :itemInfo="item" :ticketName="detail.ord_product_name" :refundNum="detail.refund_num">
        </order-ticket-info>
        <div class="sperator-line"></div>
        <order-info-user-info title="收票人信息" :username="detail.ord_check_taker_name" :phone="detail.ord_check_taker_phone">
        </order-info-user-info>
        <order-info-user-info title="预定须知" :remarks="remarks">
        </order-info-user-info>
        <div class="sperator-line"></div>
        <order-time-info :shopName="detail.shop_name" :outTradeNo="detail.out_trade_no" :remarks="times"></order-time-info>
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
import orderStep from './components/OrderStep'
import calander from 'common/components/calendar/calendar.vue'
import orderMixin from 'common/mixins/order-mixin'
export default {
  name: 'orderInfoWaitingUse',
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
    OrderTimeInfo,
    TicketRemark,
    orderStep,
    calander
  },
  data () {
    return {
      stateModel: {}
    }
  },
  watch: {
    detail (newVal, oldVal) {
      if (newVal) {
        switch (newVal.status) {
          case 'USE_STATUS_OFF': // 被取消
            this.stateModel.stateTip = '已取消'
            this.stateModel.discription = '订单已经取消，如有需要请重新下单购买'
            break
          case 'USE_STATUS_EXPIRD': // 已过期
            this.stateModel.stateTip = '已过期'
            this.stateModel.discription = '订单已经过期，如有需要请重新下单购买'
            break
          case 'NO_COMMENT':
          case 'ALREADY_COMMENT': // 已经评价
            this.stateModel.stateTip = '已完成'
            this.stateModel.discription = '感谢您的本次消费，订单已经完结'
            break
          case 'USE_STATUS_REVOKE': // 已退款
            this.stateModel.stateTip = '退款/售后'
            this.stateModel.discription = '您的订单有退款申请，请及时查看'
            break
          case 'USE_STATUS_NO':
            this.stateModel.stateTip = '待使用'
            this.stateModel.discription = '产品已出票，请尽快使用产品'
            break
          // case 'PAY_STATUS_YES': // 已支付
          //   this.stateTip = '已支付'
          //   break
          // case 'PAY_STATUS_PARTIAL_REFUND': // 部分退款
          //   this.stateTip = '退款/售后'
          //   break
          // case 'PAY_STATUS_REFUNDED': // 已退款
          //   this.stateTip = '已退款'
          //   break
          // case 'USE_STATUS_NO': // 未使用
          //   this.stateTip = '待使用'
          //   break
          // case 'USE_STATUS': // 已使用
          //   this.stateTip = '已使用'
          //   break
          // case 'NO_COMMENT': // 待评价
          //   this.stateTip = '待评价'
          //   break
          // case 'REFUND_STATUS_NO': // 未退票
          //   this.stateTip = '待付款'
          //   break
          // case 'REFUND_STATUS_PENDING': // 退款中
          //   this.stateTip = '退款/售后'
          //   break
          // case 'REFUND_STATUS_YES': // 已退票
          //   this.stateTip = '已退款'
          //   break
        }
      }
    }
  },
  methods: {
    orderBackProgress () {
      this.$router.push({name: 'orderBackProgress', query: {id: this.detail.ord_id}})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-use-info
    color #eeeeee
    font-size .25rem
    margin-top .2rem
    line-height .3rem
.o-i-waiting-use-action-wrapper
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
        background-color $primary
        color #ffffff
.c-e-wrapper
    font-size .2rem
    margin 0 auto
    & p:nth-child(1)
        color $orangeColor
        margin-top .1rem
    & p:nth-child(2)
        color #cccccc
        margin-top .1rem
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
</style>
