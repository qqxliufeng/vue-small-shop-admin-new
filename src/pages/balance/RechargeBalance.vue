<template>
<div class='r-b-recharge-container'>
  <my-navi title="充值"></my-navi>
  <div class="recharge-input-container">
    <p class="title-tip">充值金额</p>
    <div class="input-wrapper">
      <span class="input-money-tag">￥</span>
      <input class="input-money" type="text" v-model="rechargeMoney">
    </div>
  </div>
  <div class="select-type-container">
    <p class="title-tip">充值方式</p>
    <div class="input-wrapper">
      <div class="type-wrapper" @click="typeClick(1)" v-if="!$isWeiXin">
        <img :src="imgZFBIcon" class="img">
        <span class="type-name">支付宝</span>
        <el-radio v-model="selectType" label="1" class="radio"></el-radio>
      </div>
      <div class="sperator"></div>
      <div class="type-wrapper" @click="typeClick(2)" v-if="!$isAliPay">
        <img :src="imgWXIcon" class="img">
        <span class="type-name">微信</span>
        <el-radio v-model="selectType" label="2" class="radio"></el-radio>
      </div>
    </div>
  </div>
  <el-button type="primary" class="submit" @click="recharge">确定</el-button>
</div>
</template>

<script>
import imgZFBIcon from 'images/img_zfb_icon.png'
import imgWXIcon from 'images/img_weixin_icon.png'
export default {
  name: 'rechargeBalance',
  components: {},
  data () {
    return {
      imgZFBIcon,
      imgWXIcon,
      selectType: this.$isWeiXin ? '2' : '1',
      rechargeMoney: '',
      wxPayInfo: null
    }
  },
  methods: {
    typeClick (type) {
      this.selectType = type + ''
    },
    recharge () {
      if (!this.rechargeMoney) {
        this.$toast('请输入充值金额')
        return
      }
      if (!this.$utils.validator.isMoney(this.rechargeMoney)) {
        this.$toast('请输入合法的金额')
        return
      }
      this.$http(this.$urlPath.rechargeBalanc, {
        amount: this.rechargeMoney,
        pay_type: this.selectType === '1' ? 'alipay' : 'wechat'
      }, '正在提交…', (data) => {
        if (this.selectType === '1') { // 支付宝
          const div = document.createElement('div')
          div.innerHTML = data.data
          document.body.appendChild(div)
          document.forms[0].submit()
        } else if (this.selectType === '2') { // 微信
          if (this.$isWeiXin) { // 是不是微信客户端
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
              this.$router.replace({name: 'rechargePayResult', query: {state: '1'}})
            } else {
              this.$router.replace({name: 'rechargePayResult', query: {state: '0'}})
            }
          })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-b-recharge-container
    background #F0F4F5
    height 100vh
    .recharge-input-container
        background #fff
        padding-bottom rem(.2)
        .title-tip
            padding rem(.3)
            textStyle(#555, .32)
        .input-wrapper
            borderBottom()
            height rem(.8)
            line-height rem(.8)
            margin rem(.3)
            overflow hidden
            .input-money-tag
                textStyle(#555, .5)
                font-weight bold
            .input-money
                font-weight bold
                display inline-block
                line-height rem(.8)
                width 90%
                textStyle(#555, .48)
                padding-bottom rem(.2)
    .select-type-container
        margin-top rem(.2)
        background #fff
        .title-tip
            padding rem(.3)
            textStyle(#555, .32)
        .sperator
            height 1px
            background #f5f5f5
            margin rem(.2) rem(.3)
        .type-wrapper
            padding rem(.3)
            .img
                width rem(.45)
                height rem(.45)
                line-height rem(.45)
                vertical-align middle
            .type-name
                vertical-align middle
                textStyle(#555, .32)
                margin-left rem(.2)
            .radio
                float right
                line-height rem(.45)
            & >>> .el-radio__label
                display none
    .submit
        width 80%
        display block
        margin rem(1) auto
</style>
