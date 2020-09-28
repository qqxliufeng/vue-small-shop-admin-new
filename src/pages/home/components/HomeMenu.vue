<template>
  <div v-if="menu">
    <p class='title'>{{menu.title}}</p>
    <div class="menu-wrapper">
      <div class="menu-item-wrapper" v-for="(item, index) of menu.menus" :key="index" @click="item.callBack">
        <span class="iconfont item-icon" v-html="item.icon" :style="{ 'color': item.iconColor }"></span>
        <p class="item-title">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'homeMenu',
  props: {
    menu: Object
  },
  components: {},
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.title
    padding rem(.45) rem(.25)
    color #666
    font-size rem(.3)
.menu-wrapper
    display flex
    .menu-item-wrapper
        flex 1
        text-align center
        .item-title
            color #888
            font-size rem(.25)
            margin-top rem(.2)
        .item-icon
            font-size rem(.6)
</style>
