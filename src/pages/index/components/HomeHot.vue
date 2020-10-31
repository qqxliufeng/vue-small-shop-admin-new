<template>
    <div class="h-h-hot-container bg-white">
        <swiper :options="swiperOption" class="h-h-hot-card">
            <swiper-slide v-for="(item, index) of list" :key="item.goods_id">
                <el-card shadow="always" :body-style="{padding: '0'}">
                    <div class="h-h-hot-wrapper" @click="itemClick(item)">
                        <div class="h-h-hot-image-wrapper">
                            <img v-lazy="$utils.image.getImagePath(item.scenic.scenicimages)">
                            <div class="scenic-name-wrapper">
                              <div class="scenic-name-bg"></div>
                              <div class="scenic-title">
                                {{item.scenic.s_title}}
                            </div>
                        </div>
                        </div>
                        <p class="h-h-hot-wrapper-title">{{item.goodsTitle}}</p>
                        <div class="h-h-hot-wrapper-prices">
                            <span>价格：￥{{item.minPrice}}</span>
                            <!-- <span>￥{{item.retailPrice}}</span> -->
                        </div>
                        <p class="h-h-hot-wrapper-sales">销量：{{item.totalSales}}</p>
                        <div class="h-h-hot-tag-wrapper" v-if="index < 3">
                            <p>TOP</p>
                            <p>{{index+1}}</p>
                        </div>
                    </div>
                </el-card>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'homeHot',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 2.5,
        spaceBetween: 10
      }
    }
  },
  methods: {
    itemClick (item) {
      this.$router.push(
        {
          name: 'ticketDetail',
          query:
          {
            scenicId: item.scenic.s_id,
            goods_id: item.goodsId,
            identity: this.$root.state.getSallerInfo().identity,
            storeId: this.$root.state.getSallerInfo().storeId,
            goods_source: item.goods_source
          }
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-h-hot-container
    border-bottom #f5f5f5 solid rem(.2)
    .h-h-hot-card
        padding rem(.3)
        .h-h-hot-wrapper
            position relative
            .h-h-hot-image-wrapper
                height rem(2.5)
                position relative
                & img
                    width 100%
                    height 100%
                    object-fit cover
                .scenic-name-wrapper
                    position absolute
                    bottom 0
                    left 0
                    right 0
                    .scenic-name-bg
                        background-color #FFAD2E
                        opacity .8
                        position absolute
                        top 0
                        right 0
                        left 0
                        bottom 0
                    .scenic-title
                        textStyle(#fff, .25)
                        ellipsis()
                        padding rem(.08)
                        position relative
                        z-index 1
            .h-h-hot-wrapper-title
                normalTextStyle(#333, .25)
                ellipsis()
                padding rem(.25) rem(.1) rem(.05) rem(.1)
            .h-h-hot-wrapper-sales
                ellipsis()
                padding rem(.1)
                textStyle(#888, .2)
            .h-h-hot-wrapper-prices
                padding rem(.1)
                textStyle(#888, .2)
                display flex
                justify-content space-between
                & span:nth-of-type(1)
                    color $orangeColor
                & span:nth-of-type(2)
                    text-decoration line-through
            .h-h-hot-rating
                text-align center
            & >>> .el-rate__icon
                font-size 12px
                margin-right 3px
            & >>> .el-rate__text
                font-size 12px
            .h-h-hot-tag-wrapper
                position absolute
                top 0
                left 0
                background-color #D66962
                color #fff
                font-size .25rem
                padding .05rem
                text-align center
                & p:nth-child(1)
                  font-size .15rem
                  margin-bottom rem(.05)
</style>
