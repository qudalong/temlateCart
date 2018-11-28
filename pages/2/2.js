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
    selectFoods: [],
    navActive: 0,
    heightArr: [],
    containerH: 0
  },
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
      method: 'GET',
      success: (res) => {
        if (res.data.length) {
          this.setData({
            list: res.data,
          })

          let query = wx.createSelectorQuery();
          let heightArr = [];
          let s = 0;
          // 获取每个分类高度
          query.selectAll('.pesticide').boundingClientRect((react) => {
            react.forEach((res) => {
              s += res.height;
              heightArr.push(s)
            });
            that.setData({
              heightArr: heightArr
            })
          });
          query.select('.content').boundingClientRect((res) => {
            // 计算容器高度
            that.setData({
              containerH: res.height
            })
          }).exec()
        }
      }
    })


  },

  //左边选择联动
  chooseType(e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    })
  },

  //右边滚动联动
  onScroll(e) {
    let scrollTop = e.detail.scrollTop;
    let scrollArr = this.data.heightArr;
    if (scrollTop >= scrollArr[scrollArr.length - 1] - this.data.containerH) {
      return
    } else {
      for (let i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          this.setData({
            navActive: 0
          })
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
          this.setData({
            navActive: i
          })
        }
      }
    }
  },

  //选择商品
  onStepperEvent(e) {
    let {
      typeOneIndex,
      goodIndex,
      goodId,
      xsNum,
      goodOne,
      goodCount
    } = e.detail
    let {
      list,
      selectFoods
    } = this.data
    let good = list[typeOneIndex].goods[goodIndex]
    //在这里改变自定义count的值
    list[typeOneIndex].goods[goodIndex].count = goodCount
    //添加属性要传的属性
    good.typeOneIndex = typeOneIndex;
    good.goodIndex = goodIndex;
    if (selectFoods.includes(good)) {
      let index = selectFoods.indexOf(good)
      // 当前商品为0是清空
      goodCount === 0 ? selectFoods.splice(index, 1) : selectFoods[index].count = goodCount
    } else {
      selectFoods.push(good)
    }
    this.setData({
      list,
      selectFoods
    })
  },

  onReady: function() {

  },
  onHide: function() {
    console.log('onhide')
    wx.showModal({
      title: '',
      content: '确认前进吗',
    })
  },
  onShow: function() {
    console.log('onShow')
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