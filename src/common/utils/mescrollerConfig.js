export default function (warpId, mCallback) {
  return {
    mescrollDown: {}, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
    mescrollUp: { // 上拉加载的配置.
      callback: mCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
      // 以下是一些常用的配置,当然不写也可以的.
      page: {
        num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
        size: 10 // 每页数据条数,默认10
      },
      htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
      noMoreSize: 5, // 如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      empty: {
        // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        warpId: warpId, // 父布局的id (1.3.5版本支持传入dom元素)
        // icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
        tip: '暂无相关数据~' // 提示
      },
      lazyLoad: {
        use: true
      }
    }
  }
}
