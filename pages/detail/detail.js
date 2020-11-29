// pages/detail/detail.js
import { getDetail, getRecommend,Goods, GoodsParam, Shop, Sku } from '../../request/detail'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImages: [],
    goodInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo:{},
    recommendList: [],
    navBarIndex: 0,
    skuInfo: {},
    skuVisible: false,
    isBuying: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getDetailData(options.iid)
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  async _getDetailData(iid) {
    try {
      const res = await getDetail(iid)
      const data = res.result
      
      this.setData({
        goodInfo: new Goods(data.itemInfo, data.columns, data.shopInfo.services),
        shopInfo: new Shop(data.shopInfo),
        detailInfo: data.detailInfo,
        topImages: data.itemInfo.topImages,
        paramInfo: new GoodsParam(data.itemParams.info, data.itemParams.rule),
        commentInfo: data.rate.list ? data.rate : {},
        skuInfo: new Sku(data.skuInfo)
      })
    } catch (err) {
      console.log(err)
    }
  }
  
})