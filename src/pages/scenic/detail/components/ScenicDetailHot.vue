<template>
    <el-card class="s-d-hot-container" :body-style="{padding: 0}">
        <div class="s-d-hot-title-wrapper">
            <span class="iconfont s-d-hot-title-icon">&#xe6a0;</span>
            <span>热门推荐</span>
        </div>
        <ul v-if="hotGoodsList" class="ticket-wrapper">
           <li v-for="(item, index) of hotGoodsList" :key="index">
               <scenic-detail-ticket-item :item="item" @reseve-detail="reseveDetail" @share-ticket="shareTicket"></scenic-detail-ticket-item>
            </li>
        </ul>
    </el-card>
</template>

<script>
import ScenicDetailTicketItem from './ScenicDetailTicketItem'
export default {
  name: 'ScenicDetailHot',
  props: {
    hotGoodsList: Array
  },
  components: {
    ScenicDetailTicketItem
  },
  methods: {
    reseveDetail (item) {
      this.$emit('reseve-detail', item)
    },
    shareTicket (item) {
      this.$emit('share-ticket', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-hot-container
    margin rem(.2)
    .ticket-wrapper
        border-radius rem(.1)
        background-color #f5f7f8
        margin rem(.15)
    .s-d-hot-title-wrapper
        padding rem(.2)
        borderBottom()
        .s-d-hot-title-icon
            color $orangeColor
            font-size rem(.4)
            vertical-align middle
            & + span
                vertical-align middle
                font-size rem(.32)
</style>
