// pages/author/author.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})