<template>
    <div class="h-t-tip-container">
        <div class="h-t-tip-wrapper" v-if="$root.userInfo.isLogin() && historyTagList && historyTagList.length > 0">
            <div class="h-t-tip-title">
                <span><i class="iconfont">&#xe62f;</i>搜索历史</span>
                <span class="el-icon-delete" @click="deleteHistory"></span>
            </div>
            <div class="h-t-tip-tags-wrapper">
                <el-tag size="small" type="info" v-for="(item, index) of historyTagList" :key="index" class="h-t-tip-tag-item" @click.native="historyTagClick(item)">{{item}}</el-tag>
            </div>
        </div>
        <!-- <div class="h-t-tip-wrapper">
            <div class="h-t-tip-title">
                <span><i class="iconfont">&#xe6a0;</i>热门搜索</span>
            </div>
            <div class="h-t-tip-tags-wrapper">
                <el-tag size="small" type="info" v-for="(item, index) of hotTagList" :key="index" class="h-t-tip-tag-item" @click.native="historyTagClick(item.s_title)">{{item.s_title}}</el-tag>
            </div>
        </div> -->
        <confirm-dialog content='是否要清空历史记录？' @dialogConfirm="dialogConfirm" ref='confirmDialog'></confirm-dialog>
    </div>
</template>

<script>
import SearchHistory from 'common/mixins/search-history'
import ConfirmDialog from 'common/components/confirm-dialog'
export default {
  name: 'homeSearchTip',
  mixins: [SearchHistory],
  data () {
    return {
      historyTagList: [],
      hotTagList: []
    }
  },
  components: {
    ConfirmDialog
  },
  methods: {
    deleteHistory () {
      this.$refs.confirmDialog.showDialog()
    },
    dialogConfirm () {
      this.clearHistory(this.$root.userInfo.state.id)
      this.historyTagList = []
    },
    historyTagClick (item) {
      this.$emit('search', item)
    },
    getData () {
      this.$http(this.$urlPath.hotSearch, {
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId
      }, '', (data) => {
        this.hotTagList = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    if (this.$root.userInfo.isLogin()) {
      let history = this.getHistory(this.$root.userInfo.state.id)
      if (history) {
        this.historyTagList = history.reverse()
      }
    }
    // this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-t-tip-container
    // contentFixed()
    margin-top $headerHeight
    .h-t-tip-wrapper
        padding rem(.2)
        .h-t-tip-title
            overflow hidden
            width 100%
            line-height rem(.4)
            & span:nth-child(1)
                float left
                normalTextStyle(#555, .3)
                line-height rem(.6)
                & i
                    color $orangeColor
                    margin-right rem(.1)
            & span:nth-child(2)
                float right
                normalTextStyle(#555, .4)
    .h-t-tip-tags-wrapper
        .h-t-tip-tag-item
            margin rem(.2)
</style>
