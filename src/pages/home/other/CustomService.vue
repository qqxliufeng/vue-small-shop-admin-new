<template>
    <div>
        <my-navi title="联系客服"></my-navi>
        <div class="c-s-container">
            <p class="c-s-title">
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
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'customService',
  data () {
    return {
      shopServiceInfoMap: [
        {
          name: '王大宝的信息',
          info: '王大宝的信息王大宝的王大宝的信息王大宝的'
        },
        {
          name: '王大宝的信息',
          info: '王大宝的信息'
        },
        {
          name: '王大宝的',
          info: '王大宝的信息'
        },
        {
          name: '王大宝的',
          info: '王大宝的信息'
        }
      ],
      platServiceInfoMap: [
        {
          name: '王大宝的',
          info: '王大宝的信息'
        },
        {
          name: '王大宝的信息',
          info: '王大宝的信息'
        },
        {
          name: '王大宝的',
          info: '王大宝的信息'
        },
        {
          name: '王大宝的信息',
          info: '王大宝的信息'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-s-container
    & > p
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
