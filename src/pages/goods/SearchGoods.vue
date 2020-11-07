<template>
  <div class='s-g-container'>
    <my-navi
      :isFixed="true"
      title="搜索"
    ></my-navi>
    <div class="content">
      <div class="search-wrapper">
        <el-input
          placeholder="请输入内容"
          v-model="searchContent"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </div>
      <ul
        class="content-list"
        v-if="contentList && contentList.length > 0"
      >
        <li
          v-for="(item, index) of contentList"
          :key="index"
          class="content-item"
        >
          <scenic-list-item
            :item="item"
            @itemClick="itemClick"
          ></scenic-list-item>
        </li>
      </ul>
      <div
        v-if="contentList && contentList.length <=0 "
        class="search-empty"
      >
        <span>暂无搜索内容</span>
      </div>
    </div>
  </div>
</template>

<script>
import ScenicListItem from '@/pages/index/components/ScenicListItem'
export default {
  name: 'SearchGoods',
  components: { ScenicListItem },
  data() {
    return {
      searchContent: '',
      contentList: null
    }
  },
  methods: {
    search() {
      if (!this.searchContent) {
        this.$toast('请输入搜索内容')
        return
      }
      this.$http(this.$urlPath.searchScenic, {
        scenic_name: this.searchContent
      }, '正在搜索…', (data) => {
        this.contentList = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    itemClick(item) {
      this.$router.replace({ name: 'scenicDetail', query: { identity: '2', storeId: this.$root.userInfo.state.id, scenicId: item.scenic_id } })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.content {
  padding-top: $headerHeight;

  .search-wrapper {
    padding: rem(0.2);

    & >>> .el-input__inner {
      height: rem(0.7);
      line-height: rem(0.7);
    }
  }

  .search-empty {
    padding: rem(0.8) 0;
    text-align: center;
    color: #888;
  }

  .content-list {
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
              border: 1px solid #EA782F;
              border-radius: rem(0.05);
              background-color: #fff;
              color: #EA782F;
              font-size: rem(0.25);
              padding: 0 rem(0.3);
              box-sizing: border-box;
              display: inline-block;
              margin-right: rem(0.2);
              line-height: rem(0.35);
            }

            .info-share {
              border: 1px solid #EA782F;
              border-radius: rem(0.05);
              background-color: #EA782F;
              color: #fff;
              font-size: rem(0.25);
              padding: 0 rem(0.3);
              line-height: rem(0.35);
            }
          }
        }
      }
    }
  }
}
</style>
