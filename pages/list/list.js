var time = require('../../utils/util');
var app = getApp();
Page({
  data:{
    lists:[
      {
        content:'欢迎使用备忘盒子！',
        id:1,
        startDate:'0000 / 00 / 00',
        startTime:'00 : 00',
        endDate:'0000 / 00 / 00',
        endTime: '00 : 00'
      }
    ],
    userInfo:{}
  },
  onLoad(){
    initData(this);
    var _self = this;
    app.getUserInfo(function(userInfo){
      _self.setData({
        userInfo:userInfo
      })
    })
  },
  onShow(){
    initData(this);
  },
  editHandle(event){
    var targetId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../add/add?id=' + targetId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  addHandle(){
    wx.navigateTo({
      url: '../add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  updateDoneState(event){
    var targetId = event.target.dataset.id;
    getData(targetId, this);
    setValue(this);
    initData(this);
  },
  removeHandle(event){
    var arr = wx.getStorageSync('txt');
    var targetId = event.target.dataset.id;
    if (arr.length>=2){
      removeItem(targetId);
      initData(this);
    }
      
    
    
  },

})

function initData(page){
  var arr = wx.getStorageSync('txt');
  if(arr.length){
    page.setData({
      lists:arr
    })
  }
}

function getData(id, page) {
  var arr = wx.getStorageSync('txt');
  if (arr.length) {
    arr.forEach((item) => {
      if (item.id == id) {
        page.setData({
          id: item.id,
          content: item.content,
          doneState: item.doneState
        })
      }
    })
  }
}

function setValue(page) {
  var arr = wx.getStorageSync('txt');
  var data = [], flag = true;
  if (arr.length) {
    arr.forEach((item) => {
      if (item.id == page.data.id) {
        item.doneState = 0;
        flag = false;

      }
      data.push(item);
    })
  }
  if (flag) {
    data.push(page.data);
  }
  wx.setStorageSync('txt', data);
}


function removeItem(pageId) {
  console.debug(pageId);
  var arr = wx.getStorageSync('txt');
  var data = [];
  if (arr.length) {
    arr.forEach((item,index) => {
      if (item.id == pageId) {
        console.debug(index);
        arr.splice(index,1);
      }
      data = arr;
    })
  }
  wx.setStorageSync('txt', data);
}