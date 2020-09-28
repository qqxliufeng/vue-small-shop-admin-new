<template>
    <div class="o-i-back-money-container">
        <my-navi title="退款申请" :isFixed="true"></my-navi>
        <div class="o-i-back-content-container" v-if="info">
            <order-info-header stateTip="申请退款">
                <!-- <template slot="headerTitleInfo">
                    <span class="o-i-back-money-remark">
                        查看退款说明
                        <i class="el-icon-question"></i>
                    </span>
                </template> -->
                <template slot="headerTitleInfo">
                    <p class="o-i-use-info">
                        提示：申请退款，下单时所使用优惠券将无法退回你的账户
                    </p>
                </template>
                <template slot="headerBottomInfo">
                    <div>
                        <order-step></order-step>
                    </div>
                </template>
            </order-info-header>
            <p class="o-i-back-money-goods">商品</p>
            <div class="o-i-back-money-goods-info-wrapper">
                <div>
                    <img v-lazy="$utils.image.getImagePath(info.scenicimage)">
                </div>
                <div>
                    <p>{{info.ord_product_name}}</p>
                    <p>数量：{{info.ord_ticket_num}}张</p>
                    <p>总价：￥{{info.ord_amount}}</p>
                </div>
            </div>
            <div class="o-i-back-l-f">
                <span class="o-i-back-money-num">
                    退票数量
                </span>
                <span>
                    <el-input-number v-model="backNum" @change="handleChange" :min="1" :max="info.remain_num" :disabled="!canInput" size="mini"></el-input-number>
                </span>
                <p class="back-tip">{{backTip}}</p>
            </div>
            <div class="o-i-back-l-f">
                <span>
                    退款金额
                </span>
                <span>
                    <strong>￥{{backMoney.toFixed(2)}}</strong>
                </span>
            </div>
            <div>
                <p v-for="(item,index) of tempMoneyList" :key="index" class="o-i-info-money-detail">
                    <span class="span-color-1" :class="{'span-color-3': index == tempMoneyList.length - 1}">{{item.name}}</span>
                    <span class="span-color-2" :class="{'span-color-4': index == tempMoneyList.length - 1}">{{item.money}}</span>
                </p>
            </div>
            <div class="sperator-line"></div>
            <div class="o-i-back-l-f">
                <span>
                    退款原因
                </span>
                <div class="reason-list">
                    <div v-for="(item, index) of info.reason" :key="item.id" class="o-i-back-money-reason-item">
                        <el-radio v-model="radio" :label="index" @change="changeReason">{{item.reason}}</el-radio>
                    </div>
                </div>
            </div>
            <div class="sperator-line"></div>
            <p class="o-i-back-money-goods">留言</p>
            <div class="o-i-back-money-leave-message-wrapper">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="message">
                    </el-input>
            </div>
            <p class="o-i-back-money-submit" @click="submit">提交</p>
        </div>
    </div>
</template>

<script>
import orderInfoHeader from './components/OrderInfoHeader'
import orderStep from './components/OrderStep'
export default {
  name: 'orderBackMoney',
  components: {
    orderInfoHeader,
    orderStep
  },
  data () {
    return {
      isShowReasonDialog: false,
      info: null,
      radio: -1,
      charge: 0,
      textarea: '',
      backNum: 0,
      tempMoneyList: [],
      reason: null,
      message: ''
    }
  },
  computed: {
    canInput () {
    //   is_refund_part 0=部分退 ，1=一次性退完
      return this.info && this.info.is_refund_part === 0
    },
    backMoney () {
      return Number(this.backNum) * Number(this.info.ord_price)
    },
    backTip () {
      return this.info.is_refund_part === 0 ? '当前门票支持部分退款' : '当前门票仅支持全部退款'
    }
  },
  methods: {
    moneyDetailList () {
      if (this.info) {
        this.tempMoneyList.push({
          name: '单价：',
          money: '￥' + this.info.ord_price
        },
        {
          name: '数量：',
          money: 'X' + this.backNum
        })
        let charge = 0
        let chargeName = '手续费：'
        switch (this.info.is_charge) {
          case 0: // 无手续费
            charge = 0
            break
          case 1: // 每笔订单收取手续费
            charge = this.info.charge
            chargeName = '手续费(每次)：'
            break
          case 2: // 每张门票收取手续费
            charge = this.info.charge * this.backNum
            chargeName = '手续费(每张)：'
            break
        }
        this.tempMoneyList.push({
          name: chargeName,
          money: '￥' + Number(charge).toFixed(2)
        },
        {
          name: '实际退款：',
          money: '￥' + (this.backMoney - Number(charge)).toFixed(2)
        })
      }
    },
    showBackMoneyReason () {
      this.isShowReasonDialog = !this.isShowReasonDialog
    },
    getData () {
      this.$http(this.$urlPath.orderRefundDetail, {
        ord_id: this.$route.query.id
      }, '', (data) => {
        this.info = data.data
        this.backNum = this.info.remain_num
        this.moneyDetailList()
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    handleChange (num) {
      this.tempMoneyList = []
      this.backNum = num
      this.moneyDetailList()
    },
    changeReason (item) {
      this.reason = this.info.reason[item].reason
    },
    submit () {
      if (!this.reason) {
        this.$toast('请选择退款原因')
        return
      }
      this.$http(this.$urlPath.orderRefund, {
        isNoToken: true,
        ord_id: this.$route.query.id,
        num: this.backNum,
        reason: this.reason,
        message: this.message
      }, '正在提交申请…', (data) => {
        this.$toast('退款申请成功')
        this.$root.$emit('onReload')
        this.$router.go(-1)
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

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-back-money-container
    .o-i-back-content-container
        margin-top $headerHeight
        .o-i-use-info
            color #eeeeee
            font-size .25rem
            margin-top .2rem
            line-height .3rem
        .o-i-back-money-remark
            float right
            color #ffffff
            font-size .28rem
            line-height .3rem
        .o-i-back-money-goods
            color #333
            padding .3rem .2rem
            font-size .34rem
        .o-i-back-money-goods-info-wrapper
            display flex
            background-color #f5f5f5
            padding .2rem
            & div:nth-child(1)
                flex 1
                overflow hidden
                height 1.4rem
                & img
                    width 100%
                    height 100%
                    object-fit cover
            & div:nth-child(2)
                display flex
                overflow hidden
                flex 3
                flex-direction column
                justify-content space-between
                margin-left .2rem
                & p:nth-child(1)
                    color #333
                    font-size .32rem
                    line-height .35rem
                    ellipsis()
                & p:nth-child(2), & p:nth-child(3)
                    color #888
                    font-size .28rem
                    line-height .3rem
        .o-i-back-l-f
            overflow hidden
            width 100%
            padding .3rem .2rem
            font-size .28rem
            line-height .3rem
            box-sizing border-box
            borderBottom()
            & span:nth-child(2)
                float right
                color #888
                & strong
                    color $orangeColor
            & .back-tip
                textStyle(#888, .25)
                margin-top rem(.8)
                text-align right
            .o-i-back-money-num
                margin-top .14rem
            .reason-list
                border-top 1px solid #f5f5f5
                margin-top rem(.3)
                .o-i-back-money-reason-item
                    margin .4rem 0
                    & >>> label
                        display block
                    & >>> .el-radio__label
                        color #888
                        font-size rem(.2)
        .o-i-info-money-detail
            overflow hidden
            margin .2rem 0
            line-height .3rem
            padding 0 .2rem
            & span:nth-child(1)
                float left
            & span:nth-child(2)
                float right
            .span-color-1
                color #888888
                font-size .25rem
            .span-color-2
                color #333333
                font-size .25rem
            .span-color-3
                color #333333
                font-size .28rem
            .span-color-4
                color $orangeColor
                font-size .28rem
        .sperator-line
            background-color #f5f5f5
            height .1rem
        .o-i-back-money-leave-message-wrapper
            padding 0 .2rem
        .o-i-back-money-submit
            text-align center
            color #ffffff
            font-size .35rem
            line-height $headerHeight
            margin-top .3rem
            background-color $primary
        .o-i-back-money-reason-item
            margin .4rem 0
        .o-i-back-money-reason-input
            font-size .3rem
</style>
