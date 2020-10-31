<template>
  <div class='s-l-i-container bg-white' v-if="item" @click="itemClick">
      <div class="h-l-like-img-wrapper">
          <img v-lazy="$utils.image.getImagePath(item.scenicimages)" :key="item.scenicimages">
      </div>
      <div class="h-l-like-info-wrapper">
        <p class="title">{{item.s_title}}</p>
        <div class="tags">
          <span v-for="(itemTag, index) of item.tag" :key="index" class="tag">
            <el-tag size="mini" :type=" index === 0 ? 'success' : 'danger'" v-if="itemTag">{{itemTag}}</el-tag>
          </span>
        </div>
        <div class="money">
          <span class="price">￥{{item.minPrice}}<i>起</i></span>
        </div>
        <div class="order-wrapper">
          <el-rate :value="Number(item.mark)"
                  disabled
                  show-score
                  text-color="#ff9900"
                  :score-template="Number(item.mark) > 0 ? '{value}分' : '暂无评价'">
          </el-rate>
          <span class="order">立即预订</span>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'scenicListItem',
  props: {
    item: Object
  },
  components: {},
  data () {
    return {
    }
  },
  methods: {
    itemClick () {
      this.$emit('itemClick', this.item)
    },
    trasformNum (num) {
      if (!num || isNaN(num) || Number(num) === 0) {
        return 0
      }
      let intNum = Number(num)
      if (intNum / 10000 >= 1) {
        return Math.floor(intNum / 10000) + '万+'
      } else {
        return intNum
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-l-i-container
    display flex
    padding rem(.2) rem(.3)
    borderBottom()
    .h-l-like-img-wrapper
        flex 1.5
        overflow hidden
        height rem(1.7)
        border-radius rem(.1)
        & img
            width 100%
            height 100%
            object-fit cover
    .h-l-like-info-wrapper
        flex 4
        padding-left .2rem
        overflow hidden
        display flex
        flex-direction column
        justify-content space-between
        position relative
        .title
            ellipsis()
            textStyle(#333, .32)
        & >>> .el-rate
            height 15px
        & >>> .el-rate__icon
            font-size 14px
            margin-right 1px
        & >>> .el-rate__text
            font-size 12px
            margin-left rem(.1)
        & >>> .el-tag
            font-size rem(.2)
        & >>> .el-tag--mini
            height rem(.35)
            line-height rem(.35)
        .tags
            .tag
                margin 0 rem(.05)
                & >>> .el-tag
                    background-color transparent
                    border-radius 1px
                & >>> .el-tag--success
                    background-color transparent
                & >>> .el-tag--danger
                    background-color transparent
        .no-comment
            textStyle(#888, .25)
        .money
            overflow hidden
            position absolute
            top rem(.5)
            right rem(.1)
            & span:nth-child(1)
                display inline-block
                normalTextStyle($primary, .35)
            & i
                display inline-block
                normalTextStyle(#cccccc, .2)
                line-height .2rem
        .order-wrapper
            display flex
            justify-content space-between
            .price
                textStyle($primary, .32)
                & > i
                    font-size rem(.25)
                    color #ccc
                    margin-left rem(.05)
            .order
                textStyle(#fff, .24)
                background-color $orangeColor
                border-radius rem(.05)
                padding rem(.08) rem(.15)
</style>
