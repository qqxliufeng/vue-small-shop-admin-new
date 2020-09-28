<template>
    <div class='r-n-container' v-if="goods">
      <span class="el-icon-close close-icon" @click="close"></span>
      <div class="scenic-info-wrapper" v-if="scenic">
        <div class="scenic-info-image-wrapper">
          <img v-lazy="$utils.image.getImagePath(scenic.scenicimage)">
        </div>
        <div class="scenic-info">
          <p class="scenic-title">
            {{scenic.s_title}}
          </p>
          <div class="ticket-title-wrapper">
            <span class="ticket-title">
              {{goods.goods_title}}
            </span>
            <span class="ticket-price">
              ￥{{Number(scenic.minCost || 0).toFixed(2)}}
            </span>
          </div>
          <div class="scenic-detail">
            <div class="scenic-detail-rate">
              <el-rate disabled :value="Number(scenic.mark) || 0" show-score text-color="#ff9900" score-template="{value}分"></el-rate>
            </div>
            <span class="scenic-detail-sale-count" v-if="goods.totalSales > 0">
              已售{{$utils.common.trasformNum(goods.totalSales)}}
            </span>
          </div>
        </div>
      </div>
      <div class="notice-info-wrapper">
        <ticket-notice-wrapper :goodsInfo="goods"></ticket-notice-wrapper>
        <business-info :store="store"></business-info>
        <div class="sperator-2"></div>
      </div>
      <div class="bottom-wrapper" >
        <span class="price-wrapper">￥{{Number(scenic.minCost || 0).toFixed(2)}}</span>
        <span class="flex-item"></span>
        <span class="next" @click="close">下一步</span>
      </div>
    </div>
</template>

<script>
import TicketNoticeWrapper from 'common/components/ticket-notice-wrapper'
import BusinessInfo from '@/pages/order/components/OrderBusinessInfo'
export default {
  name: 'reseveNotice',
  props: {
    goods: Object,
    scenic: Object,
    store: Object
  },
  components: {
    TicketNoticeWrapper,
    BusinessInfo
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$root.$emit('closeDialog')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-n-container
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    .close-icon
        position absolute
        right rem(.2)
        textStyle(#888, .4)
        top rem(.2)
        z-index 100
    .scenic-info-wrapper
        display flex
        padding rem(.3)
        overflow hidden
        box-sizing border-box
        position absolute
        top 0
        left 0
        right 0
        .scenic-info-image-wrapper
            height rem(1.5)
            width rem(1.5)
            flex-shrink 0
            border-radius rem(.1)
            overflow hidden
            & img
                width 100%
                height 100%
                object-fit cover
        .scenic-info
            flex 1
            margin-left rem(.2)
            display flex
            flex-direction column
            justify-content space-between
            overflow hidden
            .scenic-title
                ellipsis()
                textStyle(#333, .3)
            .ticket-title-wrapper
                display flex
                overflow hidden
                .ticket-title
                    flex 1
                    ellipsis()
                    textStyle(#333, .28)
                .ticket-price
                    margin-left rem(.2)
                    textStyle($orangeColor, .3)
                    & i
                        textStyle(#333, .2)
            .scenic-detail
                display flex
                align-items center
                .scenic-detail-rate
                    flex 1
                    & >>> .el-rate__icon
                        font-size 16px !important
                        margin-right 2px
                .scenic-detail-sale-count
                    textStyle(#333, .25)
                    margin-left rem(1)
    .notice-info-wrapper
        position absolute
        top rem(2)
        left 0
        right 0
        bottom 0
        overflow scroll
    .sperator-1
        height 2px
        background-color #f5f5f5
        width 90%
        margin 0 auto
    .sperator-2
        height $headerHeight
    .bottom-wrapper
        height $headerHeight
        border-top 1px solid #f5f5f5
        background-color #fff
        position fixed
        bottom 0
        left 0
        right 0
        display flex
        align-items center
        padding 0 rem(.2)
        .flex-item
            flex 1
        .next
            background-color $orangeColor
            border-radius rem(.3)
            margin rem(.2)
            color #fff
            padding rem(.1) rem(.3)
        .price-wrapper
            color $orangeColor
            font-size rem(.35)
            & i
                margin-left rem(.1)
                font-size rem(.2)
        .collection
            text-align center
            margin-right rem(.3)
            & p:nth-child(1)
                    textStyle($orangeColor, .35)
            & p:nth-child(2)
                margin-top rem(.1)
                textStyle($orangeColor, .25)
</style>
