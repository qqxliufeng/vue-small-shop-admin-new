<template>
  <div class="h-s-container">
    <swiper
      v-if="list.length > 1"
      :options="swiperData"
      ref="swiper"
    >
      <swiper-slide
        v-for="item of list"
        :key="item.id"
      >
        <div>
          <img
            :src="$utils.image.getImagePath(item.image)"
            class="h-s-img"
          >
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'homeSwiper',
  props: {
    list: Array
  },
  data() {
    return {
      swiperOptionSlide: {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        on: {
          click: () => {
            this.startScenicDetail(this.$refs.swiper.swiper.realIndex)
          }
        }
      },
      swiperOptionNoSlide: {
        loop: false,
        on: {
          click: () => {
            this.startScenicDetail(this.$refs.swiper.swiper.realIndex)
          }
        }
      }
    }
  },
  computed: {
    swiperData() {
      return this.list && this.list.length > 1 ? this.swiperOptionSlide : this.swiperOptionNoSlide
    }
  },
  methods: {
    startScenicDetail(item) {
      this.$router.push({ name: 'scenicDetail', query: { identity: '2', storeId: this.$root.userInfo.state.id, scenicId: this.list[item].scenic_id } })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.h-s-container {
  overflow: hidden;
  width: 100%;
  padding-bottom: 47%;
  height: 0;
  margin-top: $headerHeight;

  .h-s-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
