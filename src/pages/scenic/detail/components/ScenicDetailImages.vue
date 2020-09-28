<template>
    <div class="s-d-images-container">
        <swiper :options="swiperOption" v-if="imageList && imageList.length > 0" ref="swiper">
            <swiper-slide v-for="(item, index) of imageList" :key="index">
                <img :src="$utils.image.getImagePath(item)" class="s-d-images-item">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'scenicDetailImages',
  props: {
    imageList: Array
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.s-d-images-container
    height 0
    padding-bottom 50%
    overflow hidden
    .s-d-images-item
        width 100%
        height 100%
        object-fit cover
</style>
