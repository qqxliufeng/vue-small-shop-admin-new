<!--
 * @Author: your name
 * @Date: 2019-04-22 19:06:19
 * @LastEditTime: 2020-05-14 13:49:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /small-shop-admin/src/pages/home/CustomService.vue
 -->
<template>
    <div>
        <my-navi title="联系客服" :isShowBack="false"></my-navi>
        <div class="c-s-container">
            <p class="c-s-title">
                <i></i>
                客服
            </p>
            <div v-if="info">
                <p class="item">
                  <span>
                      电话号码
                  </span>
                  <span>
                      {{info.customer_phone}}
                  </span>
                </p>
            </div>
            <!-- <div class="sperator-line"></div> -->
            <!-- <p class="c-s-title">
                <i></i>
                平台客服
            </p>
            <p v-for="(item,index) of platServiceInfoMap" :key="index">
                <span>
                    {{item.name}}
                </span>
                <span>
                    {{item.info}}
                </span>
            </p> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'customService',
  data () {
    return {
      info: null
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.customerService, {}, '', (data) => {
        if (data.data) {
          this.info = data.data
        }
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-s-container
    & > div
        padding .2rem
        margin-left .7rem
        & span
            display inline-block
            color #888888
        & span:nth-child(1)
            width 30%
            vertical-align middle
        & span:nth-child(2)
            width 60%
            margin-left 5%
            vertical-align middle
    .item
        padding .2rem
    .c-s-title
        color #333333
        font-size .36rem
        line-height .4rem
        margin-left 0
        margin-top .2rem
        & i
            display inline-block
            circleNotify($primary)
            width .2rem
            height .2rem
            margin 0 .2rem
.sperator-line
    border-bottom .1rem solid #f5f5f5
    margin-top .1rem
</style>
