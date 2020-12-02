// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    selectAll: false,
    totalCost: 0,
    orderNum: 0,
  },
  orderList: [],

  onLoad() {
   this.getCartList()
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  onHide() {
    this.setCartList()
  },
  onShow() {
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
    if(!slected) {
      this.setData({
        totalCost: 0,
        orderNum: 0
      })
    }else{
      this.getTotalCost()
    }
  },
  allChecked() {
    const allChecked = this.data.cartList.find(le => le.checked===false) === undefined
    this.setData({
      selectAll: allChecked
    })
    this.getTotalCost()
  },
  getTotalCost() {
    let total = 0
    let orderNum = 0
    this.data.cartList.forEach(item => {
      if (item.checked) {
        total += item.cost
        orderNum ++
      }    
    })
    this.setData({
      totalCost: total,
      orderNum: orderNum
    })
  },
  countHandle(e) {
    const item = e.currentTarget.dataset.item
    const index = item[1]
    const count = `cartList[${index}].count`
    const cost = `cartList[${index}].cost`
    const cart = this.data.cartList[index]
    if(item[0] === 'decrease' && cart.count > 0) {
      if(cart.count === 1 ){
        this.setCartDelete(index)
      }else {
        this.setData({
          [count]: cart.count - 1,
          [cost]: cart.cost - cart.nowprice
        })
      }   
    }else if(item[0] === 'increase' && cart.count < cart.stock){
      this.setData({
        [count]: cart.count + 1,
        [cost]: cart.cost + cart.nowprice
      })
    }
    this.getTotalCost()
  },
  deleteCart(e) {
    console.log(e);
    const index = e.currentTarget.dataset.index
    this.setCartDelete(index)
    this.getTotalCost()
  },
  setCartDelete(index) {
    this.data.cartList.splice(index, 1)
    this.setData({
      cartList: this.data.cartList
    })
  },
  ordersSubmit() {
    if (this.data.orderNum > 0) {
      let order = {}
      this.data.cartList.forEach(item => {
      if(item.checked) {
        const { title, nowprice, count, cost} = {...item}
        order = { title, nowprice, count, cost}
      }
    })
    this.orderList.push(order)
    console.log(this.orderList);
    }   
  }
})