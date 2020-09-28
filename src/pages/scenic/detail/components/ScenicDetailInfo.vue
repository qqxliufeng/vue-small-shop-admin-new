<template>
    <el-card class="s-d-info-container" :body-style="{padding: 0}">
        <div class="s-d-info-header-wrapper">
            <div>
                <span>{{scenicInfo.title}}</span>
                <span>{{scenicInfo.mark}}分</span>
            </div>
            <div class="s-d-info-header-tags-wrapper" v-if="scenicInfo.tags">
                <span>
                    <el-tag type="success" class="s-d-info-tag" size="mini" v-for="(item, index) of scenicInfo.tags" :key="index">{{item}}</el-tag>
                </span>
            </div>
            <div class="s-d-info-middle-wrapper">
                <slot name="info" :scenicInfo="scenicInfo"></slot>
                <div class="s-d-info-scenic-location-wrapper">
                    <span class="iconfont s-d-info-scenic-location-icon" @click="location">&#xe850;</span>
                    <div class="s-d-info-scenic-location">
                        <p>{{scenicInfo.categoryId === 14 ? scenicInfo.businessName : scenicInfo.city}}</p>
                        <p class="address">{{scenicInfo.categoryId === 14 ? scenicInfo.tel : scenicInfo.address}}</p>
                    </div>
                    <a :href="'tel:' + scenicInfo.tel" class="iconfont s-d-info-scenic-phone">&#xe6a9;</a>
                </div>
            </div>
        </div>
        <slot name="bottomInfo"></slot>
    </el-card>
</template>

<script>
export default {
  name: 'scenicDetailInfo',
  props: {
    scenicInfo: Object
  },
  methods: {
    startScenicInfo (type) {
      this.$router.push({name: 'scenicInfo', params: {selected: type}})
    },
    location () {
      if (this.scenicInfo.latitude && this.scenicInfo.longitude) {
        this.$router.push({name: 'map', query: { lng: this.scenicInfo.longitude, lat: this.scenicInfo.latitude, title: this.scenicInfo.title }})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.s-d-info-container
    margin rem(.2)
    margin-top rem(-.4)
    position relative
    z-index 1
    .s-d-info-header-wrapper
        padding rem(.2)
        & div:nth-child(1)
            margin-bottom rem(.1)
            overflow hidden
            & span:nth-child(1)
                float left
                normalTextStyle(#333, .35)
                vertical-align middle
            & span:nth-child(2)
                float right
                normalTextStyle(#888, .25)
                border-radius .1rem
                background-color $orangeColor
                color #fff
                padding 0 rem(.2)
        .s-d-info-header-tags-wrapper
            padding-bottom rem(.1)
            borderBottom()
            .s-d-info-tag
                margin-right rem(.2)
                normalTextStyle($primary, .2)
            .s-d-info-header-saller
                float right
                normalTextStyle(#888888, .25)
        .s-d-info-middle-wrapper
            padding-top rem(.1)
            overflow hidden
            .s-d-info-scenic-location-wrapper
                margin-top rem(.3)
                normalTextStyle(#333333, .3)
                line-height rem(.45)
                display flex
                align-items center
                .address
                    textStyle(#666, .25)
                .s-d-info-scenic-location
                    flex 1
                .s-d-info-scenic-phone
                    textStyle($primary, .5)
            .s-d-info-scenic-location-icon
                font-size rem(.4)
                margin-right rem(.2)
                vertical-align top
    .sperator-line
        horizontalLine(#f5f5f5, .1)
    .o-i-ticket-safe-container
        background-color #EDF8F7
        border-top .02rem solid #DDDFDE
        border-bottom .02rem solid #DDDFDE
        padding .2rem
        & p
            color $primary
        .o-i-ticket-info-tag
            overflow hidden
            margin-top .2rem
            line-height .3rem
            & span
                float left
                color #333333
                font-size .2rem
                margin-right .3rem
                & i
                    color $primary
                    font-size .2rem
</style>
