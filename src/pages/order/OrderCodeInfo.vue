<template>
    <div class="o-i-code-info-container">
        <div class="o-i-code-info">
            <span class="el-icon-close o-i-code-close" @click="close"></span>
            <div class="code-wrapper">
                <canvas class="o-i-code-code" ref="qrcode"></canvas>
                <p class="o-i-code-info-num">{{info.no}}</p>
                <p class="o-i-code-info-num-desc">商家扫描二维码进行体验</p>
            </div>
            <div class="o-i-code-info-ticket-info">
                <p>{{info.ticketName}}</p>
                <div>
                    <span>待消费<i>{{info.waitNum}}张</i></span>
                    <span>已消费{{info.consum}}张</span>
                    <!-- <span>已退款{{info.backNum}}张</span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'orderCodeInfo',
  props: {
    info: Object
  },
  watch: {
    info (newVal, oldVal) {
      if (newVal) {
        this.createCode()
      }
    }
  },
  methods: {
    createCode () {
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.qrcode, this.info.no, error => {
          if (error) {
            console.log(error)
          } else {
            console.log('success')
          }
        })
      })
    },
    close () {
      this.$router.back()
    }
  },
  mounted () {
    this.createCode()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.o-i-code-info-container
    background-color #939299
    display flex
    justify-content center
    align-items center
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    .o-i-code-info
        position relative
        background-color #ffffff
        border-radius .05rem
        overflow hidden
        width 80%
        height 65vh
        .o-i-code-close
            position absolute
            top 10px
            right 0
            font-size .45rem
            padding .2rem
            color #888888
        .code-wrapper
            display flex
            flex-direction column
            align-items center
            margin-top rem(1)
            .o-i-code-code
                width 200px !important
                height 200px !important
            .o-i-code-info-num
                text-align center
                color #333333
                font-size .4rem
            .o-i-code-info-num-desc
                text-align center
                color #888888
                font-size .3rem
                margin-top .2rem
        .o-i-code-info-ticket-info
            position absolute
            left 0
            bottom 0
            right 0
            height 2rem
            background-color #f5f5f5
            border-radius .05rem
            & p
                color #333333
                font-size .3rem
                padding .4rem
            & div
                display flex
                & span
                    flex 1
                    text-align center
                    margin-top .2rem
                    color #888888
                    & i
                        color $primary
</style>
