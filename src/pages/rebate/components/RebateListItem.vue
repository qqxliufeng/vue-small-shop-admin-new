<template>
  <div class='r-l-item-container'>
      <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
        <ul :id="'rebate-list-item-container' + state">
          <li v-for="item of list" :key="item.id">
            <el-card shadow="always"  :body-style="{ padding: '.2rem' }" class="item-card">
              <div class="info-container">
                <img v-lazy="$utils.image.getImagePath(imagePath(item.scenic_image))" class="img" :key="item.scenic_image">
                <div class="info-wrapper">
                  <p class="title">{{item.ord_product_name || '暂无'}}</p>
                  <p class="vip">会员号：{{item.ord_uid || '暂无'}}</p>
                  <p class="num">购买数量：{{item.number || 0}}张</p>
                  <p class="time">下单时间：{{item.create_time || '暂无'}}</p>
                </div>
              </div>
              <div class="status-wrapper">
                <span class="scenic-title">{{item.scenic_name}}</span>
                <el-button size="mini" class="status" :type="buttonStateType" round>{{buttonStateTip}}：￥{{item.rebate_amount}}</el-button>
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
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'rebateListItem',
  mixins: [listMixin],
  props: {
    state: String
  },
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('rebate-list-item-container' + this.state, this.upCallBack),
      list: []
    }
  },
  computed: {
    buttonStateType () {
      switch (this.state) {
        case '1':
          return 'success'
        case '2':
          return 'warning'
        case '3':
          return 'primary'
        case '4':
          return 'danger'
      }
    },
    buttonStateTip () {
      switch (this.state) {
        case '1':
          return '已返利'
        case '2':
          return '待返利'
        case '3':
          return '伙伴待返利'
        case '4':
          return '未付款待返利'
      }
    }
  },
  methods: {
    imagePath (srcImage) {
      if (srcImage) {
        return srcImage.split(',')[0]
      }
      return ''
    },
    upCallBack (page, mescroll) {
      if (page.num === 1) {
        this.list = []
      }
      this.$http(this.$urlPath.rebateLog, {
        type: this.state + '',
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
.r-l-item-container
    padding-left rem(.2)
    padding-right rem(.2)
    .item-card
        margin rem(.2)
        .info-container
            display flex
            flex-direction row
            borderBottom()
            padding-bottom rem(.2)
            .img
                width rem(1.8)
                height rem(1.8)
                border-radius rem(.1)
                background #f5f5f5
                border 0px solid #f5f5f5
                object-fit cover
            .info-wrapper
                flex 1
                margin-left rem(.2)
                display flex
                flex-direction column
                justify-content space-around
                overflow hidden
                .title
                    ellipsis()
                    textStyle(#333, .3)
                    line-height rem(.32)
                .vip
                    textStyle(#888, .25)
                    line-height rem(.28)
                .num
                    textStyle(#888, .25)
                    line-height rem(.28)
                .time
                    textStyle(#888, .25)
                    line-height rem(.28)
        .status-wrapper
            display flex
            align-items center
            padding-top rem(.2)
            .scenic-title
                flex 1
                textStyle(#333, .3)
                ellipsis()
                margin-right rem(.1)
</style>
