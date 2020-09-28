<template>
<div class='share-ticket-container'>
  <div class="content" v-if="info">
    <share-component ref="share">
      <template slot="shareTip">
        <share-tip></share-tip>
      </template>
      <template slot="shareHeader">
        <img class="share-image" src="../../assets/images/img_share_register_bg.jpg">
      </template>
      <template slot="shareInfo">
          <share-code :url="wexin_url ? wexin_url : url" tip="即可加盟"></share-code>
      </template>
      <template slot="shareAddress">
        <span class="shop-address-title">注册链接:</span>
        <textarea class="shop-address" type="text" :value="wexin_url ? wexin_url : $urlPath.getShareRegisterUrl($root.userInfo.state.id)"></textarea>
      </template>
    </share-component>
  </div>
</div>
</template>

<script>
import ShareComponent from './Share'
import ShareTip from './components/ShareTip'
import ShareCode from './components/ShareCode'
export default {
  name: 'shareTicket',
  components: {
    ShareComponent,
    ShareTip,
    ShareCode
  },
  data () {
    return {
      info: null,
      wexin_url: null
    }
  },
  computed: {
    url () {
      return this.$urlPath.getShareRegisterUrl(this.$root.userInfo.state.id)
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.shareReigsterUrl, {
        isWeiXin: this.$isWeiXin ? '1' : '0'
      }, '',
      (data) => {
        this.info = data.data
        this.wexin_url = this.info.wexin_url
        this.$nextTick(() => {
          this.$refs.share.savePost()
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
        .share-image
            width 100%
            height 100%
        .header-content-wrapper
            height 100%
            overflow hidden
            .header-content
                position relative
                width 70%
                height 80%
                margin 0 auto
                margin-top rem(.8)
                background #fff
                border-radius rem(.1)
                padding rem(.3)
                box-sizing border-box
                .content-title-wrapper
                    display flex
                    .item-face-icon
                        display inline-block
                        width rem(1)
                        height rem(1)
                        border-radius 50%
                        margin-right rem(.1)
                    .item-info
                        display flex
                        flex-direction column
                        justify-content space-around
                        .item-name
                            textStyle(#333, .3)
                        .item-phone
                            textStyle(#888, .28)
                .separator-wrapper
                    display flex
                    position absolute
                    top rem(1.5)
                    left rem(-.2)
                    right rem(-.2)
                    align-items center
                    .left
                    .right
                        display inline-block
                        width rem(.4)
                        height rem(.4)
                        border-radius 50%
                        background $primary
                    .center
                        flex 1
                        height 0
                        display inline-block
                        border-top 1.5px dashed #f5f5f5
                        border-bottom 1.5px dashed #f5f5f5
                  .code-wrapper
                      position absolute
                      bottom rem(1.5)
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
    .loading-fail
        margin-top rem(1)
        text-align center
        textStyle(#888, .32)
</style>
