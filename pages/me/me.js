var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    openid: "",
    name: "",
    menuitems: [
      { text: '操作指引', url: '../guide/guide', icon: '/images/user2.png', arrows: '/images/arrows.png' },
      { text: '清空记录', url: '#', icon: '/images/user3.png', arrows: '/images/arrows.png' },
      { text: '关于作者', url: '../author/author', icon: '/images/user4.png', arrows: '/images/arrows.png' }
    ]
  },
  onGotUserInfo: function (e) {
    const that = this;
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        console.log("云函数调用成功")
        that.setData({
          openid: res.result.openid,
          userinfo: e.detail.userInfo,
          name: e.detail.userInfo.nickName
        })
        that.data.userinfo.openid = that.data.openid
        wx.setStorageSync("userinfo", that.data.userinfo)
      },
      fail: res => {
        console.log("云函数调用失败")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo: ui,
      openid: ui.openid,
      name: ui.nickName
    })
  },

  empty: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (index == 1) {
      const that = this;
      const ui = wx.getStorageSync('userinfo')
      if (!ui.openid) {
        wx.showModal({
          title: '温馨提示',
          content: '此功能需要登录后使用',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '/pages/me/me'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showModal({
          title: '温馨提示',
          content: '记录删除后无法找回，确定删除吗？',
          success: function (res) {
            if (res.confirm) {
              var openid = that.data.openid;
              //云函数删除
              wx.cloud.callFunction({
                name: "deletelog",
                data: {
                  openid: openid,
                },
                success: res => {
                  wx.showToast({
                    title: '删除成功！',
                  })
                  console.log('删除成功！', res)
                },
                fail: err => {
                  wx.showToast({
                    title: '调用失败' + err,
                  })
                  console.error('调用失败', err)
                }
              })
            } else if (res.cancel) {
              return false;
            }
          }
        })
      }
      
    }
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