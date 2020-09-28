<template>
<div class='n-edit-container'>
  <my-navi title="发布公告">
    <!-- <template slot="rightAction">
      <p @click="notifyList">
        <span class="el-icon-tickets record">  记录</span>
      </p>
    </template> -->
  </my-navi>
   <div class="content">
    <p>公告标题</p>
    <input placeholder="请输入您要发布的店铺公告标题……"  maxlength="20" minlength="5" v-model="title"/>
  </div>
  <div class="content">
    <p>公告内容</p>
    <textarea placeholder="请输入您要发布的店铺公告内容……"  maxlength="100" minlength="10" v-model="content"/>
  </div>
  <div class="submit" @click="submit">
    发布公告
  </div>
</div>
</template>

<script>

export default {
  name: 'editNotify',
  components: {},
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submit () {
      if (!this.title) {
        return this.$toast('请输入公告标题')
      }
      if (this.title.length < 5 || this.title.length > 20) {
        return this.$toast('请输入5~20位字符的标题内容')
      }
      if (!this.content) {
        return this.$toast('请输入公告内容')
      }
      if (this.content.length < 10 || this.content.length > 100) {
        return this.$toast('请输入10~100位字符的公告内容')
      }
      this.$http(this.$urlPath.releaseNotice, {
        notice_title: this.title,
        notice_content: this.content
      }, '', (data) => {
        this.$toast('公告发布成功')
        this.$router.go(-1)
      }, (errorCode, error) => {
        this.$toast(error)
      })
    },
    notifyList () {
      this.$router.push({name: 'notifyList'})
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.n-edit-container
    .record
        color $primary
    .content
        padding rem(.2)
        & textarea
            background #f5f5f5
            border-radius rem(.1)
            border 1px solid #DCE0E2
            width 100%
            min-height rem(3)
            padding rem(.2)
            box-sizing border-box
        & input
            background #f5f5f5
            border-radius rem(.1)
            border 1px solid #DCE0E2
            width 100%
            padding rem(.2)
            box-sizing border-box
        & p
            margin rem(.2)
            font-size rem(.28)
            color #333
    .submit
        position fixed
        bottom 0
        right 0
        left 0
        height $headerHeight
        line-height $headerHeight
        background $primary
        text-align center
        color #ffffff
        font-size rem(.32)
</style>
