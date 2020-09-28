<template>
<div class='s-p-list-container'>
  <my-navi title="我要分享" :isFixed="true"></my-navi>
  <div class="content">
      <el-tabs v-model="activeName" stretch @tab-click="tabClick">
        <el-tab-pane label="分享店铺" name="first">
          <div class="item-wrapper">
            <share-shop></share-shop>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分享商家" name="second">
          <div class="item-wrapper">
            <ul v-if="scenicPostList">
              <li v-for="item of scenicPostList" :key="item.id" class="scenic-post-item-wrapper" @click="startScenicPost(item)">
                <el-card shadow="always" :bodyStyle="{padding: '0'}">
                  <img class="item-image" v-lazy="getScenicImage(item)" :key="getScenicImage(item)">
                  <div class="item-info-wrapper">
                    <p class="item-title">{{item.scenic_name}}</p>
                    <div class="item-make-money">
                      <span class="fen">分</span>
                      <span class="price">{{makeMoney(item)}}</span>
                    </div>
                  </div>
                </el-card>
              </li>
            </ul>
            <div v-else class="empty-list">
              暂无商家海报
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分享商品" name="third">
          <div class="item-wrapper">
            <ul v-if="goodsPostList">
              <li v-for="item of goodsPostList" :key="item.id" class="scenic-post-item-wrapper" @click="startGoodsPost(item)">
                <el-card shadow="always" :bodyStyle="{padding: '0'}">
                  <img class="item-image" v-lazy="getScenicImage(item)" :key="getScenicImage(item)">
                  <div class="item-info-wrapper">
                    <p class="item-title">{{item.scenic_name}}</p>
                    <p class="item-lvxingshe">{{item.goods_name}}</p>
                    <div class="item-make-money">
                      <span class="fen">分</span>
                      <span class="price">￥{{item.price}}起</span>
                    </div>
                  </div>
                </el-card>
              </li>
            </ul>
            <div v-else class="empty-list">
              暂无商品海报
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</div>
</template>

<script>
import ShareShop from '@/pages/share/ShareShop'
export default {
  name: 'scenicPostList',
  components: {
    ShareShop
  },
  data () {
    return {
      scenicPostList: null,
      goodsPostList: null,
      scenicName: '',
      activeName: 'first'
    }
  },
  computed: {
    showSearch () {
      return this.$route.params.type !== '1'
    }
  },
  methods: {
    makeMoney (item) {
      if (Number(item.min_price) === 0) {
        return item.max_price
      }
      return '最高返:￥' + item.max_price
    },
    startScenicPost (item) {
      this.$router.push({name: 'shareScenic', query: {scenic_id: item.scenic_id, store_id: item.store_id}})
    },
    startGoodsPost (item) {
      this.$router.push({name: 'shareTicket', query: {s_id: item.scenic_id, goods_id: item.goods_id}})
    },
    getScenicData () {
      this.$http(this.$urlPath.scenicPosterList, {
        scenic_name: this.scenicName,
        type: '1'
      }, '正在加载…', (data) => {
        this.scenicPostList = data.data.filter((item) => {
          return this.getScenicImage(item)
        })
      }, (errorCode, error) => {
      })
    },
    getGoodsData () {
      this.$http(this.$urlPath.scenicPosterList, {
        scenic_name: this.scenicName,
        type: '2'
      }, '正在加载…', (data) => {
        this.goodsPostList = data.data.filter((item) => {
          return this.getScenicImage(item)
        })
      }, (errorCode, error) => {
      })
    },
    tabClick (params) {
      if (params.name === 'second') {
        if (this.scenicPostList) {
          return
        }
        this.getScenicData()
      } else if (params.name === 'third') {
        if (this.goodsPostList) {
          return
        }
        this.getGoodsData()
      }
    },
    searchPost () {
      if (this.scenicPostList) {
        this.scenicPostList.length = 0
        this.scenicPostList = null
      }
      this.getData()
    },
    getScenicImage (item) {
      if (item.poster_image) {
        return this.$utils.image.getImagePath(item.poster_image)
      } else if (item.share_image) {
        return this.$utils.image.getImagePath(item.share_image)
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-p-list-container
    .content
        & >>> .el-tabs__header
            margin 0
            z-index 1
            background-color #fff
        padding-top $headerHeight
        position relative
        .item-wrapper
            position fixed
            top $headerHeight + .8rem
            left 0
            right 0
            bottom 0
            overflow-y scroll
        .search-wrapper
            background #ffffff
            height $headerHeight
            line-height $headerHeight
            padding 0 rem(.2)
            border-bottom 1px solid #f5f5f5
            .input-content
                background #f5f5f5
                border-radius rem(.05)
                padding rem(.08)
                width 80%
            .button-search
                background $primary
                padding rem(.05) rem(.2)
                color #fff
                border-radius rem(.1)
                margin-left rem(.1)
                width 15%
        .scenic-post-item-wrapper
            width 50%
            float left
            padding rem(.2)
            box-sizing border-box
            .item-image
                width 100%
                height rem(4)
                object-fit cover
            .item-info-wrapper
                padding 0 rem(.2)
                .item-title
                    ellipsis()
                    normalTextStyle(#333, .3)
                .item-lvxingshe
                    normalTextStyle(#888, .28)
                    ellipsis()
                .item-make-money
                    line-height rem(.5)
                    .fen
                        background-color $orangeColor
                        border-radius 50%
                        padding rem(.05)
                        font-size rem(.2)
                        display inline-block
                        width rem(.3)
                        height rem(.3)
                        line-height rem(.3)
                        text-align center
                        color #fff
                        vertical-align middle
                    .price
                        color $orangeColor
                        vertical-align middle
                .item-info
                    line-height rem(.5)
                    overflow hidden
                    & span:nth-child(1)
                        float left
                        textStyle($orangeColor, .25)
                    & span:nth-child(2)
                        float right
                        textStyle(#888, .25)
        .empty-list
            height 80vh
            display flex
            align-items center
            justify-content center
            textStyle(#888, .32)
</style>
