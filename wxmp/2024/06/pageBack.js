// 技巧一：拦截回退行为
// 有时，我们需要在用户点击回退时做一些额外的逻辑处理，比如弹窗确认
// 页面生命周期函数
onUnload() {
// 如果需要，可以在此处进行数据清理等操作
};

// 监听用户按下回退键
onBackPress() {
    wx.showModal({
        title: '提示',
        content: '确定要离开吗？',
        success(res) {
        if (res.confirm) {
            // 确认离开，可以在这里做些清理工作，然后返回
            wx.navigateBack();
        } else if (res.cancel) {
            // 取消离开，不做任何操作
        }
        },
    });
    return true; // 阻止默认的返回行为
};

// 技巧二：自定义回退逻辑
// 通过getCurrentPages()获取页面栈，实现复杂的页面跳转逻辑
function customBack() {
    const pages = getCurrentPages();
    const len = pages.length;
    if (len > 1) {
      // 自定义跳转逻辑，比如返回到指定页面
      wx.redirectTo({
        url: `/pages/${pages[len - 3].route}`,
      });
    } else {
      // 已经是首页，直接退出小程序
      wx.exitMiniProgram();
    }
  }
  
  