<template>
  <div
    class='o-i-result-container'
    v-if="detail"
  >
    <div class="navi-fixed navi-container">
      <span
        class="iconfont navi-back"
        @click="back"
      >&#xe625;</span>
      <span class="navi-title">
        支付结果
      </span>
    </div>
    <div style="height: .86rem"></div>
    <order-info-header stateTip="待使用">
      <template slot="headerTitleInfo">
        <p class="o-i-use-info">
          {{'产品已出票，' + detail.ord_play_time + '可用，请尽快使用产品'}}
        </p>
      </template>
    </order-info-header>
    <order-info-content
      :scenic="detail.scenic"
      :voucher="detail.voucher"
      :ticketName="detail.ord_product_name"
      :ticketNum="detail.ord_ticket_num"
      :sendCode="detail.send_code"
      :refundTickets="detail.refund_tickets"
      :timeLog="detail.order_log"
      :isZYB="detail.is_zyb"
      :zybUrl="detail.zybCodeUrl"
    >
    </order-info-content>
    <!-- <div class="result-icon-container">
      <span class="result-icon" :class="{'el-icon-success' : state === 1, 'el-icon-circle-close' : state === 0}"></span>
      <p class="result-icon-tip">{{state === 1 ? '支付成功' : '支付失败'}}</p>
    </div> -->
    <div class="result-action-container">
      <el-button
        size="mini"
        type="danger"
        class="button"
        @click="seeMore"
      >继续购买</el-button>
      <el-button
        size="mini"
        type="primary"
        class="button"
        v-if="orderId && state === 1"
        @click="seeOrder"
      >查看订单</el-button>
    </div>
    <scenic-info-hot
      v-if="hotGoodsList && hotGoodsList.length > 0"
      :hotGoodsList="hotGoodsList"
      @reseve-detail="reseveDetail"
      @share-ticket="shareTicket"
    ></scenic-info-hot>
  </div>
</template>

<script>
import IdMixin from 'common/mixins/id-mixin'
import OrderInfoHeader from '@/pages/order/orderInfo/components/OrderInfoHeader'
import OrderInfoContent from '@/pages/order/orderInfo/components/OrderInfoContent'
import ScenicInfoHot from '@/pages/scenic/detail/components/ScenicDetailHot'
export default {
  name: 'orderPayResult',
  mixins: [IdMixin],
  components: {
    OrderInfoHeader,
    OrderInfoContent,
    ScenicInfoHot
  },
  data() {
    return {
      no: this.$route.query.out_trade_no || '',
      orderId: this.$route.query.order_id,
      state: parseInt(this.$route.query.state || 0),
      scenicId: this.$route.query.scenic_id,
      detail: null,
      hotGoodsList: null
    }
  },
  methods: {
    seeMore() {
      this.$router.replace({ name: 'scenicDetail', query: { scenicId: this.scenicId, identity: this.identity, storeId: this.storeId } })
    },
    seeOrder() {
      this.$router.replace({ name: 'orderInfo', params: { orderId: this.orderId.toString(), orderType: '2' } })
    },
    back() {
      this.$router.replace({ name: 'home' })
    },
    getData() {
      this.$http(this.$urlPath.orderDetails, {
        ord_id: this.$route.query.order_id.toString()
      }, '', (data) => {
        this.detail = data.data
        this.getScenicInfo()
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    getScenicInfo() {
      this.$http(this.$urlPath.scenicDetail2Url, {
        s_id: this.scenicId,
        identity: this.$root.state.getSallerInfo().identity,
        store_id: this.$root.state.getSallerInfo().storeId
      }, '', (data) => {
        this.hotGoodsList = data.data.hot_goods
      }, (errorCode, error) => {
      })
    },
    reseveDetail(item) {
      this.$router.replace({ name: 'reseveDetail', query: { goods_id: item.goodsId, scenicId: this.scenicId } })
    },
    shareTicket(item) {
      if (item.is_promotion > 0) {
        this.$router.replace({ name: 'shareTicket', query: { s_id: this.scenicId, goods_id: item.goodsId, promotion_id: item.is_promotion } })
      } else {
        this.$router.replace({ name: 'shareTicket', query: { s_id: this.scenicId, goods_id: item.goodsId } })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 支付失败
      if (Number(vm.$route.query.state) === 0) {
        vm.$router.replace({ name: 'orderInfo', params: { orderId: vm.$route.query.order_id.toString(), orderType: '1' } })
      } else {
        vm.getData()
        if (from.name) {
          if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            console.log('在微信里面')
          } else {
            if (!vm.$route.query.payType) { // 如果是授信和余额购买的，则不用跳转
              vm.$router.replace({ name: 'home' })
            }
          }
        }
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.o-i-use-info {
  color: #eeeeee;
  font-size: 0.25rem;
  margin-top: 0.2rem;
  line-height: 0.3rem;
}

.result-icon-container {
  text-align: center;
  padding-top: rem(1);

  .result-icon {
    font-size: rem(1.5);
    color: $primary;
  }

  .result-icon-tip {
    textStyle(#666, 0.3);
    margin-top: rem(0.4);
  }
}

.result-action-container {
  margin: rem(0.2);
  text-align: center;
  display: flex;

  .button {
    flex: 1;
    line-height: 1;
    font-size: rem(0.3);
  }
}

.navi-container {
  height: $headerHeight;
  line-height: $headerHeight;
  background-color: #f5f5f5;
  opacity: 1;
  text-align: center;
  font-size: 0.32rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  .navi-back {
    font-size: 0.4rem;
    position: absolute;
    left: 0;
    top: 0;
    margin-left: 0.3rem;
  }

  .navi-right-action {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 0.3rem;
    font-size: 0.3rem;
  }
}

.navi-relative {
  position: relative;
}

.navi-fixed {
  position: fixed;
}
</style>
