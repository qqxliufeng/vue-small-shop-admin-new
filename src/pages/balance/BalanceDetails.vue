<template>
  <div class='b-d-detail-container'>
    <my-navi title="余额明细" :isFixed="true"></my-navi>
    <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
      <ul v-if="list && list.length > 0">
        <li v-for="item of list" :key="item.id">
           <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="item-card">
             <div class="header">
               <span class="title">{{item.typeTip}}<i class="status" :style="item.style">{{item.statusTip}}</i></span>
               <span v-if="item.type === 2">
                 提现:<i class="money">￥{{Math.abs(item.money)}}</i>,手续费:<i class="money">￥{{Math.abs(Number(item.service_charge).toFixed(2))}}</i>,实际:<i class="money">￥{{Math.abs(item.money) - Math.abs(item.service_charge)}}</i>
               </span>
               <span class="money"  v-else>￥{{item.money}}</span>
             </div>
             <div class="bottom">
               <span>{{item.create_time}}</span>
               <span>余额：￥{{item.balance}}</span>
             </div>
           </el-card>
        </li>
      </ul>
      <div id="balance-detail-container" v-else></div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'balanceDetails',
  mixins: [listMixin],
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('balance-detail-container', this.upCallBack),
      list: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.balanceLog, {
        page: page.num
      }, null, (data) => {
        data.data.forEach(element => {
          switch (element.type) {
            case 1:
              element.typeTip = '返利转余额'
              break
            case 2:
              element.typeTip = '提现'
              break
            case 3:
              element.typeTip = '提现手续费'
              break
            case 4:
              element.typeTip = '充值'
              break
            case 5:
              element.typeTip = '购买商品'
              break
            case 6:
              element.typeTip = '提现失败返回余额'
              break
            case 7:
              element.typeTip = ' 商品退款'
              break
            case 8:
              element.typeTip = '二次返利活动'
              break
            default:
              element.typeTip = '其它'
              break
          }
          switch (element.status) {
            case 1:
              element.statusTip = '进行中'
              element.style = {
                'background': '#EA782F'
              }
              break
            case 2:
              element.statusTip = '已完成'
              element.style = {
                'background': '#64BBAE'
              }
              break
            case 3:
              element.statusTip = '失败'
              element.style = {
                'background': '#f00'
              }
              break
          }
        })
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll, errorCode, error)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    mescroller()
    top $headerHeight
    height 94%
    .item-card
        margin rem(.2)
        .header
            display flex
            justify-content space-between
            .title
                textStyle(#333, .3)
                .status
                    display inline-block
                    textStyle(#fff, .2)
                    border-radius rem(.08)
                    background $primary
                    padding rem(.06) rem(.15)
                    margin-left rem(.2)
            .money
                textStyle($orangeColor, .3)
        .bottom
            margin-top rem(.2)
            display flex
            justify-content space-between
            textStyle(#888, .28)
</style>
