<template>
    <div class="o-i-ticket-info-container">
        <div class="o-i-ticket-safe-container">
            <p>优待客消费保障</p>
            <div class="o-i-ticket-info-tag">
                <span><i class="iconfont">&#xe69e;</i> 入园保障</span>
                <span><i class="iconfont">&#xe69e;</i> 官方</span>
            </div>
        </div>
        <p class="o-i-ticket-info-title">
            <span>{{storeInfo.ticketName}}</span>
            <span class="play-time">游玩日期：{{storeInfo.playTime}}</span>
        </p>
        <div class="o-i-ticket-info-money">
            <span>{{storeInfo.money.title}}</span>
            <span>￥{{storeInfo.money.money}}</span>
            <span @click="toggleShowDetail">明细<i class="iconfont">{{ isShowDetail ? '&#xe63d;' : '&#xe797;'}}</i></span>
        </div>
        <div class="o-i-ticket-info-money-detail" v-show="isShowDetail">
            <slot name="ticketMoneyDetail" :moneyDetail="storeInfo.money.detail"></slot>
        </div>
        <div class="o-i-info-shop-info">
            <div class="o-i-info-shop-info-img-wrapper">
                <img v-lazy="$utils.image.getImagePath(storeInfo.store.avatar)">
            </div>
            <div class="o-i-info-shop-info-name-wrapper">
                <p class="o-i-info-shop-info-name">
                    <span>商家名称：{{storeInfo.store.company_name || '暂无'}}</span>
                </p>
                <p class="o-i-info-shop-info-phone">
                    <span>联系方式：{{storeInfo.store.linkman_phone || '暂无'}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'orderTicketMoneyInfo',
  props: {
    storeInfo: Object
  },
  data () {
    return {
      isShowDetail: true
    }
  },
  methods: {
    toggleShowDetail () {
      this.isShowDetail = !this.isShowDetail
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-ticket-info-container
    .o-i-ticket-safe-container
        background-color #EDF8F7
        border-bottom .02rem solid #f5f5f5
        padding .2rem
        & p
            color $primary
        .o-i-ticket-info-tag
            overflow hidden
            margin-top .2rem
            line-height .27rem
            & span
                float left
                color #333333
                font-size .2rem
                margin-right .3rem
                & i
                    color $primary
                    font-size .2rem
    .o-i-ticket-info-title
        padding .2rem
        color #333333
        font-size .3rem
        line-height .4rem
        border-bottom .01rem solid #f5f5f5
        & .play-time
            textStyle($orangeColor, .25)
            float right
    .o-i-ticket-info-money
        overflow hidden
        line-height .4rem
        border-bottom .01rem solid #f5f5f5
        padding .2rem
        & span:nth-child(1)
            color #333333
            font-size .28rem
            float left
        & span:nth-child(2)
            color $orangeColor
            font-size .28rem
            float left
            margin-left .2rem
        & span:nth-child(3)
            color #888888
            font-size .28rem
            float right
    .o-i-ticket-info-money-detail
        padding 0 .2rem
        border-bottom .01rem solid #f5f5f5
    .o-i-info-shop-info
        display flex
        padding .2rem
        borderBottom()
        .o-i-info-shop-info-img-wrapper
            overflow hidden
            height 1rem
            & img
                width rem(1)
                height rem(1)
                border-radius 50%
                object-fit cover
        .o-i-info-shop-info-name-wrapper
            display flex
            flex-direction column
            justify-content space-around
            flex 5
            margin-left .1rem
            color #888888
            overflow hidden
            .o-i-info-shop-info-name
                line-height .5rem
                ellipsis()
</style>
