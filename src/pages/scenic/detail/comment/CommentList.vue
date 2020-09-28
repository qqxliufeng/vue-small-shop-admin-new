<template>
    <div id="commentList" class='c-l-comment-list-container'>
        <my-navi title="评论列表" :isFixed="true"></my-navi>
        <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp" @init="mescrollInit">
          <div class="s-d-comment-container" v-if="comment">
              <div class="s-d-comment-title-wrapper">
                  <span>综合评价：<i>{{comment.avg_mark}}</i></span>
                  <span>{{comment.count}}次评价</span>
              </div>
              <div class="s-d-comment-tags-wrapper">
                  <span v-for="(item, index) of tagsList" :key="index" :class="{'s-d-comment-tags-selected': item.select}" @click="tagsClick(item)">{{item.name}}</span>
              </div>
              <ul>
                  <li v-for="(item, index) of list" :key="index">
                      <scenic-detail-comment-item :item="item"></scenic-detail-comment-item>
                  </li>
              </ul>
          </div>
        </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import ScenicDetailCommentItem from '../components/ScenicDetailCommentItem'
import listMixins from 'common/mixins/list-mixin'
export default {
  name: 'commentList',
  mixins: [listMixins],
  components: {
    MescrollVue,
    ScenicDetailCommentItem
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('commentList', this.upCallback),
      mescroll: null,
      comment: null,
      list: [],
      mark: 0,
      tagsList: [
        {
          name: '所有',
          select: true,
          mark: 0
        },
        {
          name: '极好',
          select: false,
          mark: 5
        },
        {
          name: '较好',
          select: false,
          mark: 4
        },
        {
          name: '中等',
          select: false,
          mark: 3
        },
        {
          name: '较差',
          select: false,
          mark: 2
        },
        {
          name: '很差',
          select: false,
          mark: 1
        }
      ]
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.$http(this.$urlPath.commentListUrl, {
        s_id: this.$route.params.scenicId,
        page: page.num,
        mark: this.mark
      }, null, (data) => {
        this.comment = data.data
        this.loadSuccess(page, mescroll, this.comment.comment_list)
      }, (errorCode, error) => {
        this.loadError(mescroll)
      })
    },
    tagsClick (tag) {
      this.mark = tag.mark
      this.tagsList.forEach(element => {
        element.select = element === tag
      })
      this.list.splice(0, this.list.length)
      this.mescroll.resetUpScroll(true)
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
        height 100%
        padding-bottom $headerHeight
        box-sizing border-box
        background #ffffff
        .s-d-comment-container
            border-top #f5f5f5 solid rem(.1)
            .s-d-comment-title-wrapper
                overflow hidden
                padding rem(.2)
                borderBottom()
                & span:nth-child(1)
                    float left
                    normalTextStyle(#333, .35)
                    & i
                        color $orangeColor
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
</style>
