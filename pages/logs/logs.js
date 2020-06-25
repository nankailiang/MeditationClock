//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    dayList: [],
    list: [],
    activeIndex: 0,
    index:0,
    sum: [
      {
        title: '今日禅定次数',
        val: '0'
      },
      {
        title: '累计禅定次数',
        val: '0'
      },
      {
        title: '今日专注时长',
        val: '0分钟'
      },
      {
        title: '累计专注时长',
        val: '0分钟'
      }
    ],
    cateArr: [
      {
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: '学习'
      },
      {
        icon: 'think',
        text: '思考'
      },
      {
        icon: 'write',
        text: '写作'
      },
      {
        icon: 'sport',
        text: '运动'
      },
      {
        icon: 'read',
        text: '阅读'
      }
    ]
  },
  getlogs: function () {
    const that = this;
    const ui = wx.getStorageSync('userinfo')
    if (!ui.openid) {
      wx.showModal({
        title: '温馨提示',
        content: '登录才可查看统计',
        success (res) {
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
    } else {
      wx.cloud.callFunction({
        name: "getlogs",
        data: {
          openid: ui.openid
        },
        success: res => {
          var date = new Date();
          //年  
          var Y = date.getFullYear();
          //月  
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          //日  
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var daylog = "sum[" + 0 + "].val";
          var sumlog = "sum[" + 1 + "].val";
          var daytime = "sum[" + 2 + "].val";
          var sumtime = "sum[" + 3 + "].val";
          var day = 0;
          var dsday = 0;
          for (var i = 0; i < res.result.data.length; i++) {
            if (res.result.data[i].Y == Y && res.result.data[i].M == M && res.result.data[i].D == D) {
              day = day + 1;
              dsday = dsday + parseInt(res.result.data[i].time)
            }
          }
          var sum = 0;
          for (var i = 0; i < res.result.data.length; i++) {
            sum = sum + parseInt(res.result.data[i].time)
          }
          that.setData({
            logs: res.result.data,
            [daylog]: day,
            [sumlog]: res.result.data.length,
            [daytime]: dsday + "分钟",
            [sumtime]: sum + "分钟"
          })
          var dayList = [];
          for (var i = 0; i < res.result.data.length; i++) {
            if (res.result.data[i].Y == Y && res.result.data[i].M == M && res.result.data[i].D == D) {
              dayList.push(res.result.data[i]);
              that.setData({
                dayList: dayList,
                list:dayList
              })
            }
          }
        },
        fail: res => {
          console.log("res", res)
        }
      })
    }
  },
  onShow: function () {
    this.getlogs();
  },
  changeType: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index == 0) {
      this.setData({
        list: this.data.dayList
      })
    } else if (index == 1) {
      this.setData({
        list: this.data.logs
      })
    }
    this.setData({
      activeIndex: index
    })
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
