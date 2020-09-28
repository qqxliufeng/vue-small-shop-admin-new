<template>
    <div class="r-d-user-info-container">
        <p class="r-d-user-info-title">
            <span>游客信息<i class="tourist-count">(需要提供<i>{{touristCount - 1}}</i>位游客信息)</i></span>
        </p>
        <div class="r-d-user-info-content-wrapper">
            <el-tag class="r-d-user-info-content"
                    v-for="(item, index) of userList"
                    :key="index"
                    :class="{'r-d-user-info-content-selected': item.selected && item.type === 'info'}"
                    @click.native="userItemClick(item)"
                    :closable="item.type === 'info'"
                    type="info"
                    :style="{'color' : item.type === 'add' ? '#E18234' : '#333'}"
                    @close="userItemDelete(item)"
                    size="small">
                {{item.name}}
            </el-tag>
        </div>
        <el-dialog :visible.sync="showAddUserInfoDialog" :modal="false" title="游客信息" width="90%">
            <div class="r-d-user-info-input-wrapper"  v-if="visitorInfo.indexOf('n') !== -1">
                <span>姓名</span>
                <input type="text" placeholder="请输入(1)位游客姓名" v-model="tempUserInfo.name">
            </div>
             <div class="r-d-user-info-input-wrapper"  v-if="visitorInfo.indexOf('m') !== -1">
                <span>手机号</span>
                <input type="tel" placeholder="请输入(1)位游客手机号" v-model="tempUserInfo.phone" maxlength="11">
            </div>
             <div class="r-d-user-info-input-wrapper"  v-if="visitorInfo.indexOf('id') !== -1">
                <span>身份证号</span>
                <input type="text" placeholder="请输入(1)位游客身份证号" v-model="tempUserInfo.idCard">
            </div>
             <div class="r-d-user-info-input-wrapper" v-if="visitorInfo.indexOf('u') !== -1">
                <span>学校</span>
                <input type="text" placeholder="请输入(1)位游客学校" v-model="tempUserInfo.schoolName">
            </div>
             <div class="r-d-user-info-input-wrapper" v-if="visitorInfo.indexOf('s') !== -1">
                <span>学生证号</span>
                <input type="text" placeholder="请输入(1)位游客学生证号" v-model="tempUserInfo.studentId">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelUserInfoDialog" size="mini">取 消</el-button>
                <el-button type="primary" @click="submitUserInfoDialog" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <div class="v-modal" v-show="showAddUserInfoDialog" @click="showAddUserInfoDialog = false"></div>
    </div>
</template>

<script>
export default {
  name: 'TicketUserInfo',
  props: {
    contacts: Array,
    visitorInfo: String,
    touristCount: Number
  },
  data () {
    return {
      showAddUserInfoDialog: false,
      tempUserInfo: {
        name: '',
        phone: '',
        idCard: '',
        schoolName: '',
        studentId: '',
        clear () {
          this.name = ''
          this.phone = ''
          this.idCard = ''
          this.schoolName = ''
          this.studentId = ''
        },
        setInfo (info) {
          this.name = info.name
          this.phone = info.phone
          this.idCard = info.idCard
          this.schoolName = info.schoolName
          this.studentId = info.studentId
        }
      },
      userList: [],
      addItem: {
        name: '+ 新增',
        selected: false,
        type: 'add'
      },
      userMap: {}
    }
  },
  watch: {
    contacts (newVal, oldVal) {
      if (newVal && newVal.length > 0) {
        newVal.forEach((it, index) => {
          if (!this.userMap.hasOwnProperty(it.l_name)) {
            this.userMap[it.l_name] = it
          }
        })
        this.userList.length = 0
        for (let key in this.userMap) {
          const it = this.userMap[key]
          let contact = {
            name: it.l_name,
            phone: it.l_mobile,
            idCard: it.l_id_no,
            schoolName: it.l_school,
            studentId: it.l_stdnostring,
            selected: false,
            type: 'info'
          }
          this.userList.unshift(contact)
        }
        this.userList.push(this.addItem)
      } else {
        this.userList = []
        this.userList.push(this.addItem)
      }
    }
  },
  methods: {
    selectContact () {
      this.$router.push({name: 'contactsList'})
    },
    userItemClick (item) {
      if (item.type === 'add') {
        this.showAddUserInfoDialog = true
        this.tempUserInfo.clear()
        return
      }
      this.userList.forEach(it => {
        it.selected = it === item
      })
      this.tempUserInfo.setInfo(item)
      this.showAddUserInfoDialog = true
    },
    userItemDelete (item) {
      let confirm = window.confirm('是否要删除此人信息？')
      if (confirm) {
        this.userList.splice(this.userList.indexOf(item), 1)
      }
    },
    cancelUserInfoDialog () {
      this.showAddUserInfoDialog = false
      this.tempUserInfo.clear()
    },
    submitUserInfoDialog () {
      if (!this.tempUserInfo.name && this.visitorInfo.indexOf('n') !== -1) {
        this.$toast('请输入姓名')
        return
      }
      if (!this.tempUserInfo.phone && this.visitorInfo.indexOf('m') !== -1) {
        this.$toast('请输入手机号')
        return
      }
      if (!this.$utils.validator.isPhone(this.tempUserInfo.phone) && this.visitorInfo.indexOf('m') !== -1) {
        this.$toast('请输入合法的手机号')
        return
      }
      if (!this.tempUserInfo.idCard && this.visitorInfo.indexOf('id') !== -1) {
        this.$toast('请输入身份证号')
        return
      }
      if (!this.tempUserInfo.schoolName && this.visitorInfo.indexOf('u') !== -1) {
        this.$toast('请输入学校姓名')
        return
      }
      if (!this.tempUserInfo.studentId && this.visitorInfo.indexOf('s') !== -1) {
        this.$toast('请输入学生证号')
        return
      }
      let info = {
        name: this.tempUserInfo.name,
        phone: this.tempUserInfo.phone,
        idCard: this.tempUserInfo.idCard,
        schoolName: this.tempUserInfo.schoolName,
        studentId: this.tempUserInfo.studentId,
        selected: false,
        type: 'info'
      }
      this.userList.unshift(info)
      this.showAddUserInfoDialog = false
    }
  },
  mounted () {
    this.userList.push(this.addItem)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.r-d-user-info-container
    border-top rem(.2) solid #f5f5f5
    padding-bottom rem(.8)
    .r-d-user-info-title
        textStyle(#333, .3)
        padding rem(.3)
        borderBottom()
        .tourist-count
            textStyle(#888, .25)
            & i
              textStyle($orangeColor, .25)
              font-weight bold
              margin 0 rem(.1)
        .select-user-info
            float right
            textStyle($primary, .3)
    .r-d-user-info-content-wrapper
        padding-left rem(.2)
        padding-bottom rem(.2)
        .r-d-user-info-content
            margin-right rem(.2)
            margin-top rem(.2)
            border 1px solid #f5f5f5
            color #000
        .r-d-user-info-content-selected
            border 1px solid $primary
            color $primary
    .r-d-user-info-input-wrapper
        borderBottom()
        height rem(.5)
        margin-bottom rem(.35)
        display flex
        align-items center
        & span
            flex 1.5
            textStyle(#555555, .3)
            & i
                textStyle(#ccc, .2)
        & input
            flex 3
            font-size rem(.3)
            setPlaceholder(#999)
    .v-modal
        position fixed
        top 0
        left 0
        right 0
        height 100%
        background-color #000000
        z-index 1000
        opacity .5
</style>
