<template>
  <div class="scenic-type-list-container bg-white">
    <div ref="wrapper">
      <ul
        class="scroll-view-h"
        :style="{'width': wrapperWidth + 'px'}"
      >
        <li
          v-for="(item, index) of tempList"
          :key="index"
          style="display: inline-block; width: 20vw; height: 80%;"
          :id="item.itemId"
        >
          <div
            class="h-t-type-wrapper"
            @click="homeTypeClick(item)"
          >
            <img
              :src="$utils.image.getImagePath(item.image)"
              class="h-t-type-icon"
              :class="{ 'selected-type-image': item.isSelected }"
            />
            <p
              class="h-t-type-title"
              :class="{ 'selected-type-text': item.isSelected }"
            >{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <el-card
      class="more-wrapper"
      @click.native="showMore"
    >
      <img
        src="../../../assets/images/img_more_icon.png"
        class="icon"
      />
      <p class="title">更多</p>
    </el-card>
    <popup ref='popup'>
      <div
        v-for="(item, index) of dialogTempList"
        :key="index"
        style="display: inline-block; width: 20%; height: 25vw;"
      >
        <div
          class="type-wrapper"
          @click="dialogItemClick(item)"
        >
          <img
            :src="$utils.image.getImagePath(item.image)"
            class="type-icon"
            :class="{ 'selected-type-image': item.isSelected }"
          />
          <p
            class="type-title"
            :class="{ 'selected-type-text': item.isSelected }"
          >{{item.name}}</p>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import popup from 'common/components/popup'
import Bscroll from 'better-scroll'
export default {
  name: 'scenicListMenu',
  props: {
    categoryId: {
      type: Number,
      default: 0
    }
  },
  components: {
    popup
  },
  data() {
    return {
      tempList: [],
      dialogTempList: [],
      scroll: null,
      wrapperWidth: 0
    }
  },
  methods: {
    showMore() {
      this.$refs.popup.open()
    },
    dialogItemClick(item) {
      this.$refs.popup.close()
      this.homeTypeClick(item)
    },
    homeTypeClick(item) {
      if (!item.name) {
        return
      }
      this.tempList.forEach((it, index) => {
        it.isSelected = it === item
      })
      this.tempList.forEach(item => {
        if (item.isSelected) {
          this.scroll.scrollToElement(document.getElementById(item.itemId), 300, true, true)
        }
      })
      this.$emit('type-item-click', item)
    },
    slideItems() {
      this.tempList.forEach((item, index) => {
        this.$set(item, 'isSelected', Number(item.id) === Number(this.categoryId))
        this.$set(item, 'itemId', 'item' + index)
      })
      this.$nextTick(() => {
        this.wrapperWidth = window.screen.width * 0.2 * this.tempList.length
        this.scroll = new Bscroll(this.$refs.wrapper, { scrollX: true, scrollY: false, click: true })
      })
    }
  },
  mounted() {
    const menuList = JSON.parse(sessionStorage.getItem('scenicMenu'))
    this.tempList = menuList.concat([])
    this.dialogTempList = menuList.concat([])
    this.tempList.push({
      image: '',
      name: ''
    })
    this.slideItems()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.scenic-type-list-container {
  height: 20vw;
  border-bottom: #f5f5f5 solid 1px;
  position: relative;
  overflow: hidden;

  .type-wrapper {
    text-align: center;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .type-icon {
      width: rem(0.8);
      height: rem(0.8);
      border-radius: 50%;
      object-fit: cover;
    }

    .type-title {
      textStyle(#888, 0.24);
      margin-top: rem(0.1);
    }

    .selected-type-image {
      background-color: #f5f5f5;
    }

    .selected-type-text {
      color: $orangeColor;
    }
  }

  .scroll-view-h {
    white-space: nowrap;
    height: rem(1.6);

    .h-t-type-wrapper {
      text-align: center;
      box-sizing: border-box;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .h-t-type-icon {
        width: rem(0.8);
        height: rem(0.8);
        border-radius: 50%;
        object-fit: cover;
      }

      .h-t-type-title {
        textStyle(#888, 0.24);
        margin-top: rem(0.12);
      }

      .selected-type-image {
        background-color: #f5f5f5;
      }

      .selected-type-text {
        color: $orangeColor;
      }
    }
  }

  .more-wrapper {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 18%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    overflow: hidden;
    z-index: 1;

    .icon {
      width: rem(0.8);
      height: rem(0.8);
      padding: rem(0.17);
      box-sizing: border-box;
    }

    .title {
      textStyle(#888, 0.24);
      margin-top: rem(0.05);
      text-align: center;
    }
  }
}
</style>
