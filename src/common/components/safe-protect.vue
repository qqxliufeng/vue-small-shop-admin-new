<template>
  <el-card :body-style="{padding: 0}">
      <div class="o-i-ticket-safe-container" @click="dialogVisible = true">
        <div class="o-i-ticket-info-tag">
            <span class="title">消费保障</span>
            <span><i class="iconfont">&#xe69e;</i> 入园保障</span>
            <span><i class="iconfont">&#xe69e;</i> 官方</span>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="90%" title="消费保障" :close-on-click-modal="true">
        <div class="title-wrapper">
          <span class="el-icon-success title"><i>消费保障</i></span>
        </div>
        <p class="content">预定门票成功后，获得凭证确认，同时按【预定须知】使用；景区正常营业情况下，造成用户无法正常使用门票，用户可在景区购买市场价门票入园，差价由平台预先支付给您，同时，还需要赔偿用户在平台实际成交金额的10%（但最高不超过200元）</p>
        <div class="title-wrapper">
          <span class="el-icon-success title"><i>入园保障</i></span>
        </div>
        <p class="content">用户遵守【预定须知】，但是门票无法正常使用，请先联系平台客服记录同时要求处理，如果客服在30分钟内无法解决，平台执行【消费保障】给予用户赔偿</p>
        <div class="title-wrapper">
          <span class="el-icon-success title"><i>免责说明</i></span>
        </div>
        <p class="content">
          1】用户遵守【预定须知】，造成门票无法使用的，但是用户没有第一时间联系平台要求解决问题，而是自行购票入园后联系平台要求处理，平台不给予受理与赔偿；<br/>
          2】用户违反【预定须知】，造成门票无法使用，平台不给予受理与赔偿；<br/>
          3】因自然现象，政府临时管制，等一切不可抗拒因素，造成门票无法使用的，平台不给予赔偿；
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'safeProtect',
  components: {},
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
>>> .el-dialog__body
    padding 0 20px
.o-i-ticket-safe-container
    background-color #EDF8F7
    padding .2rem
    & p
        color $primary
    .o-i-ticket-info-tag
        overflow hidden
        line-height .32rem
        .title
            textStyle(#333, .3)
        & span
            float left
            color #333333
            font-size .2rem
            margin-right .3rem
            & i
                color $primary
                font-size .2rem
.title-wrapper
    padding rem(.2) 0
    .title
        textStyle($primary, .32)
        & i
            textStyle(#333, .32)
            margin-left rem(.3)
.content
    textStyle(#666, .28)
    line-height rem(.4)
    padding rem(.2)
</style>
