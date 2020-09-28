<template>
<div class='p-list-container'>
  <my-navi :title="countTitle" :isFixed="true"></my-navi>
  <div class="content" v-if="partners">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item :name="index" v-for="(title, index) of titles" :key="index">
        <template slot="title">
          <div class="item-title-wrapper">
            {{title}}
          </div>
        </template>
        <ul class="list-wrapper">
          <li v-for="(item, index) of partners['partners'][title]" :key="index" class="item-wrapper">
            <img v-lazy="$utils.image.getImagePath(item.avatar)" class="item-face-icon" :key="item.avatar">
            <div style="flex: 1;border-bottom: 1px solid #f5f5f5">
              <div class="item-name">
                <span>{{item.linkname}}</span>
                <span class="register-phone">手机号：{{item.phone}}</span>
              </div>
              <p class="item-phone">
                <span class="register-id">会员号：{{item.id}}</span>
                <span class="register-time">注册时间：{{item.create_time}}</span>
              </p>
            </div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
  <div v-if="errorTip" class="error-tip">暂无合作伙伴哦~</div>
</div>
</template>

<script>
export default {
  name: 'partnerList',
  components: {},
  data () {
    return {
      partners: null,
      errorTip: null,
      activeNames: [0]
    }
  },
  methods: {
    getData () {
      this.$http(this.$urlPath.partnersList, {}, '', (data) => {
        this.errorTip = null
        this.partners = data.data
      }, (errorCode, error) => {
        this.errorTip = error
      })
    }
  },
  computed: {
    titles () {
      return Object.keys(this.partners['partners'])
    },
    countTitle () {
      return this.partners ? '合作伙伴列表(' + this.partners.total + ')' : '合作伙伴列表'
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.p-list-container
    .content
        contentFixed()
        .item-title-wrapper
            padding-left rem(.2)
        .list-wrapper
            padding 0 rem(.2)
            .item-wrapper
                display flex
                padding rem(.15)
                .item-face-icon
                    border-radius 50%
                    width rem(1)
                    height rem(1)
                    object-fit cover
                    margin-right rem(.2)
                .item-name
                    textStyle(#333, .3)
                    display flex
                    justify-content space-between
                    align-items center
                    .register-phone
                      textStyle(#333, .28)
                .item-phone
                    display flex
                    justify-content space-between
                    align-items center
                    .register-id
                      textStyle(#888, .28)
                    .register-time
                      textStyle(#888, .25)
    .error-tip
        display flex
        height 100vh
        align-items center
        justify-content center
        textStyle(#888, .32)
</style>
