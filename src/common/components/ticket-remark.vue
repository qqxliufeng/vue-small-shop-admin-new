<template>
<div class="r-d-ticket-info-remark-content-wrapper">
    <!-- <p class="r-d-ticket-info-remark-content-title">{{remarkInfo.title}}</p> -->
    <p class="r-d-ticket-info-remark-content-title-info" v-if="value">
        <span class="remark-key">
            {{remark.title}}
        </span>
        <span class="remark-value" :style="{color: specialList.includes(remark.title) ? '#ffad2c' : '#888'}" v-html="value || '暂无'"></span>
    </p>
</div>
</template>

<script>

export default {
  name: 'ticketRemark',
  props: {
    remark: Object
  },
  data () {
    return {
      specialList: ['适用人群:', '退款规则:', '换票时间:', '入园时间:', '产品说明:']
    }
  },
  computed: {
    value () {
      if (this.remark) {
        for (let key in this.remark) {
          if (key === 'title') {
            continue
          }
          return this.remark[key]
        }
      } else {
        return '暂无'
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-d-ticket-info-remark-content-wrapper
    margin rem(.3) 0
    .r-d-ticket-info-remark-content-title
        padding rem(.1)
        vertical-align bottom
        font-size rem(.3)
        &::before
            content ""
            display inline-block
            width 2px
            height rem(.3)
            margin-right rem(.2)
            background-color $primary
            vertical-align bottom
    .r-d-ticket-info-remark-content-title-info
        margin-left .55rem
        & span
            display inline-block
        .remark-key
            color #333333
            width 20%
            vertical-align top
            line-height rem(.4)
        .remark-value
            width 75%
            color #888888
            line-height rem(.4)
            vertical-align top
            white-space pre-line
</style>
