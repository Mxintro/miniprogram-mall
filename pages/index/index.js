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
    goodslist: [],
    typeList: ['pop', 'sell', 'new'],
    currentPage: 1
  },
  onLoad: function () {
    this.getHomeMultidata()
    this.getHomeData(this.data.typeList[this.data.tabIndex])
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
  async getHomeData(type) {
    console.log("===========================");
    const res = await request({
      url: '/home/data',
      method: 'GET',
      data: {
        type: type,
        page: this.data.currentPage
      }
    }).catch(err => console.log(err))
    const list = this.data.goodslist
    list.push(...res.data.list)
    this.setData({
      goodslist: list
    })
  },
  tabChange(e) {
    this.setData({
      tabIndex: e.detail.id
    })
    this.getHomeData(this.typeList[this.data.tabIndex])
  }
})
