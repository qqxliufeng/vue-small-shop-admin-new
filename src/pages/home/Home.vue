<template>
  <div class='home-container'>
    <home-navigation></home-navigation>
    <div class="tip-wrapper">
      <home-header :amount="amount"></home-header>
    </div>
    <home-order-info
      @orderClick="orderClick"
      :orderInfo="amount.my_order"
      v-if="amount"
    ></home-order-info>
    <home-menu :menu="menus.myTeam"></home-menu>
    <home-menu :menu="menus.makeMoney"></home-menu>
    <home-menu :menu="menus.mySetting"></home-menu>
    <div style="height: 1.5rem"></div>
    <red-packet
      v-if="showRedPacket"
      @close="closeRedPacket"
      @open="openRedPacket"
      :canTouchDismiss="false"
    ></red-packet>
  </div>
</template>

<script>
import HomeHeader from './components/HomeHeader'
import HomeNavigation from './components/HomeNavigation'
import HomeOrderInfo from './components/HomeOrderInfo'
import HomeMenu from './components/HomeMenu'
import HomeBottomNavigation from './components/HomeBottomNavigation'
import RedPacket from 'common/components/red-packet'
export default {
  name: 'home',
  components: {
    HomeNavigation,
    HomeHeader,
    HomeOrderInfo,
    HomeBottomNavigation,
    HomeMenu,
    RedPacket
  },
  data() {
    return {
      msg: '',
      amount: null,
      authInfo: null,
      from: null,
      showRedPacket: false,
      menus: {
        makeMoney: {
          title: '我要赚钱',
          menus: [
            {
              icon: '&#xe652;',
              iconColor: '#EC8E8B',
              title: '我要分享',
              callBack: () => {
                this.$router.push({ name: 'scenicPostList' })
              }
            },
            {
              icon: '&#xe670;',
              iconColor: '#EC8E8B',
              title: '商品列表',
              callBack: () => {
                this.$root.$emit('changeTab', { index: '1' })
              }
            }
            // {
            //   icon: '&#xe60b;',
            //   iconColor: '#EC8E8B',
            //   title: '红包/福利',
            //   callBack: () => {
            //     this.$router.push({ name: 'activityList' })
            //   }
            // }
          ]
        },
        myTeam: {
          title: '我的团队',
          menus: [
            {
              icon: '&#xe63f;',
              iconColor: '#99DCFB',
              title: '发展团队',
              callBack: () => {
                if (this.authInfo && this.authInfo.auth_set && this.authInfo.auth_set.indexOf('2') !== -1) {
                  this.$router.push({ name: 'partener' })
                } else {
                  this.$toast('当前帐号暂无此权限')
                }
              }
            },
            {
              icon: '&#xe655;',
              iconColor: '#99DCFB',
              title: '团队列表',
              callBack: () => {
                this.$router.push({ name: 'partnerList' })
              }
            },
            {
              icon: '&#xe619;',
              iconColor: '#99DCFB',
              title: '返利订单',
              callBack: () => {
                this.$router.push({ name: 'rebateList' })
              }
            }
          ]
        },
        mySetting: {
          title: '我的设置',
          menus: [
            {
              icon: '&#xe63e;',
              iconColor: '#6CCABC',
              title: '发布公告',
              callBack: () => {
                this.$router.push({ name: 'editNotify' })
              }
            },
            {
              icon: '&#xe603;',
              iconColor: '#6CCABC',
              title: '个人信息',
              callBack: () => {
                this.$router.push({ name: 'accountSet' })
              }
            },
            {
              icon: '&#xe614;',
              iconColor: '#6CCABC',
              title: '联系客服',
              callBack: () => {
                this.$router.push({ name: 'customService' })
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    getData() {
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
        // 当有红包活动的时候  先要进行展示红包活动，若是没有红包的话并且是从登录或者注册页面跳转来的，则直接跳转到商品列表
        if (!this.showRedPacket && (this.from.name === 'login' || this.from.name === 'stepThree' || this.from.path === '/registerseller')) {
          this.$router.push({ name: 'scenicPostList' })
        }
        // end************根据接口返回来的数据判断是不是有对应的权限************
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    orderClick(type) {
      if (Number(type.type) === 0) {
        this.$root.$emit('changeTab', { index: '3' })
      } else {
        this.$router.push({ name: 'orderList', query: { type: type.type } })
      }
    },
    closeRedPacket() {
      this.showRedPacket = false
    },
    openRedPacket() {
      this.showRedPacket = false
      this.$router.push({ name: 'activityList' })
    }
  },
  created() {
    if (window.location.href && window.location.href.indexOf('&state=1#/') !== -1) {
      let url = window.location.href
      let newUrl = url.replace('#/', '')
      location.href = newUrl.replace('?', '#/?')
    } else {
      let isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
      let isLogin = this.$root.userInfo.isLogin()
      let isNoOpenId = !this.$root.userInfo.state.openid || this.$root.userInfo.state.openid === 'null'
      if (isWeiXin && isLogin && isNoOpenId) {
        if (this.$route.query.code) {
          // let url = location.href
          // let index = url.indexOf('code=') + 5
          // let content = url.slice(index, url.lastIndexOf('&'))
          // this.$router.push({name: 'auth', query: {code: content}})
          this.$router.push({ name: 'auth', query: { code: this.$route.query.code } })
        } else {
          // 微信去授权
          let redirectUri = 'http://www.liuyiqinzi.com/distributor_manage'
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10a7de3814315ba1&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
        }
      }
    }
  },
  mounted() {
    this.getData()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.tip-wrapper {
  margin-top: $headerHeight;

  .tip-content {
    background: #F9EFC4;
    padding: rem(0.1);
    textStyle($orangeColor, 0.25);
  }

  .close-tip {
    float: right;
    font-size: rem(0.28);
  }
}

.logout {
  width: 70%;
  background: $primary;
  border-radius: rem(0.5);
  margin: rem(1.2) auto rem(0.3) auto;
  text-align: center;
  line-height: rem(0.8);
  color: #fff;
}

.pc {
  text-align: center;
  textStyle(#aaa, 0.25);
  margin: rem(0.8) 0 rem(0.3) 0;
  line-height: rem(0.5);
}
</style>
