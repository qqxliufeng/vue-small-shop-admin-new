<template>
  <div class='production-tab-container'>
    <div class="tab-wrapper tab-fixed" :style="{display: tabShowStyle}">
      <div v-for="(item,index) in items" :key="index" class="tab-item" @click="tabItemClick(item)" :class="{'tab-item-selected': item.selected || item.clicked}">
        {{item.title}}
      </div>
    </div>
    <div class="tab-wrapper" style="box-shadow: 0 0 0 0;">
      <div v-for="(item,index) in items" :key="index" class="tab-item" @click="tabItemClick(item)" :class="{'tab-item-selected': item.selected || item.clicked}">
        {{item.title}}
      </div>
    </div>
    <div style="height: 2px; background-color: #f5f5f5;"></div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productionTab',
  data () {
    return {
      isFixed: false,
      items: [
        {
          title: '预订须知',
          selected: false,
          clicked: false,
          index: 1
        },
        {
          title: '费用说明',
          selected: false,
          clicked: false,
          index: 2
        },
        {
          title: '产品说明',
          selected: false,
          clicked: false,
          index: 3
        }
      ],
      elements: [],
      clicked: false
    }
  },
  computed: {
    tabShowStyle () {
      return this.isFixed ? '' : 'none'
    },
    contentHeight () {
      return document.getElementById('content').clientHeight
    }
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > this.contentHeight
      if (this.clicked) {
        return
      }
      this.elements.forEach((el, index) => {
        this.items[index].selected = scrollTop >= el.offsetTop - 86 && scrollTop < el.clientHeight + el.offsetTop - 86
        this.items[index].clicked = false
      })
    },
    tabItemClick (item) {
      this.clicked = true
      this.items.forEach(it => {
        it.selected = false
        it.clicked = it === item
      })
      const contentItem = document.getElementById('item' + item.index)
      window.scrollTo({top: contentItem.offsetTop - 86, behavior: 'smooth'})
      setTimeout(() => {
        this.clicked = false
      }, contentItem.offsetTop - 86)
    }
  },
  mounted () {
    this.items.forEach(it => {
      this.elements.push(document.getElementById('item' + it.index))
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.production-tab-container
    .tab-wrapper
        display flex
        flex-direction row
        align-items center
        width 100%
        height $headerHeight - .06
        background-color #fff
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
        .tab-item
            flex 1
            text-align center
            color #000
            height 100%
            display flex
            align-items center
            justify-content center
            border-bottom 1px solid #fff
        .tab-item-selected
            color $orangeColor
            border-bottom 1px solid $orangeColor
            box-sizing border-box
    .tab-fixed
        position fixed
        top $headerHeight - .06
        left 0
        z-index 10
    .sperator
        height $headerHeight - .06
</style>
