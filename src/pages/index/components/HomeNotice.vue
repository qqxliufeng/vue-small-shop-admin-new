<template>
<div class='h-n-notice-container'>
    <span>公告：{{title}}</span>
    <span @click="noticeDetail">详情<i class="el-icon-arrow-right"></i></span>
</div>
</template>

<script>

export default {
  name: 'homeNotice',
  props: ['title', 'identity', 'storeId'],
  data () {
    return {
    }
  },
  methods: {
    noticeDetail () {
      this.$router.push({name: 'noticeDetail', query: {identity: this.identity, storeId: this.storeId}})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-n-notice-container
    border-top #f5f5f5 solid rem(.1)
    border-bottom #f5f5f5 solid rem(.1)
    padding rem(.2)
    display flex
    align-items center
    & span:nth-child(1)
        ellipsis()
        textStyle(#333, .3)
        flex 1
    & span:nth-child(2)
        textStyle(#888, .28)
</style>
