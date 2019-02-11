import {
  IndexModel
} from '../../models/index.js'
import {
  random
} from '../../utils/randomStr.js'

const indexModel = new IndexModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    recommendInfo: {},
    markTypeList: [],
    getMore: "",
    magazineId: 0,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()

    

  },

  oncatalog() {
    wx.switchTab({
      url: '/pages/catalog/catalog',
    })
  },
  onNav(e) {
    const magazineId = e.detail.index

    this.setMagazineId(magazineId)
    this.resetData()
    this.scrollPageToTop()
    this.getData(magazineId)
  },

  getData(magazineId) {
    const articleList = indexModel.getArticleList(magazineId)
    const recommendInfo = indexModel.getRecommendInfo(magazineId)
    const markTypeList = indexModel.getMarkTypeList(magazineId)

    Promise.all([articleList, recommendInfo, markTypeList]).then(res => {
      this.setData({
        articleList: res[0],
        recommendInfo: res[1],
        markTypeList: res[2]
      })
      this.hideLoading()
    })
  },

  hideLoading() {
    this.setData({
      loading: false
    })
  },

  resetData() {
    this.setData({
      articleList: [],
      recommendInfo: {},
      markTypeList: [],
    })
  },

  scrollPageToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  setMagazineId(magazineId) {
    this.setData({
      magazineId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      getMore: random(20)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})