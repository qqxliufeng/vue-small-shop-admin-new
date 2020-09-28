<template>
  <div class='m-b-balance-container'>
    <div
      class="header-container"
      v-if="info"
    >
      <div class="navigation">
        <span
          class="iconfont navi-back"
          @click="back"
        >&#xe625;</span>
        <span
          class="details"
          @click="balanceDetail"
        >明细</span>
      </div>
      <div class="balance-container">
        <p class="balance">￥{{Number(info.now_balance).toFixed(2) || '0.00'}}</p>
        <p class="balance-tip">当前余额</p>
        <div class="balance-wrapper">
          <div>
            <p class="total-money">￥{{Number(info.gain_balance_total).toFixed(2) || '0.00'}}</p>
            <p class="total-tip">累计获取余额</p>
          </div>
          <span class="sperator"></span>
          <div>
            <p class="total-money">￥{{Number(info.withdraw_cash_total).toFixed(2) || '0.00'}}</p>
            <p class="total-tip">累计提现余额</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="recharge-wrapper"
      @click="balanceRecharge"
    >
      <img
        v-webp="rechargeIcon"
        class="img"
      >
      <span class="tip">充值</span>
      <span class="el-icon-arrow-right right-arrow"></span>
    </div>
    <div
      class="recharge-wrapper"
      @click="balanceWithdraw"
    >
      <img
        v-webp="withdrawIcon"
        class="img"
      >
      <span class="tip">提现</span>
      <span class="el-icon-arrow-right right-arrow"></span>
    </div>
  </div>
</template>

<script>
import rechargeIcon from 'images/img_charge_icon.png'
import withdrawIcon from 'images/img_withdraw_icon.png'
export default {
  name: 'myBalance',
  data() {
    return {
      rechargeIcon,
      withdrawIcon,
      info: null
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    balanceDetail() {
      this.$router.push({ name: 'balanceDetails' })
    },
    balanceRecharge() {
      this.$router.push({ name: 'rechargeBalance' })
    },
    balanceWithdraw() {
      this.$router.push({ name: 'withdrawBalance' })
    },
    getData() {
      this.$http(this.$urlPath.balanceStatistics, {}, '', (data) => {
        this.info = data.data
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.m-b-balance-container {
  position: relative;
  height: 100vh;

  .header-container {
    background: #74D8C9;

    .navigation {
      height: $headerHeight;
      line-height: $headerHeight;

      .navi-back {
        float: left;
        color: #ffffff;
        width: rem(0.5);
        padding-left: rem(0.2);
        box-sizing: border-box;
      }

      .details {
        textStyle(#ffffff, 0.3);
        float: right;
        margin-right: rem(0.2);
      }
    }

    .balance-container {
      .balance {
        textStyle(#fff, 0.6);
        text-align: center;
        margin: rem(0.2) 0;
      }

      .balance-tip {
        textStyle(#fff, 0.25);
        text-align: center;
      }

      .balance-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: rem(1.5);
        margin-top: rem(0.4);

        .total-money {
          textStyle(#fff, 0.32);
          text-align: center;
          margin: rem(0.15) 0;
        }

        .total-tip {
          textStyle(#fff, 0.25);
          text-align: center;
        }

        .sperator {
          display: inline-block;
          width: rem(0.03);
          height: 40%;
          background: #f5f5f5;
        }
      }
    }
  }

  .recharge-wrapper {
    height: $headerHeight;
    borderBottom();
    line-height: $headerHeight;
    padding: 0 rem(0.2);

    .img {
      width: rem(0.4);
      height: rem(0.4);
    }

    .tip {
      textStyle(#333, 0.3);
      vertical-align: middle;
      margin-left: rem(0.3);
    }

    .right-arrow {
      float: right;
      line-height: $headerHeight;
      color: #888;
    }
  }

  .question {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    bottom: rem(0.5);
    textStyle(#888, 0.3);

    & span {
      margin-left: rem(0.2);
    }
  }
}
</style>
