<template>
    <div>
        <my-navi title="支付"></my-navi>
        <div class="o-i-pay-container" v-if="info">
            <div class="o-i-pay-time-wrapper">
                <p>剩余支付时间</p>
                <count-down :time="info.timeout_express * 1000" @end="countDownEnd">
                    <template v-slot="props">
                        <div class="time-wrapper">
                            {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                        </div>
                    </template>
                </count-down>
            </div>
            <div class="o-i-pay-goods-info-wrapper">
                <div>
                    <img v-lazy="$utils.image.getImagePath(info.scenicimages)">
                </div>
                <div>
                    <p>{{info.goods_title}}</p>
                    <p>￥{{info.price}}</p>
                </div>
            </div>
            <div class="o-i-pay-goods-info-money-add">
                <span>￥{{info.price}}</span>
                <span>x{{info.num}}</span>
            </div>
            <div class="sperator-line"></div>
            <div class="o-i-pay-goods-info-money">
                <span>支付金额</span>
                <span>￥{{info.amount}}</span>
            </div>
            <div class="sperator-line-height"></div>
            <div class="o-i-pay-goods-info-money">
                <span>请选择支付方式</span>
            </div>
            <div class="sperator-line"></div>
            <ul class="o-i-pay-type-wrapper">
                <li class="o-i-pay-type-zfb-wrapper" v-for="(item, index) of filterPayItemList" :key="index" @click="payItemClick(item)">
                    <img :src="item.icon">
                    <span>{{item.name}}</span>
                    <i :class="[item.isChecked ? 'el-icon-circle-check' : 'icon-style']"></i>
                </li>
            </ul>
            <p class="o-i-pay-action" @click="pay">支付</p>
        </div>
    </div>
</template>

<script>
import imgZFBIcon from 'images/img_zfb_icon.png'
import imgWXIcon from 'images/img_weixin_icon.png'
import imgYEIcon from 'images/img_yue_icon.png'
import imgSXIcon from 'images/img_shouxin_icon.png'
import CountDown from 'common/components/countdown/countdown'
export default {
  name: 'orderInfoPay',
  components: {
    CountDown
  },
  data () {
    return {
      payItemList: [
        {
          name: '支付宝',
          icon: imgZFBIcon,
          isChecked: false,
          isShow: !this.$isWeiXin,
          payType: 'alipay'
        },
        {
          name: '微信',
          icon: imgWXIcon,
          isChecked: false,
          isShow: !this.$isAliPay,
          payType: 'wechatpay'
        },
        {
          name: '余额支付',
          icon: imgYEIcon,
          isChecked: false,
          isShow: true,
          payType: 'balance'
        },
        {
          name: '授信支付',
          icon: imgSXIcon,
          isChecked: false,
          isShow: true,
          payType: 'credit'
        }
      ],
      info: null,
      payType: '',
      wxPayInfo: null
    }
  },
  computed: {
    filterPayItemList () {
      let filterArray = []
      this.payItemList.forEach(item => {
        if (item.isShow) {
          filterArray.push(item)
        }
      })
      return filterArray
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.orderPayUrl, {
        isNoToken: true,
        out_trade_no: this.$route.query.no
      }, '', (data) => {
        this.info = data.data
        this.info.timeout_express = this.info.timeout_express - data.time
      }, (errorCode, error) => {
        this.$toast(error)
        this.$router.go(-1)
      })
    },
    payItemClick (item) {
      this.payType = item.payType
      this.filterPayItemList.forEach(element => {
        element.isChecked = item === element
      })
    },
    countDownEnd () {
      this.$toast('订单结束，未支付，请重新下单')
      this.$router.go(-1)
    },
    pay () {
      if (!this.payType) {
        this.$toast('请选择支付方式')
        return
      }
      this.$http(this.$urlPath.orderPay, {
        isNoToken: true,
        out_trade_no: this.$route.query.no,
        pay_type: this.payType
      }, '正在支付…', (data) => {
        if (this.payType === 'alipay') { // 支付宝
          const div = document.createElement('div')
          div.innerHTML = data.data
          document.body.appendChild(div)
          document.forms[0].submit()
        } else if (this.payType === 'balance' || this.payType === 'credit') { // 余额支付 或者 是授信支付
          this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, state: '1', scenic_id: this.info.scenic_id, order_id: data.data.order_id, payType: this.payType}})
        } else if (this.payType === 'wechatpay') { // 微信
          if (this.$isWeiXin) { // 判断是不是微信客户端
            this.wxPayInfo = data.data
            if (typeof WeixinJSBridge === 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
              }
            } else {
              this.onBridgeReady()
            }
          } else {
            window.location.href = data.data
          }
        }
      }, (errorCode, error) => {
        this.$toast(error)
        if (this.payType === 'alipay') {
          this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, state: '0', scenic_id: this.info.scenic_id, order_id: ''}})
        }
      })
    },
    onBridgeReady () {
      if (this.wxPayInfo) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            'appId': this.wxPayInfo.appId,
            'timeStamp': this.wxPayInfo.timeStamp,
            'nonceStr': this.wxPayInfo.nonceStr,
            'package': this.wxPayInfo.package,
            'signType': this.wxPayInfo.signType,
            'paySign': this.wxPayInfo.paySign
          }, (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, scenic_id: this.info.scenic_id, state: '1', order_id: this.info.order_id}})
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              this.$toast('用户取消支付')
              this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, scenic_id: this.info.scenic_id, state: '0', order_id: this.info.order_id}})
            } else {
              this.$router.replace({name: 'orderPayResult', query: {out_trade_no: this.$route.query.no, scenic_id: this.info.scenic_id, state: '0', order_id: this.info.order_id}})
            }
          })
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-pay-time-wrapper
    borderBottom()
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding .5rem
    & p:nth-child(1)
        color #888
        font-size .28rem
        line-height .32rem
    .time-wrapper
        color #333
        font-size .5rem
        line-height .52rem
        margin-top .2rem
.o-i-pay-goods-info-wrapper
    display flex
    padding .2rem
    borderBottom()
    margin-bottom 3px
    & div:nth-child(1)
        flex 1
        height 1rem
        overflow hidden
        & img
            width 100%
            height 100%
            object-fit cover
    & div:nth-child(2)
        flex 5
        padding-left .2rem
        box-sizing border-box
        display flex
        flex-direction column
        justify-content space-between
        overflow hidden
        & p:nth-child(1)
            ellipsis()
            color #333
            font-size .3rem
            line-height .32rem
        & p:nth-child(2)
            color $primary
            font-size .32rem
            line-height .34rem
.o-i-pay-goods-info-money
    overflow hidden
    padding rem(.3)
    & span:nth-child(1)
        normalTextStyle(#333, .3)
        vertical-align middle
        &::before
            beforeLine()
            margin-bottom 3px
    & span:nth-child(2)
        float right
        normalTextStyle($orangeColor, .28)
.sperator-line
    horizontalLine(#f5f5f5, .02, 0, .4)
.o-i-pay-goods-info-money-add
    overflow hidden
    padding rem(.3)
    borderBottom()
    & span:nth-child(1)
        float left
        normalTextStyle(#888888, .28)
    & span:nth-child(2)
        float right
        normalTextStyle(#333, .28)
.sperator-line-height
    horizontalLine(#f5f5f5, .2)
.o-i-pay-action
    padding rem(.2)
    background-color $primary
    position fixed
    left 0
    bottom 0
    right 0
    text-align center
    normalTextStyle(#ffffff, .3)
.o-i-pay-type-wrapper
    padding 0 rem(.3)
    padding-bottom $headerHeight
    .o-i-pay-type-zfb-wrapper
        overflow hidden
        padding rem(.3) 0
        borderBottom()
        & img
            width rem(.5)
            height rem(.5)
            vertical-align middle
            margin-right rem(.2)
        & span
            normalTextStyle(#333333, .3)
            vertical-align middle
        & i
            textStyle($primary, .44)
            vertical-align middle
            float right
            margin-top 2px
        .icon-style
            width rem(.4)
            height rem(.4)
            border 1px solid #cccccc
            border-radius 50%
            padding rem(.01)
            box-sizing border-box
</style>
