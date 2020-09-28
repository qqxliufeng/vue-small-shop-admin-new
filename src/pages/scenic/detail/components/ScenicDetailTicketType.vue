<template>
    <el-card :body-style="{padding: 0}" class="s-d-t-type-container" v-if="typeGoodsList && typeGoodsList.length > 0">
        <div class="s-d-t-type-title-wrapper" ref="type" @click="positionType">
          <span class="el-icon-tickets icon"></span>
          <span>{{title}}</span>
        </div>
        <div>
             <swiper :options="swiperOption" class="h-h-hot-card">
                 <swiper-slide v-for="(tabItem, index) of tempTypeGoodsList" :key="tabItem.goodsTypeId">
                     <span class="tab-item" @click="selectTabItem(index)" :class="{'tab-item-selected' : tabItem.isSelected}">{{tabItem.goodsTypeName}}</span>
                 </swiper-slide>
             </swiper>
             <ul v-if="currentTabItems && currentTabItems.length > 0" class="ticket-wrapper">
                <li v-for="item of tempCurrentTabItems" :key="item.goodsId">
                    <scenic-detail-ticket-item :item="item" @reseve-detail="reseveDetail" @share-ticket="shareTicket" @show-tip-dialog="shareTipDialog"></scenic-detail-ticket-item>
                </li>
                <div v-if="tempCurrentTabItems && tempCurrentTabItems.length < currentTabItems.length" class="show-more" @click="showMore">
                  加载更多
                </div>
            </ul>
            <div v-else class="s-d-l-m-message-empty">
                <span>暂无门票</span>
            </div>
        </div>
        <!-- <div class="dialog-tip-wrapper" v-if="dialogVisible">
          <div class="tip-bg" @click="dialogVisible = false"></div>
          <div class="dialog-content">
            <div class="content-top">
              <div class="img-wrapper">
                <img src="../../../../assets/images/img_buy_number_tip.png">
              </div>
              <div class="tip">
                <span>您还需要完成<span class="number">{{number}}</span>单才能进行底价购买哦~</span>
              </div>
              <span class="el-icon-close close" @click="dialogVisible = false"></span>
            </div>
            <div class="content-center">
              <span>您可以通过分享店铺或者分享商家、产品完成<span class="number">{{number}}</span>单后，会自动开启底价购买的功能</span>
            </div>
            <div class="content-bottom">
              <el-button size="mini" @click="dialogVisible = false">取&nbsp;&nbsp;&nbsp;消</el-button>
              <el-button type="primary" size="mini" @click="goShare">去分享</el-button>
            </div>
          </div>
        </div> -->
    </el-card>
</template>

<script>
import ScenicDetailTicketItem from './ScenicDetailTicketItem'
export default {
  name: 'scenicDetailTicketType',
  props: {
    typeGoodsList: Array,
    title: {
      type: String,
      default: '优惠信息'
    }
  },
  components: {
    ScenicDetailTicketItem
  },
  data () {
    return {
      headerHeight: 0.86 * 50,
      offsetTop: null,
      isFixed: false,
      isScroll: false,
      swiperOption: {
        slidesPerView: 5
      },
      currentTabItems: null,
      tempCurrentTabItems: null,
      tempTypeGoodsList: [],
      sliceSize: 3,
      dialogVisible: false,
      number: 0
    }
  },
  watch: {
    typeGoodsList (newVal, oldVal) {
      if (newVal && newVal.length > 0) {
        this.tempTypeGoodsList = newVal.filter((item) => {
          return item.goods_list && item.goods_list.length > 0
        })
        this.tempTypeGoodsList.forEach((item, index) => {
          this.$set(item, 'isSelected', index === 0)
        })
        if (this.tempTypeGoodsList && this.tempTypeGoodsList.length > 0) {
          this.currentTabItems = this.tempTypeGoodsList[0].goods_list
          this.tempCurrentTabItems = this.currentTabItems.slice(0, this.sliceSize)
        }
      }
    }
  },
  methods: {
    handlerScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (!this.offsetTop && this.$refs.type) {
        this.offsetTop = this.$refs.type.offsetTop
      }
      this.isFixed = scrollTop + this.headerHeight >= this.offsetTop
      this.isScroll = false
    },
    shareTipDialog (params) {
      this.number = params.number
      this.dialogVisible = true
    },
    goShare () {
      this.$router.push({name: 'scenicPostList'})
    },
    positionType () {
      if (this.isFixed) {
        document.querySelector('#tab').scrollIntoView()
        this.isScroll = true
      }
    },
    selectTabItem (index) {
      if (this.tempTypeGoodsList && this.tempTypeGoodsList.length > 0) {
        this.tempTypeGoodsList.forEach((item, i) => {
          item.isSelected = index === i
        })
        this.currentTabItems = this.tempTypeGoodsList[index].goods_list
        this.tempCurrentTabItems = this.currentTabItems.slice(0, this.sliceSize)
      } else {
        this.currentTabItems = null
        this.tempCurrentTabItems = null
      }
    },
    reseveDetail (item) {
      this.$emit('reseve-detail', item)
    },
    shareTicket (item) {
      this.$emit('share-ticket', item)
    },
    showMore () {
      this.tempCurrentTabItems = this.currentTabItems
      this.$emit('show-more')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handlerScroll)
    if (this.$refs.tabs) {
      this.offsetTop = this.$refs.type.offsetTop
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handlerScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .el-tabs__item
    color #666
>>> .is-active
    color #e18234
>>> .el-tabs__active-bar
    background-color #e18234
>>> .swiper-slide
    text-align center
.tab-item
    display inline-block
    text-align center
    line-height rem(.5)
    height rem(.5)
    margin rem(.15) 0
    color #888
    padding rem(.01) rem(.2)
    font-size rem(.28)
.tab-item-selected
    color #fff
    border-radius rem(.3)
    background-color #ffad2c
.tab-fixed
    position fixed
    top $headerHeight
    left 0
    right 0
    background-color #ffffff
    z-index 999
.tab-scroll
    margin-top 2 * $headerHeight
.s-d-t-type-container
    margin rem(.2)
    .ticket-wrapper
        border-radius rem(.1)
        background-color #f5f7f8
        margin rem(.15)
        .show-more
            text-align center
            background-color #fff
            padding rem(.1)
            padding-top rem(.2)
    .s-d-t-type-title-wrapper
        normalTextStyle(#333, .32)
        borderBottom()
        height $headerHeight
        line-height $headerHeight
        padding-left rem(.2)
        background-color #ffffff
        .icon
            textStyle($orangeColor, .35)
    .s-d-t-type-wrapper
        padding rem(.2)
    & >>> .el-tabs__nav-scroll
        margin 0 rem(.1)
    .s-d-l-m-message-empty
        display flex
        justify-content center
        align-items center
        min-height rem(2)
        normalTextStyle(#888, .3)
.dialog-tip-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 999
    display flex
    justify-content center
    align-items center
    .tip-bg
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background-color #000
        opacity .8
    .dialog-content
        width 75%
        height 90vw
        background-color #fff
        border-radius rem(.1)
        position relative
        z-index 1
        display flex
        flex-direction column
        .content-top
            background-color $primary
            border-top-left-radius rem(.1)
            border-top-right-radius rem(.1)
            position relative
            display flex
            flex-direction column
            overflow hidden
            height 60%
            .close
                position absolute
                top rem(.2)
                right rem(.2)
                z-index 1
                textStyle(#fff, .4)
            .img-wrapper
                height 70%
                text-align center
                & img
                    height 100%
            .tip
                flex 1
                padding 0 rem(.2)
                textStyle(#fff, .3)
                display flex
                flex-direction column
                justify-content center
                .number
                    textStyle(#dc4141, .5)
                    font-weight bold
                    margin 0 rem(.1)
        .content-center
            textStyle(#666, .3)
            padding rem(.2)
            line-height rem(.35)
            flex 1
            display flex
            flex-direction column
            justify-content center
        .content-bottom
            display flex
            margin-bottom rem(.4)
            justify-content space-around
</style>
