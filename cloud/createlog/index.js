// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('logs').add({
      data:{
        Y:event.Y,
        M:event.M,
        D:event.D,
        h:event.h,
        m:event.m,
        s:event.s,
        cateActive:event.cateActive,
        time:event.time,
        openid:event.openid
      }
    })
  }catch(e){
    console.log(e)
  }
}