<template>
    <div class="o-i-header-container">
        <div class="o-i-header-container-title">
            <span>{{stateTip}}</span>
            <slot name="headerTitleInfo"></slot>
        </div>
        <slot name="headerInfo"></slot>
        <slot name="headerBottomInfo"></slot>
    </div>
</template>

<script>
export default {
  name: 'orderInfoHeader',
  props: {
    stateTip: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.o-i-header-container
    background-color $primary
    min-height 1rem
    padding .2rem
    .o-i-header-container-title
        overflow hidden
        margin-top .2rem
        & span:nth-child(1)
            color #ffffff
            font-size .32rem
</style>
