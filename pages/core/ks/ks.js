//ks.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    id:'',
    name:'',
    list: null,
    first: 1
  },
  togglePage: function (e) {
    var id = e.currentTarget.id, data = {};
    data.show = [];
    for (var i = 0, len = this.data.class.length; i < len; i++) {
        data.show[i] = false;
    }
    if(this.data.first){
      this.setData(data);
      this.data.first = 0;
    }
    data.show[id] = !this.data.show[id];
    this.setData(data);
  },
  onLoad: function(){
    var _this = this;
    if(!app._user.we.id || !app._user.we.name){
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    _this.setData({
      id: app._user.we.id,
      name: app._user.we.name,
      list:app._user.ks,
      remind:''
    });
  },
  // 展示考试详情
  slideDetail: function(e) {
    var id = e.currentTarget.dataset.id, 
        list = this.data.list;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  },
  onPullDownRefresh: function () {
    var _this = this;
    wx.request({
      url: app._server + '/wety/getRefreshKs',
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app._user.we.id,
        passwd: app._user.we.passwd,
      },
      success: function (res) {
        // console.log(res.data)
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '更新成功', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1000  // 提示窗停留时间，默认1500ms
        })
        _this.setData({
          'list':res.data
        })
        app._user.ks = res.data
        wx.setStorage({
          data: res.data,
          key: 'ks',
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  onShareAppMessage:function(){
    
  }
});
