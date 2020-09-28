<template>
  <div
    class='a-i-container'
    style="height:100%; position:relative"
  >
    <my-navi
      title="认证信息"
      :isFixed="true"
    >
      <slot slot="rightAction">
        <span
          class="p-i-submit"
          v-if="status === 0 || status === 3"
          @click="submit"
        >提交</span>
      </slot>
    </my-navi>
    <ul class="p-i-ul">
      <p class="important-info"><span class="el-icon-warning-outline"></span>{{ tip }}</p>
      <li>
        <div class="p-i-item">
          <span class="p-i-left">姓名</span>
          <input
            type="text"
            class="p-i-input"
            placeholder="请输入联系人姓名"
            maxlength="6"
            v-model="name"
            :readonly="status === 1 || status === 2"
          >
        </div>
      </li>
      <li>
        <div class="p-i-item">
          <span class="p-i-left">所在城市</span>
          <span
            class="p-i-right p-i-text"
            @click="selectArea"
          >{{selectedCity || '请选择城市'}}</span>
        </div>
      </li>
      <li>
        <div class="p-i-item">
          <span class="p-i-left">姓别</span>
          <div>
            <el-radio-group
              v-model="sex"
              :disabled="status === 1 || status === 2"
            >
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </div>
        </div>
      </li>
      <li>
        <div class="p-i-item">
          <span class="p-i-left">身份证号</span>
          <input
            type="text"
            class="p-i-input"
            placeholder="请输入身份证号"
            maxlength="18"
            v-model="idCard"
            :readonly="status === 1 || status === 2"
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'authInfo',
  data() {
    return {
      info: {},
      name: '',
      idCard: '',
      sex: 1,
      city: null,
      selectedCity: null,
      status: 0, // 状态 0 未认证 1 审核中 2 审核成功 3 审核失败
      tip: '请认真仔细填写认证信息，此信息设置后不可更改'
    }
  },
  computed: {
    canModify() {
      return !this.info.linkname || !this.info.city
    }
  },
  methods: {
    selectArea() {
      if (this.status === 1 || this.status === 2) {
        return
      }
      this.$router.push({ name: 'city', params: { backName: 'authInfo' } })
    },
    submit() {
      if (this.status === 1) {
        this.$toast('当前信息正在审核，请不要重复提交')
        return
      }
      if (this.status === 2) {
        this.$toast('认证信息已经审核成功')
        return
      }
      if (!this.name) {
        this.$toast('请输入联系人姓名')
        return
      }
      if (!this.city) {
        this.$toast('请选择所在城市')
        return
      }
      if (this.sex === 0) {
        this.$toast('请选择性别')
        return
      }
      if (!this.idCard) {
        this.$toast('请输入身份证号码')
        return
      }
      this.$http(this.$urlPath.identityAuthentication, {
        name: this.name,
        city: JSON.stringify(this.city),
        gender: this.sex,
        IDCard: this.idCard
      }, '正在上传…', (data) => {
        this.$route.meta.keepAlive = false
        this.info.linkname = this.name
        this.info.city = this.selectedCity
        this.info.idCard = this.idCard
        this.status = 1
        this.tip = '认证信息已经提交，正审核中…'
        this.$toast('认证信息已经提交，正审核中…')
      }, (errorCode, error) => {
        this.$toast(error)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'city' && to.params.city) {
        vm.city = to.params.city
        vm.selectedCity = to.params.city.province.value + '/' + to.params.city.city.value
      } else {
        vm.$http(vm.$urlPath.getInformation, {}, '', (data) => {
          vm.info = data.data
          vm.name = vm.info.linkname
          vm.city = {
            province: { value: vm.info.city.split('/')[0] },
            city: { value: vm.info.city.split('/')[1] }
          }
          vm.selectedCity = vm.info.city
          vm.sex = vm.info.gender
          vm.idCard = vm.info.IDCard
          vm.status = Number(vm.info.certification_status)
          switch (vm.status) {
            case 0:
              vm.tip = '请认真仔细填写认证信息，此信息设置后不可更改'
              break
            case 1:
              vm.tip = '认证信息已经提交，正审核中…'
              break
            case 2:
              vm.tip = '恭喜您，认证信息，审核成功'
              break
            case 3:
              vm.tip = '认证信息，审核失败，请重新上传信息'
              break
          }
        }, (errorCode, error) => {
          vm.$toast(error)
        })
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl';
@import '~styles/mixin.styl';

.p-i-ul {
  margin-top: rem(0.3) + $headerHeight;

  .important-info {
    textStyle($orangeColor, 0.3);
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: rem(0.2);

    & > span {
      color: red;
      padding-right: rem(0.2);
    }
  }

  .p-i-item {
    borderBottom();
    padding: 0 rem(0.2);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: rem(1.2);

    .avatar {
      width: rem(0.8);
      height: rem(0.8);
      object-fit: cover;
      border-radius: 50%;
    }

    .p-i-left {
      color: #333333;
      font-size: 0.32rem;
    }

    .p-i-right {
      font-size: 1rem;
      text-align: right;
    }

    .p-i-text {
      color: #888888;
      font-size: 0.3rem;
      padding: rem(0.2) 0;
      box-sizing: border-box;
    }

    .p-i-sex {
      float: right;
      margin-right: 0.2rem;
    }

    .p-i-input {
      text-align: right;
      flex: 1;
      margin-left: rem(0.2);
    }
  }

  .image-wrapper {
    padding: 0 rem(0.2);

    & > img {
      width: 100%;
      height: 178px;
      object-fit: cover;
      margin-bottom: rem(0.2);
    }
  }
}

.p-i-submit {
  height: 0.8rem;
  margin: 0 auto;
  margin-top: 1rem;
  color: #333;
  font-size: 0.32rem;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: rem(0.2) 0;
  text-align: center;

  .uploader-img {
    height: 100%;
    width: 100%;
    height: 178px;
    object-fit: cover;
  }
}

.avatar-uploader-icon {
  font-size: rem(0.8);
  color: #8c939d;
  width: 100%;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
