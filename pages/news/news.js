// pages/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    newsList:[]
  },
  getNews:function(){
    var _this = this;
    wx.request({
      url: app._server + '/wety/getNewsByPage?page='+_this.data.page,
      success: function (res) {
        console.log(res.data)
        _this.setData({
          'newsList':_this.data.newsList.concat(res.data)
        })
      }
    })
  },
  getDetail:function(e){
    app.newsItem=e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '/pages/news/detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.getNews();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    _this.setData({
      page:_this.data.page+1
    })
    _this.getNews();
    wx.hideLoading();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})