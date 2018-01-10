var time = require('../../utils/util');
Page({
  data:{
    sureText:'确定',
    defaultDate: time.formatTime(new Date(Number(Date.now()))),
    startDate: time.formatTime(new Date(Number(Date.now()))),
    startTime: time.formatTimes(new Date(Number(Date.now()))),
    endDate: time.formatTime(new Date(Number(Date.now()))),
    endTime: '23 : 59'
  },
  onLoad(event){
    var id = event.id;
    if(id){
      getData(id,this);
      this.setData({
        sureText: '保存'
      })
    }else{
      this.setData({
        id:Date.now(),
        sureText:'添加'
      })
    }
  },
  changeHandle(event){
    var val = event.detail.value;
    this.setData({
      content:val
    })
  },



  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value.replace(/-/g, ' / ')
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value.replace(':', ' : ')
    })
  },


  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value.replace(/-/g, ' / ')
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value.replace(':',' : ')
    })
  },



  cancelHandle(){
    wx.navigateBack()
  },
  sureHandle(){
    var re = /^\s*$/g;
    if(!this.data.content || re.test(this.data.content)){
      return;
    }
    setValue(this)
    wx.navigateBack()
  }
})

function getData(id,page){
  var arr = wx.getStorageSync('txt');
  if(arr.length){
    arr.forEach((item)=>{
      if(item.id==id){
        page.setData({
          id:item.id,
          content:item.content,
          startDate:item.startDate,
          startTime:item.startTime,
          endDate:item.endDate,
          endTime:item.endTime
        })
      }
    })
  }
}

function setValue(page){
  var arr = wx.getStorageSync('txt');
  var data = [],flag=true;
  if(arr.length){
    arr.forEach((item)=>{
      if(item.id==page.data.id){
        item.content = page.data.content;
        item.startDate = page.data.startDate;
        item.startTime = page.data.startTime;
        item.endDate = page.data.endDate;
        item.endTime = page.data.endTime;
        flag = false;

      }
      data.push(item);
    })
  }
  if (flag){
    data.unshift(page.data);
  }
  wx.setStorageSync('txt', data);
}