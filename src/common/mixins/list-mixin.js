let listHandlerMixin = {
  methods: {
    loadSuccess (page, mescroll, tempList) {
      if (page.num === 1) this.list = []
      if (tempList && tempList instanceof Array) {
        this.list = this.list.concat(tempList)
        mescroll.endSuccess(tempList.length)
      } else {
        mescroll.endSuccess(0)
      }
    },
    loadError (mescroll, errorCode = -1, error = '加载失败') {
      // this.$toast(error)
      if (errorCode !== 200) {
        mescroll.endErr()
      } else {
        mescroll.endSuccess(0)
      }
    }
  }
}

export default listHandlerMixin
