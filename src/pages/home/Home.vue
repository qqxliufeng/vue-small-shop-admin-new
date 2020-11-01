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
    <upgrade-status v-if="Number($root.userInfo.state.level) === 2 || Number($root.userInfo.state.level) === 3" />
    <home-menu :menu="menus.myTeam"></home-menu>
    <home-menu :menu="menus.makeMoney"></home-menu>
    <home-menu :menu="menus.mySetting"></home-menu>
    <div style="height: 1.5rem"></div>
  </div>
</template>

<script>
import HomeHeader from './components/HomeHeader'
import HomeNavigation from './components/HomeNavigation'
import HomeOrderInfo from './components/HomeOrderInfo'
import HomeMenu from './components/HomeMenu'
import HomeBottomNavigation from './components/HomeBottomNavigation'
import UpgradeStatus from './components/UpgradeStatus'
export default {
  name: 'home',
  components: {
    HomeNavigation,
    HomeHeader,
    HomeOrderInfo,
    HomeBottomNavigation,
    HomeMenu,
    UpgradeStatus
  },
  data() {
    return {
      msg: '',
      amount: null,
      authInfo: null,
      from: null,
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
                this.$router.push({ name: 'partener' })
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
        this.$root.userInfo.setUserInfoBalance(this.amount.balance)
        this.$root.userInfo.setUserInfoRebate(this.amount.rebate)
        this.$root.userInfo.setLevel(this.amount.level)
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
