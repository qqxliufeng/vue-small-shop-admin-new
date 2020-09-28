<template>
<div class='share-scenic-container'>
  <my-navi title="分享商家" :isFixed="true"></my-navi>
  <section v-if="info">
    <div class="content">
      <share-component ref="share">
        <template slot="shareTip">
          <share-tip></share-tip>
          <share-header-info :goods="goods"></share-header-info>
        </template>
        <template slot="shareHeader">
            <img class="share-image" :src="$utils.image.getImagePath(info.poster_image)" :key="info.poster_image">
        </template>
        <template slot="shareInfo">
          <share-code :logo="$utils.image.getImagePath($root.userInfo.state.avatar)" :url="wexin_url ? wexin_url : url"></share-code>
        </template>
        <template slot="shareAddress">
          <span class="shop-address-title">商家链接:</span>
          <!-- <span class="shop-address">{{url}}</span> -->
          <textarea class="shop-address" :value="wexin_url ? wexin_url : url" rows="2"></textarea>
        </template>
        <template slot="otherInfo">
          <div class="other-info-wrapper">
            <p class="other-info-title">所含商品：</p>
            <div class="other-info-content">
              <ul>
                <li v-for="(item, index) of info.goods_name" :key="index" class="goods-name">{{item.goods_name}}</li>
              </ul>
            </div>
            <p class="other-info-bottom" v-if="info.store_name">以上商品由{{info.store_name}}提供</p>
          </div>
        </template>
      </share-component>
    </div>
  </section>
</div>
</template>

<script>
import ShareComponent from './Share'
import ShareCode from './components/ShareCode'
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
      goods: {
        max_price: 0,
        min_price: 0,
        price: 0
      }
    }
  },
  computed: {
    url () {
      return this.$urlPath.getShareScenicUrl(this.identity, this.storeId, this.$route.query.scenic_id, this.$route.query.sid)
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.selectScenicPosterDetail, {
        scenic_id: this.$route.query.scenic_id,
        store_id: this.$route.query.sid,
        business_id: this.storeId,
        isWeiXin: this.$isWeiXin ? '1' : '0'
      }, '', (data) => {
        this.info = data.data
        this.wexin_url = this.info.wexin_url
        this.goods.max_price = this.info.max_price
        this.goods.price = '最高返:￥' + this.goods.max_price
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
.share-scenic-container
    .content
        contentFixed()
        .share-image
            width 100%
            height 100%
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
        .code-wrapper
            position absolute
            bottom rem(1)
            left 0
            right 0
            width 60%
            height 0
            padding-bottom 60%
            margin 0 auto
            text-align center
            margin-bottom rem(.1)
            .code
                width 100%!important
                height 42vw!important
            .flag
                textStyle($orangeColor, .28)
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
                    .goods-name
                        line-height rem(.5)
            .other-info-bottom
                text-align right
                textStyle(#ccc, .2)
</style>
