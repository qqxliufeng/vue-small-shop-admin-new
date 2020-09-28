<template>
<div class='c-city-container'>
    <my-navi title="选择城市" :isFixed="true"></my-navi>
    <div class="city-content">
      <v-distpicker type="mobile" hide-area @selected="selectedCity" :placeholders="{province: '请选择省份', city: '请选择市', area: '区'}"></v-distpicker>
    </div>
</div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'city',
  props: {
    backName: {
      type: String,
      default: 'home'
    }
  },
  components: {
    VDistpicker
  },
  methods: {
    selectedCity (data) {
      this.$router.replace({name: this.backName, params: {city: data}})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.c-city-container
    .city-content
        contentFixed()
        font-size rem(.3)
        & >>> .address-header
            position fixed
            top $headerHeight
            left 0
            right 0
            background #fff
            height rem(.8)
            & li
                 color $primary
                 border-bottom $primary solid 3px
        & >>> .address-container
            position fixed
            top $headerHeight + .8rem
            left 0
            right 0
            bottom 0
            overflow-y scroll
            background #fff
            & li
                line-height rem(.8)
                color #333
            & li.active
                color $primary
</style>
