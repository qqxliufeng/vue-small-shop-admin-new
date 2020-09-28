<template>
  <div class='share-container'>
    <slot name="shareTip"></slot>
    <div
      ref="post"
      style="position: relative"
    >
      <div class="share-header">
        <slot name="shareHeader"></slot>
      </div>
      <slot name="shareInfo"></slot>
    </div>
    <p class="shop-address-wrapper">
      <slot name="shareAddress"></slot>
    </p>
    <slot name="otherInfo"></slot>
    <div class="seperator-line"></div>
    <div class="post-action-wrapper">
      <span
        class="action action1"
        @click="savePost"
      >分享图片</span>
      <span
        class="action action2"
        @click="sharePost"
      >如何分享</span>
    </div>
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
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'shareComponent',
  components: {},
  data() {
    return {
      showDialog: false,
      postUrl: '',
      dialogTitle: '长按保存图片到手机'
    }
  },
  methods: {
    savePost() {
      html2canvas(this.$refs.post, {
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: true,
        width: this.$refs.post.offsetWidth,
        height: this.$refs.post.offsetHeight,
        dpi: window.devicePixelRatio
      }).then((canvas) => {
        let dataUrl = canvas.toDataURL('image/png')
        this.postUrl = dataUrl
        this.dialogTitle = '长按保存图片到手机'
        this.showDialog = true
      })
    },
    sharePost() {
      // this.dialogTitle = '分享流程'
      // this.showDialog = true
      // this.postUrl = shareFlowImage
      this.$router.push({ name: 'shareFlow' })
    },
    createPost() {
      document.getElementsByClassName('share-image')[0].onload = () => {
        this.savePost()
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

>>> .el-dialog__header {
  padding: rem(0.15);
}

>>> .el-dialog__headerbtn {
  top: rem(0.15);
}

>>> .el-dialog__title {
  font-size: rem(0.28);
}

.share-container {
  overflow-y: scroll;
  position: relative;

  .store-id {
    position: absolute;
    top: rem(0.2);
    left: 0;
    background-color: #000;
    opacity: 0.5;
    color: #fff;
    border-top-right-radius: rem(0.3);
    border-bottom-right-radius: rem(0.3);
    padding: rem(0.1) rem(0.2);
    text-align: center;
    z-index: 999;
  }

  .share-header {
    width: 100%;
    height: 117vw;
  }

  .shop-address-wrapper {
    border-top: rem(0.1) solid #f5f5f5;
    padding: rem(0.2);

    .shop-address-title {
      textStyle(#333, 0.32);
      display: inline-block;
      width: 20%;
    }

    .shop-address {
      display: inline-block;
      word-break: break-all;
      background: #fcfcfc;
      border: 1px solid #DCE0E2;
      padding: rem(0.2);
      width: 70%;
      vertical-align: text-top;
    }
  }

  .seperator-line {
    width: 100%;
    height: rem(1);
  }

  .post-action-wrapper {
    display: flex;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    padding: rem(0.15) rem(0.3);
    justify-content: space-around;
    border-top: 1px solid #f5f5f5;
    background: #ffffff;

    .action {
      border-radius: rem(0.1);
      padding: rem(0.2) rem(0.3);
    }

    .action1 {
      border: 1px solid #eea53a;
      color: #eea53a;
    }

    .action2 {
      background: #eea53a;
      color: #ffffff;
    }
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

  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 10;
  }
}
</style>
