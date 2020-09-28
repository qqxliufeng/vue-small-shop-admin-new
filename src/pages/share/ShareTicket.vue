<template>
<div class='share-ticket-container'>
  <my-navi title="分享商品" :isFixed="true"></my-navi>
  <div class="content" v-if="info">
    <share-component ref="share">
      <template slot="shareTip">
        <share-tip></share-tip>
        <share-header-info :goods="info.goods"></share-header-info>
      </template>
      <template slot="shareHeader">
          <img class="share-image" :src="$utils.image.getImagePath(info.share_image)" alt="">
          <div class="ticket-info-wrapper">
            <div class="left-wrapper" :class="[theme[0] + themeFlag]">
              <div class="origin-price" :class="[theme[1] + themeFlag]">
                <i>￥</i>{{info.sales.salePrice}}
              </div>
              <div class="old-price" :class="[theme[2] + themeFlag]">
                <span style="font-size: 12px">原价</span><i style="text-decoration: line-through">￥</i><span style="text-decoration: line-through">{{info.sales.retailPrice}}</span>
              </div>
            </div>
            <div class="right-wrapper">
                <div class="sub-title">
                  {{info.goods.share_label}}
                </div>
                <div class="title">
                  {{info.goods.share_name}}
                </div>
            </div>
          </div>
      </template>
      <template slot="shareInfo">
        <share-code :logo="$utils.image.getImagePath($root.userInfo.state.avatar)" :url="wexin_url ? wexin_url: url"></share-code>
      </template>
      <template slot="shareAddress">
        <span class="shop-address-title">商品链接:</span>
        <!-- <span class="shop-address">{{url}}</span> -->
        <textarea class="shop-address" :value="wexin_url ? wexin_url: url" rows="2"></textarea>
      </template>
    </share-component>
  </div>
</div>
</template>

<script>
import ShareCode from './components/ShareCode'
import ShareComponent from './Share'
import ShareTip from './components/ShareTip'
import IdMixin from 'common/mixins/id-mixin'
import ShareHeaderInfo from './components/ShareHeaderInfo'
export default {
  name: 'shareTicket',
  mixins: [IdMixin],
  components: {
    ShareComponent,
    ShareCode,
    ShareTip,
    ShareHeaderInfo
  },
  data () {
    return {
      info: null,
      wexin_url: null,
      theme: [
        'left-wrapper-theme',
        'origin-price-theme',
        'old-price-theme'
      ],
      themeFlag: 1
    }
  },
  computed: {
    url () {
      return this.$urlPath.getShareTicketUrl(this.identity, this.storeId, this.$route.query.s_id, this.$route.query.goods_id, this.$route.query.promotion_id || null)
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.ticketPosterDetail, {
        goods_id: this.$route.query.goods_id,
        scenic_id: this.$route.query.s_id,
        store_id: this.storeId,
        isWeiXin: this.$isWeiXin ? '1' : '0'
      }, '', (data) => {
        this.info = data.data
        if (parseFloat(this.info.sales.salePrice) === parseInt(this.info.sales.salePrice)) {
          this.info.sales.salePrice = Number(this.info.sales.salePrice) / 10 * 10
        } else {
          this.info.sales.salePrice = Number(this.info.sales.salePrice)
        }
        if (parseFloat(this.info.sales.retailPrice) === parseInt(this.info.sales.retailPrice)) {
          this.info.sales.retailPrice = Number(this.info.sales.retailPrice) / 10 * 10
        } else {
          this.info.sales.retailPrice = Number(this.info.sales.retailPrice)
        }
        this.info.goods.price = ':￥' + this.info.goods.price
        this.wexin_url = this.info.wexin_url
        this.$nextTick(() => {
          this.$refs.share.createPost()
        })
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
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.share-ticket-container
    .content
        contentFixed()
        z-index 1
        .share-image
            width 100%
            height 83%
        .info-content-wrapper
            display flex
            .post-logo
                width rem(1.5)
                height rem(1.5)
                & img
                    width 100%
                    height 100%
                    object-fit cover
        .post-info
            flex 1
            display flex
            justify-content space-between
            flex-direction column
            color #333
            font-size rem(.3)
            margin-left rem(.2)
            .icon
                color #EEA53A
                font-size rem(.35)
                margin-right rem(.1)
        .post-code-wrapper
            text-align center
            .post-code
                width rem(1.2)
                height rem(1.2)
                & img
                    width 100%
                    height 100%
            & p
                margin-top rem(.1)
                color red
                font-size rem(.2)
        .other-info-wrapper
            padding rem(.2)
            border-top 1px solid #f5f5f5
            .other-info-title
                textStyle(#333, .3)
            .other-info-content
                display flex
                justify-content center
                align-items center
                padding rem(.2)
                & ul
                    width 80%
                    textStyle($primary, .3)
                    line-height rem(.35)
            .other-info-bottom
                text-align right
                textStyle(#ccc, .2)
        .ticket-info-wrapper
            display flex
            width 100%
            height 17.5%
            box-sizing border-box
            border-bottom 1px solid #f5f5f5
            .left-wrapper
                height 100%
                display flex
                justify-content space-around
                align-items center
                flex-direction column
                padding 0 rem(.2)
                padding-left rem(.1)
                .origin-price
                    font-size rem(1.3)
                    font-weight bold
                    font-style italic
                    text-shadow #fff 3px 0 0, #fff 0 3px 0, #fff -3px 0 0, #fff 0 -3px 0;
                .old-price
                    font-size rem(.32)
                    text-shadow #333 0px 0 0, #333 0 0px 0, #333 0px 0 0, #333 0 0px 0;
                    margin-bottom 1px
            .right-wrapper
                display flex
                flex 1
                flex-direction column
                overflow hidden
                .title
                    font-weight bold
                    font-size rem(.6)
                    background-color #F8DD4A
                    padding 10px 0
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                    text-shadow #333 0px 0 0, #333 0 0px 0, #333 0px 0 0, #333 0 0px 0;
                .sub-title
                    flex 1
                    color #333
                    display flex
                    align-items center
                    justify-content left
                    background-color #F5C744
                    font-size 17px
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                    padding-left 3px
                    text-shadow #333 0px 0 0, #333 0 0px 0, #333 0px 0 0, #333 0 0px 0;
            & i
                font-size rem(.2)
.left-wrapper-theme1
    background-color #F8DD4A
.left-wrapper-theme2
    background-color #F00
.origin-price-theme1
    color #FF1717
.origin-price-theme2
    color #FF1717
.old-price-theme1
    color #333
.old-price-theme2
    color #333
</style>
