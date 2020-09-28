<template>
  <div class='o-i-result-container'>
    <div class="navi-relative navi-container">
        <span class="iconfont navi-back" @click="back">&#xe625;</span>
        <span class="navi-title">
            支付结果
        </span>
    </div>
    <div class="result-icon-container">
      <span class="result-icon" :class="{'el-icon-success' : state === 1, 'el-icon-circle-close' : state === 0}"></span>
      <p class="result-icon-tip">{{state === 1 ? '支付成功' : '支付失败'}}</p>
    </div>
    <div class="result-action-container">
      <p><el-button size="mini" type="primary" class="button" @click="confirm">确定</el-button></p>
    </div>
  </div>
</template>

<script>
import IdMixin from 'common/mixins/id-mixin'
export default {
  name: 'rechargePayResult',
  mixins: [IdMixin],
  components: {
  },
  data () {
    return {
      state: parseInt(this.$route.query.state || 1)
    }
  },
  methods: {
    confirm () {
      this.$router.replace({name: 'home'})
    },
    back () {
      this.$router.replace({name: 'home'})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.result-icon-container
    text-align center
    padding-top rem(1)
    .result-icon
        font-size rem(1.5)
        color $primary
    .result-icon-tip
        textStyle(#666, .3)
        margin-top rem(.4)
.result-action-container
    margin-top rem(1.5)
    text-align center
    & > p
        margin-top rem(.5)
    .button
        width 50%
        line-height 1.5
        font-size rem(.3)
.navi-container
    height $headerHeight
    line-height $headerHeight
    background-color #f5f5f5
    opacity 1
    text-align center
    font-size .32rem
    top 0
    left 0
    right 0
    z-index 999
    .navi-back
        font-size .4rem
        position absolute
        left 0
        top 0
        margin-left .3rem
    .navi-right-action
        position absolute
        right  0
        top 0
        margin-right .3rem
        font-size .3rem
.navi-relative
    position relative
.navi-fixed
    position fixed
</style>
