// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  bindTelInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  getCode: function() {
    var tel = this.data.inputValue;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!tel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
    } else if (!myreg.test(tel)) {
      wx.showToast({
        title: '您输入的手机号有误',
        icon: 'none'
      });
    }
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