<template>
    <div class="r-d-ticket-info-container">
        <div class="r-d-ticket-info-title-wrapper">
            <span class="r-d-ticket-info-title" v-if="ticketInfo.goods">{{ticketInfo.goods.goods_title}}</span>
            <span class="r-d-ticket-info-title-info" @click="showRemark = !showRemark">购买须知<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="r-d-ticket-info-title-wrapper">
            <span class="r-d-ticket-info-time-title">使用日期</span>
        </div>
        <div v-if="ticketInfo.valid_period === 2">
          <p class="single-mode-info">{{ticketInfo.valid_period_info}}</p>
        </div>
        <div class="r-d-ticket-info-time-wrapper" v-else>
            <div class="r-d-ticket-info-time-item" v-for="(item, index) of times" :key="index" @click="timeItemClick(item)" :class="[{'r-d-ticket-info-time-selected': item.isSelected},{'r-d-ticket-info-time-uneable' : !item.isEnable}]">
                <p>{{item.date}}</p>
                <p>周{{$utils.getWeekByWeek(item.week)}}</p>
                <p>￥{{item.price}}</p>
                <div v-show="item.isSelected" class="img-wrapper">
                  <img src="../../../assets/images/img_selected_icon.png" alt="">
                </div>
            </div>
            <div class="r-d-ticket-info-time-item" style="border: #63BBB0 solid 1px" @click="isShowCanlendarDialog = true">
                <p class="more-date">更多日期></p>
            </div>
        </div>
        <div class="r-d-ticket-info-count-wrapper">
            <span class="r-d-ticket-info-count-title">购买数量</span>
            <div class="r-d-ticket-info-count-info">
                <span class="r-d-ticket-info-count-info-price">￥{{tempTime.price || 0}}</span>
                <span class="r-d-ticket-info-count-info-release-count" v-show="tempTime.count >= 0">剩余{{tempTime.count || 0}}张</span>
                <el-input-number v-model="num" size="mini" :max="maxCount(tempTime.count || 1)" :min="minNum" @change="onNumberChange"></el-input-number>
            </div>
        </div>
       <el-dialog title="选择日期" :visible.sync="isShowCanlendarDialog" center width="92%" :modal="false" @open="showModal = true" @close="showModal = false">
            <calander :events="events" :lunar="calendar.lunar" :begin="calendar.begin()" :end="calendar.end" :weeks="calendar.weeks" :months="calendar.months" @select="select">
                <template slot="event" slot-scope="slotProps">
                    <div class="c-e-wrapper">
                        <p :style="{ 'color' : slotProps.disabled ? '#ccc' : '#64BBAE'}">￥{{slotProps.event.cost_prices}}</p>
                        <p :style="{ 'color' : slotProps.disabled ? '#ccc' : '#64BBAE'}">{{releaseCount(slotProps.event.one_stock)}}</p>
                    </div>
                </template>
            </calander>
        </el-dialog>
        <transition name="slide-fade" @before-enter="beforeEnter" @before-leave="beforeLeave">
            <div v-if="showRemark" class="r-d-ticket-info-remark-wrapper">
              <reseve-notice v-if="ticketInfo" :goods="ticketInfo.goods" :scenic="ticketInfo.scenic" :store="ticketInfo.store"></reseve-notice>
            </div>
        </transition>
        <div class="v-modal" v-show="showModal" @click="showRemark = false"></div>
    </div>
</template>

<script>
import calander from 'common/components/calendar/calendar.vue'
import TicketRemark from 'common/components/ticket-remark'
import ReseveNotice from './ReseveNotice'
import CalendarUtils from 'common/mixins/calendar-utils.js'
export default {
  name: 'TicketInfo',
  mixins: [CalendarUtils],
  props: {
    ticketInfo: Object
  },
  components: {
    calander,
    TicketRemark,
    ReseveNotice
  },
  data () {
    return {
      num: 1,
      minNum: 1,
      maxNum: 1000000,
      isShowCanlendarDialog: false,
      showRemark: false,
      showModal: false
    }
  },
  computed: {
    remarks () {
      if (this.ticketInfo) {
        let tempRemarks = []
        for (let key in this.ticketInfo.goods) {
          if (this.ticketInfo.goods[key] instanceof Object) {
            tempRemarks.push(this.ticketInfo.goods[key])
          }
        }
        return tempRemarks
      } else {
        return []
      }
    }
  },
  watch: {
    ticketInfo (newVal, oldVal) {
      if (newVal) {
        if (!this.ticketInfo.calendar) {
          this.$toast('此票今日暂不销售')
          return
        }
        this.initCalendar(this.ticketInfo)
        this.showRemark = this.ticketInfo.goods.is_notes === 1
      }
    }
  },
  methods: {
    maxCount (count) {
      if (count === -1) {
        return this.maxNum
      } else if (count === -2) {
        return 1
      } else {
        return Math.min(count || 1, this.maxNum)
      }
    },
    onNumberChange () {
      this.emit()
    },
    emit () {
      this.$emit('selected', {item: this.tempTime.raw, num: this.num})
    },
    beforeEnter (el) {
      this.showModal = true
    },
    beforeLeave (el) {
      this.showModal = false
    },
    showRemarkDialog () {
      this.showRemark = true
    },
    routeLeave () {
      this.showRemark = false
      this.isShowCanlendarDialog = false
      this.showRemark = false
    }
  },
  mounted () {
    this.$root.$on('closeDialog', () => {
      this.showRemark = false
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY(10rem)
    opacity 0
.r-d-ticket-info-container
    z-index 0
    .c-e-wrapper
        & p:nth-of-type(1)
          textStyle($primary, .2)
        & p:nth-of-type(2)
          textStyle($primary, .2)
    .r-d-ticket-info-title-wrapper
        display flex
        padding rem(.2) 0
        margin 0 rem(.2)
        borderBottom()
        align-items center
        .r-d-ticket-info-title
            flex 1
            normalTextStyle(#333, .3)
            font-weight bold
        .r-d-ticket-info-title-info
            textStyle($primary, .3)
        .r-d-ticket-info-time-title
            flex 1
            normalTextStyle(#333, .3)
            & i
                color #888888
                font-size rem(.25)
                margin-left rem(.2)
        .r-d-ticket-info-time-more
            normalTextStyle(#888888, .28)
    .r-d-ticket-info-time-wrapper
        display flex
        padding rem(.2)
        borderBottom()
        .r-d-ticket-info-time-item
            width 25%
            height rem(1.35)
            margin 0 1.25%
            border #f5f5f5 solid 1px
            display flex
            justify-content center
            align-items center
            flex-direction column
            border-radius rem(.1)
            color #333
            & p:nth-child(2)
                color #888
                font-size rem(.2)
                margin-top rem(.05)
            & p:nth-child(3)
                margin-top rem(.2)
                color $orangeColor
              .more-date
                  color $primary
                  font-size rem(.23)
        .r-d-ticket-info-time-item
            width 25%
            height rem(1.35)
            margin 0 1.25%
            border #f5f5f5 solid 1px
            display flex
            justify-content center
            align-items center
            flex-direction column
            border-radius rem(.1)
            color #333
            position relative
            & p:nth-child(2)
                color #888
                font-size rem(.2)
                margin-top rem(.05)
            & p:nth-child(3)
                margin-top rem(.2)
                color $orangeColor
            .img-wrapper
                position absolute
                right 0
                bottom 0
                width rem(.4)
                height rem(.4)
                margin-bottom rem(-.04)
                margin-right rem(-.03)
                border-radius rem(.15)
                & img
                    width 100%
                    height 100%
                    border-radius rem(.15)
        .r-d-ticket-info-time-selected
            border $primary solid 1px
        .r-d-ticket-info-time-uneable
            color #888
            pointer-events none
            & p
                color #ccc !important
    .single-mode-info
        padding rem(.2)
        line-height rem(.5)
        textStyle(#ffad2c, .3)
    .r-d-ticket-info-count-wrapper
        display flex
        padding rem(.3)
        align-items center
        borderBottom()
        .r-d-ticket-info-count-title
            textStyle(#333, .3)
            flex 1
        .r-d-ticket-info-count-info
            display flex
            align-items center
            .r-d-ticket-info-count-info-price
                textStyle($orangeColor, .3)
                margin-right rem(.1)
            .r-d-ticket-info-count-info-release-count
                textStyle(#888, .28)
                margin 0 rem(.2)
            & >>> .el-input-number--mini
                width rem(2)
    .r-d-ticket-info-remark-wrapper
        position fixed
        bottom 0
        top 20%
        left 0
        right 0
        z-index 1001
        overflow-y scroll
        background-color #ffffff
        border-top-left-radius rem(.2)
        border-top-right-radius rem(.2)
        padding-top rem(.2)
        .r-d-ticket-info-remark-title-wrapper
            display flex
            padding rem(.2)
            background-color #f5f5f5
            position sticky
            top 0
            left 0
            right 0
            z-index 998
            align-items center
            & span:nth-child(1)
                text-align center
                flex 1
                textStyle(#333, .35)
            & span:nth-child(2)
                textStyle(#555, .5)
        .remark-content-wrapper
            position absolute
            top rem(.95)
            left 0
            right 0
            .remark-content-confirm
                line-height rem($headerHeight)
                text-align center
                background $primary
                textStyle(#fff, .35)
                margin-top rem(.2)
    .v-modal
        position fixed
        top 0
        left 0
        right 0
        height 100%
        background-color #000000
        z-index 1000
        opacity .5
</style>
