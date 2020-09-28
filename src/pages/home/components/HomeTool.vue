<template>
<div class='h-tool-container'>
  <p class="title">快捷工具</p>
  <div class="tools-wrapper">
    <div v-for="(item, index) of computedToolList" :key="index" class="tools-item-wrapper" @click="itemClick(item)">
      <img :src="item.icon" :alt="item.name">
      <p>{{item.name}}</p>
    </div>
  </div>
</div>
</template>

<script>
import imgShareShopIcon from 'images/img_share_shop_icon.png'
import imgScenicPostIcon from 'images/img_scenic_info_icon.png'
import imgShopListIcon from 'images/img_shop_list_icon.png'
import imgAddPartnerIcon from 'images/img_add_partner_icon.png'
import imgPartnerListIcon from 'images/img_partner_icon.png'
import imgOrderListIcon from 'images/img_order_icon.png'
import imgBackMoneyListIcon from 'images/img_back_money_icon.png'
import imgCustomServiceIcon from 'images/img_custom_service_icon.png'
export default {
  name: 'homeTool',
  props: {
    authInfo: Object
  },
  components: {},
  data () {
    return {
      toolsList: [
        {
          name: '分享店铺',
          icon: imgShareShopIcon,
          actionUrl: 'shareShop',
          show: true
        },
        {
          name: '景区海报',
          icon: imgScenicPostIcon,
          actionUrl: 'scenicPostList',
          show: true
        },
        {
          name: '商品列表',
          icon: imgShopListIcon,
          actionUrl: 'goodsList',
          show: true
        },
        {
          name: '我的订单',
          icon: imgOrderListIcon,
          actionUrl: 'orderList',
          show: true
        },
        {
          name: '我的返利',
          icon: imgBackMoneyListIcon,
          actionUrl: 'myRebate',
          show: true
        },
        {
          name: '联系客服',
          icon: imgCustomServiceIcon,
          actionUrl: 'customService',
          show: true
        },
        {
          name: '发展伙伴',
          icon: imgAddPartnerIcon,
          actionUrl: 'sharePartner',
          show: true
        },
        {
          name: '伙伴列表',
          icon: imgPartnerListIcon,
          actionUrl: 'partnerList',
          show: true
        }
      ]
    }
  },
  computed: {
    computedToolList () {
      this.toolsList.forEach((it, index) => {
        if (index < 6) {
          it.show = true
        } else {
          it.show = this.isShowSharePartner()
        }
      })
      return this.toolsList.filter((it) => it.show)
    }
  },
  methods: {
    itemClick (item) {
      this.$router.push({name: item.actionUrl})
    },
    isShowSharePartner () {
      if (this.authInfo) { // 是否获取到数据了
        let authSet = this.authInfo.auth_set
        console.log(authSet)
        return authSet && authSet.indexOf('2') !== -1
        // if (Number(this.$root.userInfo.state.rank) < 3) { // 当前账号是不是三级分销商
        //   return authSet && authSet.indexOf('3') !== -1
        // } else {
        //   return false
        // }
      } else {
        return false
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.h-tool-container
    .title
        normalTextStyle(#333, .3)
        padding rem(.2)
    .tools-wrapper
        border-bottom rem(.1) solid #f5f5f5
        overflow hidden
        .tools-item-wrapper
            float left
            width 25%
            text-align center
            padding rem(.25) 0
            & img
                width rem(.8)
            & p
                textStyle(#333, .28)
                margin-top rem(.2)
</style>
