export default {
  data () {
    return {
      calendar: {
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        begin: () => {
          let date = new Date()
          return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        }
      },
      times: [
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        },
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        },
        {
          date: '',
          week: '',
          price: '0',
          count: 0,
          salesId: '',
          isEnable: false,
          isSelected: false,
          raw: {}
        }
      ],
      events: {},
      tempTime: {
        date: '',
        price: '0',
        count: 0,
        isEnable: false,
        isSelected: false,
        raw: {}
      }
    }
  },
  methods: {
    initCalendar (ticketInfo) {
      if (ticketInfo.calendar.constructor === Object) {
        this.tempTime.count = ticketInfo.calendar.one_stock || 0
        this.tempTime.price = ticketInfo.calendar.cost_prices
        this.tempTime.raw = ticketInfo.calendar
        this.minNum = ticketInfo.goods.min_number
        this.maxNum = ticketInfo.goods.highest_number === 0 ? 1000000 : ticketInfo.goods.highest_number
        this.num = this.minNum
        if (this.emit) {
          this.emit()
        }
        if (this.onSelect) {
          this.onSelect()
        }
      } else {
        let tempEvent = {}
        ticketInfo.calendar.forEach((item) => {
          if (item.oneStock) {
            item.one_stock = item.oneStock
          }
          tempEvent[item.date] = item
        })
        this.minNum = ticketInfo.goods.min_number
        this.maxNum = ticketInfo.goods.highest_number === 0 ? 1000000 : ticketInfo.goods.highest_number
        this.num = this.minNum
        this.events = tempEvent
        this.initDate()
      }
    },
    initDate () {
      let date = new Date()
      const time = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()
      for (let obj in this.events) {
        const temp = this.events[obj]
        const objDate = new Date(obj.replace(/-/g, '/'))
        const objTime = objDate.getTime()
        if (temp && temp.one_stock && parseInt(temp.one_stock) !== 0 && parseInt(temp.one_stock) !== -2 && (time <= objTime)) {
          date = objDate
          break
        }
      }
      this.times.forEach((it, index) => {
        this.setTimesItem(date, it, index)
      })
      let tempArray = this.times.filter((item, index, array) => item.isEnable)
      if (tempArray && tempArray.length > 0) {
        tempArray[0].isSelected = true
        this.tempTime = tempArray[0]
        if (this.emit) {
          this.emit()
        }
        if (this.onSelect) {
          this.onSelect()
        }
      }
    },
    timeItemClick (item) {
      this.tempTime = item
      this.num = 1
      this.times.forEach(element => {
        element.isSelected = element === item
      })
      if (this.emit) {
        this.emit()
      }
      if (this.onSelect) {
        this.onSelect()
      }
    },
    select (startDate, child) {
      if (child.eventName) {
        let date = new Date(startDate[0], startDate[1] - 1, startDate[2])
        this.times.forEach((it, index) => {
          this.setTimesItem(date, it, index)
        })
        this.tempTime = this.times[0]
        if (this.emit) {
          this.emit()
        }
        if (this.onSelect) {
          this.onSelect()
        }
        this.isShowCanlendarDialog = false
      } else {
        this.$toast('所选日期暂无票的信息，请重新选择…')
      }
    },
    setTimesItem (date, it, index) {
      it.date = this.$utils.dateAdd(date, index).date
      it.week = this.$utils.dateAdd(date, index).week
      let temp = this.events[it.date]
      it.isEnable = this.events.hasOwnProperty(it.date) && temp && parseInt(temp.one_stock) !== 0
      it.count = it.isEnable && temp ? temp.one_stock : 0
      it.price = temp ? temp.cost_prices : '0'
      it.isSelected = it.isEnable && index === 0
      it.raw = temp
    },
    releaseCount (count) {
      if (count === null) return ''
      if (count === -1 || count === -2 || count === 0) {
        return ''
      } else {
        return '余' + Math.min(count, 99999)
      }
    }
  }
}
