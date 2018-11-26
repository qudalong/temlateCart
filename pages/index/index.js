// var call =require ("../../utils/request.js")
// var util = require("../../utils/util.js")
import {request} from '../../utils/request.js'
import {formatTime} from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/banner1.png',
      '/images/banner2.png',
      '/images/banner4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentIndex: 0, //当前选中
    index: 0, //picker 当前选中
    areaArray: ["全部", "福田区", "宝安区", "龙岗区", "罗湖区", "南山区", "大鹏新区", "龙华区", "光明新区", "盐田区"],
    list: []
  },

  onLoad: function() {
    console.log(formatTime(new Date()))
    wx.showLoading({
      title: '加载中'
    });
    this.backData();
  },

  backData() {
    request({
      url: 'index.php',
      data: {
        lng: 113.66072,
        lat: 34.79977,
        Children: 1,
        type: this.data.currentIndex,
        area: this.data.areaArray[this.data.index]
      }
    }).then(res => {
      this.setData({
        list: res.data
      })
    })
  },

  //选项卡切换
  checkCurrent(e) {
    this.setData({
      currentIndex: e.detail.currentIndex
    })
    this.backData();
  },


  //区域切换
  bindPickerChange(e) {
    var index = e.detail.value;
    this.setData({
      index: index
    });
    this.backData();
  },

  //地图
  bindMap(e) {
    var lat = e.currentTarget.dataset.lat;
    var lng = e.currentTarget.dataset.lng;
    var name = e.currentTarget.dataset.name;
    var address = e.currentTarget.dataset.address;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        wx.openLocation({
          latitude: lat,
          longitude: lng,
          scale: 27,
          name: name,
          address: address
        });
      }
    });
  },

  // bindCard() {
  //   wx.navigateTo({
  //     url: '../bind/bind',
  //   })
  // }
  bindCard() {
    wx.navigateTo({
      url: '../2/2',
    })
  }

})