//index.js
//获取应用实例
import request from '../../request/request.js'

const app = getApp()

Page({
  data: {
    swiperImgs: []
  },
  onLoad: function () {
    this.getHomeMultidata()
  },
  async getHomeMultidata() {
    const res = await request({url: '/home/multidata'}).catch(err => console.log(err))
    console.log(res)
    this.setData({
      swiperImgs: res.data['banner'].list
    })
  }
})
