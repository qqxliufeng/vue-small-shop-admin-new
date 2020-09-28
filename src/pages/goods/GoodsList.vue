<template>
  <div class='g-list-container'>
    <my-navi
      title="首页"
      :isFixed="true"
      :isShowBack="false"
    >
      <slot slot="rightAction">
        <span
          class="el-icon-search search"
          @click="search"
        ></span>
      </slot>
    </my-navi>
    <div class="content">
      <div class="menu">
        <swiper
          :options="swiperOption"
          class="swiper"
        >
          <swiper-slide
            v-for="(item, index) of menuList"
            :key="index"
          >
            <span
              class="menu-item"
              @click="menuItemClick(item)"
              :class="{'menu-item-select' : item.showActiveStyle}"
              :style="{color:item.showActiveStyle ? '#64BBAE' : '#666'}"
            >{{item.name}}</span>
          </swiper-slide>
        </swiper>
      </div>
      <div
        class="content-list"
        v-if="tempMenu"
      >
        <ul v-if="tempMenu.data && tempMenu.data.length > 0">
          <li
            v-for="(content, index) of tempMenu.data"
            :key="index"
            class="content-item"
          >
            <div
              class="content-item-info-wrapper"
              @click="startScenicDetail(content)"
            >
              <div class="item-image-wrapper">
                <img
                  v-lazy="$utils.image.getImagePath(getPath(content.scenicimages))"
                  :key="getPath(content.scenicimages)"
                >
              </div>
              <div class="item-info-wrapper">
                <p class="info-title">{{content.s_title}}</p>
                <div>
                  <el-rate
                    :value="Number(content.score)"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}分"
                  >
                  </el-rate>
                </div>
                <div class="info-action-wrapper">
                  <span
                    class="info-sale-count"
                    v-if="content.people_num > 0"
                  >已售{{$utils.common.trasformNum(content.people_num)}}</span>
                  <span v-if="content.people_num <= 0"></span>
                  <span>
                    <button
                      class="info-share"
                      @click.stop="selectScenicShare(content)"
                      v-if="isCanShare"
                    >{{shareTipName(content)}}</button>
                    <button
                      class="info-detail"
                      @click.stop="startScenicDetail(content)"
                    >预订</button>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <div style="height: 1rem"></div>
        </ul>
        <div
          v-else
          class="scenic-empty"
        >
          暂无商家
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'goodsList',
  components: {},
  data() {
    return {
      listTitle: '',
      tempMenu: null,
      menuList: null,
      swiperOption: {
        slidesPerView: 5
      },
      msg: '',
      amount: null,
      authInfo: null,
      from: null,
      showRedPacket: false
    }
  },
  watch: {
    menuList(newVal, oldVal) {
      if (newVal instanceof Array && newVal.length > 0) {
        this.tempMenu = this.menuList[0]
      }
    }
  },
  computed: {
    isCanShare() {
      return this.$root.state.canShareTicket === '1'
    }
  },
  methods: {
    getPath(path) {
      if (path.indexOf(',') === -1) {
        return path
      } else {
        return path.split(',')[0]
      }
    },
    shareTipName(item) {
      if (item) {
        return '最高返:￥' + item.max_price
      } else {
        return '分享'
      }
    },
    menuItemClick(item) {
      this.menuList.forEach(element => {
        element.showActiveStyle = element === item
      })
      this.tempMenu = item
    },
    search() {
      this.$router.push({ name: 'searchGoods' })
    },
    startScenicDetail(item) {
      this.$router.push({ name: 'scenicDetail', query: { identity: '2', storeId: this.$root.userInfo.state.id, scenicId: item.scenic_id } })
    },
    selectScenicShare(item) {
      this.$router.push({ name: 'selectScenicPostList', query: { scenic_id: item.scenic_id } })
    },
    getData() {
      this.$http(this.$urlPath.goodsList, {}, '', (data) => {
        this.menuList = data.data
        this.menuList.forEach((item, index) => {
          item.showActiveStyle = index === 0
        })
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    getOhterData() {
      this.$http(this.$urlPath.getAmount, {
      }, null, (data) => {
        this.amount = data.data
        this.authInfo = this.amount
        this.showRedPacket = !isNaN(this.amount.red_envelope) && Number(this.amount.red_envelope) === 1
        this.$root.userInfo.setUserInfoBalance(this.amount.balance)
        this.$root.userInfo.setUserInfoRebate(this.amount.rebate)
        let canShareNext = false
        let canFloorBuyTicket = false
        if (this.authInfo) { // 是否获取到数据了
          let authSet = this.authInfo.auth_set
          canShareNext = authSet && authSet.indexOf('2') !== -1 // 是不是能发展图片
          canFloorBuyTicket = authSet && authSet.indexOf('1') !== -1 // 是不是能低价购买
        }
        this.$root.state.setUserInfoTask({
          floorBuyNumber: this.amount.floor_buy_number,
          shareOrderNumber: this.amount.photo_sharing_order_number
        })
        this.$root.state.saveCanShareTicket(canShareNext ? '1' : '0')
        this.$root.state.saveCanFloorBuyTicket(canFloorBuyTicket ? '1' : '0')
      }, (errorCode, error) => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getData()
    this.getOhterData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

>>> .swiper-slide {
  text-align: center;
}

.g-list-container {
  .search {
    font-size: rem(0.4);
    color: #666;
    display: inline-block;
    line-height: $headerHeight;
    width: rem(0.5);
  }

  .content {
    padding-top: $headerHeight;

    .scenic-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      height: rem(2);
      textStyle(#888, 0.28);
    }

    .menu {
      position: fixed;
      top: $headerHeight;
      left: 0;
      right: 0;
      border-right: 1px solid #f5f5f5;

      .swiper {
        .menu-item {
          height: $headerHeight;
          line-height: $headerHeight;
          width: 100%;
          display: inline-block;
          text-align: center;
          textStyle(#666, 0.28);
          ellipsis();
          border-bottom: 1px solid #f5f5f5;
        }

        .menu-item-select {
          border-bottom: 1px solid #64BBAE;
        }
      }
    }

    .content-list {
      box-sizing: border-box;
      position: fixed;
      top: $headerHeight * 2.1;
      left: 0;
      right: 0;
      height: 86%;
      overflow: scroll;

      .list-title {
        textStyle(#666, 0.3);
        line-height: $headerHeight;
        padding: 0 rem(0.2);
        border-bottom: 1px solid #f5f5f5;
      }

      .content-item {
        padding: rem(0.2);
        borderBottom();

        .content-item-info-wrapper {
          display: flex;

          .item-image-wrapper {
            width: rem(1.5);
            height: rem(1.5);
            overflow: hidden;
            border-radius: rem(0.1);

            & img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .item-info-wrapper {
            flex: 1;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-left: rem(0.2);
            overflow: hidden;

            .info-title {
              ellipsis();
              textStyle(#333, 0.28);
            }

            .info-rating {
              textStyle($primary, 0.25);

              &::after {
                content: '|';
                display: inline-block;
                margin: 0 rem(0.2);
                color: #888;
              }
            }

            & >>> .el-rate__icon {
              font-size: 14px;
              margin-right: 1px;
            }

            & >>> .el-rate__text {
              font-size: 12px;
              margin-left: rem(0.1);
            }

            .info-sale-count {
              textStyle(#999, 0.25);
            }

            .info-money {
              textStyle(#EA782F, 0.35);
            }

            .info-money-tag {
              textStyle(#aaa, 0.25);
              margin-left: rem(0.05);
              margin-right: rem(0.2);
            }

            .info-old-money {
              textStyle(#aaa, 0.28);
              text-decoration: line-through;
            }

            .info-action-wrapper {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .info-detail {
                border: 1px solid $orangeColor;
                border-radius: rem(0.05);
                background-color: #fff;
                color: $orangeColor;
                font-size: rem(0.25);
                padding: 0 rem(0.3);
                box-sizing: border-box;
                display: inline-block;
                line-height: rem(0.35);
              }

              .info-share {
                border: 1px solid $orangeColor;
                border-radius: rem(0.05);
                background-color: $orangeColor;
                color: #fff;
                font-size: rem(0.25);
                padding: 0 rem(0.3);
                line-height: rem(0.35);
                margin-right: rem(0.2);
              }
            }
          }
        }
      }
    }
  }
}
</style>
