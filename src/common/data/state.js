let token = ''
let identity = '2'
let storeId = '1'
let registerInfo = null
let canShareTicket = false
let canFloorBuyTicket = false
let numberTask = null
try {
  if (localStorage) {
    token = localStorage.getItem('token')
    identity = localStorage.getItem('identity')
    storeId = localStorage.getItem('storeId')
    canShareTicket = sessionStorage.getItem('canShareTicket')
    canFloorBuyTicket = sessionStorage.getItem('canFloorBuyTicket')
    numberTask = JSON.parse(sessionStorage.getItem('numberTask'))
  }
} catch (error) {
  console.log(error)
}

export default {
  token,
  identity,
  storeId,
  registerInfo,
  canShareTicket,
  canFloorBuyTicket,
  numberTask,
  saveCanShareTicket (enable) {
    this.canShareTicket = enable
    sessionStorage.setItem('canShareTicket', enable)
  },
  saveCanFloorBuyTicket (enable) {
    this.canFloorBuyTicket = enable
    sessionStorage.setItem('canFloorBuyTicket', enable)
  },
  saveUserInfo (token) {
    this.token = token
    try {
      localStorage.setItem('token', token)
    } catch (error) {
      console.log(error)
    }
  },
  setUserInfoTask (numberTask) {
    this.numberTask = numberTask
    sessionStorage.setItem('numberTask', JSON.stringify(numberTask))
  },
  saveSallerInfo (identity, storeId) {
    this.identity = identity
    this.storeId = storeId
    localStorage.setItem('identity', identity)
    localStorage.setItem('storeId', storeId)
  },
  getSallerInfo () {
    return {
      identity: localStorage.getItem('identity'),
      storeId: localStorage.getItem('storeId')
    }
  },
  getReisterInfo () {
    return registerInfo
  },
  setRegisterInfo (info) {
    registerInfo = info
  }
}
