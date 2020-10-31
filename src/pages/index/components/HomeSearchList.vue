<template>
    <div class="h-s-list-container">
      <ul v-if="resultList && resultList.length > 0">
        <li v-for="item of resultList" :key="item.s_id" @click="itemClick(item)">
          <scenic-list-item :item="item"></scenic-list-item>
        </li>
      </ul>
      <div v-else class="empty">
        暂无搜索内容
      </div>
    </div>
</template>

<script>
import ScenicListItem from './ScenicListItem'
export default {
  name: 'homeSearchList',
  props: {
    resultList: Array
  },
  components: {
    ScenicListItem
  },
  methods: {
    itemClick (item) {
      this.$router.replace({name: 'scenicDetail', query: {s: item.s_id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-s-list-container
    position fixed
    top $headerHeight
    left 0
    right 0
    height 100%
    padding-bottom rem($headerHeight)
    box-sizing border-box
    overflow-y scroll
    .empty
        display flex
        align-items center
        justify-content center
        height 100%
        textStyle(#888, .32)
    .h-l-like-wrapper
        display flex
        padding rem(.2) rem(.3)
        borderBottom()
</style>
