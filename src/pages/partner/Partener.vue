<template>
  <div class='partener-container'>
      <my-navi title="发展团队" :isFixed="true"></my-navi>
      <el-tabs v-model="activeName" class="header" stretch>
        <el-tab-pane label="发展团队" name="first">
          <share-partner></share-partner>
        </el-tab-pane>
        <el-tab-pane label="如何发展团队" name="second">
          <team-flow></team-flow>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import TeamFlow from './TeamFlow'
import SharePartner from '@/pages/share/SharePartner'
export default {
  name: 'partener',
  components: {
    TeamFlow,
    SharePartner
  },
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .el-tabs__header
    margin-bottom 0
.header
    padding-top $headerHeight
</style>
