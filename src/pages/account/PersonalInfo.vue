<template>
  <div class='p-i-container'>
    <my-navi title="个人信息" :isFixed="false"></my-navi>
    <ul class="p-i-ul">
          <li>
              <div class="p-i-item">
                  <span class="p-i-left">头像</span>
                  <el-upload
                      class="avatar-uploader"
                      :action="$urlPath.registerImageActionUrl"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                      :on-success="uploadSuccess"
                      :on-error="uploadError">
                      <img class="avatar p-i-right" :src="$utils.image.getImagePath($root.userInfo.state.avatar)">
                  </el-upload>
              </div>
          </li>
          <li>
              <div class="p-i-item">
                  <span class="p-i-left">昵称</span>
                  <input class="p-i-right p-i-text" placeholder="请输入用户名" maxlength="10" v-model="userName"/>
              </div>
          </li>
          <li>
              <div class="p-i-item">
                  <span class="p-i-left">email</span>
                  <input class="p-i-right p-i-text" placeholder="请输入邮箱" maxlength="20" v-model="email"/>
              </div>
          </li>
          <li>
              <div class="p-i-item">
                  <span class="p-i-left">QQ</span>
                  <input class="p-i-right p-i-text" placeholder="请输入QQ号" maxlength="12" v-model="qq"/>
              </div>
          </li>
      </ul>
      <button class="p-i-submit" @click="submit">确定</button>
  </div>
</template>

<script>

export default {
  name: '',
  components: {},
  data () {
    return {
      userName: this.$root.userInfo.state.name,
      email: this.$root.userInfo.state.email,
      qq: this.$root.userInfo.state.qq || '',
      avatarAction: ''
    }
  },
  methods: {
    beforeUpload (file) {
      let checkResult = this.$utils.image.beforeUploadImageCheck(this.$root, file)
      if (checkResult) {
        this.$loading('正在上传…')
      }
      return checkResult
    },
    uploadSuccess (response, file, fileList) {
      if (response.data) {
        this.uploadAvatar = response.data.url
        this.$http(this.$urlPath.updatedProfile, {
          nickname: this.userName,
          email: this.email,
          qq: this.qq,
          avatar: this.uploadAvatar || this.$root.userInfo.state.avatar
        }, null, (data) => {
          this.$toast('头像上传成功')
          this.$loading.close()
          this.avatar = this.$utils.image.getImagePath(response.data.url)
          this.$root.userInfo.setUserInfoAvatar(response.data.url)
        }, (errorCode, error) => {
          this.$toast(error)
          this.$loading.close()
        })
      } else {
        this.$loading.close()
        this.$toast(response.msg)
      }
    },
    uploadError (err, file, fileList) {
      this.$toast('头像上传失败' + err)
      this.$loading.close()
    },
    submit () {
      this.$http(this.$urlPath.updatedProfile, {
        nickname: this.userName,
        email: this.email,
        qq: this.qq,
        avatar: this.uploadAvatar || this.$root.userInfo.state.avatar
      }, null, (data) => {
        this.$toast('保存成功')
        if (this.userName) {
          this.$root.userInfo.setUserInfoName(this.userName)
        }
        if (this.email) {
          this.$root.userInfo.setUserInfoEmail(this.email)
        }
        if (this.qq) {
          this.$root.userInfo.setUserInfoQQ(this.qq)
        }
      }, (errorCode, error) => {
        this.$toast('上传失败' + error)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.p-i-ul
    margin-top rem(.5)
    .p-i-item
        borderBottom()
        padding 0 rem(.2)
        overflow hidden
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        height rem(1.2)
        .avatar
            width rem(.8)
            height rem(.8)
            object-fit cover
            border-radius 50%
        .p-i-left
            color #333333
            font-size .32rem
        .p-i-right
            font-size 1rem
            text-align right
        .p-i-text
            color #888888
            font-size .3rem
            padding rem(.2) 0
            box-sizing border-box
        .p-i-sex
            float right
            margin-right .2rem
.p-i-submit
    display block
    width 80%
    border-radius 2rem
    background-color $primary
    height .8rem
    margin 0 auto
    margin-top 1rem
    color #ffffff
    font-size .32rem
</style>
