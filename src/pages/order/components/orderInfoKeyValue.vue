<template>
    <p class="o-i-info-detail-k-v">
        <span>{{title}}</span>
        <span>{{value}}</span>
    </p>
</template>

<script>
export default {
  name: 'orderInfoKeyValue',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.o-i-info-detail-k-v
    padding .1rem
    & span
        display inline-block
    & span:nth-child(1)
        width 20%
        color #888888
        margin-top .01rem
    & span:nth-child(2)
        width 70%
        margin-left 5%
        vertical-align top
        color #333333
</style>
