// pages/submitProblems.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    description: '',
    mediaList: [] as Array<{ tempFilePath: string, type: string }>,
    address: '',
    phone: '',
    email: '',
    wechat: '',
    privacyAgreed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 标题输入
  onTitleInput(e: WechatMiniprogram.Input) {
    this.setData({ title: e.detail.value });
  },

  // 描述输入
  onDescriptionInput(e: WechatMiniprogram.TextareaInput) {
    this.setData({ description: e.detail.value });
  },

  // 选择图片或视频
  chooseMedia() {
    wx.chooseMedia({
      count: 5,
      mediaType: ['image', 'video'],
      success: (res) => {
        this.setData({
          mediaList: res.tempFiles.map(file => ({ 
            tempFilePath: file.tempFilePath, 
            type: res.type
          }))
        });
      },
      fail: () => {
        wx.showToast({
          title: '媒体选择失败',
          icon: 'none'
        });
      }
    });
  },

  // 获取地理位置
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: (locationRes) => {
            this.setData({
              address: locationRes.address
            });
          },
          fail: () => {
            wx.showToast({
              title: '位置获取失败',
              icon: 'none'
            });
          }
        });
      },
      fail: () => {
        wx.showToast({
          title: '无法获取当前位置信息',
          icon: 'none'
        });
      }
    });
  },

  // 地址输入
  onAddressInput(e: WechatMiniprogram.Input) {
    this.setData({ address: e.detail.value });
  },

  // 手机号码输入
  onPhoneInput(e: WechatMiniprogram.Input) {
    this.setData({ phone: e.detail.value });
  },

  // 邮箱输入
  onEmailInput(e: WechatMiniprogram.Input) {
    this.setData({ email: e.detail.value });
  },

  // 微信输入
  onWeChatInput(e: WechatMiniprogram.Input) {
    this.setData({ wechat: e.detail.value });
  },

// 隐私协议选项
onPrivacyChange(e: WechatMiniprogram.CustomEvent) {
  // 检查复选框是否被选中
  this.setData({ privacyAgreed: e.detail.value.length > 0 });
},

  // 提交表单
  submitForm() {
    const { title, description, mediaList, address, phone, email, wechat, privacyAgreed } = this.data;

    if (!privacyAgreed) {
      wx.showToast({
        title: '请同意隐私协议',
        icon: 'none'
      });
      return;
    }

    if (!title || !description || !address || !phone || !email || !wechat) {
      wx.showToast({
        title: '请完整填写所有信息',
        icon: 'none'
      });
      return;
    }

    // 提交表单逻辑
    wx.request({
      url: 'https://your-backend-api.com/submitRepair',
      method: 'POST',
      data: {
        title, description, mediaList, address, phone, email, wechat
      },
      success: (res) => {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '提交失败，请稍后再试',
          icon: 'none'
        });
      }
    });
  }
})