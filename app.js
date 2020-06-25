//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'tomato-9kzpn',
      traceUser:true
    })
  }
})