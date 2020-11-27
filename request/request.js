export default function (config) {
  const baseUrl = 'http://152.136.185.210:8000/api/w6'
  return new Promise((resole, reject) => {
    wx.request({
      url: baseUrl + config.url, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        resole(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}