<template>
    <el-card :body-style="{padding: 0}" class="s-d-comment-container" v-if="comment">
        <div class="s-d-comment-title-wrapper">
            <span><span class="el-icon-star-off icon"></span>综合评价：<i>{{comment.avg_mark && comment.avg_mark.toFixed(1)}}</i></span>
            <span>{{comment.count}}次评价</span>
        </div>
        <!-- <div class="s-d-comment-tags-wrapper">
            <span v-for="(item, index) of tagsList" :key="index" :class="{'s-d-comment-tags-selected': item.select}" @click="tagsClick(item)">{{item.name}}</span>
        </div> -->
        <ul v-if="comment.comment_list && comment.comment_list.length > 0">
            <li v-for="(item, index) of comment.comment_list" :key="index">
                <scenic-detail-comment-item :item="item"></scenic-detail-comment-item>
            </li>
        </ul>
        <div v-else class="s-d-l-m-message-empty">
            <span>暂无评价</span>
        </div>
    </el-card>
</template>

<script>
import ScenicDetailCommentItem from './ScenicDetailCommentItem'
export default {
  name: 'scenicDetailComment',
  props: {
    comment: Object,
    tagCanSelected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ScenicDetailCommentItem
  },
  data () {
    return {
      select: true,
      mCommentList: this.comment,
      tagsList: [
        {
          name: '极好',
          select: true,
          mark: 1
        },
        {
          name: '较好',
          select: false,
          mark: 2
        },
        {
          name: '中等',
          select: false,
          mark: 3
        },
        {
          name: '较差',
          select: false,
          mark: 4
        },
        {
          name: '很差',
          select: false,
          mark: 5
        }
      ]
    }
  },
  methods: {
    tagsClick (item) {
      if (this.tagCanSelected) {
        this.tagsList.forEach(element => {
          element.select = element === item
        })
      }
      this.$emit('tagClick', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-comment-container
    margin rem(.2)
    .s-d-comment-title-wrapper
        overflow hidden
        padding rem(.2)
        borderBottom()
        & span:nth-child(1)
            float left
            normalTextStyle(#333, .32)
            & i
                color $orangeColor
            .icon
                textStyle($orangeColor, .35)
                margin-right rem(.1)
        & span:nth-child(2)
            float right
            normalTextStyle(#888, .3)
    .s-d-comment-tags-wrapper
        padding rem(.2)
        overflow hidden
        & span
            float left
            border #f5f5f5 solid 1px
            border-radius rem(.2)
            color #333
            margin-left rem(.2)
            margin-top rem(.2)
            padding rem(.1) rem(.2)
        .s-d-comment-tags-selected
            background-color $orangeColor
            color #fff
    .s-d-l-m-message-empty
        display flex
        justify-content center
        align-items center
        min-height rem(2)
        normalTextStyle(#888, .3)
</style>
