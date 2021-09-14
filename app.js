//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'tomato-9kzpn',
      // env:'cloud1-9gudgpcx9aaa4dd8',
      traceUser:true
    })
    this.globalData={}
    wx.cloud.callFunction({
      name:'login',
      data:{

      },
      success:res=>{
        // console.log('openid:',res.result.openid);
        this.globalData.openid = res.result.openid;
        // console.log('this.globalData.openid',this.globalData.openid);
      },
      fail:err=>{
        console.error('[云函数][login]调用失败',err);
      }
    })
  }
})