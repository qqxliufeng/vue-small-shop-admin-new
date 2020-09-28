<template>
  <div class='select-route-site-container'>
    <div class="title">乘车时间/地点</div>
    <div>
      <div v-for="(item, index) of mSite" :key="index" class="item" :class="{'item-selected': item.isSelected}" @click="itemClick(index)">
        <span class="time">时间:{{item.time}}</span>
        <span class="address">地点:{{item.site}}</span>
        <span style="flex: 1"></span>
        <span class="el-icon-check icon" v-if="item.isSelected"></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'selectRouteSite',
  props: {
    routeSites: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      mSite: []
    }
  },
  methods: {
    itemClick (mIndex) {
      this.mSite.forEach((it, index) => {
        it.isSelected = mIndex === index
      })
      this.$emit('route-item-click', this.mSite[mIndex])
    }
  },
  mounted () {
    this.routeSites.forEach((item) => {
      this.mSite.push(item)
      this.$set(item, 'isSelected', false)
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.select-route-site-container
    border-top 5px solid #f5f5f5
    .title
        padding rem(.2)
        textStyle(#333, .3)
        border-bottom 1px solid #f5f5f5
    .item
        margin rem(.3) rem(.2)
        border-radius rem(.1)
        border 1px solid #f5f5f5
        padding rem(.13)
        textStyle(#666, .28)
        display flex
        align-items center
        .address
            margin-left rem(.1)
        .icon
            font-size rem(.28)
    .item-selected
        color $orangeColor
        border 1px solid $orangeColor
</style>
