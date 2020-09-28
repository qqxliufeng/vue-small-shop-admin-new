<template>
  <div id="leaveMessageList" class='l-m-list-container'>
    <my-navi title="留言列表" :isFixed="true"></my-navi>
    <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
      <ul v-if="list">
        <li v-for="item of list" :key="item.aid">
          <leave-message-item :item="item"></leave-message-item>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import LeaveMessageItem from './components/LeaveMessageItem'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'leaveMessageList',
  mixins: [listMixin],
  components: {
    MescrollVue,
    LeaveMessageItem
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('leaveMessageList', this.upCallback),
      list: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      this.$http(this.$urlPath.askListUrl, {
        s_id: this.$route.query.s_id,
        page: page.num
      }, null, (data) => {
        this.loadSuccess(page, mescroll, data.data)
      }, (errorCode, error) => {
        this.loadError(mescroll)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    mescroller()
    top $headerHeight
    height 100%
    padding-bottom $headerHeight * 2
    box-sizing border-box
.l-m-list-ask
    line-height $headerHeight
    textStyle(#ffffff, .3)
    background $primary
    position fixed
    bottom 0
    left 0
    right 0
    text-align center
</style>
