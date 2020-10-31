<template>
    <div class="h-s-header-container">
        <div class="h-s-header-input-wrapper">
            <span class="iconfont h-s-back" @click="back">&#xe625;</span>
            <el-input placeholder="景点名称、关键字" v-model="searchContent">
                <i class="el-icon-search"></i>
            </el-input>
            <span class="h-s-search-action" @click="search">搜索</span>
        </div>
    </div>
</template>

<script>
import SearchHistory from 'common/mixins/search-history'
export default {
  name: 'homeSearchHeader',
  mixins: [SearchHistory],
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    search () {
      if (this.searchContent && this.$root.userInfo.isLogin()) {
        this.saveHistory(this.$root.userInfo.state.id, this.searchContent)
      }
      this.$emit('search', this.searchContent)
      this.searchContent = ''
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-s-header-container
    position fixed
    top 0
    left 0
    right 0
    height rem($headerHeight)
    z-index 999
    background #fff
    .h-s-header-input-wrapper
        display flex
        align-items center
        padding rem(.1) rem(.2)
        .h-s-back
            padding 0 rem(.15)
            font-size rem(.4)
        & >>> .el-input__inner
            height rem(.7)
            line-height rem(.7)
            border-radius rem(.1) 0 0 rem(.1)
        .h-s-search-action
            color #ffffff
            display inline-block
            width rem(1)
            height rem(.7)
            line-height rem(.7)
            padding 0 rem(.04)
            text-align center
            border-radius 0 rem(.1) rem(.1) 0
            background-color $primary
    borderBottom()
</style>
