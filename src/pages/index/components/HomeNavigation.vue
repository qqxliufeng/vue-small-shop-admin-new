<template>
    <div>
      <!-- <transition name="slide-fade">
        <div class="h-n-navi-container">
          <span class="h-n-navi-item" @click="index">首页</span>
          <div class="sperator-line">|</div>
          <span class="h-n-navi-item" @click="startOrder">我的订单</span>
          <div class="sperator-line">|</div>
          <span class="h-n-navi-item" @click="startCustomService">联系客服</span>
          <div class="sperator-line">|</div>
          <span class="h-n-navi-item" @click="startMine">个人中心</span>
        </div>
      </transition> -->
      <div class="h-n-navi-container">
        <el-menu :default-active="activeIndex"
                  class="bottom-menu-demo"
                  mode="horizontal"
                  active-text-color="#64BBAE"
                  @select="handleSelect"
                  ref="menu">
          <el-menu-item index="1">
            <div>
              <span class="iconfont menu-icon">&#xe608;</span>
              <p class="menu-text">首页</p>
            </div>
          </el-menu-item>
          <el-menu-item index="2">
            <span class="iconfont menu-icon">&#xe614;</span>
            <p class="menu-text">客服</p>
          </el-menu-item>
          <el-menu-item index="3">
            <span class="iconfont menu-icon">&#xe618;</span>
            <p class="menu-text">订单</p>
          </el-menu-item>
          <el-menu-item index="4">
            <span class="iconfont menu-icon">&#xe654;</span>
            <p class="menu-text">我的</p>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
</template>

<script>
export default {
  name: 'homeNavi',
  // props: {
  //   scrollTop: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data () {
    return {
      // show: true,
      // top: 0,
      activeIndex: '1'
    }
  },
  // watch: {
  //   scrollTop () {
  //     let scroll = this.scrollTop - this.top
  //     this.top = this.scrollTop
  //     if (Math.abs(scroll) > 10) {
  //       if (scroll < 0) {
  //         if (!this.show) {
  //           this.show = true
  //         }
  //       } else {
  //         if (this.show) {
  //           this.show = false
  //         }
  //       }
  //     }
  //     return this.show
  //   }
  // },
  methods: {
    handleSelect (index) {
      switch (index) {
        case '1':
          this.$router.replace({path: '/index/' + this.$root.state.identity + '/' + this.$root.state.storeId})
          break
        case '2':
          this.$router.push({name: 'customService'})
          break
        case '3':
          this.$router.push({name: 'orderAllList'})
          break
        case '4':
          this.$router.replace({name: 'personal', params: {backName: 'personal'}})
          break
      }
    },
    index () {
      this.$router.replace({path: '/index/' + this.$root.state.identity + '/' + this.$root.state.storeId})
    },
    startOrder () {
      this.$router.push({name: 'orderAllList'}, null, () => {
        this.$refs.menu.activeIndex = '1'
      })
    },
    startMine () {
      this.$router.replace({name: 'personal', params: {backName: 'personal'}}, null, () => {
        this.$refs.menu.activeIndex = '1'
      })
    },
    startCustomService () {
      this.$router.push({name: 'customService'})
    }
  },
  mounted () {
    this.$root.$on('changeTab', (index) => {
      this.$refs.menu.activeIndex = index.index
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
    transform translateY($headerHeight)
.bottom-menu-demo
    width 100%
    & >>> .el-menu-item
        width 25%
        text-align center
        box-sizing border-box
        line-height 1
        display flex
        flex-direction column
        justify-content center
        .menu-icon
            display block
            font-size rem(.38)
        .menu-text
            margin rem(.1) 0
            padding-bottom rem(.2)
            font-size rem(.23)
.h-n-navi-container
    position fixed
    left 0
    right 0
    bottom 0
    overflow hidden
    display flex
    height $headerHeight
    line-height $headerHeight
    background-color #ffffff
    border-top #f5f5f5 solid .02rem
    z-index 998
    .h-n-navi-item
        flex 1
        text-align center
        normalTextStyle($primary, .3)
        line-height $headerHeight
    .sperator-line
        color #888
.test-click
  position fixed
  bottom 1rem
  left 0
  right 0
</style>
