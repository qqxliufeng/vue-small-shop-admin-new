<template>
<div class='r-b-recharge-container'>
  <my-navi title="返利转余额">
     <template slot="rightAction">
        <span @click="bebateTransferLog">明细</span>
      </template>
  </my-navi>
  <div class="recharge-input-container">
    <p class="title-tip">转换金额</p>
    <div class="input-wrapper">
      <span class="input-money-tag">￥</span>
      <input class="input-money" type="text" maxlength="10" v-model="transferMoney">
      <span class="all-money" @click="allMoneyTransfer">全部转入</span>
    </div>
    <p class="tip-no-input">当前返利：<i>￥{{Number($root.userInfo.state.rebate).toFixed(2)}}</i>，转换最底金额：<i>￥{{Number(minimun).toFixed(2)}}</i></p>
  </div>
  <el-button type="primary" class="submit" @click="transfer">确定</el-button>
</div>
</template>

<script>
export default {
  name: 'rebateToBalance',
  components: {},
  data () {
    return {
      minimun: 0,
      transferMoney: ''
    }
  },
  methods: {
    typeClick (type) {
      this.selectType = type + ''
    },
    allMoneyTransfer () {
      if (Number(this.$root.userInfo.state.rebate) < Number(this.minimun)) {
        this.$toast('当前返利金额小于最底数额')
      } else {
        this.transferMoney = Number(this.$root.userInfo.state.rebate)
      }
    },
    getData () {
      this.$http(this.$urlPath.rebateTransferBalance, {}, '', (data) => {
        this.minimun = data.data.minimum_transfer
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    transfer () {
      if (Number(this.$root.userInfo.state.rebate) < Number(this.minimun)) {
        this.$toast('当前返利金额小于最底数额')
        return
      }
      if (!this.$utils.validator.isMoney(this.transferMoney)) {
        this.$toast('请输入合法的金额')
        return
      }
      if (Number(this.transferMoney) < Number(this.minimun)) {
        this.$toast('转入金额最少 ￥' + this.minimun)
        return
      }
      this.$http(this.$urlPath.rebateTransferBalance, {
        amount: this.transferMoney
      }, '正在转入…', (data) => {
        this.$toast('转入余额成功')
        this.$root.userInfo.setUserInfoRebate(data.data.rebate)
        this.transferMoney = ''
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    bebateTransferLog () {
      this.$router.push({name: 'rebateDetails'})
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
input[disabled]
    background #ffffff
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
            position relative
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
                width 75%
                textStyle(#555, .48)
                padding-bottom rem(.2)
            .all-money
                position absolute
                right 0
                top 0
                textStyle($primary, .28)
        .tip-no-input
            padding 0 rem(.3)
            textStyle(#888, .25)
            line-height rem(.3)
            & i
                textStyle($primary, .25)
    .select-type-container
        margin rem(.2) 0
        padding-bottom rem(.2)
        background #fff
        .title-tip
            padding rem(.3)
            textStyle(#555, .32)
        .sperator
            height 1px
            background #f5f5f5
            margin rem(.2) rem(.3)
        .type-wrapper
            padding rem(.1) rem(.3)
            .img
                width rem(.4)
                height rem(.4)
                line-height rem(.4)
                vertical-align middle
            .type-name
                vertical-align middle
                textStyle(#555, .3)
                margin-left rem(.2)
            .radio
                float right
                line-height rem(.4)
            & >>> .el-radio__label
                display none
        .account-input
            width 90%
            overflow hidden
            height rem(.8)
            margin-top rem(.2)
            display block
            margin 0 rem(.3)
            borderBottom()
            box-sizing border-box
    .submit
        width 80%
        display block
        margin rem(1) auto
</style>
