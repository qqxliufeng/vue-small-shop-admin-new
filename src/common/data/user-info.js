const userInfo = {
  debug: true,
  state: {
    id: sessionStorage.getItem('id'),
    authset: sessionStorage.getItem('authset'),
    token: localStorage.getItem('token'),
    name: sessionStorage.getItem('name'),
    phone: sessionStorage.getItem('phone'),
    avatar: sessionStorage.getItem('avatar'),
    email: sessionStorage.getItem('email'),
    qq: sessionStorage.getItem('qq'),
    city: sessionStorage.getItem('city'),
    balance: sessionStorage.getItem('balance'),
    rebate: sessionStorage.getItem('rebate'),
    credit: sessionStorage.getItem('credit'),
    linkname: sessionStorage.getItem('linkname'),
    openid: sessionStorage.getItem('openid'),
    payType: sessionStorage.getItem('payType') || undefined,
    payAccount: sessionStorage.getItem('payAccount') || undefined,
    unionid: localStorage.getItem('unionid') || undefined
  },
  isLogin() {
    // return this.state.id !== '' && this.state.id !== null && this.state.token !== '' && this.state.token !== null && this.state.phone !== '' && this.state.phone !== null
    return this.state.id && this.state.token && this.state.phone
  },
  setUserInfo(userInfo) {
    // avatar: "/assets/img/avatar.png"
    // city: "山西省/太原市"
    // createtime: 1601261233
    // distributor_id: 159
    // expires_in: 2592000
    // expiretime: 1603853233
    // id: 159
    // linkname: "123"
    // name: "测试注册"
    // openid: "o3Q6e1QP1C0PqdqeJc7dVnjHCrjg"
    // pay_account: "15910101117"
    // pay_type: "alipay"
    // phone: "15910101117"
    // store_id: 2
    // token: "6c43b0cc-782d-4fed-bff5-e8379c109646"
    this.state.id = userInfo.id
    this.state.storeId = userInfo.store_id
    this.state.token = userInfo.token
    this.state.phone = userInfo.phone
    this.state.name = userInfo.name
    this.state.avatar = userInfo.avatar
    this.state.city = userInfo.city
    this.state.balance = userInfo.balance
    this.state.rebate = userInfo.rebate
    this.state.credit = userInfo.line_of_credit
    this.state.linkname = userInfo.linkname
    this.state.openid = userInfo.openid
    this.state.payType = userInfo.pay_type
    this.state.payAccount = userInfo.pay_account
    this.state.unionid = userInfo.unionid
    sessionStorage.setItem('id', this.state.id)
    localStorage.setItem('token', this.state.token)
    sessionStorage.setItem('name', this.state.name)
    sessionStorage.setItem('phone', this.state.phone)
    sessionStorage.setItem('avatar', this.state.avatar)
    sessionStorage.setItem('email', this.state.email)
    sessionStorage.setItem('city', this.state.city)
    sessionStorage.setItem('balance', this.state.balance)
    sessionStorage.setItem('rebate', this.state.rebate)
    sessionStorage.setItem('credit', this.state.credit)
    sessionStorage.setItem('linkname', this.state.linkname)
    sessionStorage.setItem('openid', this.state.openid)
    sessionStorage.setItem('payType', this.state.payType)
    sessionStorage.setItem('payAccount', this.state.payAccount)
    localStorage.setItem('unionid', this.state.unionid)
  },
  setUserInfoAvatar(avatar) {
    this.state.avatar = avatar
    sessionStorage.setItem('avatar', this.state.avatar)
  },
  setUserInfoName(name) {
    this.state.name = name
    sessionStorage.setItem('name', this.state.name)
  },
  setUserInfoEmail(email) {
    this.state.email = email
    sessionStorage.setItem('email', this.state.email)
  },
  setUserInfoQQ(qq) {
    this.state.qq = qq
    sessionStorage.setItem('qq', this.state.qq)
  },
  setUserInfoCity(city) {
    this.state.city = city
    sessionStorage.setItem('city', this.state.city)
  },
  setUserInfoRebate(rebate) {
    this.state.rebate = rebate
    sessionStorage.setItem('rebate', this.state.rebate)
  },
  setUserInfoBalance(balance) {
    this.state.balance = balance
    sessionStorage.setItem('balance', this.state.balance)
  },
  setUserInfoOpenId(openid) {
    this.state.openid = openid
    sessionStorage.setItem('openid', this.state.openid)
  },
  setPayAccountInfo(payType, payAccount) {
    this.state.payType = payType
    this.state.payAccount = payAccount
    sessionStorage.setItem('payType', this.state.payType)
    sessionStorage.setItem('payAccount', this.state.payAccount)
  },
  setUserUnionid(unionid) {
    this.state.unionid = unionid
    localStorage.setItem('unionid', unionid)
  },
  clearInfoAction() {
    this.state.id = ''
    this.state.token = ''
    this.state.phone = ''
    sessionStorage.clear()
    if (localStorage) {
      localStorage.clear()
    }
  }
}

export default userInfo
