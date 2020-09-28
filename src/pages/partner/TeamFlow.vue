<template>
  <div class=''>
    <div class="image-wrapper">
      <img :src="shareTeamFlowImag">
    </div>
  </div>
</template>

<script>
import shareTeamFlowImag from 'images/img_team_flow.png'
export default {
  name: 'teamFlow',
  components: {},
  data () {
    return {
      shareTeamFlowImag
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.image-wrapper
    padding rem(.2)
    overflow hidden
    & img
        width 100%
        height 100%
        object-fit cover
</style>
