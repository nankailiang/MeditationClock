// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [
      {
        nav: '(1) 首页',
        small: '/images/prompt.png',
        fun: '选择时间：选择你将要进行任务的时长，默认为5分钟，最小为1分钟，最大为60分钟。',
        small: '/images/prompt.png',
        fun1: '选择任务：选择你将要进行任务的类型。',
        pic: '/images/index.png'
      },
      {
        nav: '(2) 统计',
        small: '/images/prompt.png',
        fun: '上部内容：是对你禅定次数以及禅定时间的统计。',
        small: '/images/prompt.png',
        fun1: '下部内容：是对你今日禅定和历史禅定的记录。',
        pic: '/images/log.png'
      },
      {
        nav: '(3) 我的',
        small: '/images/prompt.png',
        fun: '清空记录：清空所有的记录，清空之后不可恢复，谨慎操作！',
        small: '/images/prompt.png',
        fun1: '联系作者：关于作者里面是作者的联系方式，不懂得地方可直接联系客服，有意见或者发现bug都可进行意见反馈。',
        pic: '/images/me.png'
      }
    ]
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