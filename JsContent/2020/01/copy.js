if (item.type == 1) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: item.title + '是必选的！',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: item.title + '是必选的！',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 2) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: item.title + '是必选的！',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: item.title + '是必选的！',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 3) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: item.title + '是必填的！',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: item.title + '是必填的！',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 4) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: item.title + '是必填的！',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: item.title + '是必填的！',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 5) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: '邮箱必填!',
        });
        flag = true;
        return false;
      }
      if (!util.regEmail(item.value[0])) {
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: '邮箱必填!',
      });
      flag = true;
      return false;
    }
    
  }
  if (item.type == 6) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: '手机必填!',
        });
        flag = true;
        return false;
      }
      if (!util.regPhone(item.value[0])) {
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: '手机必填!',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 8) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: '性别必填!',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: '性别必填!',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 9) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: '年龄必填!',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: '年龄必填!',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 10) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: '时间必填!',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: '时间必填!',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 11) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: item.title + '必填!',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: item.title + '必填!',
      });
      flag = true;
      return false;
    }
  }
  if (item.type == 11) {
    if (item.value) {
      if (item.value.length == 0 || item.value[0] == "") {
        wx.showToast({
          title: item.title + '必填!',
        });
        flag = true;
        return false;
      }
    } else {
      wx.showToast({
        title: item.title + '必填!',
      });
      flag = true;
      return false;
    }
  }

/** ***************** */
collectData = [
    {
        id: '1111',
        title: '《空谷幽兰》',
        author: '[美]作者:波尔波特/2019/上海出版社',
        text: '观众对我们的认可，我非常欣慰，但同时这也是一种遗憾，成为品质的代名词，非常遗憾，但同时这也是一种遗憾，成为品质的代名词，非常遗憾',
        poster: '/images/tt.png',
    },
    {
        id: '1111',
        title: '《空谷幽兰》',
        author: '[美]作者:波尔波特/2019/上海出版社',
        text: '观众对我们的认可，我非常欣慰，但同时这也是一种遗憾，成为品质的代名词，非常遗憾，但同时这也是一种遗憾，成为品质的代名词，非常遗憾',
        poster: '/images/tt.png',
    },
]
// ------------------------------------------------------------------------
topic.js
topicData = [
    {
      id: '1111',
      title: '#孙杨进800米决赛#',
      text: '2019年韩国光州游泳世锦赛中，孙杨在800米取得第一的成绩，再一次卫冕冠军呀呀呀',
      poster: '/images/tt.png',
      person: '@梦想生活',
      time: '昨天15:36',
      upNum: 99
    },
    {
      id: '1112',
      title: '#中国队0-0平菲律宾#',
      text: '2019年东亚杯中，中国队表现不佳，遇弱旅难取分',
      poster: '/images/tt.png',
      person: '@梦想生活',
      time: '昨天15:36',
      upNum: 36
    }
]