// pages/2/2.js
Page({
  go() {
    wx.navigateTo({
      url: '../3/3',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    cartList: []
  },
  onLoad: function(options) {
    wx.request({
      url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
      method: 'GET',
      success: (res) => {
        this.setData({
          list: res.data
        })
        // console.log(this.data.list)
      },
    })
  },
  add(e) {
    const food = e.currentTarget.dataset.food
    const parentIndex = e.currentTarget.dataset.parentIndex
    const index = e.currentTarget.dataset.index
    const currentFood = this.data.list[parentIndex].goods[index]
    if (currentFood.count) {
      currentFood.count += 1
      const i = this.data.cartList.findIndex((value)=>{
        return value.name == currentFood.name
      })
      this.data.cartList[i].count+=1
      console.log('tou')
    } else {
      currentFood.count = 1
      this.data.cartList.push(currentFood)
      console.log('mei')
    }



    this.setData({
      list: this.data.list,
      cartList: this.data.cartList
    })
  },


  minus(e) {
    const parentIndex = e.currentTarget.dataset.parentIndex
    const index = e.currentTarget.dataset.index
    const currentFood = this.data.list[parentIndex].goods[index]
    if (currentFood.count) {
      currentFood.count = currentFood.count - 1
      const i = this.data.cartList.findIndex((value) => {
        return value.name == currentFood.name
      })
      this.data.cartList[i].count = this.data.cartList[i].count - 1
      if (this.data.cartList[i].count == 0) {
        this.data.cartList.splice(i,1)
      }
    }
    this.setData({
      list: this.data.list,
      cartList: this.data.cartList
    })
  },






  onReady: function() {},
  onShow: function() {
    console.log('onshow')
  },
  onHide: function() {
    console.log('onhide')
    wx.showModal({
      title: '',
      content: '确认前进吗',
    })
  },
  onUnload: function() {
    console.log('onunload')
    wx.showModal({
      title: '',
      content: '确认返回吗',
    })
  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})