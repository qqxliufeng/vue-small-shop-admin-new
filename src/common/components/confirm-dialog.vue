<template>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="90%"
    >
    <span>{{content}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini">取 消</el-button>
      <el-button type="primary" @click="dialogConfirm" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'confirmDialog',
  props: {
    content: ''
  },
  components: {},
  data () {
    return {
      centerDialogVisible: false
    }
  },
  methods: {
    cancel () {
      this.centerDialogVisible = false
      this.$emit('dialogCancel')
    },
    dialogConfirm () {
      this.centerDialogVisible = false
      this.$emit('dialogConfirm')
    },
    showDialog () {
      this.centerDialogVisible = true
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .el-dialog
        margin-top 30vh !important
</style>
