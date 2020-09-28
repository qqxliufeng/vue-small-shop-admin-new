<template>
  <div class='o-b-progress-container'>
    <my-navi title="退款进度" :isFixed="true"></my-navi>
    <div class="content-container">
      <ul>
        <li v-for="(item, index) in list" :key="item.rid">
          <el-card :body-style="{padding : '.2rem'}" class="el-card">
            <p class="title">
              <span>{{item.stateTip}}</span>
              <el-button type="primary" size="small" class="cancel-back" v-if="item.status === 'REFUND_STATUS'" @click="cancelBack(item)">取消退款</el-button>
            </p>
            <p class="time">申请时间：{{item.refund_create_time}}</p>
            <p class="time">更新时间：{{item.refund_update_time || '暂无'}}</p>
            <p class="time">退款金额：<i style="color:#ffad2c">￥{{item.refund_amount}}</i></p>
            <p class="time">手续费类型：{{item.refund_way}}</p>
            <p class="time">手续费：<i style="color:#ffad2c">￥{{item.refund_charge}}</i></p>
            <div class="line"></div>
            <div class="money-wrapper">
              <span class="money">退款金额<i>￥{{item.refund_actual_amount}}</i><strong>（{{item.refund_num}}张）</strong></span>
              <span class="open" @click="openInfo(item)">{{item.opened ? '收起' : '展开'}}<i :class="{'el-icon-arrow-down' : !item.opened, 'el-icon-arrow-up' : item.opened}"></i></span>
            </div>
            <div v-show="item.opened">
              <p class="time">退款账户：{{getBackPay(item)}}</p>
              <p class="time">退款单号：{{item.out_refund_no}}</p>
              <div class="time-line-wrapper">
                <el-timeline>
                    <el-timeline-item
                      v-for="progressItem in item.refund_log"
                      :key="progressItem.id"
                      :icon="progressItem.icon"
                      :type="progressItem.stateType"
                      :size="progressItem.size"
                      :timestamp="progressItem.ctime">
                      {{progressItem.des}}
                    </el-timeline-item>
                </el-timeline>
              </div>
            </div>
            <span class="index-tag">{{++index}}</span>
          </el-card>
        </li>
      </ul>
    </div>
    <confirm-dialog content="是否要取消退款？" ref="confirmDialog" @dialogConfirm="dialogConfirm"></confirm-dialog>
  </div>
</template>

<script>
import confirmDialog from 'common/components/confirm-dialog'
export default {
  name: 'orderBackProgress',
  components: {
    confirmDialog
  },
  data () {
    return {
      list: null,
      tempItem: null
    }
  },
  methods: {
    openInfo (item) {
      item.opened = !item.opened
    },
    getBackPay (item) {
      switch (item.refund_pay_type) {
        case 'alipay':
          return '支付宝'
        case 'wechatpay':
          return '微信'
        case 'credit':
          return '授信'
        case 'balance':
          return '余额'
      }
    },
    getData () {
      this.$http(this.$urlPath.orderAfterSalesLog, {
        ord_id: this.$route.query.id
      }, '', (data) => {
        if (data.data && data.data instanceof Array) {
          this.list = data.data
          this.list.forEach(item => {
            this.$set(item, 'opened', false)
            switch (item.status) {
              case 'REFUND_STATUS':
                item.stateTip = '退款审核中'
                break
              case 'REFUND_STATUS_YES':
                item.stateTip = '审核成功'
                break
              case 'REFUND_STATUS_NO':
                item.stateTip = '审核失败'
                break
              case 'REFUND_STATUS_CANCEL':
                item.stateTip = '取消退款'
                break
              case 'REFUND_PAY':
                item.stateTip = '待退款'
                break
              case 'REFUND_PAY_YES':
                item.stateTip = '退款完成'
                break
              case 'REFUND_PAY_NO':
                item.stateTip = '退款失败'
                break
              case 'REFUND_THIRD_STATUS':
                item.stateTip = '第三方待审核'
                break
            }
            item.refund_log.forEach(item => {
              switch (item.type) {
                case 1:
                  item.des = '提交退款申请'
                  break
                case 2:
                  item.des = '退款审核通过'
                  item.icon = 'el-icon-success'
                  item.stateType = 'primary'
                  item.size = 'large'
                  break
                case 3:
                  item.des = '退款审核失败'
                  item.stateType = 'danger'
                  item.icon = 'el-icon-error'
                  item.size = 'large'
                  break
                case 4:
                  item.des = '退款支付成功'
                  item.icon = 'el-icon-success'
                  item.stateType = 'primary'
                  item.size = 'large'
                  break
                case 5:
                  item.des = '取消退款成功'
                  item.icon = 'el-icon-success'
                  item.stateType = 'primary'
                  item.size = 'large'
                  break
              }
            })
          })
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    cancelBack (item) {
      this.tempItem = item
      this.$refs.confirmDialog.showDialog()
    },
    dialogConfirm () {
      if (this.tempItem) {
        this.$http(this.$urlPath.orderCancelRefund, {
          rid: this.tempItem.rid
        }, '正在取消…', (result) => {
          this.$root.$emit('onReload')
          this.$toast('取消退款成功')
          this.getData()
        }, (errorCode, error) => {
          this.$toast(error)
        })
      }
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
.o-b-progress-container
    padding-top $headerHeight
    padding-bottom rem(.5)
    .el-card
        margin rem(.2)
        position relative
        .title
            textStyle(#333, .35)
            line-height rem(.5)
            .cancel-back
                height rem(.5)
                line-height 0
                margin 0 rem(.2)
        .time
            textStyle(#555, .28)
            margin rem(.3) 0
        .line
            background #f5f5f5
            height 1px
            width 100%
            margin rem(.2) 0
        .money-wrapper
            display flex
            justify-content space-between
            align-items center
            .money
                textStyle(#333, .3)
                & i
                  color $orangeColor
                & strong
                  color #aaa
                  font-size rem(.25)
            .open
                textStyle($primary, .3)
        .time-line-wrapper
            margin-top rem(.5)
        .index-tag
            background $primary
            display inline-block
            width rem(.5)
            line-height rem(.5)
            text-align center
            position absolute
            right 0
            top 0
            color #fff
            font-size rem(.28)
</style>
