var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    isShowUserName:false,
    openid: "",
    name: "",
    menuitems: [
      { text: '操作指引', url: '../guide/guide', icon: '/images/user2.png', arrows: '/images/arrows.png' },
      { text: '清空记录', url: '#', icon: '/images/user3.png', arrows: '/images/arrows.png' },
      { text: '关于作者', url: '../author/author', icon: '/images/user4.png', arrows: '/images/arrows.png' }
    ]
  },
  getUserProfile(){
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success:(res)=>{
        console.log("获取用户信息成功！",res);
        let user = res.userInfo
        wx.setStorageSync('user', user) //保存信息到本地
        this.setData({
          isShowUserName:true,
          userInfo:user
        })
      },
      fail:res=>{
        console.log("获取用户信息失败！",res);
      }
    });
},
  
onShow(options){
  wx.setNavigationBarTitle({
    title: '我的'
  })
  this.getUserProfile()
  var user = wx.getStorageSync('user')  //本地缓存取用户信息
  if(user&&user.nickName){  //如果本地缓存有信息，显示本地缓存
    this.setData({
      isShowUserName:true,
      userInfo:user
    })
  }
},

  empty: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index == 1) {
      // const ui = wx.getStorageSync('userinfo')
      var user = wx.getStorageSync('user')
      if (!user.nickName) {
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
              var openid = app.globalData.openid;
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