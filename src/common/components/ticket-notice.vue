<template>
  <div class='t-n-container'>
    <p class="title"><span class="title-info">{{title || ''}}</span></p>
    <ticket-remark v-for="(item, index) of remarks" :key="index" :remark="item"></ticket-remark>
  </div>
</template>
<script>
import TicketRemark from 'common/components/ticket-remark'
export default {
  name: 'ticketNotice',
  props: {
    title: String,
    remarks: Array
  },
  components: {
    TicketRemark
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.t-n-container
    .title
        padding rem(.2)
        &:before
            content ''
            width 3px
            height rem(.3)
            background-color $primary
            display inline-block
            vertical-align middle
        .title-info
            display inline-block
            margin-left rem(.3)
            color #333
            font-size rem(.32)
            vertical-align middle
            font-weight bold
</style>
