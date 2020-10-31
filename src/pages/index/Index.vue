<template>
  <div>
    <section v-if="loadState">
      <home-header :scrollTop="mScrollTop"></home-header>
      <div
        ref="homeContent"
        class="h-content"
        id="home"
      >
        <home-swiper :list="swiperList"></home-swiper>
        <home-notice
          v-if="notice && notice.notice_title !== undefined && notice.notice_title"
          :title="notice.notice_title"
          :identity="identity"
          :storeId="storeId"
        ></home-notice>
        <home-type :list="categoryList"></home-type>
        <div
          class="h-h-ad-wrapper"
          v-if="ad"
        >
          <img :src="$utils.image.getImagePath(ad.image)">
        </div>
        <div class="h-h-title">-&nbsp;为您推荐&nbsp;-</div>
        <home-like
          :likeList="guessList"
          @itemClick="startDetail"
          @seeMore="seeMore"
        ></home-like>
        <technology-support></technology-support>
      </div>
    </section>
    <section v-else>
      <load-fail @reload="reload"></load-fail>
    </section>
  </div>
</template>
<script>
import HomeHeader from './components/HomeHeader'
import HomeSwiper from './components/HomeSwiper'
import HomeType from './components/HomeType'
import HomeLike from './components/HomeLike'
import HomeNavi from './components/HomeNavigation'
import HomeNotice from './components/HomeNotice'
import TechnologySupport from 'common/components/technology-support'
import LoadFail from 'common/components/loading/load-fail'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeType,
    HomeLike,
    HomeNavi,
    HomeNotice,
    TechnologySupport,
    LoadFail
  },
  data() {
    return {
      mScrollTop: 0,
      isFirstLoad: true,
      guessList: [],
      swiperList: [],
      notice: {},
      ad: null,
      loadState: true,
      categoryList: [],
      time: 0
    }
  },
  methods: {
    handleScroll(target) {
      this.mScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (this.isFirstLoad) {
        document.body.scrollTop = 0
        this.isFirstLoad = false
      }
    },
    adClick() {
      this.$router.push({ name: 'adsDetail', params: { path: this.ad.ad_url } })
    },
    startDetail(item) {
      this.$router.push({ name: 'scenicDetail', query: { identity: '2', storeId: this.$root.userInfo.state.id, scenicId: item.s_id } })
    },
    reload() {
      this.getData()
    },
    changeCity() {
      this.getData()
    },
    getData() {
      this.$http(this.$urlPath.index, {}, '', (data) => {
        if (data.data) {
          this.loadState = true
          this.guessList = data.data.guess_like
          this.notice = data.data.notice
          this.swiperList = data.data.swiper
          this.ad = data.data.ad
          this.categoryList = data.data.category
          this.assist = data.data.assist
          this.time = Number(data.time)
          sessionStorage.setItem('scenicMenu', JSON.stringify(this.categoryList))
        } else {
          this.loadState = false
        }
      }, (errorCode, error) => {
        this.$toast(error)
        this.loadState = false
      })
    },
    seeMore() {
      if (this.categoryList && this.categoryList.length > 0) {
        this.$router.push({ name: 'ScenicList', query: { categoryId: this.categoryList[0].id } })
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
    this.$root.$emit('changeTab', { index: '1' })
    this.getData()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.h-content {
  .sperator-line-height {
    horizontalLine(#f5f5f5, 0.2);
  }

  .h-h-title {
    normalTextStyle(#333, 0.32);
    padding: rem(0.2);
    border-bottom: #f5f5f5 solid rem(0.02);
    text-align: center;
    background-color: #ffffff;
  }

  .h-h-ad-wrapper {
    height: rem(2);
    border-bottom: #f5f5f5 solid rem(0.2);
    background: #f5f5f5;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
