<template>
  <div class='s-shop-container' v-if="info">
    <div class="content">
        <share-component ref="share">
          <template slot="shareTip">
            <share-tip></share-tip>
          </template>
          <template slot="shareHeader">
            <img class="share-image" :src="image" alt="" id="shareImage">
          </template>
          <template slot="shareInfo">
            <share-code :logo="logo" :url="wexin_url ? wexin_url : url"></share-code>
          </template>
          <template slot="shareAddress">
            <span class="shop-address-title">店铺链接:</span>
            <!-- <span class="shop-address" ref="copyUrl">{{url}}</span> -->
            <textarea class="shop-address" :value="wexin_url ? wexin_url : url"></textarea>
          </template>
        </share-component>
    </div>
  </div>
</template>

<script>
import ShareComponent from '@/pages/share/Share'
import ShareCode from './components/ShareCode'
import ShareTip from './components/ShareTip'
import IdMixin from 'common/mixins/id-mixin'
export default {
  name: 'shareShop',
  mixins: [IdMixin],
  components: {
    ShareComponent,
    ShareCode,
    ShareTip
  },
  data () {
    return {
      info: null,
      wexin_url: null
    }
  },
  computed: {
    url () {
      return this.$urlPath.getShareShopUrl(this.identity, this.storeId)
    },
    image () {
      return this.$utils.image.getImagePath(this.info.image)
    },
    logo () {
      return this.$utils.image.getImagePath(this.info.logo)
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.shareShopUrl, {
        // 根据是不是在微信客户端打开的页面判断
        isWeiXin: this.$isWeiXin ? '1' : '0'
      }, '', (data) => {
        this.info = data.data
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
.s-shop-container
    overflow scroll
    .content
        overflow-y scroll
        .share-image
            width 100%
            background #f5f5f5
        .info-content-wrapper
            display flex
            width 100%
            box-sizing border-box
            .post-logo
                width rem(1.5)
                & img
                    width 100%
                    object-fit cover
            .post-info
                flex 1
                display flex
                justify-content space-around
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
                width rem(1.8)
                overflow hidden
                .post-code
                    text-align center
                    .code-canvas
                        width rem(1.6) !important
                        height rem(1.6) !important
                & p
                    color red
                    font-size rem(.2)
</style>
