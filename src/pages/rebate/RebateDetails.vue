<template>
  <div class='b-d-detail-container'>
    <my-navi title="返利转出记录" :isFixed="true"></my-navi>
    <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
      <ul v-if="list && list.length > 0">
        <li v-for="item of list" :key="item.id">
           <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="item-card">
             <div class="header">
               <span class="title">返利转余额<i class="status" style="background: #64BBAE">已完成</i></span>
               <span class="money">￥{{item.money}}</span>
             </div>
             <div class="bottom">
               <span>{{item.create_time}}</span>
               <span>返利剩余：￥{{item.remainder_rebate}}</span>
             </div>
           </el-card>
        </li>
      </ul>
      <div v-else id="rebate-detail-container"></div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'rebateDetails',
  mixins: [listMixin],
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('rebate-detail-container', this.upCallBack),
      list: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.transferBalanceLog, {
        page: page.num
      }, null, (data) => {
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
                textStyle($primary, .3)
        .bottom
            margin-top rem(.2)
            display flex
            justify-content space-between
            textStyle(#888, .28)
</style>
