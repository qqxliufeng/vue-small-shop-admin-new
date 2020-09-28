<template>
    <el-card :body-style="{padding: 0}" class="s-d-l-m-message-container" v-if="ask">
        <div class="s-d-l-m-message-title">
            <span><span class="el-icon-chat-line-square icon"></span>留言板</span>
        </div>
        <div v-if="showEmpty" class="s-d-l-m-message-empty">
            <img src="../../../../assets/images/img_empty_icon.png" class="empty-img"/>
            <span>暂无留言哦~</span>
        </div>
        <div v-else class="s-d-l-m-message-info-wrapper">
            <ul>
                <li v-for="item of ask.ask_list" :key="item.aid" @click="messageItemClick(item)">
                    <div class="s-d-l-m-message-info-item">
                        <span>问</span>
                        <span>{{item.content}}</span>
                        <span>{{item.answer_count}}个回答</span>
                    </div>
                </li>
            </ul>
            <div class="s-d-l-m-message-info-see-more" @click="seeMoreLeaveMessage">
                查看全部 {{ask.ask_count || 0}} 条留言
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
  name: 'scenicDetailLeaveMessage',
  props: {
    ask: Object
  },
  computed: {
    showEmpty () {
      return !this.ask.ask_list || this.ask.ask_list.length === 0
    }
  },
  methods: {
    seeMoreLeaveMessage () {
      this.$router.push({name: 'leaveMessageList', query: {s_id: this.$parent.scenicId}})
    },
    messageItemClick (item) {
      this.$router.push({name: 'leaveMessageInfo', query: {s_id: this.$parent.scenicId, aid: item.aid}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-l-m-message-container
    margin rem(.2)
    .s-d-l-m-message-title
        overflow hidden
        padding rem(.2)
        borderBottom()
        & span:nth-child(1)
            float left
            normalTextStyle(#333, .32)
            .icon
                textStyle($orangeColor, .35)
                margin-right rem(.1)
        & span:nth-child(2)
            float right
            normalTextStyle(#888, .3)
    .s-d-l-m-message-empty
        display flex
        flex-direction column
        justify-content center
        align-items center
        min-height rem(2)
        textStyle(#888, .25)
        .empty-img
            width rem(1)
            height rem(.8)
            margin-bottom rem(.2)
    .s-d-l-m-message-info-item
        display flex
        align-items center
        padding rem(.15) rem(.2)
        & span:nth-child(1)
            background-color $orangeColor
            color #ffffff
            font-size rem(.22)
            padding rem(.03)
            border-radius rem(.05)
            line-height rem(.28)
        & span:nth-child(2)
            flex 1
            margin 0 rem(.1)
            ellipsis()
            textStyle(#666, .28)
        & span:nth-child(3)
            normalTextStyle(#888, .25)
    .s-d-l-m-message-info-see-more
        normalTextStyle(#666, .26)
        padding rem(.2)
        text-align center
        border-top #f5f5f5 solid 1px
</style>
