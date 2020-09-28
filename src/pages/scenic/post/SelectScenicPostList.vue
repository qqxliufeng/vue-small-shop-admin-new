<template>
<div class='s-p-list-container'>
  <my-navi title="选择要分享的商家" :isFixed="true"></my-navi>
  <div class="content">
    <ul v-if="scenicPostList">
      <li v-for="item of scenicPostList" :key="item.id" class="scenic-post-item-wrapper" @click="startScenicPost(item)">
        <el-card shadow="always" :bodyStyle="{padding: '0'}">
          <img class="item-image" v-lazy="$utils.image.getImagePath(item.poster_image)" :key="item.poster_image">
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
</div>
</template>

<script>

export default {
  name: 'scenicPostList',
  components: {},
  data () {
    return {
      scenicPostList: null,
      scenicName: ''
    }
  },
  methods: {
    startScenicPost (item) {
      this.$router.push({name: 'shareSelectScenic', query: {scenic_id: item.scenic_id, sid: item.store_id}})
    },
    makeMoney (item) {
      if (Number(item.min_price) === 0) {
        return item.max_price
      }
      return '最高返:￥' + item.max_price
    },
    getData () {
      this.$http(this.$urlPath.selectScenicPosterList, {
        scenic_id: this.$route.query.scenic_id
      }, '正在加载…', (data) => {
        this.scenicPostList = data.data
        if (!this.scenicPostList || this.scenicPostList.length === 0) {
          this.$toast('暂无景区海报')
        }
        this.scenicName = ''
      }, (errorCode, error) => {
        this.$toast(error)
        this.scenicName = ''
      })
    },
    searchPost () {
      if (this.scenicPostList) {
        this.scenicPostList.length = 0
        this.scenicPostList = null
      }
      this.getData()
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
.s-p-list-container
    .content
        // contentFixed()
        padding-top $headerHeight
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
                .item-info
                    line-height rem(.5)
                    overflow hidden
                    & span:nth-child(1)
                        float left
                        textStyle($orangeColor, .25)
                    & span:nth-child(2)
                        float right
                        textStyle(#888, .25)
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
        .empty-list
            height 80vh
            display flex
            align-items center
            justify-content center
            textStyle(#888, .32)
</style>
