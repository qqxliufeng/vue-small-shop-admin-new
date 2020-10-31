<template>
    <div class="s-l-tags-container">
      <div v-for="(item, index) of tagsList" :key="index" @click="itemClick(item)" class="item-wrapper">
        <span class="s-l-tags-item"
              :class="{ 's-l-tags-item-selected': item.selected }">
            {{item.name}}
        </span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ScenicListType',
  props: {
    tags: Array
  },
  data () {
    return {
      tagsList: null
    }
  },
  watch: {
    tags (newVal, oldVal) {
      if (newVal) {
        this.tagsList = this.tags
        this.tagsList.forEach((element, index) => {
          this.$set(element, 'selected', index === 0)
        })
      }
    }
  },
  methods: {
    itemClick (item) {
      this.tagsList.forEach(element => {
        element.selected = element === item
      })
      this.$emit('tagsClick', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-l-tags-container
    padding-top rem(.1)
    .item-wrapper
        display inline-block
        width 25%
        height 10vw
        line-height 10vw
        text-align center
        .s-l-tags-item
            display inline-block
            line-height 4vw
            width 60%
            background-color #f5f5f5
            padding rem(.1) rem(.2)
            color #888
            font-size rem(.24)
            border-radius rem(.3)
        .s-l-tags-item-selected
            background-color $orangeColor
            color #fff
</style>
