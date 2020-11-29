//index.js
//获取应用实例

import request from '../../request/request.js'

const app = getApp()

Page({
  data: {
    swiperImgs: [],
    recommendsInfo: [],
    tabTitle: ['流行', '精选', '新款'],
    tabIndex: 0,
    goodsList: [],
    noScroll: false
  },
  
  queryInfo: {
    typeList: ['pop', 'sell', 'new'],
    currentPage: 1,
  },

  onLoad: function () {
    this.getHomeMultidata()
    this.getHomeData()
    console.log('==================================')
  },
  onPullDownRefresh(){
    this.setData({
      goodsList: [],
      tabIndex: 0
    })
    this.queryInfo.currentPage = 1
    this.getHomeData()
  },
  onReachBottom() {
    this.queryInfo.currentPage++
    this.getHomeData()
  },
  async getHomeMultidata(type) {
    const res = await request({
      url: '/home/multidata',
      method: 'GET',
      data:''
    }).catch(err => console.log(err))
    console.log(res);
    this.setData({
      swiperImgs: res.data['banner'].list,
      recommendsInfo: res.data['recommend'].list
    })
  },
  async getHomeData() {
    const res = await request({
      url: '/home/data',
      method: 'GET',
      data: {
        type: this.queryInfo.typeList[this.data.tabIndex],
        page: this.queryInfo.currentPage
      }
    }).catch(err => console.log(err))
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.list]
    })
    //防止页面下落
    setTimeout(() => {
      this.setData({
        noScroll: false,
      })
    },20)
    wx.stopPullDownRefresh()
  },
  tabChange(e) {
    this.setData({
      noScroll: true,
      goodsList: [],
      tabIndex: e.detail.id
    })
    this.queryInfo.currentPage = 1
    this.getHomeData()
  }
})
