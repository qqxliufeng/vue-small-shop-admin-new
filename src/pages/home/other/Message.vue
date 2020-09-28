<template>
   <div>
     <my-navi title="我的消息" class="navi" :isFixed="true"></my-navi>
     <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
      <ul class="content" id="message-list">
          <li v-for="item of list" :key="item.id" class="m-tabs-item-li" @click="itemClick(item.id)">
            <div class="m-s-title-container">
              <span class="m-s-title">{{item.title}}</span>
            </div>
            <div class="m-s-content" v-html="item.content"></div>
            <p class="m-s-time">{{item.create_time}}</p>
          </li>
        </ul>
      </mescroll-vue>
   </div>
</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'message',
  mixins: [listMixin],
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('message-list', this.upCallBack),
      list: []
    }
  },
  methods: {
    upCallBack (page, mescroll) {
      this.$http(this.$urlPath.getMessage, {
        page: page.num
      }, null, (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll, errorCode, error)
      }
      )
    },
    itemClick (index) {
      this.$router.push({name: 'messageDetail', query: {mid: index}})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.content
    margin-top $headerHeight
    padding rem(.2)
    .m-tabs-item-li
        borderBottom()
        padding .2rem 0
        .m-s-title-container
            overflow hidden
            display flex
            flex-direction row
            justify-content space-around
            .m-s-title
                color #333333
                font-size .32rem
                ellipsis()
                flex 1
        .m-s-time
            text-align right
            margin-top rem(.2)
            color #888888
        .m-s-content
            display inline-block
            margin-top .2rem
            line-height .35rem
            height 1.28rem
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 5
            text-indent rem(.3)
            color #6F6F6F !important
            font-size .25rem !important
            & span
                color #6F6F6F !important
                font-size .25rem !important
            & p
                color #6F6F6F !important
                font-size .25rem !important
                & span
                    color #6F6F6F !important
                    font-size .25rem !important
</style>
