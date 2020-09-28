export default {
  computed: {
    storeInfo () {
      return {
        store: this.detail.store,
        ticketName: this.detail.ord_product_name,
        playTime: this.detail.ord_play_time,
        money: {
          title: '支付金额',
          money: this.detail.ord_amount,
          detail: [
            {
              key: '数量',
              value: 'X' + this.detail.ord_ticket_num
            },
            {
              key: '单价',
              value: '￥' + this.detail.ord_price
            },
            {
              key: '总价',
              value: '￥' + this.detail.ord_amount
            }
          ]
        }
      }
    },
    remarks () {
      if (this.detail) {
        let tempRemarks = []
        for (let key in this.detail.goods) {
          if (this.detail.goods[key] instanceof Object) {
            tempRemarks.push(this.detail.goods[key])
          }
        }
        return tempRemarks
      } else {
        return []
      }
    },
    times () {
      let arr = []
      if (this.detail.order_log && this.detail.order_log instanceof Array) {
        this.detail.order_log.forEach(element => {
          arr.push({
            title: element.type,
            value: element.ctime
          })
        })
      }
      return arr
    }
  }
}
