<template>
    <div v-if="item">
        <!-- <div class="s-l-list-item-img-wrapper">
            <img src="http://img1.3lian.com/img013/v5/21/d/84.jpg">
        </div>
        <div class="s-l-list-item-content-wrapper">
            <p class="s-l-list-item-content-title-wrapper">
                <span class="s-l-list-item-content-title">卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪卧虎山滑雪</span>
                <span class="s-l-list-item-content-price">
                    <span>￥89</span>
                    <i>起</i>
                </span>
            </p>
            <div class="s-l-list-item-content-info-wrapper">
                <div class="s-l-list-item-content-info">
                    <span class="s-l-list-item-content-inf0-rate">4.9分</span>
                    <span>|</span>
                    <span class="s-l-list-item-content-inf0-saller">12345人已售</span>
                </div>
                <span class="s-l-list-item-content-info-old-price">￥999</span>
            </div>
            <p class="s-l-list-item-content-tags-wrapper">
                <span>立减1元</span>
                <span>立减1元</span>
                <span>立减1元</span>
            </p>
            <p class="s-l-list-item-content-remark-wrapper">
                预定须知：一定要从正规渠道购买，重要的事说三遍。一定要从正规渠道购买，重要的事说三遍一定要从正规渠道购买，重要的事说三遍一定要从正规渠道购买，重要的事说三遍
            </p>
        </div> -->
        <div @click="itemClick" class="h-l-like-wrapper" >
            <div class="h-l-like-img-wrapper">
                <img v-lazy="$utils.image.getImagePath(item.scenicimages)" :key="item.scenicimages">
            </div>
            <div class="h-l-like-info-wrapper">
                <p>{{item.s_title}}</p>
                <p>{{item.brief}}</p>
                <p><span>￥{{item.minPrice}}</span><i>起</i><span v-if="item.totalSales > 0">已售{{item.totalSales}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ScenicListItem',
  props: {
    item: Object
  },
  methods: {
    itemClick () {
      this.$router.push({name: 'scenicDetail', query: {s: this.item.s_id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-l-like-wrapper
    display flex
    padding rem(.2) rem(.3)
    borderBottom()
    .h-l-like-img-wrapper
        flex 1.5
        overflow hidden
        height rem(1.7)
        border-radius rem(.1)
        & img
            width 100%
            height 100%
            object-fit cover
    .h-l-like-info-wrapper
        flex 4
        padding-left .2rem
        overflow hidden
        display flex
        flex-direction column
        justify-content space-between
        & p:nth-child(1)
            ellipsis()
            normalTextStyle(#333, .32)
        & p:nth-child(2)
            muitlLineEllipsis(2)
            normalTextStyle(#888, .25)
            line-height rem(.32)
            margin-top rem(.1)
        & p:nth-child(3)
            overflow hidden
            margin-top rem(.1)
            & span:nth-child(1)
                display inline-block
                normalTextStyle($primary, .35)
            & i
                display inline-block
                normalTextStyle(#cccccc, .2)
                line-height .2rem
                margin-left rem(.1)
            & span:nth-child(3)
                display inline-block
                normalTextStyle(#888888, .22)
                float right
                margin-top rem(.11rem)
.s-l-list-item-container
    margin rem(.2)
    border-bottom #f5f5f5 solid 1px
    padding-bottom rem(.2)
    display flex
    .s-l-list-item-img-wrapper
        height rem(2)
        width rem(2.5)
        & img
            width 100%
            height 100%
            object-fit cover
    .s-l-list-item-content-wrapper
        flex 1
        display flex
        flex-direction column
        padding-left rem(.2)
        justify-content space-between
        overflow hidden
        .s-l-list-item-content-title-wrapper
            display flex
            .s-l-list-item-content-title
                flex 1
                ellipsis()
                textStyle(#333, .32)
            .s-l-list-item-content-price
                textStyle($primary, .35)
                & i
                    textStyle(#ccc, .2)
        .s-l-list-item-content-info-wrapper
            display flex
            .s-l-list-item-content-info
                flex 1
                textStyle(#888, .25)
                .s-l-list-item-content-inf0-rate
                    textStyle($primary, .25)
            .s-l-list-item-content-info-old-price
                textStyle(#888, .25)
                text-decoration line-through
        .s-l-list-item-content-tags-wrapper
            display flex
            & span
                normalTextStyle($primary, .18)
                line-height rem(.2)
                text-align center
                vertical-align middle
                border $primary solid 1px
                padding rem(.02) rem(.1)
                padding-top rem(.05)
                margin-left rem(.1)
        .s-l-list-item-content-remark-wrapper
            background-color #f5f5f5
            ellipsis()
            normalTextStyle(#888, .25)
            padding 0 rem(.1)
            border-radius rem(.1)
</style>
