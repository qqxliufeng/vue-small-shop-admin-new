<template>
    <div v-if="detail">
      <order-info-header :stateTip="tipTitle">
            <template slot="headerTitleInfo">
                <p class="o-i-use-info">
                    {{tipContent}}
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
        <div class="o-i-waiting-use-action-wrapper" v-if="detail.is_refund === 1 && detail.refund_mark !== 2">
            <span @click="backMoney">申请退款</span>
            <!-- <span @click="isShowCanlendarDialog = true">变更时间</span> -->
        </div>
        <!-- <el-dialog title="选择日期" :visible.sync="isShowCanlendarDialog" center width="100%">
            <calander :events="calendar1.events" :lunar="calendar1.lunar" :begin="calendar1.begin" :end="calendar1.end" :weeks="calendar1.weeks" :months="calendar1.months" @select="calendar1.select">
                <template slot="event">
                    <div class="c-e-wrapper">
                        <p>补￥278</p>
                        <p>(余10244)</p>
                    </div>
                </template>
            </calander>
        </el-dialog> -->
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
      // calendar1: {
      //   value: [2018, 2, 16], // 默认日期
      //   // lunar:true, //显示农历
      //   weeks: ['日', '一', '二', '三', '四', '五', '六'],
      //   months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      //   events: {
      //     '2018-2-14': '$408', '2018-2-15': '$460', '2018-2-16': '$500\n111'
      //   },
      //   select (value) {
      //     console.log(value.toString())
      //   }
      // },
      isShowCanlendarDialog: false
    }
  },
  computed: {
    tipTitle () {
      if (this.detail.status === 'USE_STATUS_NO') {
        return this.detail.refund_mark === 2 ? '退款/售后' : '待使用'
      } else {
        return '已完成'
      }
    },
    tipContent () {
      if (this.detail.status === 'USE_STATUS_NO') {
        return this.detail.refund_mark === 2 ? '您的订单有退款申请，请及时查看' : '产品已出票，请尽快使用产品'
      } else {
        return '感谢您的本次消费，订单已经完结'
      }
    }
  },
  methods: {
    backMoney () {
      this.$router.push({name: 'orderBackMoney', query: {id: this.detail.ord_id}})
    },
    orderBackProgress () {
      this.$router.push({name: 'orderBackProgress', query: {id: this.detail.ord_id}})
    }
  },
  mounted () {
    // let date = new Date()
    // this.calendar1.value = [date.getFullYear, date.getMonth, date.getDay]
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
    // & span:nth-child(2)
    //     background-color $primary
    //     color #ffffff
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
