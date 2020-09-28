<template>
  <div>
    <section v-if="loadState">
      <div id="header">
        <scenic-detail-header
          :scenicInfo="scenicInfo"
          @back="back"
        ></scenic-detail-header>
        <scenic-detail-images :imageList="imageList"></scenic-detail-images>
        <scenic-detail-info :scenicInfo="scenicInfo">
          <template
            slot="info"
            slot-scope="slotPropes"
          >
            <div
              class="s-d-info-scenic-info-wrapper"
              v-if="scenicInfo.categoryId !== 14"
            >
              <div @click="startScenicInfo('scenicInfoForIntro')">
                <p class="s-d-info-scenic-info-title">{{ scenicInfo.categoryId === 13 ? '景区须知' : '简介' }}</p>
                <p class="s-d-info-scenic-info-info">{{delHtmlTag(slotPropes.scenicInfo.brief)}}</p>
              </div>
            </div>
            <div class="s-d-info-scenic-open-time-wrapper">
              <div>营业时间: <span class="time">{{slotPropes.scenicInfo.open}}</span></div>
            </div>
          </template>
        </scenic-detail-info>
        <safe-protect></safe-protect>
      </div>
      <!-- <scenic-detail-hot v-if="hotGoodsList && hotGoodsList.length > 0" :hotGoodsList="hotGoodsList" @reseve-detail="reseveDetail" @share-ticket="shareTicket"></scenic-detail-hot> -->
      <div id="ticketType">
        <scenic-detail-ticket-type
          :typeGoodsList="typeGoodsList"
          @reseve-detail="reseveDetail"
          @share-ticket="shareTicket"
          :title="scenicInfo.categoryId === 14 ? '跟团游' : '优惠信息'"
          @show-more="showMoreTicket"
        ></scenic-detail-ticket-type>
      </div>
      <div id="route">
        <scenic-detail-ticket-type
          v-show="isShowRoute"
          :typeGoodsList="route"
          @reseve-detail="reseveRouteDetail"
          @share-ticket="shareTicket"
          title="跟团游"
        ></scenic-detail-ticket-type>
      </div>
      <div id="message">
        <scenic-detail-leave-message :ask="ask"></scenic-detail-leave-message>
      </div>
      <div id="comment">
        <scenic-detail-comment
          :comment="comment"
          :tagCanSelected="false"
        ></scenic-detail-comment>
      </div>
      <div
        class="s-d-l-m-comment-info-see-more"
        @click="seeMoreComment"
      >
        查看更多
      </div>
      <div
        v-if="showTab"
        class="tab-wrapper"
      >
        <div
          v-for="(item, index) of tabList"
          :key="index"
          @click="tabItemClick(index)"
        >
          <span
            class="tab-item"
            :class="{'tab-item-selected' : index === mTabIndex}"
          >{{item.title}}</span>
        </div>
      </div>
    </section>
    <section v-else>
      <load-fail @reload="reload"></load-fail>
    </section>
  </div>
</template>

<script>
import SafeProtect from 'common/components/safe-protect'
import ScenicDetailHeader from './components/ScenicDetailHeader'
import ScenicDetailImages from './components/ScenicDetailImages'
import ScenicDetailInfo from './components/ScenicDetailInfo'
import ScenicDetailHot from './components/ScenicDetailHot'
import ScenicDetailTicketType from './components/ScenicDetailTicketType'
import ScenicDetailLeaveMessage from './components/ScenicDetailLeaveMessage'
import ScenicDetailComment from './components/ScenicDetailComment'
import LoadFail from 'common/components/loading/load-fail'
export default {
  name: 'scenicDetail',
  components: {
    SafeProtect,
    ScenicDetailHeader,
    ScenicDetailImages,
    ScenicDetailInfo,
    ScenicDetailHot,
    ScenicDetailTicketType,
    ScenicDetailLeaveMessage,
    ScenicDetailComment,
    LoadFail
  },
  data() {
    return {
      loadState: true,
      sellerInfo: this.$root.state.getSallerInfo(),
      comment: null,
      ask: {},
      imageList: [],
      scenicInfo: {},
      hotGoodsList: [],
      typeGoodsList: [],
      route: null,
      scenicId: null,
      identity: null,
      storeId: null,
      show: true,
      from: null,
      scrollTop: -100,
      headerHeight: 0,
      marginTop: 86,
      heightListInfo: {},
      tabList: [],
      mTabIndex: -1
    }
  },
  computed: {
    isShowRoute() {
      if (this.route) {
        for (const item of this.route) {
          if (item.goods_list && item.goods_list.length > 0) {
            return true
          }
        }
      }
      return false
    },
    showTab() {
      return this.scrollTop >= this.headerHeight - this.marginTop
    }
  },
  methods: {
    onItemClick(item) {
      console.log(item)
    },
    startScenicInfo(type) {
      this.$router.push({ name: 'scenicInfo', query: { id: this.scenicId } })
    },
    seeMoreComment() {
      this.$router.push({ name: 'commentList', params: { scenicId: this.scenicId } })
    },
    reload() {
      this.getData()
    },
    delHtmlTag(str) {
      if (str) {
        return str.replace(/<[^>]+>/g, '')
      }
      return ''
    },
    reseveDetail(item) {
      if (Number(this.scenicInfo.categoryId) === 13) {
        this.$router.push({ name: 'reseveDetail', query: { goods_id: item.goodsId, scenicId: this.$route.query.scenicId } })
      } else {
        this.$router.push({ name: 'productionDetail', query: { goodsId: item.goodsId } })
      }
    },
    reseveRouteDetail(item) {
      this.$router.push({ name: 'productionDetail', query: { goodsId: item.goodsId } })
    },
    shareTicket(item) {
      if (item.is_promotion > 0) {
        this.$router.push({ name: 'shareTicket', query: { s_id: this.$route.query.scenicId, goods_id: item.goodsId, promotion_id: item.is_promotion } })
      } else {
        this.$router.push({ name: 'shareTicket', query: { s_id: this.$route.query.scenicId, goods_id: item.goodsId } })
      }
    },
    getData() {
      this.$http(this.$urlPath.scenicDetail2Url, {
        s_id: this.scenicId,
        identity: this.identity,
        store_id: this.storeId
      }, '', (data) => {
        if (data.data) {
          this.loadState = true
          this.imageList = data.data.scenicimages
          // 景区信息
          let info = {}
          info.title = data.data.s_title
          info.tel = data.data.tel
          info.totalSales = data.data.totalSales
          info.address = data.data.address
          info.city = data.data.city
          info.mark = data.data.mark
          info.open = data.data.open
          info.route = data.data.route
          info.tags = data.data.sceniclabel
          info.brief = data.data.brief
          info.isFavorites = data.data.is_favorites
          info.content = data.data.s_content
          info.categoryId = data.data.category_id
          info.latitude = data.data.latitude
          info.longitude = data.data.longitude
          info.messageSwitch = data.data.message_switch
          info.businessName = data.data.business_name
          this.scenicInfo = info
          this.hotGoodsList = data.data.hot_goods
          this.typeGoodsList = data.data.type_list
          this.route = data.data.route
          this.comment = data.data.comment
          this.ask = data.data.ask
          if (info.messageSwitch !== 1) {
            this.ask = {}
          }
          this.tabList.push({
            title: this.scenicInfo.categoryId === 14 ? '跟团游' : '优惠信息',
            type: 'ticketType'
          })
          if (this.isShowRoute) {
            this.tabList.push({
              title: '跟团游',
              type: 'route'
            })
          }
          this.tabList.push({
            title: '留言板',
            type: 'message'
          })
          this.tabList.push({
            title: '综合评价',
            type: 'comment'
          })
          this.heightInfo()
        } else {
          this.loadState = false
        }
      }, (errorCode, error) => {
        this.loadState = false
      })
    },
    heightInfo() {
      setTimeout(_ => {
        this.$nextTick(_ => {
          this.headerHeight = document.getElementById('header').offsetHeight
          this.heightListInfo.ticketType = {
            start: this.headerHeight - this.marginTop,
            end: this.headerHeight - this.marginTop + document.getElementById('ticketType').offsetHeight + 11
          }
          this.heightListInfo.route = {
            start: this.heightListInfo.ticketType.end,
            end: this.heightListInfo.ticketType.end + document.getElementById('route').offsetHeight + 11
          }
          this.heightListInfo.message = {
            start: this.heightListInfo.route.end,
            end: this.heightListInfo.route.end + document.getElementById('message').offsetHeight + 11
          }
          this.heightListInfo.comment = {
            start: this.heightListInfo.message.end,
            end: this.heightListInfo.message.end + document.getElementById('comment').offsetHeight + 11
          }
        })
      }, 500)
    },
    handlerScroll() {
      if (!this.heightListInfo.ticketType) {
        return
      }
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (this.scrollTop >= this.heightListInfo.ticketType.start && this.scrollTop <= this.heightListInfo.ticketType.end) {
        this.mTabIndex = 0
      }
      if (this.tabList.length === 4) {
        if (this.scrollTop >= this.heightListInfo.route.start && this.scrollTop <= this.heightListInfo.route.end) {
          this.mTabIndex = 1
        }
        if (this.scrollTop >= this.heightListInfo.message.start && this.scrollTop <= this.heightListInfo.message.end) {
          this.mTabIndex = 2
        }
        if (this.scrollTop >= this.heightListInfo.comment.start && this.scrollTop <= this.heightListInfo.comment.end) {
          this.mTabIndex = 3
        }
      } else {
        if (this.scrollTop >= this.heightListInfo.message.start && this.scrollTop <= this.heightListInfo.message.end) {
          this.mTabIndex = 1
        }
        if (this.scrollTop >= this.heightListInfo.comment.start && this.scrollTop <= this.heightListInfo.comment.end) {
          this.mTabIndex = 2
        }
      }
    },
    tabItemClick(index) {
      const item = this.heightListInfo[this.tabList[index].type]
      window.scrollTo({ top: item.start + 1, behavior: 'smooth' })
    },
    showMoreTicket() {
      this.heightInfo()
    },
    back() {
      if (this.from) {
        if (this.from.name === 'goodsList') {
          this.$router.go(-1)
        } else {
          this.$router.replace({ path: '/' })
        }
      } else {
        this.$router.go(-1)
      }
    }
  },
  created() {
    this.scenicId = this.$route.query.scenicId
    let identity = this.$route.query.identity
    let storeId = this.$route.query.storeId
    if (identity && storeId) {
      this.$root.state.saveSallerInfo(identity, storeId)
      this.sellerInfo = this.$root.state.getSallerInfo()
    }
    this.identity = this.sellerInfo.identity
    this.storeId = this.sellerInfo.storeId
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScroll)
    this.getData()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handlerScroll)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.s-d-info-scenic-info-wrapper {
  overflow: hidden;
  display: flex;
  height: 100%;
  justify-content: center;

  & p {
    muitlLineEllipsis(2);
  }

  & div:nth-child(1) {
    overflow: hidden;
    flex: 1;
  }

  & div:nth-child(3) {
    overflow: hidden;
    flex: 1;
  }

  .vertical-line {
    width: 1px;
    height: rem(1);
    margin: rem(0.1) rem(0.1);
    background-color: #f5f5f5;
  }

  .s-d-info-scenic-info-title {
    textStyle(#333333, 0.3);
  }

  .s-d-info-scenic-info-info {
    margin-top: rem(0.1);
    normalTextStyle(#888888, 0.25);
    muitlLineEllipsis(2);
  }
}

.s-d-info-scenic-open-time-wrapper {
  background-color: #f5f5f5;
  padding: rem(0.15);
  margin-top: rem(0.1);
  border-radius: rem(0.1);

  .time {
    textStyle($orangeColor, 0.28);
    margin-left: rem(0.1);
  }

  & p:nth-child(1) {
    normalTextStyle(#333, 0.28);
  }
}

.s-d-l-m-comment-info-see-more {
  normalTextStyle(#666, 0.26);
  padding: rem(0.2);
  text-align: center;
  border-top: #f5f5f5 solid 1px;
}

.tab-wrapper {
  display: flex;
  align-items: center;
  position: fixed;
  top: $headerHeight;
  left: 0;
  right: 0;
  background-color: white;
  line-height: $headerHeight;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  & div {
    flex: 1;
    text-align: center;
  }

  .tab-item {
    text-align: center;
    display: inline-block;
    width: auto;
    height: 100%;
    textStyle(#333, 0.28);
  }

  .tab-item-selected {
    textStyle($orangeColor, 0.3);
    border-bottom: $orangeColor solid 1px;
  }
}
</style>
