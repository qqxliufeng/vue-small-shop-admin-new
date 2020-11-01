<template>
  <div>
    <my-navi
      title="升级详情"
      :isFixed="true"
    />
    <div class="user-info-wrapper">
      <div class="face-wrapper">
        <img
          id="face"
          :src="$utils.image.getImagePath($root.userInfo.state.avatar)"
        >
      </div>
      <div class="nick-wrapper">
        <span class="nick">{{$root.userInfo.state.name}}</span>
        <span class="grade">{{getLevelTip($root.userInfo.state.level)}}合伙人</span>
      </div>
    </div>
    <div
      class="content-wrapper"
      v-html="details"
    ></div>
    <div class="task-wrapper">
      <div class="title-wrapper">
        <span>---</span><span class="title">完成任务升级</span><span>---</span>
      </div>
      <div class="middel-wrapper">
        <div class="left-wrapper">
          <div class="task-title">升级任务</div>
          <div class="task-sub-title">满足以下条件即可免费升级</div>
        </div>
        <div class="right-wrapper">
          升级{{getLevelTip(Number($root.userInfo.state.level) - 1)}}合伙人
        </div>
      </div>
      <div class="task-list-wrappar">
        <div class="task-item">
          <span class="task-item-title">全部会员数大于等于{{taskData.fans}}人</span>
          <span class="task-item-sub">已完成{{taskData.complement.user_num + '/' + taskData.fans}}</span>
        </div>
        <div class="task-item">
          <span class="task-item-title">有效直属合伙人数大于等于{{taskData.low}}人</span>
          <span class="task-item-sub">已完成{{taskData.complement.low_num + '/' + taskData.low}}</span>
        </div>
        <div class="task-item">
          <span class="task-item-title">结算{{Number($root.userInfo.state.level) === 1 ? '订单' : '返佣金额' }}大于等于{{((Number($root.userInfo.state.level) === 1 ? taskData.order : taskData.rebate) || 0)}}{{Number($root.userInfo.state.level) === 1 ? '单' : '元' }}</span>
          <span class="task-item-sub">已完成{{(Number($root.userInfo.state.level) === 1 ? taskData.complement.order_total : taskData.complement.rebate) + '/' + ((Number($root.userInfo.state.level) === 1 ? taskData.order : taskData.rebate) || 0)}}</span>
        </div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <el-button
        type="success"
        class="tip"
        :disabled="upgradeStatus !== 1"
        @click="upgradeApply"
      >{{ upgradeStateTip }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpgradeInfo',
  data() {
    return {
      details: '',
      taskData: {
        complement: {
          low_num: 0,
          order_total: 0,
          rebate: '0.00',
          user_num: 0
        },
        fans: 0,
        order: 0,
        low: 0
      },
      upgradeStatus: 0
    }
  },
  computed: {
    upgradeStateTip() {
      switch (this.upgradeStatus) {
        case 0:
          return '任务还未完成，加油哦~'
        case 1:
          return '升级成为' + this.getLevelTip(Number(this.$root.userInfo.state.level) - 1) + '合伙人'
        case 2:
          return '正在审核中…'
        default:
          return '升级成为中级合伙人'
      }
    }
  },
  mounted() {
    this.getData()
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
    getData() {
      this.$http(this.$urlPath.upgradeStatus, {}, '', (data) => {
        this.taskData.fans = data.data.store_set.fans
        this.taskData.order = data.data.store_set.order
        this.taskData.low = data.data.store_set.low
        this.taskData.rebate = data.data.store_set.rebate
        this.taskData.complement.low_num = data.data.low_num
        this.taskData.complement.user_num = data.data.user_num
        this.taskData.complement.order_total = data.data.order_total
        this.taskData.complement.rebate = data.data.rebate
        this.details = data.data.store_set.apply_details
        this.upgradeStatus = data.data.upgrade_status
        this.$nextTick(_ => {
          const images = document.getElementsByTagName('img')
          for (let index = 0; index < images.length; index++) {
            if (images[index].id === 'face') continue
            images[index].style.width = '100%'
          }
        })
      }, (errorCode, error) => {
        this.errorTip = error
      })
    },
    upgradeApply() {
      this.$http(this.$urlPath.upgradeApply, {}, '', (data) => {
        this.$toast('申请成功')
        this.upgradeStatus = 2
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-info-wrapper {
  margin-top: 43px;
  padding: 10px;
  background-color: #333;
  display: flex;

  .face-wrapper {
    background: #f5f5f5;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 2px solid #ffffff;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nick-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ffffff;
    justify-content: space-around;
    margin-left: 10px;

    .nick {
      font-size: 16px;
    }

    .grade {
      background-color: #fbbd08;
      border-radius: 3px;
      padding: 2px 5px;
    }
  }
}

.content-wrapper {
  padding: 10px;
  font-size: 14px;
  color: #888;
}

.bottom-wrapper {
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;

  .tip {
    width: 90%;
    margin: 0 auto;
  }
}

.task-wrapper {
  padding-bottom: 60px;
  background-color: #333;
  color: #fbbd08;

  .title-wrapper {
    text-align: center;
    padding: 20px 0;

    .title {
      font-size: 16px;
      margin: 0 10px;
    }
  }

  .middel-wrapper {
    background-color: #888;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;

    .left-wrapper {
      display: flex;
      flex-direction: column;

      .task-title {
        font-weight: bold;
        font-size: 16px;
      }

      .task-sub-title {
        margin-top: 10px;
        font-size: 12px;
      }
    }

    .right-wrapper {
      background-color: #fbbd08;
      color: #333;
      border-radius: 30px;
      padding: 8px 10px;
    }
  }

  .task-list-wrappar {
    padding: 10px;
    padding-bottom: 50px;

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fbbd08;
      padding: 10px 0;

      .task-item-sub {
        color: #b58805;
      }
    }
  }
}
</style>
