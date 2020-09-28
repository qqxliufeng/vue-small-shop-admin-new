
// 迁移到正式的服务器的时候，一定要更换这个地址，要不然会炸的
// export const baseIP = 'http://www.liuyiqinzi.com/'

export const baseIP = 'http://www.yixinglvxing.com/'

export const baseUrl = 'distributor_api/'

export const distributorModuleUrl = baseUrl + 'distributor/'

// 创建订单
export const orderCreate = distributorModuleUrl + 'create'

export const imageUrl = baseIP

const commonModuleUrl = baseUrl + 'common/'

export const imageActionUrl = commonModuleUrl + 'upload'

// 注册分销商上传的图片地址
export const registerImageActionUrl = baseIP + commonModuleUrl + 'upload_register'

export const loginUrl = distributorModuleUrl + 'login'

export const userInfo = distributorModuleUrl + 'get_distributor_info'

export const logoutUrl = distributorModuleUrl + 'logout'

export const shareShopUrl = distributorModuleUrl + 'share_shop'

export const shareReigsterUrl = distributorModuleUrl + 'share_register'

export const register = distributorModuleUrl + 'register'

export const getCaptcha = distributorModuleUrl + 'get_captcha'

export const fastLogin = distributorModuleUrl + 'mobilelogin'

export const modifyPassword = distributorModuleUrl + 'resetpwd'

export const partnersList = distributorModuleUrl + 'partners'

export const scenicPosterList = distributorModuleUrl + 'scenic_poster'

export const selectScenicPosterList = distributorModuleUrl + 'scenic_poster2'

export const scnicPosterDetail = distributorModuleUrl + 'share_scenic_poster'

export const selectScenicPosterDetail = distributorModuleUrl + 'share_scenic_poster2'

export const ticketPosterDetail = distributorModuleUrl + 'share_goods'

export const goodsList = distributorModuleUrl + 'category'

export const withdrawCash = distributorModuleUrl + 'withdraw_cash'

export const balanceLog = distributorModuleUrl + 'balance_log'

export const getAmount = distributorModuleUrl + 'get_amount'

export const balanceStatistics = distributorModuleUrl + 'balance_statistics'

export const rebateStatistics = distributorModuleUrl + 'rebate_statistics'

export const rebateTransferBalance = distributorModuleUrl + 'rebate_transfer_balance'

export const transferBalanceLog = distributorModuleUrl + 'transfer_balance_log'

export const rebateLog = distributorModuleUrl + 'rebate_log'

export const customerService = distributorModuleUrl + 'customer_service'

export const releaseNotice = distributorModuleUrl + 'release_notice'

export const getInformation = distributorModuleUrl + 'get_information'

export const getMessage = distributorModuleUrl + 'get_message'

export const getMessageDetails = distributorModuleUrl + 'get_message_details'

export const shareImageSave = distributorModuleUrl + 'share_image_save'

export const updatedProfile = distributorModuleUrl + 'updated_profile'

export const identityAuthentication = distributorModuleUrl + 'identity_authentication'

export const rechargeBalanc = distributorModuleUrl + 'recharge_balanc'

export const searchScenic = distributorModuleUrl + 'search_scenic'

export const getWXOpenid = distributorModuleUrl + 'get_openid'

export const wxLogin = distributorModuleUrl + 'wx_login'

export const activityList = distributorModuleUrl + 'secondary_rebate'

export const activityDetails = distributorModuleUrl + 'secondary_rebate_details'

export const activityDetailsRules = distributorModuleUrl + 'secondary_rebate_rules'

const orderUrl = baseUrl + 'order/'

export const createOrder = orderUrl + 'create_order'

export const orderList = orderUrl + 'order_list'

export const orderDetails = orderUrl + 'details'

export const orderCancel = orderUrl + 'cancel'

export const orderDelete = orderUrl + 'del'

export const orderRefundDetail = orderUrl + 'refund_details'

export const orderRefundList = orderUrl + 'afer_sales_list'

export const orderRefundAfterDetail = orderUrl + 'afer_sales_details'

export const orderCancelRefund = orderUrl + 'cancel_refund'

//  用小店接口的api

export const baseUrl2 = 'store_api/v1/'

const scenicDetailModuleUrl = baseUrl2 + 'details/'

export const scenicDetailUrl = scenicDetailModuleUrl + 'scenic_details'

export const scenicDetail2Url = scenicDetailModuleUrl + 'scenic_details2'

export const goodsDetailUrl2 = scenicDetailModuleUrl + 'goods_detail2'

export const scenicNotesUrl = scenicDetailModuleUrl + 'scenic_notes'

const payModuleUrl = baseUrl2 + 'payment/'

export const orderPayUrl = payModuleUrl + 'run_pay'

export const orderPay = payModuleUrl + 'do_pay'

const orderModuleUrl = baseUrl2 + 'order/'

export const orderReserve = orderModuleUrl + 'reserve'

export const orderRefund = orderModuleUrl + 'refund'

export const orderAfterSalesLog = orderModuleUrl + 'after_sales_log'

export const commentListUrl = baseUrl2 + 'comment/comment_list'

export const askListUrl = baseUrl2 + 'ask/ask_list'

export const askAnswerListUrl = baseUrl2 + 'ask/answer_list'

export const askAnserGetScenicUrl = baseUrl2 + 'ask/get_scenic'

// 迁移到正式服务器的时候，一定要更换这个地址
const baseShareShopUrl = 'http://www.store.liuyiqinzi.com/'

// const baseShareShopUrl = 'http://www.store.yixinglvxing.com/'

// 迁移到正式的服务器的时候，一定要更换这个地址，要不然会炸的
const baseShareAdminUrl = 'http://www.liuyiqinzi.com/distributor_manage/#/'

// const baseShareAdminUrl = 'http://192.168.0.107:8888/distributor_manage/#/'

export function getShareScenicUrl(identity, storeId, sid, businessesId) {
  // scenicId = s, identity = i, storeId=t, businessesId=b
  return baseShareShopUrl + 'scenicdetail?s=' + sid + '&i=' + identity + '&t=' + storeId + '&b=' + businessesId
}

export function getShareTicketUrl(identity, storeId, sid, goodsId, promotionId) {
  // scenicId = s, identity = i, storeId=t, goodsId=g, promotion=p
  if (promotionId) {
    // 如果是活动商品，则分享活动页面
    return baseShareShopUrl + 'atdetail?s=' + sid + '&i=' + identity + '&t=' + storeId + '&g=' + goodsId + '&p=' + promotionId
  } else {
    // 如果是常规商品，则分享常规页面
    return baseShareShopUrl + 'ticketdetail?s=' + sid + '&i=' + identity + '&t=' + storeId + '&g=' + goodsId
  }
}

export function getShareRegisterUrl(pid) {
  return baseShareAdminUrl + 'registerseller?pid=' + pid
}

export function getShareShopUrl(identity, storeId) {
  return baseShareShopUrl + 'index/' + identity + '/' + storeId
}

export const weixinAuthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10a7de3814315ba1&redirect_uri=http://www.yixinglvxing.com/distributor_manage&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
