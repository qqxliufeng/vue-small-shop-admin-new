<template>
    <div class="r-d-detail-container">
        <my-navi title="提交订单" :isFixed="true"></my-navi>
        <div class="r-d-detail-wrapper">
            <ticket-info :ticketInfo="ticketInfo" @selected="onSelectedTimeItem" ref="ticketInfo"></ticket-info>
            <ticket-contact v-if="ticketInfo.goods && ticketInfo.goods.play_info !== 0" ref="userSingleInfo" :visitorInfo="ticketInfo.goods.visitor_info"></ticket-contact>
            <ticket-user-info :contacts="contacts" :touristCount="touristCount" ref="userInfo" v-if="ticketInfo.goods && ticketInfo.goods.play_info === 2 && touristCount > 1" :visitorInfo="ticketInfo.goods.visitor_info"></ticket-user-info>
            <select-route-site v-if="ticketInfo.goods && ticketInfo.goods.categoryId === 14" :routeSites="ticketInfo.assembling_place" @route-item-click="routeSiteClick"></select-route-site>
            <div class="r-d-detail-pay-action-wrapper">
                <span class="r-d-pay-action-price">总价：<i>￥{{totalPrice}}</i></span>
                <span class="r-d-pay-action-pay" :style="{'background' : totalPrice === 0 ? '#cccccc' : '#E18234', 'pointer-events': totalPrice === 0 ? 'none' : 'auto'}" @click="reserve">提交订单</span>
            </div>
            <div class="release-time" v-if="isShowCountDown">距离开售剩余时间：
              <count-down :time="releaseTime * 1000" @end="countDownEnd">
                <template slot-scope="props">
                    <span class="time-wrapper">
                        {{ props.days }}天{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                    </span>
                </template>
              </count-down>
            </div>
        </div>
    </div>
</template>

<script>
import TicketInfo from './components/TicketInfo'
import TicketUserInfo from './components/TicketUserInfo'
import TicketContact from './components/TicketContact'
import CountDown from 'common/components/countdown/countdown'
import SelectRouteSite from './components/SelectRouteSite'
export default {
  name: 'ReseveDetail',
  components: {
    TicketInfo,
    TicketUserInfo,
    TicketContact,
    CountDown,
    SelectRouteSite
  },
  data () {
    return {
      ticketInfo: {},
      totalPrice: 0,
      contacts: [],
      tempDate: null,
      touristCount: 1,
      hasCountDownEnd: false,
      tempRouteSite: null,
      idCardCheck: {
        // 0 不限制 即不用校验身份证号 要是其它 如：37010 就要限制
        isIdNumber: '0',
        // 0 限制购买，1 只允许购买
        idCardRule: 0
      }
    }
  },
  computed: {
    isShowCountDown () {
      return this.ticketInfo && this.ticketInfo.hasOwnProperty('releaseTime') && this.ticketInfo.releaseTime && Number(this.ticketInfo.releaseTime) - Number(this.ticketInfo.time) > 0 && !this.hasCountDownEnd
    },
    releaseTime () {
      return this.ticketInfo ? Math.max(0, Number(this.ticketInfo.releaseTime) - Number(this.ticketInfo.time)) : 0
    }
  },
  methods: {
    countDownEnd () {
      this.hasCountDownEnd = true
    },
    getData () {
      this.$http(this.$urlPath.orderReserve, {
        goods_id: this.$route.query.goods_id,
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId,
        s_id: this.$route.query.scenicId,
        is_dis: 1
      }, '', (data) => {
        this.ticketInfo = data.data
        this.idCardCheck.isIdNumber = this.ticketInfo.goods.is_id_number
        this.idCardCheck.idCardRule = this.ticketInfo.goods.id_card_rule
        if (this.ticketInfo.calendar && this.ticketInfo.calendar.constructor === Object) {
          this.ticketInfo.releaseTime = this.ticketInfo.calendar.releaseTime ? this.ticketInfo.calendar.releaseTime : 0
          this.ticketInfo.time = data.time
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    routeSiteClick (item) {
      this.tempRouteSite = item
    },
    onSelectedTimeItem (info) {
      if (this.ticketInfo.valid_period === 2 && this.ticketInfo.valid_period_expire === 0) {
        this.$toast('该票已不能购买')
        this.totalPrice = 0
        return
      }
      // 禁售
      if (info.item.one_stock === -2) {
        this.$toast('此票在所选日期禁售')
      } else if (info.item.one_stock === -1) { // 不限量卖
        this.tempDate = info.item
        this.tempDate.num = info.num
        this.touristCount = info.num
        this.totalPrice = (Number(info.item.cost_prices) * parseInt(info.num)).toFixed(2)
      } else {
        if (info.item.one_stock < this.ticketInfo.goods.min_number) {
          this.totalPrice = 0
          this.$toast('所选日期余票小于最低购买数')
          return
        }
        this.tempDate = info.item
        this.tempDate.num = info.num
        this.touristCount = info.num
        this.totalPrice = (Number(info.item.cost_prices) * parseInt(info.num)).toFixed(2)
      }
    },
    reserve () {
      if (!this.tempDate) {
        this.$toast('请选择游玩日期')
        return
      }
      if (this.ticketInfo.goods.play_info !== 0 && !this.checkUserInfo()) {
        return
      }
      const postData = {}
      postData.date = this.tempDate
      switch (this.ticketInfo.goods.play_info) {
        // 只需要接收短信的游客信息
        case 1:
          postData.contact = this.$refs.userSingleInfo.tempUserInfo
          postData.user = [this.$refs.userSingleInfo.tempUserInfo]
          break
        // 需要多个游客信息
        case 2:
          postData.user = []
          // 如果只是买了一张票，则不需要其它游客的信息
          if (this.$refs.userInfo) {
            const userList = this.$refs.userInfo.userList
            userList.forEach(item => {
              if (item.type !== 'add') {
                postData.user.push(item)
              }
            })
          }
          postData.contact = this.$refs.userSingleInfo.tempUserInfo // 用于接收短信的游客信息
          postData.user.push(this.$refs.userSingleInfo.tempUserInfo) // 把联系人也放到游玩人信息里面
          break
      }
      if (this.ticketInfo.goods.categoryId === 14 && this.tempRouteSite === null) {
        this.$toast('请选择乘车时间和地点')
        return
      }
      if (this.ticketInfo.goods.categoryId === 14 && this.tempRouteSite) {
        postData.siteInfo = {
          rideTime: this.tempRouteSite.time,
          rideSite: this.tempRouteSite.site
        }
      }
      postData.info = {
        identity: this.$root.state.identity,
        store_id: this.$root.state.storeId,
        goods_source: this.ticketInfo.goods.goods_source,
        goods_id: this.$route.query.goods_id
      }
      this.$http(this.$urlPath.createOrder, {
        data: JSON.stringify(postData)
      }, '正在提交…', (data) => {
        this.$toast('订单提交成功')
        this.$router.replace({name: 'orderInfoPay', query: {no: data.data.out_trade_no}})
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    checkUserInfo () {
      if (this.$refs.userSingleInfo) {
        const userName = this.$refs.userSingleInfo.tempUserInfo.name
        const userPhone = this.$refs.userSingleInfo.tempUserInfo.phone
        const idCard = this.$refs.userSingleInfo.tempUserInfo.idCard
        const schoolName = this.$refs.userSingleInfo.tempUserInfo.schoolName
        const studentId = this.$refs.userSingleInfo.tempUserInfo.studentId
        if (!userName && this.ticketInfo.goods.visitor_info.indexOf('n') !== -1) {
          this.$toast('请输入游客姓名')
          return false
        }
        if (!userPhone && this.ticketInfo.goods.visitor_info.indexOf('m') !== -1) {
          this.$toast('请输入游客手机号')
          return false
        }
        if (userPhone && !this.$utils.validator.isPhone(userPhone)) {
          this.$toast('请输入合法的手机号')
          return false
        }
        if (!idCard && this.ticketInfo.goods.visitor_info.indexOf('id') !== -1) {
          this.$toast('请输入身份证号')
          return false
        }
        if (idCard && !this.$utils.validator.checkIdCard(idCard)) {
          this.$toast('请输入合法的身份证号')
          return false
        }
        if (Number(this.idCardCheck.isIdNumber) !== 0) {
          const idReg = new RegExp('^' + this.idCardCheck.isIdNumber + '.*$')
          const isChecked = idReg.test(idCard)
          if (Number(this.idCardCheck.idCardRule) === 0) { // 限制购买
            if (isChecked) {
              this.$toast('此身份证号不允许购买该票')
              return false
            }
          }
          if (Number(this.idCardCheck.idCardRule) === 1) { // 只允许购买
            if (!idReg.test(idCard)) {
              this.$toast('此身份证号不允许购买该票')
              return false
            }
          }
        }
        if (!schoolName && this.ticketInfo.goods.visitor_info.indexOf('u') !== -1) {
          this.$toast('请输入学校名称')
          return false
        }
        if (!studentId && this.ticketInfo.goods.visitor_info.indexOf('s') !== -1) {
          this.$toast('请输入学生证号')
          return false
        }
        return true
      } else {
        return false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'contactsList') {
        if (vm.ticketInfo.goods) {
          if (to.params.contacts) {
            vm.contacts = to.params.contacts
          }
        } else {
          vm.getData()
        }
      } else {
        vm.totalPrice = 0
        vm.contacts = []
        if (vm.$refs.userSingleInfo) {
          vm.$refs.userSingleInfo.clearUserInfo()
        }
        vm.getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.ticketInfo.routeLeave()
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.slide-fade-enter-active, .slide-fade-leave-active
    transition all .3s
.slide-fade-enter, .slide-fade-leave-to
    transform translateY($headerHeight)
    opacity 0
.r-d-detail-container
    z-index 0
    .r-d-detail-wrapper
        contentFixed()
        padding-bottom $headerHeight * 2
        .release-time
            position fixed
            left 0
            right 0
            bottom $headerHeight
            background-color $orangeColor
            text-align center
            textStyle(#fff, .25)
            padding rem(.1) 0
        .resever-tip
            position fixed
            left 0
            right 0
            bottom $headerHeight
            padding rem(.2) 0
            text-align center
            background #F9EFC4
            textStyle($orangeColor, .25)
        .r-d-detail-pay-action-wrapper
            display flex
            height $headerHeight
            background-color #ffffff
            position fixed
            left 0
            right 0
            bottom 0
            align-items center
            border-top 1px solid #f5f5f5
            .r-d-pay-action-price
                flex 1
                margin-left rem(.3)
                & i
                   color $orangeColor
            .r-d-pay-action-collection
                display flex
                padding 0 rem(.3)
                flex-direction column
                align-items center
                & p:nth-child(1)
                    textStyle($orangeColor, .35)
                & p:nth-child(2)
                    margin-top rem(.1)
                    textStyle(#555555, .25)
            .r-d-pay-action-pay
                background-color $orangeColor
                textStyle(#fff, .32)
                display flex
                align-items center
                height 100%
                padding 0 rem(.3)
</style>
