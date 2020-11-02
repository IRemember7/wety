//cj.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '',
    id:'',
    name:'',
    cjInfo: [
    ],
    sem_list: ''//学期列表
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
      cjInfo:app._user.cj,
      remind:''
    }); 
    // 不同年级分类不同成绩
    switch (app._user.we.id[3]){
      // 当前大四
      case '7':{
        _this.setData({
          sem_list: [{ 'sem': '2019-2020-2', 'grade': '三', 'par': '下' }, { 'sem': '2019-2020-1', 'grade': '三', 'par': '上' }, { 'sem': '2018-2019-2', 'grade': '二', 'par': '下' }, { 'sem': '2018-2019-1', 'grade': '二', 'par': '上' }, { 'sem': '2017-2018-2', 'grade': '一', 'par': '下' }, { 'sem': '2017-2018-1', 'grade': '一', 'par': '上' }]
        })
        break;
      }
      // 当前大三
      case '8': {
        _this.setData({
          sem_list: [{ 'sem': '2019-2020-2', 'grade': '二', 'par': '下' }, { 'sem': '2019-2020-1', 'grade': '二', 'par': '上' }, { 'sem': '2018-2019-2', 'grade': '一', 'par': '下' }, { 'sem': '2018-2019-1', 'grade': '一', 'par': '上' }]
        })
        break;
      }
      // 当前大二
      case '9': {
        _this.setData({
          sem_list: [{ 'sem': '2019-2020-2', 'grade': '一', 'par': '下' },{ 'sem': '2019-2020-1', 'grade': '一', 'par': '上' }, ]
        })
        break;
      }
      // 当前大一
      case '0': {
        _this.setData({
          sem_list: [{ 'sem': '2020-2020-1', 'grade': '一', 'par': '上' }, ]
        })
        break;
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var _this = this;
    wx.request({
      url: app._server + '/wety/getRefreshCj',
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app._user.we.id,
        passwd: app._user.we.passwd,
      },
      success: function (res) {
        console.log(res.data)
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '更新成功', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1000  // 提示窗停留时间，默认1500ms
        })
        _this.setData({
          'cjInfo':res.data
        })
        app._user.cj = res.data
        wx.setStorage({
          data: res.data,
          key: 'cj',
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