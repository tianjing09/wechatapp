// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    line:[3,5,6,7,8],
    barWidth:200,
    barHeight:100,
    lineBarWidth:320,
    lineBarHeight:250,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.bar = this.selectComponent("#bar")
    this.lineBar = this.selectComponent('#lineBar')
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tap(){
  //  this.setData({
  //    line:[23,45,67]
  //  })
  //  this.bar.refreshBar()
    this.bar.refreshBar([1,2,9,7])
    let datas = {
      line: ['23', '73', '33', '23', '93', '53', '73'],
      bar: ['0.18', '1.28', '0.38', '0.81', '0.98', '2.38', '1.88'],
      key: ["一", "二", "三", "四", "五", "六", "七"]
    }
    this.lineBar.refreshViews(datas)
     
  }
})