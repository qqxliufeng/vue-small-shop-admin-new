<template>
  <div class='order-info-modify-container' v-if="detail">
    <my-navi title="修改订单" :isFixed="true"></my-navi>
    <div style="height: .86rem" id="top"></div>
    <div class="header-wrapper">
      <p class="title">更改日期</p>
      <div class="o-i-use-info">
        当前订单时间为: <span class="time">{{detail.ord_play_time}}</span>，如需更改，请选择新的时间
      </div>
    </div>
    <div class="select-time-title">请选择新的日期</div>
    <div class="r-d-ticket-info-time-wrapper">
        <div class="r-d-ticket-info-time-item" v-for="(item, index) of times" :key="index" @click="timeItemClick(item)" :class="[{'r-d-ticket-info-time-selected': item.isSelected},{'r-d-ticket-info-time-uneable' : !item.isEnable}]">
            <p>{{item.date}}</p>
            <p>周{{$utils.getWeekByWeek(item.week)}}</p>
            <p>￥{{item.price}}</p>
        </div>
        <div class="r-d-ticket-info-time-item" style="border: #63BBB0 solid 1px" @click="isShowCanlendarDialog = true">
            <p class="more-date">更多日期></p>
        </div>
    </div>
    <div class="change-price-wrapper" v-if="changePrice !== 0">
        所选择的日期需验证时线下<span class="price-flag">{{Number(changePrice) > 0 ? '补' : '退'}}</span>差价: <span class="change-price">￥{{Math.abs(changePrice)}}</span>
    </div>
      <order-info-content :scenic="detail.scenic"
                        :voucher="detail.voucher"
                        :ticketName="detail.ord_product_name"
                        :ticketNum="detail.ord_ticket_num"
                        :refundTickets="detail.refund_tickets"
                        :sendCode="detail.send_code"
                        :timeLog="detail.order_log">
    </order-info-content>
    <ticket-notice-wrapper :goodsInfo="detail.goods"></ticket-notice-wrapper>
    <order-business-info :store="detail.store"></order-business-info>
    <order-detail :detail="detail"></order-detail>
    <div class="sperator-3"></div>
    <div class="bottom-action-wrapper">
      <span class="back-top" @click="backTop">
        返回到顶部
      </span>
      <span class="comment" @click="modify">
        提交申请
      </span>
    </div>
    <el-dialog title="选择日期" :visible.sync="isShowCanlendarDialog" center width="92%" :modal="false" @open="showModal = true" @close="showModal = false">
          <calander :events="events" :lunar="calendar.lunar" :begin="calendar.begin()" :end="calendar.end" :weeks="calendar.weeks" :months="calendar.months" @select="select">
              <template slot="event" slot-scope="slotProps">
                  <div class="c-e-wrapper">
                      <p :style="{ 'color' : slotProps.disabled ? '#ccc' : '#64BBAE'}">￥{{slotProps.event.sale_price}}</p>
                      <p :style="{ 'color' : slotProps.disabled ? '#ccc' : '#64BBAE'}">{{releaseCount(slotProps.event.one_stock)}}</p>
                  </div>
              </template>
          </calander>
    </el-dialog>
    <div class="v-modal" v-show="isShowCanlendarDialog" @click="isShowCanlendarDialog = false"></div>
  </div>
</template>

<script>
import orderInfoContent from './orderInfo/components/OrderInfoContent'
import ticketNoticeWrapper from 'common/components/ticket-notice-wrapper'
import orderBusinessInfo from './components/OrderBusinessInfo'
import orderDetail from './orderInfo/components/OrderDetail'
import CalendarUtils from 'common/mixins/calendar-utils.js'
export default {
  name: 'orderInfoModify',
  mixins: [CalendarUtils],
  components: {
    orderInfoContent,
    ticketNoticeWrapper,
    orderBusinessInfo,
    orderDetail
  },
  data () {
    return {
      isShowCanlendarDialog: false,
      detail: null,
      changePrice: 0
    }
  },
  methods: {
    modify () {
      if (new Date(this.detail.ord_play_time).getTime() === new Date(this.tempTime.raw.date).getTime()) {
        this.$toast('新日期与当前日期不能相同')
        return
      }
      this.$http(this.$urlPath.doOrderModify, {
        order_id: this.$route.query.id,
        goods_id: this.$route.query.goodsId,
        date: JSON.stringify(this.tempTime.raw)
      }, '', (data) => {
        if (data.data.status === 1) { // 直接修改成功了
          this.$toast('更改日期操作成功')
        } else { // 提交申请待审核
          this.$toast('更改日期申请提交成功，等待商家审核')
        }
        this.$root.$emit('onReload')
        this.$router.go(-1)
      }, (errerCode, error) => {
        this.$toast(error)
      })
    },
    getData () {
      this.$http(this.$urlPath.orderModify, {
        order_id: this.$route.query.id,
        goods_id: this.$route.query.goodsId,
        store_id: this.$root.userInfo.state.id,
        identity: '2'
      }, '', (data) => {
        this.detail = data.data
        this.initCalendar(this.detail)
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    backTop () {
      document.querySelector('#top').scrollIntoView()
    },
    onSelect () {
      this.changePrice = 0
      if (new Date(this.detail.ord_play_time).getTime() === new Date(this.tempTime.raw.date).getTime()) {
        this.$toast('新日期与当前日期不能相同')
        return
      }
      const newPrice = Number(this.tempTime.raw.sale_price) * this.detail.ord_ticket_num
      if (newPrice !== Number(this.detail.ord_amount)) {
        this.changePrice = Number((newPrice - Number(this.detail.ord_amount))).toFixed(2)
      }
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
.order-info-modify-container
    .header-wrapper
      background-color $primary
      min-height rem(1)
      padding rem(.2)
      .title
          color #FFFFFF
          font-size rem(.32)
          margin-top rem(.1)
      .o-i-use-info
          color #eeeeee
          font-size rem(.25)
          margin-top rem(.3)
          line-height rem(.3)
          .time
              textStyle(#fff, .3)
              font-weight bold
              margin-left rem(.1)
    .select-time-title
        padding rem(.2)
        textStyle(#333, .28)
        borderBottom()
    .r-d-ticket-info-time-wrapper
        display flex
        padding rem(.2)
        borderBottom()
        .r-d-ticket-info-time-item
            width 25%
            height rem(1.35)
            margin 0 1.25%
            border #f5f5f5 solid 1px
            display flex
            justify-content center
            align-items center
            flex-direction column
            border-radius rem(.1)
            color #333
            & p:nth-child(2)
                color #888
                font-size rem(.2)
                margin-top rem(.05)
            & p:nth-child(3)
                margin-top rem(.2)
                color $orangeColor
              .more-date
                  color $primary
                  font-size rem(.23)
        .r-d-ticket-info-time-selected
            border $primary solid 1px
        .r-d-ticket-info-time-uneable
            color #888
            pointer-events none
            & p
                color #ccc !important
      .change-price-wrapper
          textStyle(#666, .3)
          padding rem(.2)
          borderBottom()
          .change-price
              textStyle($orangeColor, .3)
              margin-left rem(.2)
              font-weight bold
          .price-flag
              textStyle($orangeColor, .3)
              margin 0 rem(.1)
              font-weight bold
      .sperator-3
          height $headerHeight
      .bottom-action-wrapper
          overflow hidden
          padding rem(.1) rem(.2)
          box-sizing border-box
          border-top 1px solid #f5f5f5
          background-color #ffffff
          height $headerHeight
          position fixed
          left 0
          right 0
          bottom 0
          display flex
          justify-content space-between
          align-items center
          font-size rem(.25)
          .back-top
              border-radius rem(.3)
              border 1px solid $primary
              padding rem(.1) rem(.2)
              color $primary
          .comment
              border-radius rem(.3)
              background-color $primary
              padding rem(.1) rem(.2)
              color #FFFFFF
          .back-money
              border-radius rem(.3)
              background-color $primary
              padding rem(.1) rem(.2)
              float right
              color #fff
    .v-modal
        position fixed
        top 0
        left 0
        right 0
        height 100%
        background-color #000000
        z-index 1000
        opacity .5
</style>
