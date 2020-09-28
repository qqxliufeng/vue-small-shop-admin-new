<template>
  <div class='o-d-detail-container'>
    <p class="title"><span class="title-info">订单信息</span></p>
    <div class="content-wrapper">
      <p class="content-title">
        联系人
      </p>
      <p class="content-info">
        姓&nbsp;&nbsp;&nbsp;&nbsp;名：{{detail.ord_check_taker_name || '暂无'}}
      </p>
      <p class="content-info">
        手机号：{{detail.ord_check_taker_phone || '暂无'}}
      </p>
    </div>
    <div class="sperator-1"></div>
    <div class="content-wrapper" v-for="(item, index) of detail.tourist" :key="item.t_id">
      <p class="content-title">
        游玩人{{index+1}}
      </p>
      <p class="content-info">
        姓&nbsp;&nbsp;&nbsp;&nbsp;名：{{item.t_username}}
      </p>
      <p class="content-info">
        手机号：{{item.t_phone}}
      </p>
    </div>
    <div class="sperator-1" v-if="detail.tourist && detail.tourist.length > 0"></div>
    <div class="content-wrapper">
      <p class="content-title">
        订单金额
      </p>
      <p class="content-info">
        门票价格：￥{{detail.ord_price}}      X{{detail.ord_ticket_num}}
      </p>
      <p class="content-info">
        合计金额：￥{{detail.ord_amount}}
      </p>
    </div>
    <div class="sperator-1" v-if="detail.goods.categoryId === 14"></div>
    <div class="content-wrapper" v-if="detail.goods.categoryId === 14">
      <p class="content-title">
        乘车时间/地点
      </p>
      <div class="content-info">
        乘车时间：<span class="ride-item-info">{{detail.ride_time}}</span>
      </div>
      <div class="content-info">
        乘车地点：<span class="ride-item-info">{{detail.ride_site}}</span>
      </div>
    </div>
    <div class="sperator-1"></div>
    <ticket-remark :remark="{ title: '下单店铺', value: detail.shop_name }"></ticket-remark>
    <ticket-remark :remark="{ title: '订单编号', value: detail.ord_id }"></ticket-remark>
    <ticket-remark v-for="(item, index) of detail.order_log" :key="index" :remark="{ title: item.type, value: item.ctime}"></ticket-remark>
  </div>
</template>

<script>
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'orderDetail',
  props: {
    detail: Object
  },
  components: {
    TicketRemark
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-d-detail-container
    .title
        padding rem(.2)
        &:before
            content ''
            width 3px
            height rem(.3)
            background-color $primary
            display inline-block
            vertical-align middle
        .title-info
            display inline-block
            margin-left rem(.3)
            color #333
            font-size rem(.32)
            vertical-align middle
    .content-wrapper
        padding-left rem(.55)
        .content-title
            textStyle(#333, .3)
            margin rem(.2) 0
        .content-info
            margin-left rem(.2)
            textStyle(#888, .26)
            line-height rem(.5)
            .ride-item-info
                textStyle($orangeColor, .26)
                font-weight bold
    .sperator-1
        height 2px
        width 90%
        margin rem(.2) auto
        background-color #f5f5f5
</style>
