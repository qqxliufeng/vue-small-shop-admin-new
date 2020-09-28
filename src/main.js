// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.css'
import './assets/style/iconfont.css'
import ElementUI from 'element-ui'
import '../theme/index.css'
import MyNavigation from 'common/components/MyNavigation'
import Loading from 'common/components/Loading'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import utils from 'common/utils/utils'
import SlideVerify from 'common/components/slideverify/index'
import axios from 'common/http/http.js'
import * as urlPath from 'common/http/urlConfig'

import userInfo from 'common/data/user-info'
import state from 'common/data/state'

import loadingImage from 'images/img_loading_list.png'
import loadFailedImage from 'images/img_loading_failed_list.png'
import WebpPlugun from 'vue-webp-plugin'
import VueAMap from 'vue-amap'
import 'common/utils/weixin.js'

Vue.use(WebpPlugun)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '9caebd5712374a94a3d247f7ff51de9f',
  plugin: ['AMap.Geolocation'],
  v: '1.4.4'
})
Vue.use(MyNavigation)
Vue.use(Loading)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: loadFailedImage,
  loading: loadingImage,
  attempt: 1
})
Vue.use(SlideVerify)
Vue.use(Toast)
Vue.prototype.$utils = utils
Vue.prototype.$urlPath = urlPath
Vue.prototype.NODE_DEVELOPMENT = process.env.NODE_ENV === 'development'
const isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
Vue.prototype.$isWeiXin = isWeiXin
Vue.prototype.$isAliPay = navigator.userAgent.toLowerCase().indexOf('alipay') !== -1
Vue.prototype.$isMobile = function () {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
Vue.prototype.$http = function (url, params = {}, loadingTip, onRequestSuccess, onRequestFail) {
  try {
    if (!url) {
      this.$toast('url 参数不正确')
      return
    }
    if (loadingTip !== null) {
      this.$loading(loadingTip || '正在加载…')
    }
    if (userInfo.isLogin()) {
      params.token = userInfo.state.token
    }
    if (params.isNoToken) {
      delete params.token
      delete params.isNoToken
    }
    return axios.post(url, params)
      .then(response => {
        // 判断是否是正常的http请求状态
        if (response.status === 200) {
          if (response.data) {
            if (response.data.code === 1) {
              if (this.NODE_DEVELOPMENT) {
                console.log(response.data)
              }
              onRequestSuccess(response.data)
            } else {
              onRequestFail(200, response.data.msg)
            }
          } else {
            onRequestFail(-1, '请求失败，请重试…')
          }
        } else if (response.status === 401) {
          this.$toast('当前账号已过期，请重新登录')
          userInfo.clearInfoAction()
          router.replace({ name: 'login' })
          onRequestFail(401, '账号过期了')
        } else {
          if (onRequestFail) {
            onRequestFail(-1, '请求失败，请重试…')
          }
        }
      })
      .catch((error) => {
        if (this.NODE_DEVELOPMENT) {
          console.log(error)
        }
        if (error && error.toString().indexOf('status code 401') !== -1) {
          this.$toast('当前账号已过期，请重新登录')
          userInfo.clearInfoAction()
          router.replace({ name: 'login' })
          return
        }
        if (onRequestFail) {
          onRequestFail(-1, '请求失败，请重试…')
        }
      })
      .then(() => {
        this.$loading.close()
      })
  } catch (error) {
    if (this.NODE_DEVELOPMENT) {
      console.log(error)
    }
    this.$loading.close()
  }
}

router.beforeEach((to, from, next) => {
  // 判断要跳转的页面是不是需要授权
  if (noAuthPageList.includes(to.name)) {
    next()
  } else {
    // 判断当前页面是不是从微信回调回来的
    if (location.search && location.search.indexOf('code') !== -1) {
      handlerWeixinAuth(next)
    } else {
      if (userInfo.isLogin()) {
        if (userInfo.state.phone) {
          next()
        } else {
          next({ name: 'bindPhone' })
        }
      } else {
        autoLogin(next)
      }
    }
  }
})

function handlerWeixinAuth(next) {
  const urlParams = new URLSearchParams(location.search)
  if (urlParams.has('code')) { // 判断是不是要跳转登录页面，如果是判断是不是有code
    next({ name: 'auth', query: { code: urlParams.get('code') } })
  } else {
    next()
  }
}

/**
 * 如果用户没有登录，则判断是否要自动登录
 * @param {next}
 */
function autoLogin(next) {
  if (userInfo.state.token) {
    axios.post(urlPath.userInfo, {
      token: userInfo.state.token
    }).then((response) => {
      new Promise((resolve, reject) => {
        if (response.status === 200 && response.data.code === 1) {
          response.data.data.token = state.token
          userInfo.setUserInfo(response.data.data)
          let canShareTicket = false
          let canFloorBuyTicket = false
          let authSet = response.data.data.auth_set
          if (authSet) { // 是否获取到数据了
            canShareTicket = authSet && authSet.indexOf('1') !== -1 // 是不是能分享图片
            canFloorBuyTicket = authSet && authSet.indexOf('2') !== -1 // 是不是能低价购买
          }
          state.saveCanShareTicket(canShareTicket)
          state.saveCanFloorBuyTicket(canFloorBuyTicket)
          resolve()
        } else {
          reject(new Error('auto error'))
        }
      }).then(() => {
        next()
      }).catch(error => {
        console.log(error)
        next({ name: 'login' })
      })
    }).catch(error => {
      console.log(error)
      next({ name: 'login' })
    })
  } else {
    if (isWeiXin) {
      window.location.href = urlPath.weixinAuthUrl
    } else {
      next({ name: 'login' })
    }
  }
}

let noAuthPageList = [
  'auth',
  'login',
  'city',
  'forgetPassword',
  'fastLogin',
  'rechargePayResult'
]

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data() {
    return {
      state,
      userInfo
    }
  }
})
