<template>
    <div class="h-l-like-container">
        <ul v-if="likeList.length > 0">
            <li v-for="item of likeList" :key="item.s_id">
                <scenic-list-item :item="item" @itemClick="itemClick"></scenic-list-item>
            </li>
            <p class="h-l-sell-more" @click="seeMore">查看更多</p>
        </ul>
        <p v-else class="empty">暂无信息哦~</p>
    </div>
</template>

<script>
import ScenicListItem from './ScenicListItem'
export default {
  name: 'homeLike',
  props: {
    likeList: Array
  },
  components: {
    ScenicListItem
  },
  methods: {
    seeMore () {
      this.$emit('seeMore')
    },
    itemClick (item) {
      this.$emit('itemClick', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-l-like-container
    .h-l-like-wrapper
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
            & p:nth-child(1)
                ellipsis()
                normalTextStyle(#333, .32)
            & p:nth-child(2)
                muitlLineEllipsis(2)
                normalTextStyle(#888, .25)
                line-height rem(.32)
                margin-top rem(.1)
            & p:nth-child(3)
                overflow hidden
                margin-top rem(.1)
                & span:nth-child(1)
                    display inline-block
                    normalTextStyle($primary, .35)
                & i
                    display inline-block
                    normalTextStyle(#cccccc, .2)
                    line-height .2rem
                    margin-left rem(.1)
                & span:nth-child(3)
                    display inline-block
                    normalTextStyle(#888888, .22)
                    float right
                    margin-top rem(.11rem)
    .h-l-sell-more
        margin 0 auto
        normalTextStyle(#333333, .3)
        text-align center
        padding .2rem
        border-bottom #f5f5f5 solid rem(.2)
    .empty
        textStyle(#888, .3)
        text-align center
        padding rem(1)
</style>
