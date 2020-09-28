<template>
    <div>
         <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
             <ul id="order_list_item_all">
                 <li v-for="(item,index) of list" :key="index">
                     <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="o-l-item-card">
                       <div class="title-wrapper">{{item.scenic.s_title}}</div>
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
                                    <count-down :time="item.stateModel.time.time"
                                                v-if="item.status === 'PAY_STATUS_NO'"
                                                @end="countDownEnd(item)">
                                        <template slot-scope="props">
                                            <span class="time-wrapper">
                                                {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                                            </span>
                                        </template>
                                    </count-down>
                                    <span v-else>{{item.stateModel.time.time}}</span>
                                  </span>
                                </p>
                                <p>数量：{{item.ord_ticket_num}}张</p>
                                <p>
                                  <span>总价：￥{{item.ord_amount}}</span>
                                  <span style="float: right; color: #333">详情</span>
                                </p>
                            </div>
                        </div>
                        <div class="sperator-line" v-if="item.stateModel.action1.show || item.stateModel.action2.show"></div>
                        <div class="o-l-bottom-action-container">
                            <div style="flex: 1"></div>
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
  components: {
    MescrollVue,
    CountDown
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('order_list_item_all', this.upCallBack),
      list: [],
      serverTime: 0
    }
  },
  methods: {
    orderItemClick (item) {
      this.$router.push({name: 'orderInfo', params: {orderId: item.ord_id.toString(), orderType: item.stateModel.orderType}})
    },
    reBuyTicket (item) {
      return {
        title: '再来一单',
        show: true,
        action: () => {
          this.$router.push({name: 'scenicDetail', query: {identity: '2', storeId: this.$root.userInfo.state.id, scenicId: item.ord_scenicId}})
        }
      }
    },
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.orderList, {
        status: this.$route.query.type,
        page: page.num
      }, null, (data) => {
        this.serverTime = data.time
        if (data.data && data.data instanceof Array) {
          data.data.forEach((it, index) => {
            switch (it.status) {
              case 'PAY_STATUS_NO': // 待付款
                it.stateModel = {
                  orderType: '1',
                  stateTip: '待付款',
                  time: {
                    title: '剩余支付时间：',
                    time: Math.max(0, (Number(it.timeout_express) - Number(this.serverTime)) * 1000)
                  },
                  action1: {
                    title: '取消订单',
                    show: true,
                    action: () => {
                      let confirm = window.confirm('是否要取消此订单？')
                      if (confirm) {
                        this.$http(this.$urlPath.orderCancel, {
                          ord_id: it.ord_id
                        }, '正在取消…', (result) => {
                          this.reload()
                          this.$toast('订单取消成功')
                        }, (errorCode, error) => {
                          this.$toast(error)
                        })
                      }
                    }
                  },
                  action2: {
                    title: '立即支付',
                    show: Number(it.timeout_express) - Number(this.serverTime) > 0,
                    action: () => {
                      this.$router.push({name: 'orderInfoPay', query: {no: it.out_trade_no}})
                    }
                  }
                }
                break
              case 'USE_STATUS_NO': // 未使用
                it.stateModel = {
                  orderType: '2',
                  stateTip: '已支付',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: it.is_refund === 1 ? '申请退款' : '',
                    show: it.is_refund === 1,
                    action: it.is_refund ? () => {
                      this.$router.push({name: 'orderBackMoney', query: {id: it.ord_id}})
                    } : null
                  }
                }
                // if (it.refund && it.refund.refund_status === 0) {
                //   it.stateModel.stateTip = '退款中'
                //   it.stateModel.action2.title = '取消退款'
                //   it.stateModel.action2.show = true
                //   it.stateModel.action2.action = () => {
                //     let confirm = window.confirm('是否要取消退款？')
                //     if (confirm) {
                //       this.$http(this.$urlPath.orderCancelRefund, {
                //         rid: it.refund.rid
                //       }, '正在取消…', (result) => {
                //         this.reload()
                //         this.$root.$emit('onReload')
                //         this.$toast('取消退款成功')
                //       }, (errorCode, error) => {
                //         this.$toast(error)
                //       })
                //     }
                //   }
                // }
                break
              case 'NO_COMMENT':
              case 'USE_STATUS': // 已使用
                it.stateModel = {
                  orderType: '3',
                  stateTip: '已完成',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: '去评价',
                    show: false,
                    action: () => {
                      this.$router.push({name: 'orderComment', query: {orderId: it.ord_id.toString()}})
                    }
                  }
                }
                break
              case 'USE_STATUS_OFF': // 取消
                it.stateModel = {
                  orderType: '6',
                  stateTip: '已取消',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: '删除订单',
                    show: true,
                    action: () => {
                      let confirm = window.confirm('是否要删除此订单？')
                      if (confirm) {
                        this.$http(this.$urlPath.orderDelete, {
                          ord_id: it.ord_id
                        }, '正在删除…', (result) => {
                          this.reload()
                          this.$toast('订单删除成功')
                        }, (errorCode, error) => {
                          this.$toast(error)
                        })
                      }
                    }
                  }
                }
                break
              case 'USE_STATUS_EXPIRE': // 已过期
                it.stateModel = {
                  orderType: '7',
                  stateTip: '已过期',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: '删除订单',
                    show: true,
                    action: () => {
                      let confirm = window.confirm('是否要删除此订单？')
                      if (confirm) {
                        this.$http(this.$urlPath.orderDelete, {
                          ord_id: it.ord_id
                        }, '正在删除…', (result) => {
                          this.reload()
                          this.$toast('订单删除成功')
                        }, (errorCode, error) => {
                          this.$toast(error)
                        })
                      }
                    }
                  }
                }
                break
              case 'ALREADY_COMMENT': // 已经评价
                it.stateModel = {
                  orderType: '5',
                  stateTip: '已完成',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: '',
                    show: false,
                    action: null
                  }
                }
                break
              case 'USE_STATUS_REVOKE': // 退款
                it.stateModel = {
                  orderType: '4',
                  stateTip: '退款/售后',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: '',
                    show: false,
                    action: null
                  }
                }
                break
              case 'USE_STATUS_OVER': // 订单已完结
                it.stateModel = {
                  orderType: '9',
                  stateTip: '已完成',
                  time: {
                    title: '下单时间：',
                    time: it.ord_add_time
                  },
                  action1: this.reBuyTicket(it),
                  action2: {
                    title: '',
                    show: false,
                    action: null
                  }
                }
                break
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
      this.list = []
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
      .o-l-item-card
          margin .2rem
          .title-wrapper
            textStyle(#333, .3)
            borderBottom()
            margin rem(.1) 0
            margin-top 0
            padding rem(.2) 0
          .o-l-item-container
            display flex
            padding-top rem(.1)
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
                        flex 1
                        text-align right
                        color $orangeColor
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
</style>
