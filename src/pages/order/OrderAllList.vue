<!--
 * @Author: your name
 * @Date: 2019-04-28 14:33:43
 * @LastEditTime: 2020-05-14 14:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /small-shop-admin/src/pages/order/OrderList.vue
 -->
<template>
  <div class="o-a-list-container">
    <my-navi
      title="我的订单"
      :isFixed="true"
      :isShowBack="false"
    >
    </my-navi>
    <order-list-item ref="allItem"></order-list-item>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
import orderListItem from './components/OrderListItem'
export default {
  name: 'orderList',
  components: {
    orderListItem
  },
  data() {
    return {
      currentRefs: null
    }
  },
  methods: {
    refundList() {
      this.$router.push({ name: 'orderRufundList' })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$refs.allItem.$refs.mescroll && vm.$refs.allItem.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.allItem.$refs.mescroll && this.$refs.allItem.$refs.mescroll.beforeRouteLeave()
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.o-a-list-container >>> .mescroll {
  top: $headerHeight;
  height: 93%;
}
</style>
