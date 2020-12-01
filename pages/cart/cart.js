// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    selectAll: false,
    totalCost: 0,
    orderNum: 0
  },
  onLoad() {
   this.getCartList()
  },
  
  onHide() {
    this.setCartList()
  },
  onShow() {
    this.getCartList()
  },
  onUnload() {
    console.log('============');
  },
  onPullDownRefresh() {
    this.getCartList()
  },
  getCartList() {
    wx.getStorage({
      key: 'cart',
      success: (result) => {
        this.setData({
          cartList: result.data
        })
      },
      fail: () => {},
      complete: () => {
        this.allChecked()
        this.getTotalCost()
      }
    })
  },
  setCartList() {
    wx.setStorage({
      key: 'cart',
      data: this.data.cartList,
      success: (result) => {
      },
      fail: () => {},
      complete: () => {}
    });  
  },
  goDetail(e) {
    console.log(e);
    wx.redirectTo({
      url: `/pages/detail/detail?iid=${e.currentTarget.dataset['iid']}`,
    });
  },
  checkedHandle(e) {
    const index = e.currentTarget.dataset['index']
    const checked = !this.data.cartList[index].checked
    const checkedSet = `cartList[${index}].checked`
    this.setData({
      [checkedSet]: checked
    })
    if (!checked){
      this.setData({
        selectAll: false
      })
    }else {
      this.allChecked()
    }
    this.getTotalCost()
  },
  slectAllHandle() {
    const slected = !this.data.selectAll
    this.data.cartList.forEach(el => el.checked = slected)
    this.setData({
      selectAll: slected,
      cartList: this.data.cartList
    })
  },
  allChecked() {
    const allChecked = this.data.cartList.find(le => le.checked===false) === undefined
    this.setData({
      selectAll: allChecked
    })
  },
  getTotalCost() {
    let total = 0
    let orderNum = 0
    this.data.cartList.forEach(item => {
      if (item.checked) {
        total += item.nowprice * item.count
        orderNum ++
      }    
    })
    this.setData({
      totalCost: total,
      orderNum: orderNum
    })
  }
})