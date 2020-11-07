<template>
  <div class="h-h-header-container">
    <div class="header-bg"></div>
    <div class="h-h-header-wrapper">
      <span
        class="h-h-header-search"
        @click="startSearch"
      ><i class="el-icon-search"></i>搜索景点、关键字</span>
      <span
        class="iconfont h-h-header-mine"
        @click="startPersonal"
      >&#xe8a0;</span>
    </div>
    <!-- <popup ref="popup">
        <div style="padding: .5rem .3rem">
          <div v-for="item of citys" :key='item.id' class="city-wrapper" @click="cityItemClick(item)">
            <span class="city-item" :class="{'select-city-item' : item.isSelected}">{{item.name}}</span>
          </div>
        </div>
      </popup> -->
  </div>
</template>
<script>
// import popup from 'common/components/popup'
export default {
  name: 'homeHeader',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    citys: Array
  },
  // components: {
  //   popup
  // },
  computed: {
    opacityStyle() {
      let opacity = 0
      if (this.scrollTop > 0) {
        opacity = Math.min(1, this.scrollTop / 140)
      }
      return {
        opacity
      }
    },
    colorStyle() {
      return { color: this.scrollTop === 0 ? '#fff' : '#000' }
    }
  },
  methods: {
    startSearch() {
      this.$router.push({ name: 'searchGoods' })
    },
    startPersonal() {
      this.$router.replace({ name: 'personal', params: { backName: 'personal' } })
      this.$root.$emit('changeTab', { index: '4' })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.h-h-header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: rem($headerHeight);

  .city-wrapper {
    width: 25%;
    height: 12vw;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;

    .city-item {
      background-color: #f5f5f5;
      border-radius: rem(0.3);
      padding: rem(0.15) rem(0.25);
      textStyle(#333, 0.25);
      ellipsis();
    }

    .select-city-item {
      background-color: $orangeColor;
      color: #fff;
    }
  }

  .h-h-header-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 0.1rem 0.2rem;
    align-items: center;
    overflow: hidden;
    z-index: 998;

    .h-h-header-title {
      min-width: rem(0.5);
      ellipse();
      normalTextStyle(#333, 0.3);
      margin-right: rem(0.2);

      & i {
        margin-left: 0.1rem;
      }
    }

    .h-h-header-search {
      flex: 1;
      background-color: #dddddd;
      border-radius: rem(0.1);
      normalTextStyle(#888, 0.25);
      height: rem(0.6);
      line-height: rem(0.6);
      text-align: center;
      opacity: 0.5;

      & i {
        font-size: rem(0.3);
        margin-right: rem(0.15);
      }
    }

    .h-h-header-mine {
      normalTextStyle(#333, 0.45);
      margin-left: rem(0.2);
    }
  }

  .header-bg {
    height: 100%;
    background-color: #ffffff;
  }
}
</style>
