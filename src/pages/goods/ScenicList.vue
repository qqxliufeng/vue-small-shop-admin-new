<template>
  <div id="scenicListContainer">
    <scenic-header></scenic-header>
    <div class="s-l-content-wrapper">
      <mescroll-vue
        ref="mescroll"
        :down="mescrollConfig.mescrollDown"
        :up="mescrollConfig.mescrollUp"
      >
        <scenic-list-menu
          @type-item-click="menuItemClick"
          :categoryId="categoryId"
        ></scenic-list-menu>
        <scenic-type
          :tags="tags"
          @tagsClick="tagsClick"
        ></scenic-type>
        <ul v-if="list && list.length > 0">
          <li
            v-for="(item, index) of list"
            :key="index"
          >
            <scenic-list-item
              :item="item"
              @itemClick="itemClick"
            ></scenic-list-item>
          </li>
        </ul>
        <div
          v-else
          class="empty"
        >
          暂无搜索内容
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import ScenicHeader from './components/ScenicListHeader'
import ScenicType from './components/ScenicListType'
import ScenicListMenu from './components/ScenicListMenu'
import ScenicListItem from '@/pages/index/components/ScenicListItem'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mescrollConfig from 'common/utils/mescrollerConfig'
import listMixin from 'common/mixins/list-mixin'
export default {
  name: 'scenicList',
  mixins: [listMixin],
  components: {
    ScenicHeader,
    ScenicType,
    ScenicListMenu,
    MescrollVue,
    ScenicListItem
  },
  data() {
    return {
      mescrollConfig: mescrollConfig('scenicListContainer', this.upCallBack),
      list: [],
      tags: null,
      tempTag: null,
      categoryId: parseInt(this.$route.query.categoryId)
    }
  },
  methods: {
    upCallBack(page, mescroll) {
      let labelId = this.tempTag ? this.tempTag.id : 0
      this.$http(this.$urlPath.goodsList, {
        category_id: this.categoryId,
        page: page.num,
        label_id: labelId
      }, null, (data) => {
        if (!this.tags) {
          this.tags = data.data.label
        }
        this.loadSuccess(page, mescroll, data.data.data)
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadError(mescroll)
      })
    },
    tagsClick(item) {
      this.tempTag = item
      this.$refs.mescroll.mescroll.resetUpScroll(true)
    },
    itemClick(item) {
      this.$router.push({ name: 'scenicDetail', query: { scenicId: item.scenic_id, i: this.$root.state.identity, t: this.$root.state.storeId } })
    },
    menuItemClick(item) {
      this.categoryId = item.id
      this.tags = null
      this.tempTag = null
      this.$refs.mescroll.mescroll.resetUpScroll(true)
    }
  },
  mounted() {
    this.categoryId = parseInt(this.$route.query.categoryId)
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.mescroll {
  position: fixed;
  top: $headerHeight * 1.2;
  left: 0;
  right: 0;
  height: 100%;
  padding-bottom: $headerHeight * 1.2;
  box-sizing: border-box;

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    textStyle(#888, 0.32);
  }
}
</style>
