<template>
<div class='n-list-container' id="notify_list">
  <my-navi title="公告列表" :isFixed="true"></my-navi>
  <mescroll-vue ref="mescroll" :down="mescrollConfig.mescrollDown" :up="mescrollConfig.mescrollUp">
    <ul>
      <li v-for="(item, index) of notifyList" :key="index" class="item">
        <div class="item-content">{{item.name}}</div>
        <div class="item-info">
          <span>2019-18-18 11:11:11</span>
          <span>删除</span>
        </div>
      </li>
    </ul>
  </mescroll-vue>
</div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
export default {
  name: 'notifyList',
  components: {
    MescrollVue
  },
  data () {
    return {
      mescrollConfig: mescrollConfig('notify_list', this.upCallback),
      notifyList: []
    }
  },
  methods: {
    upCallback (page, mescroll) {
      setTimeout(() => {
        this.notifyList.push({
          name: '这是一个好的公告，你可以看看，这真的是一个好的公告，我从不骗小狗的，哈哈'
        })
        this.notifyList.push({
          name: '这是一个好的公告，你可以看看，这真的是一个好的公告，我从不骗小狗的，哈哈'
        })
        this.notifyList.push({
          name: '这是一个好的公告，你可以看看，这真的是一个好的公告，我从不骗小狗的，哈哈'
        })
        this.notifyList.push({
          name: '这是一个好的公告，你可以看看，这真的是一个好的公告，我从不骗小狗的，哈哈'
        })
        if (page.num > 4) {
          mescroll.endSuccess(0)
        } else {
          mescroll.endSuccess(10)
        }
      },
      1000)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.mescroll
    fixMescroller()
.n-list-container
    .item
        padding rem(.2)
        border-bottom rem(.1) solid #f5f5f5
        .item-content
            textStyle(#333, .3)
        .item-info
            overflow hidden
            margin-top rem(.2)
            & span:nth-child(1)
                textStyle(#888, .25)
                float left
            & span:nth-child(2)
                textStyle($primary, .25)
                float right
</style>
