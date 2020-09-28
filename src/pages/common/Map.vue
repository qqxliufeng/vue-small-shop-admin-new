<template>
  <div class='map-container'>
    <my-navi title="商家位置" :isFixed="true"></my-navi>
    <el-amap vid="amap" class="amap-demo" :center="center" :zoom="zoom">
      <el-amap-marker :position="marker.position" :visible="marker.visible" :draggable="marker.draggable" :vid="0"></el-amap-marker>
    </el-amap>
    <el-card class="title-wrapper" v-if="title" :body-style="{padding: 0}">
      {{title}}
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'mapView',
  data () {
    return {
      title: this.$route.query.title,
      center: [0, 0],
      zoom: 14,
      marker: {
        position: [0, 0],
        visible: true,
        draggable: false
      }
    }
  },
  methods: {
    BMapTransqqMap (lng, lat) {
      let xPi = 3.14159265358979324 * 3000.0 / 180.0
      let x = lng - 0.0065
      let y = lat - 0.006
      let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi)
      let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi)
      let lngs = z * Math.cos(theta)
      let lats = z * Math.sin(theta)
      return {
        lng: lngs,
        lat: lats
      }
    }
  },
  mounted () {
    const { lng, lat } = this.BMapTransqqMap(this.$route.query.lng, this.$route.query.lat)
    this.marker.position[0] = lng
    this.marker.position[1] = lat
    this.center[0] = lng
    this.center[1] = lat
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.map-container
    .title-wrapper
        position fixed
        left 0
        right 0
        bottom 0
        margin 0 rem(.2)
        margin-bottom rem(.2)
        border-radius rem(.1)
        background-color #fff
        text-align center
        padding rem(.15)
        textStyle($orangeColor, .28)
        border 1px solid #f5f5f5
        z-index 1
    .amap-demo
        position fixed
        top 0
        left 0
        right 0
        bottom 0
</style>
