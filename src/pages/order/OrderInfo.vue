<template>
    <div>
        <my-navi title="订单详情" :isFixed="true" :isShowBack="false"></my-navi>
        <span class="iconfont back" @click="back">&#xe625;</span>
        <div id="top" class="top"></div>
        <div class="o-i-container">
            <order-info-waiting-pay v-if="orderType === '1'" :detail="detail" @backTop="backTop"></order-info-waiting-pay>
            <order-info-waiting-use v-else-if="orderType === '2'" :detail="detail" @backTop="backTop"></order-info-waiting-use>
            <order-info-other v-else :detail="detail" @backTop="backTop"></order-info-other>
        </div>
    </div>
</template>

<script>
import orderInfoWaitingPay from './orderInfo/OrderInfoPay'
import orderInfoWaitingUse from './orderInfo/OrderInfoUse'
import orderInfoOther from './orderInfo/OrderInfoOther'
export default {
  name: 'orderInfo',
  props: {
    orderId: {
      type: String,
      default: '1'
    },
    orderType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      detail: null,
      from: null
    }
  },
  watch: {
    '$route' (newVal, oldVal) {
      if (newVal.name === 'orderInfo') {
        this.detail = null
        this.getData()
      }
    }
  },
  components: {
    orderInfoWaitingPay,
    orderInfoWaitingUse,
    orderInfoOther
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.orderDetails, {
        ord_id: this.orderId
      }, '', (data) => {
        this.detail = data.data
        if (this.orderType === '1') {
          this.detail.time = data.time
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    backTop () {
      document.querySelector('#top').scrollIntoView()
    },
    back () {
      if (this.from) {
        if (this.from.name === 'orderPayResult') {
          this.$router.replace({name: 'home'})
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.replace({name: 'home'})
      }
    }
  },
  mounted () {
    this.getData()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.from = from
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.top
    height $headerHeight
.back
    position fixed
    z-index 999
    top 0
    left 0
    padding-left rem(.3)
    display inline-block
    width rem(1)
    height $headerHeight
    line-height $headerHeight
    font-size .4rem
</style>
