<template>
    <div v-if="detail">
      <order-info-header stateTip="退款/售后">
            <template slot="headerTitleInfo">
                <p class="o-i-use-info">
                    退款原因：{{detail.refund_reason}}
                </p>
                <p v-if="detail.refund_failed_desc" class="o-i-check-failed">审核失败：{{detail.refund_failed_desc}}</p>
            </template>
            <template slot="headerBottomInfo">
                <div>
                    <order-step :active="detail.refundModel.refundProgress.progress" :status="detail.refundModel.refundProgress.status"></order-step>
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
        <order-ticket-info v-for="item of detail.orders.voucher" :key="item.v_id" :itemInfo="item" :ticketName="detail.ord_product_name" :refundNum="detail.refund_num">
        </order-ticket-info>
        <div class="sperator-line"></div>
        <order-info-user-info title="收票人信息" :username="detail.orders.ord_check_taker_name" :phone="detail.orders.ord_check_taker_phone">
        </order-info-user-info>
        <order-info-user-info title="预定须知" :remarks="remarks">
        </order-info-user-info>
        <div class="sperator-line"></div>
        <order-time-info :shopName="detail.shop_name" :outTradeNo="detail.out_trade_no" :remarks="times"></order-time-info>
        <div class="o-i-waiting-use-action-wrapper" @click="cancelBack" v-if="detail.refundModel.showBottomAction">
            <span>取消退款</span>
        </div>
        <confirm-dialog content="是否要取消退款？" ref="confirmDialog" @dialogConfirm="dialogConfirm"></confirm-dialog>
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
import confirmDialog from 'common/components/confirm-dialog'
export default {
  name: 'orderInfoWaitingUse',
  props: {
    orderId: String
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
    calander,
    confirmDialog
  },
  data () {
    return {
      detail: null,
      centerDialogVisible: false
    }
  },
  computed: {
    storeInfo () {
      return {
        store: this.detail.orders.store,
        ticketName: this.detail.orders.ord_product_name,
        playTime: this.detail.orders.ord_play_time,
        money: {
          title: '退款金额',
          money: this.detail.refund_amount,
          detail: [
            {
              key: '门票总数',
              value: 'X' + this.detail.orders.ord_ticket_num
            },
            {
              key: '退票数量',
              value: 'X' + this.detail.refund_num
            },
            {
              key: '手续费',
              value: '￥' + this.detail.refund_charge
            },
            {
              key: '退款总额',
              value: '￥' + this.detail.refund_actual_amount
            }
          ]
        }
      }
    },
    remarks () {
      if (this.detail) {
        let tempRemarks = []
        for (let key in this.detail.goods) {
          if (this.detail.goods[key] instanceof Object) {
            tempRemarks.push(this.detail.goods[key])
          }
        }
        return tempRemarks
      } else {
        return []
      }
    },
    times () {
      let items = []
      items.push({
        title: '退款编号',
        value: this.detail.out_refund_no
      })
      this.detail.refund_log.forEach(element => {
        items.push({
          title: element.type,
          value: element.ctime
        })
      })
      return items
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.orderRefundAfterDetail, {
        rid: this.orderId
      }, '', (data) => {
        this.detail = data.data
        switch (this.detail.status) {
          case 'REFUND_STATUS': // 退款待审核
            this.detail.refundModel = {
              showBottomAction: true,
              refundProgress: {
                progress: 2,
                status: 0
              }
            }
            break
          case 'REFUND_STATUS_YES': // 退款审核成功
            this.detail.refundModel = {
              showBottomAction: false,
              refundProgress: {
                progress: 2,
                status: 1
              }
            }
            break
          case 'REFUND_STATUS_NO': // 退款审核失败
            this.detail.refundModel = {
              showBottomAction: false,
              refundProgress: {
                progress: 2,
                status: 2
              }
            }
            break
          case 'REFUND_PAY': // 退款待支付
            this.detail.refundModel = {
              showBottomAction: false,
              refundProgress: {
                progress: 3,
                status: 0
              }
            }
            break
          case 'REFUND_PAY_YES': // 退款支付成功
            this.detail.refundModel = {
              showBottomAction: false,
              refundProgress: {
                progress: 3,
                status: 1
              }
            }
            break
          case 'REFUND_PAY_NO': // 退款支付失败
            this.detail.refundModel = {
              showBottomAction: false,
              refundProgress: {
                progress: 3,
                status: 2
              }
            }
            break
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    cancelBack () {
      this.$refs.confirmDialog.showDialog()
    },
    dialogConfirm () {
      this.$http(this.$urlPath.orderCancelRefund, {
        rid: this.detail.rid
      }, '正在取消…', (result) => {
        this.$root.$emit('onReload')
        this.$toast('取消退款成功')
        this.$router.go(-1)
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
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-use-info
    color #eeeeee
    font-size .25rem
    margin-top .2rem
    line-height .3rem
.o-i-check-failed
    color #ffffff
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
</style>
