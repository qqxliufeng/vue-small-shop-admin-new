<template>
  <div class='production-detail-container' v-if="details">
    <my-navi title="产品详情" :isFixed="true"></my-navi>
    <div style="height: .86rem"></div>
    <div id="content">
      <div class="header-swiper-wrapper">
        <el-carousel height="160px" arrow="never">
          <el-carousel-item v-for="(item, index) of details.image" :key="index">
            <img style="width: 100%" :src="$utils.image.getImagePath(item)">
          </el-carousel-item>
        </el-carousel>
        <div class="header-serial-number-wrapper">
          <div class="serial-number-bg"></div>
          <p class="serial-number">团号：{{details.goods.serial_number}}</p>
        </div>
      </div>
      <div class="top-price-wrapper">
        <span class="min-price"><i>￥</i>{{Number(details.goods.minPrice).toFixed(2)}}</span>
        <span class="retail-price"><i>￥</i>{{Number(details.goods.retailPrice).toFixed(2)}}</span>
        <span style="flex: 1"></span>
        <span class="mark">{{details.avg_mark}}分</span>
      </div>
      <div class="header-goods-info-wrapper">
        <div class="title-wrapper">
          <span class="title">{{details.goods.goodsTitle}}</span>
        </div>
        <div class="second-title">
          {{details.goods.title}}
        </div>
        <div class="goods-tags-wrapper">
          <span v-for="(item, index) of details.goods.tags" :key="index" class="tag">
            {{item}}
          </span>
          <span class="sales">已售{{details.goods.totalSales}}</span>
        </div>
        <div class="store-info-wrapper">
          <div class="store-face-wrapper">
            <img :src="$utils.image.getImagePath(details.store.image)">
          </div>
          <div class="store-info">
            <div class="name">
              {{details.store.store_name}}
            </div>
            <div class="phone">
              {{details.store.phone}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <production-tab>
      <template>
        <div class="content" id="item1" style="padding: 0 .2rem">
          <div class="content-header" v-if="details.goods.categoryId === 14">
            乘车信息
          </div>
          <div style="padding: .2rem" v-if="details.goods.categoryId === 14">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) of details.goods.route"
                :key="index"
                :timestamp="item.site">
                {{item.time}}
              </el-timeline-item>
            </el-timeline>
          </div>
          <div v-if="details.goods.categoryId === 14" class="img-wrapper">
            <img :src="details.route_image">
          </div>
          <div class="content-header">
            预订须知
          </div>
          <div>
            <ticket-remark v-for="(item, index) of entrance" :key="index" :remark="item" :itemStyle="{marginLeft: '.2rem'}"></ticket-remark>
          </div>
        </div>
        <div class="content" id="item2" style="padding: 0 .2rem">
          <div class="content-header">
            费用说明
          </div>
          <div>
            <ticket-remark v-for="(item, index) of details.goods.explain" :key="index" :remark="item" :itemStyle="{marginLeft: '.2rem'}"></ticket-remark>
          </div>
        </div>
        <div class="content" id="item3">
          <div class="content-header">
            产品说明
          </div>
          <div v-html="details.goods.details" id="item1-content" style="line-height: .45rem"></div>
        </div>
      </template>
    </production-tab>
    <div class="sperator-line"></div>
    <div class="bottom-submit-wrapper">
      <div class="price-wrapper">价格：<span class="price">￥{{Number(details.goods.minPrice).toFixed(2)}}</span></div>
      <div style="flex: 1"></div>
      <div class="store-index" @click="back">返回商家</div>
      <div class="submit" @click="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
import ProductionTab from './components/ProductionTab'
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'ProductionDetail',
  components: {
    ProductionTab,
    TicketRemark
  },
  data () {
    return {
      details: null
    }
  },
  computed: {
    entrance () {
      return this.details ? this.details.goods.entrance.concat(this.details.goods.refund) : []
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.goodsDetailUrl2, {
        goods_id: this.$route.query.goodsId
      }, '', (res) => {
        this.details = res.data
        this.$nextTick(() => {
          const imgs = document.getElementById('item1-content').getElementsByTagName('img')
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].style = 'width: 100%'
            if (imgs[i].src.startsWith('http')) {
              imgs[i].src = 'https://www.liuyiqinzi.com/uploads' + imgs[i].src.split('uploads')[1]
            } else {
              imgs[i].src = 'https://www.liuyiqinzi.com/uploads' + imgs[i].src
            }
          }
        })
      }, (errorCode, error) => {})
    },
    submit () {
      this.$router.push({name: 'reseveDetail', query: { goods_id: this.details.goods.goods_id, scenicId: this.details.goods.scenicId }})
    },
    back () {
      this.$router.back()
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
.production-detail-container
    .header-swiper-wrapper
        position relative
        .header-serial-number-wrapper
            position absolute
            right 0
            bottom 0
            margin-bottom rem(.15)
            margin-right rem(.15)
            z-index 99
            .serial-number-bg
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                background-color #000
                border-radius rem(.3)
                opacity .7
            .serial-number
                textStyle(#fff, .25)
                position relative
                z-index 1
                padding rem(.08) rem(.1)
                display flex
                align-items center
    .top-price-wrapper
        display flex
        align-items center
        background-color #dc4040
        padding rem(.2)
        .min-price
            textStyle(#fff, .35)
        .retail-price
            textStyle(#ffffff, .28)
            margin-left rem(.2)
            text-decoration line-through
        .mark
            background-color $orangeColor
            border-radius rem(.05)
            textStyle(#fff, .25)
            line-height rem(.32)
            padding 0 rem(.1)
        & i
            textStyle(#fff, .2)
    .header-goods-info-wrapper
        padding rem(.2)
        .title-wrapper
            display flex
            .title
                flex 1
                textStyle(#333, .32)
        .second-title
            padding rem(.2) 0
            textStyle(#666, .28)
    .goods-tags-wrapper
        overflow hidden
        .tag
            background-color #4cd964
            textStyle(#fff, .2)
            border-radius rem(.05)
            margin-right rem(.1)
            padding rem(.02) rem(.1)
        .sales
            float right
            textStyle(#666, .25)
    .store-info-wrapper
        border-top 1px solid #f5f5f5
        border-bottom 1px solid #f5f5f5
        display flex
        margin rem(.2) 0
        padding rem(.2) 0
        margin-bottom 0
        .store-face-wrapper
            width rem(.8)
            height rem(.8)
            & img
                background-color #f5f5f5
                border-radius 50%
                width 100%
                height 100%
        .store-info
            display flex
            justify-content space-between
            flex-direction column
            margin-left rem(.2)
            .name
                textStyle(#333, .3)
            .phone
                textStyle(#333, .3)
    .content
        background #ffffff
        padding rem(.2)
        .img-wrapper
            width 100%
            & img
                width 100%
                object-fit cover
        .content-header
            &::before
                content '|'
                color $orangeColor
                background-color $orangeColor
                width 2px
                margin-right rem(.1)
            textStyle(#333, .3)
            padding rem(.2) 0
        .comment-empty
            textStyle(#888, .3)
            display flex
            justify-content center
            align-items center
            min-height rem(2)
    .sperator-line
        height $headerHeight
    .bottom-submit-wrapper
        box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
        height $headerHeight
        position fixed
        left 0
        right 0
        bottom 0
        z-index 9
        background-color #fff
        display flex
        align-items center
        .price-wrapper
            textStyle(#333, .28)
            padding 0 rem(.2)
            .price
                textStyle($orangeColor, .3)
                font-weight bold
        .submit
            background-color $orangeColor
            color #fff
            height 100%
            display flex
            align-items center
            padding 0 rem(.4)
            font-size rem(.3)
        .store-index
            background-color #dc4040
            color #fff
            height 100%
            display flex
            align-items center
            padding 0 rem(.4)
            font-size rem(.3)
</style>
