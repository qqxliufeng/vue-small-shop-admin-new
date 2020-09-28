<template>
  <div class='r-l-rebate-container'>
    <my-navi title="我的返利" :isFixed="true"></my-navi>
    <el-tabs value="first" :stretch="true" class="c-tabs">
        <el-tab-pane label="已返利" class="c-tabs-item" name="first" lazy>
          <rebate-list-item state="1"></rebate-list-item>
        </el-tab-pane>
        <el-tab-pane label="待返利" class="c-tabs-item" name="second" lazy>
           <rebate-list-item state="2"></rebate-list-item>
        </el-tab-pane>
        <el-tab-pane label="伙伴待返利" class="c-tabs-item" name="third" lazy v-if="Number($root.userInfo.state.rank) < 3">
           <rebate-list-item state="3"></rebate-list-item>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RebateListItem from './components/RebateListItem'
export default {
  name: 'rebateList',
  components: {
    RebateListItem
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-l-rebate-container
  padding 0
  .c-tabs
      padding-top $headerHeight
</style>
