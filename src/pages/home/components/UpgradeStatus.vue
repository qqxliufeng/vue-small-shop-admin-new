<template>
  <div class="container">
    <div
      style="margin: 10px;"
      class="upgrade-wrapper"
    >
      <div class="flex flex-direction justify-between">
        <span class="text-white text-df">当前等级：{{ getLevelTip($root.userInfo.state.level) + '合伙人' }}</span>
        <span
          class="text-yellow text-xs"
          style="margin-top: 10px;"
        >升级成为{{ getLevelTip(Number($root.userInfo.state.level) - 1) }}合伙人享受更多的权益</span>
      </div>
      <div
        class="upgread-tag text-yellow text-xs"
        @click="upgrade()"
      >{{ showUpgrad ? '升级成为合伙人' : '查看信息' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpgradeStatus',
  data() {
    return {
      showUpgrad: false
    }
  },
  methods: {
    getLevelTip(level = 3) {
      switch (Number(level)) {
        case 1:
          return '高级'
        case 2:
          return '中级'
        case 3:
          return '初级'
        default:
          return '初级'
      }
    },
    upgrade() {
      this.$router.push({ name: 'upgradeInfo' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  border-bottom: 0.1rem solid #f5f5f5;

  .upgrade-wrapper {
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;

    .upgread-tag {
      border: 1px solid #fbbd08;
      border-radius: 15px;
      padding: 5px 15px;
    }

    .flex {
      display: flex;
    }

    .flex-direction {
      flex-direction: column;
    }

    .justify-between {
      justify-content: center;
    }

    .text-white {
      color: #ffffff;
    }

    .text-df {
      font-size: 14px;
    }

    .text-yellow {
      color: #fbbd08;
    }

    .text-xs {
      font-size: 12px;
    }
  }
}
</style>
