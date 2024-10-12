// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    // motto: '登录',
    // userInfo: {
    //   avatarUrl: defaultAvatarUrl,
    //   nickName: '',
    // },
    // hasUserInfo: false,
    // canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    // canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    phoneNumber: '', // 用户输入的手机号码
    verificationCode: '', // 用户输入的验证码
    hasPhoneNumber: false, // 是否输入了手机号码
    isCodeSent: false, // 是否已发送验证码
    countdown: 60, // 验证码倒计时
    motto: '欢迎使用',
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    // onChooseAvatar(e: any) {
    //   const { avatarUrl } = e.detail
    //   const { nickName } = this.data.userInfo
    //   this.setData({
    //     "userInfo.avatarUrl": avatarUrl,
    //     hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    //   })
    // },
    // onInputChange(e: any) {
    //   const nickName = e.detail.value
    //   const { avatarUrl } = this.data.userInfo
    //   this.setData({
    //     "userInfo.nickName": nickName,
    //     hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    //   })
    // },
    // getUserProfile() {
    //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //   wx.getUserProfile({
    //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //     success: (res) => {
    //       console.log(res)
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // },
    // onMottoTap() {
      // wx.navigateTo({
      //   url: '/pages/warranty/warranty'
      // });
    // }
    onPhoneNumberInput(e: any) {
      const phoneNumber = e.detail.value;
      this.setData({
        phoneNumber,
        hasPhoneNumber: phoneNumber.length === 11, // 简单判断是否是11位手机号
      });
    },
    onVerificationCodeInput(e: any) {
      this.setData({
        verificationCode: e.detail.value,
      });
    },
    sendVerificationCode() {
      if (this.data.hasPhoneNumber && !this.data.isCodeSent) {
        // 这里可以加入实际发送验证码的逻辑
        console.log('发送验证码到:', this.data.phoneNumber);

        this.setData({
          isCodeSent: true,
          countdown: 60, // 设置倒计时为60秒
        });

        // 启动倒计时
        this.startCountdown();
      }
    },
    startCountdown() {
      const countdown = this.data.countdown;
      if (countdown > 0) {
        setTimeout(() => {
          this.setData({
            countdown: countdown - 1,
          });
          this.startCountdown(); // 递归调用直到倒计时结束
        }, 1000);
      } else {
        this.setData({
          isCodeSent: false, // 倒计时结束后允许重新发送验证码
          countdown: 60,
        });
      }
    },
    onLogin() {
      const { phoneNumber, verificationCode } = this.data;

      // 在这里添加验证验证码并登录的逻辑
      if (phoneNumber && verificationCode) {
        console.log('验证手机号:', phoneNumber, '和验证码:', verificationCode);
        wx.navigateTo({
          url: '/pages/warranty/warranty'
        });
        // 处理登录逻辑
      } else {
        wx.showToast({
          title: '请输入完整信息',
          icon: 'none',
        });
      }
    },
  },
})
