<template>
    <div class="s-l-header-container">
        <span class="iconfont s-l-header-back" @click="back">&#xe625;</span>
        <div class="s-l-header-info-wrapper">
            <!-- <span class="s-l-header-location">济南<i class="el-icon-arrow-down"></i></span> -->
            <!-- <span class="vertical-line"></span> -->
            <span class="s-l-header-input" @click="search">
                <i class="el-icon-search"></i>
                景点、门票
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ScenicListHeader',
  methods: {
    back () {
      this.$router.back()
    },
    search () {
      this.$router.push({name: 'homeSearch'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-l-header-container
    position fixed
    top 0
    left 0
    right 0
    display flex
    background-color #ffffff
    height $headerHeight * 1.2
    line-height $headerHeight  * 1.2
    align-items center
    z-index 999
    borderBottom()
    .s-l-header-back
        margin-left rem(.3)
        text-align center
        color #333
        font-size rem(.35)
    .s-l-header-info-wrapper
        background-color #f5f5f5
        border-radius rem(.1)
        flex 1
        margin 0 rem(.2)
        line-height rem(.65)
        display flex
        .s-l-header-location
            color #333
            font-size rem(.32)
            padding 0 rem(.2)
        .s-l-header-input
            color #888888
            font-size rem(.25)
            flex 1
            padding-left rem(.2)
        .vertical-line
            width 1px
            margin rem(.1)
            background-color #cccccc
</style>
