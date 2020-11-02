//more.js
//获取应用实例
var app = getApp();
Page({
  data: {
    user:{},
    is_bind:false,
    nowweek:null
  },
  cache:function(e){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定清除缓存？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.clearStorage();
          wx.showToast({
            title: '请退出重进',
            icon: 'success',
            duration: 2000//持续的时间
          })
        } else {//这里是点击了取消以后
        }
      }
    })
    console.log(e);
  },
  onShow: function(){
    // console.log(app._user.we.id)
    if (app._user.we.id || app._user.we.name){
      this.getData();
    }
  },
  getData: function(){
    var _this = this;
    // var days = ['一','二','三','四','五','六','日'];
    _this.setData({
      'user': app._user,
      'nowweek':app._week,
      'is_bind': true
    });
  }
});