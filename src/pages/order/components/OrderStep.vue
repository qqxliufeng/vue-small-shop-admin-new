<template>
    <div class="o-i-step-container">
        <el-steps :active="active" align-center>
            <el-step :title="currentStateTip[0]" status="success"></el-step>
            <el-step :title="currentStateTip[1]" :status="currentState[0]"></el-step>
            <el-step :title="currentStateTip[2]" :status="currentState[1]"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
  name: 'orderStep',
  props: {
    active: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    }
  },
  computed: {
    currentState () {
      let status = []
      if (this.active === 2) {
        switch (this.status) {
          case 0:
            status.push('finish')
            status.push('wait')
            break
          case 1:
            status.push('success')
            status.push('wait')
            break
          case 2:
            status.push('error')
            status.push('wait')
            break
        }
      } else if (this.active === 3) {
        switch (this.status) {
          case 0:
            status.push('success')
            status.push('finish')
            break
          case 1:
            status.push('success')
            status.push('success')
            break
          case 2:
            status.push('success')
            status.push('error')
            break
        }
      } else {
        status.push('wait')
        status.push('wait')
      }
      return status
    },
    currentStateTip () {
      let tips = []
      switch (this.active) {
        case 0:
        case 1:
          tips.push('提交')
          tips.push('正在审核')
          tips.push('退款完成')
          break
        case 2:
          tips.push('提交')
          switch (this.status) {
            case 0: // 等待
              tips.push('正在审核')
              break
            case 1: // 成功
              tips.push('审核成功')
              break
            case 2: // 失败
              tips.push('审核失败')
              break
          }
          tips.push('退款完成')
          break
        case 3:
          tips.push('提交')
          tips.push('审核成功')
          switch (this.status) {
            case 0: // 等待
              tips.push('等待退款')
              break
            case 1: // 成功
              tips.push('退款成功')
              break
            case 2: // 失败
              tips.push('退款失败')
              break
          }
          break
      }
      return tips
    }
  }
}
</script>

<style lang="stylus" scoped>
.o-i-step-container
    background-color #ffffff
    border-radius .1rem
    padding .2rem 0
    margin-top .2rem
    .o-i-step-item
        font-size .2rem
</style>
