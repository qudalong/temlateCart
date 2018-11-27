// pages/3/3.js
Page({
  go() {
    wx.navigateTo({
      url: '../4/4',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      pics: [],
      goods_images: []
    }
  },
  handleChoosePic: function() {
    let _this = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let pics = _this.data.formData.pics
        // 添加当前添加到已有数组
        pics = pics.concat(res.tempFilePaths)
        // 限制当前图片数量不能超过9张
        pics.length > 9 && (pics.length = 9);
        _this.setData({
          'formData': Object.assign({}, _this.data.formData, {
            pics: pics
          })
        })
      }
    })
  },
  handleDelPic: function(e) {
    let index = e.currentTarget.dataset.index
    let _another_index = ''
    let {
      pics,
      goods_images
    } = this.data.formData
    // 遍历查找是否删除原有图片中的图片
    goods_images.map((v, k) => {
      if (v.url === pics[index]) {
        _another_index = k
      }
    });
    (typeof _another_index === 'number') && goods_images.splice(_another_index, 1);
    pics.splice(index, 1);
    this.setData({
      formData: Object.assign({}, this.data.formData, {
        pics: pics,
        goods_images: goods_images
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})