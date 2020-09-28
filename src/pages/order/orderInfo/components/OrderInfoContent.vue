<template>
  <div
    class='o-i-content-container'
    v-if="scenic"
  >
    <p class="scenic-title">{{scenic.s_title}}</p>
    <div class="sperator"></div>
    <div ref="download">
      <p
        class="item-info"
        id="download"
      >{{ticketName}} X {{ticketNum}}</p>
      <p class="item-info">下单时间：{{createOrderTime || '暂无'}}</p>
      <p class="item-info">支付时间：{{payOrderTime || '暂无'}}</p>
      <p class="item-info">验票时间：{{scenic.ticket_check}}</p>
      <p class="item-info">验票地点：{{scenic.ticket_check_info || '暂无'}}</p>
      <div v-if="voucher && voucher.length > 0">
        <p class="item-info">凭&nbsp;&nbsp;证&nbsp;&nbsp;号：<span class="no-tip">{{voucherNum}}</span></p>
        <div
          v-if="isZYB === 1"
          class="ticket-info-container"
        >
          <div class="code-wrapper">
            <img
              class="canvas-code"
              :src="zybUrl"
            />
            <p :class="['code-text', enableClass]">{{$utils.common.splitNum(voucher[0].voucher_number)}}</p>
          </div>
        </div>
        <div v-else>
          <div
            class="ticket-info-container"
            v-if="sendCode === 0"
          >
            <div
              class="code-wrapper"
              @click="showFullCode"
            >
              <canvas
                class="canvas-code"
                ref="qrcode"
                :style="{ 'opacity': this.voucher[0].use_status === 0 ? '1': '0.4' }"
              ></canvas>
              <p :class="['code-text', enableClass]">{{$utils.common.splitNum(voucher[0].voucher_number)}}</p>
            </div>
            <p
              class="download-img"
              @click="downloadImg"
              v-if="this.voucher[0].use_status === 0"
            ><span class="el-icon-download"></span>下载图片</p>
            <div class="sperator-2"></div>
            <div class="info-count-wrapper">
              <span class="info-count-item">待消费：{{voucher[0].no_check_num}}张</span>
              <span class="info-count-item">已消费：{{voucher[0].consum}}张</span>
              <span
                class="info-count-item"
                style="color: red"
              >已退款: {{refundTickets || 0}}张</span>
            </div>
          </div>
          <div v-else>
            <order-ticket-info
              v-for="item of voucher"
              :key="item.v_id"
              :itemInfo="item"
              :ticketName="ticketName"
              :refundNum="refundTickets || 0"
            ></order-ticket-info>
          </div>
        </div>
      </div>
    </div>
    <div class="sperator-3"></div>
    <el-dialog
      :visible.sync="showDialog"
      width="90%"
      :modal="false"
      :title="dialogTitle"
      center
    >
      <div class="share-img-post-wrapper">
        <img :src="postUrl">
      </div>
    </el-dialog>
    <div
      class="v-modal"
      v-show="showDialog"
    ></div>
    <div
      class="fixed-code-wrapper"
      v-show="showCode"
      @click="showCode = false"
    >
      <canvas
        class="canvas-code1"
        ref="qrcode1"
        style="background-color: red"
      ></canvas>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
import orderTicketInfo from '../../components/OrderTicketInfo'
export default {
  name: 'orderInfoContent',
  props: {
    scenic: Object,
    voucher: Array,
    ticketName: String,
    ticketNum: Number,
    sendCode: Number,
    refundTickets: Number || String,
    timeLog: Array,
    isZYB: {
      type: Number,
      default: 0
    },
    zybUrl: {
      type: String,
      default: ''
    }
  },
  components: {
    orderTicketInfo
  },
  data() {
    return {
      showDialog: false,
      postUrl: '',
      dialogTitle: '长按保存图片到手机',
      showCode: false,
      createOrderTime: '',
      payOrderTime: ''
    }
  },
  computed: {
    enableClass() {
      return this.voucher[0].use_status === 0 ? 'o-t-i-enable' : 'o-t-i-unenable'
    },
    voucherNum() {
      return this.voucher && this.voucher.length > 0 ? this.voucher[0].voucher_number : ''
    }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    createCode() {
      QRCode.toCanvas(this.$refs['qrcode'], this.voucher[0].voucher_number, error => {
        console.log(error)
      })
    },
    showFullCode() {
      this.showCode = true
      QRCode.toCanvas(this.$refs['qrcode1'], this.voucher[0].voucher_number, error => {
        console.log(error)
      })
    },
    downloadImg() {
      document.querySelector('#download').scrollIntoView()
      setTimeout(() => {
        html2canvas(this.$refs.download, {
          backgroundColor: '#f5f5f5',
          useCORS: true,
          logging: true,
          height: this.$refs.download.offsetHeight,
          width: this.$refs.download.offsetWidth,
          dpi: window.devicePixelRatio,
          x: 0,
          y: window.pageYOffset
        }).then((canvas) => {
          let dataUrl = canvas.toDataURL('image/png')
          this.postUrl = dataUrl
          this.dialogTitle = '长按保存图片到手机'
          this.showDialog = true
        })
      }, 100)
    }
  },
  mounted() {
    if (this.timeLog) {
      this.timeLog.forEach((item, index) => {
        if (item.type === '下单时间') {
          this.createOrderTime = item.ctime
        } else if (item.type === '支付时间') {
          this.payOrderTime = item.ctime
        }
      })
    }
    if (this.isZYB === 0 && this.voucher && this.voucher.length > 0 && this.sendCode === 0) {
      this.createCode()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.o-t-i-enable {
  color: #555555;
}

.o-t-i-unenable {
  color: #B6B6B6 !important;
  text-decoration: line-through;
}

.o-i-content-container {
  .fixed-code-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #333;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .canvas-code1 {
      width: rem(4) !important;
      height: rem(4) !important;
    }
  }

  .sperator {
    background-color: #f5f5f5;
    height: 1px;
    width: 100%;
  }

  .scenic-title {
    padding: rem(0.3) rem(0.2);
    textStyle(#333, 0.3);
  }

  .item-info {
    padding: rem(0.1) rem(0.2);
    textStyle(#666, 0.28);
    line-height: rem(0.4);

    .no-tip {
      textStyle($orangeColor, 0.28);
    }
  }

  .ticket-info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: rem(0.2);
    align-items: center;

    .download-img {
      border-radius: rem(0.4);
      border: 1px solid $primary;
      padding: rem(0.1) rem(0.3);
      margin-top: rem(0.2);
      color: $primary;

      & span {
        textStyle($primary, 0.35);
        margin-right: rem(0.2);
      }
    }

    .code-wrapper {
      width: rem(3.5);
      background-color: #f5f5f5;
      text-align: center;
      padding: rem(0.2);
      border-radius: rem(0.2);

      .canvas-code {
        width: rem(3) !important;
        height: rem(3) !important;
      }

      .code-text {
        margin-top: rem(0.2);
        textStyle(#666, 0.5);
      }
    }

    .sperator-2 {
      width: 85%;
      margin: 0 auto;
      background-color: #f5f5f5;
      height: 1px;
      margin: rem(0.3) 0;
    }

    .info-count-wrapper {
      display: flex;
      flex-direction: row;
      width: 90%;
      margin: 0 auto;
      justify-content: center;
      align-items: center;

      .info-count-item {
        flex: 1;
        text-align: center;
        textStyle(#666, 0.3);
      }
    }
  }

  .sperator-3 {
    background-color: #f5f5f5;
    height: 5px;
  }

  & >>> .el-dialog__body {
    padding: 0;

    .share-img-post-wrapper {
      width: 100%;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  & >>> .el-dialog__header {
    padding: rem(0.15);
  }

  & >>> .el-dialog__headerbtn {
    top: rem(0.15);
  }

  & >>> .el-dialog__title {
    font-size: rem(0.28);
  }
}
</style>
