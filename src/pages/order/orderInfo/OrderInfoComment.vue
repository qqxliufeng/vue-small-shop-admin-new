<template>
  <div class='o-i-container' v-if="detail">
    <order-info-header stateTip="待评价">
        <template slot="headerTitleInfo">
            <p class="o-i-use-info">
                快来和小伙伴们分享一下这次出游的感受吧
            </p>
        </template>
    </order-info-header>
    <order-info-content :scenic="detail.scenic"
                        :voucher="detail.voucher"
                        :ticketName="detail.ord_product_name"
                        :ticketNum="detail.ord_ticket_num"
                        :sendCode="detail.send_code"
                        :refundTickets="detail.refund_tickets"
                        :timeLog="detail.order_log"></order-info-content>
    <ticket-notice-wrapper :goodsInfo="detail.goods"></ticket-notice-wrapper>
    <order-business-info :store="detail.store"></order-business-info>
    <order-detail :detail="detail"></order-detail>
    <div class="sperator-3"></div>
    <div class="bottom-action-wrapper">
      <span class="back-top" @click="backTop">
        返回到顶部
      </span>
      <span class="comment" @click="comment">
        评价
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
    orderDetail
  },
  data () {
    return {
    }
  },
  watch: {
    detail (newVal, oldVal) {
      if (newVal.status !== 'NO_COMMENT') {
        this.$router.go(-1)
      }
    }
  },
  methods: {
    backTop () {
      this.$emit('backTop')
    },
    comment () {
      this.$router.push({name: 'orderComment', query: {orderId: this.detail.ord_id}})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-container
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
