<template>
    <div>
        <my-navi title="退款/售后" :isFixed="true"></my-navi>
         <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
             <ul  id="order_refund_list_item">
                 <li v-for="(item,index) of list" :key="index">
                     <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="o-l-item-card">
                        <div class="o-l-item-container" @click="orderItemClick(item)">
                            <div class="o-l-item-img-container">
                                <img v-lazy="$utils.image.getImagePath(item.scenicimage)" :key="item.scenicimage">
                            </div>
                            <div class="o-l-item-info-container">
                                <p>
                                  <span>{{item.ord_product_name}}</span>
                                  <span class="o-l-item-info-state">{{item.stateModel.stateTip}}</span>
                                </p>
                                <p>
                                  <span>{{item.stateModel.time.title}}
                                  <span>{{item.stateModel.time.time}}</span>
                                  </span>
                                </p>
                                <p>数量:{{item.ord_ticket_num}}张</p>
                                <p>金额:￥{{item.ord_amount}}</p>
                            </div>
                        </div>
                        <div class="sperator-line" v-if="item.stateModel.action1.show || item.stateModel.action2.show"></div>
                        <div class="o-l-bottom-action-container">
                            <el-button plain size="small" class="o-l-bottom-action" v-if="item.stateModel.action1.show" @click="item.stateModel.action1.action">{{item.stateModel.action1.title}}</el-button>
                            <el-button type="primary" size="small" class="o-l-bottom-action" v-if="item.stateModel.action2.show" @click="item.stateModel.action2.action">{{item.stateModel.action2.title}}</el-button>
                        </div>
                     </el-card>
                 </li>
             </ul>
         </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import CountDown from 'common/components/countdown/countdown'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'orderListItem',
  mixins: [listMixin],
  props: {
    state: Number
  },
  components: {
    MescrollVue,
    CountDown
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('order_refund_list_item', this.upCallBack),
      list: [],
      serverTime: 0
    }
  },
  methods: {
    orderItemClick (item) {
      this.$router.push({name: 'orderInfo', params: {orderId: item.ord_id.toString(), orderType: item.stateModel.orderType}})
    },
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.orderList, {
        status: '4',
        page: page.num
      }, null, (data) => {
        this.serverTime = data.time
        if (data.data && data.data instanceof Array) {
          data.data.forEach((it, index) => {
            it.stateModel = {
              orderType: '2',
              stateTip: '退款/售后',
              time: {
                title: '下单时间：',
                time: it.ord_add_time
              },
              action1: {
                title: '',
                show: false,
                action: null
              },
              action2: {
                title: '',
                show: false,
                action: null
              }
            }
          })
        }
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll, errorCode, error)
      })
    },
    countDownEnd (item) {
      item.stateModel.action2.show = false
    },
    reload () {
      this.list.length = 0
      this.$refs.mescroll.mescroll.resetUpScroll(true)
    }
  },
  mounted () {
    this.$root.$on('onReload', () => {
      if (this.$refs.mescroll) {
        this.reload()
      }
    })
  }
}
</script>
  <style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .mescroll
      mescroller()
      top $headerHeight
      height 93%
      .o-l-item-card
          margin .2rem
          .o-l-item-container
            display flex
            .o-l-item-img-container
                flex 1.2
                overflow hidden
                height 1.7rem
                & img
                  width 100%
                  height 100%
                  object-fit cover
            .o-l-item-info-container
                flex 3
                padding-left .1rem
                display flex
                flex-direction column
                justify-content space-between
                overflow hidden
                & p:nth-child(1)
                    display flex
                    & span:nth-child(1)
                        flex 3
                        overflow hidden
                        ellipsis()
                        color #333333
                        font-size .3rem
                    .o-l-item-info-state
                        text-align right
                        color #888888
                        font-size .25rem
                        line-height .3rem
                & p:nth-child(2)
                     & span:nth-child(1)
                        color #888888
                        font-size .28rem
                        .time-wrapper
                            textStyle($primary, .3)
                & p:nth-child(3) , & p:nth-child(4)
                     color #888888
                     font-size .28rem
.sperator-line
    border-bottom .02rem solid #f5f5f5
    margin .2rem 0
.o-l-bottom-action-container
    display flex
    justify-content flex-end
</style>
