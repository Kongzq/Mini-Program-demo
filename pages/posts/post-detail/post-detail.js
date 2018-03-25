var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
    data: {
        isPlayingMusic: false,
        currentPostId:0
        
    },

  

    onLoad: function (option) {
        var postId = option.id; 
        this.data.currentPostId=postId;
        var postData = postsData.postList[postId];
        this.setData({         
          postData: postData
        })


        // var postsCollected = {
        //   1:"true",
        //   2:"false"
        //   ...
        // }

        var postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            var postCollected = postsCollected[postId]
            this.setData({
                collected: postCollected
            })
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }



        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
          
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setMusicMonitor();
    },





    onColletionTap: function (event) {
      var postsCollected = wx.getStorageSync('posts_collected');
      var postCollected = postsCollected[this.data.currentPostId];


      postCollected = !postCollected;

      postsCollected[this.data.currentPostId] = postCollected;

      this.showToast(postsCollected, postCollected);

    },





  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];

    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }
  }

,
    
  setMusicMonitor: function () {

        var that = this;
        wx.onBackgroundAudioPlay(function (event) {
         
                
                if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          
                    that.setData({
                        isPlayingMusic: true
                    })
                }
                 
           app.globalData.g_currentMusicPostId = that.data.currentPostId;
            
            app.globalData.g_isPlayingMusic = true;

        });

        wx.onBackgroundAudioPause(function () {
    
                if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
                    that.setData({
                        isPlayingMusic: false
                    })
                }
                app.globalData.g_isPlayingMusic =false;
        
        });

        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })

    

            app.globalData.g_isPlayingMusic = false;
       
        });
  },


    

    showToast: function (postsCollected, postCollected) {
    
        wx.setStorageSync('posts_collected', postsCollected);
   
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        })
    },

    onShareAppMessage: function (event) {
        return {
            title: '离思五首·其四',
            desc: '曾经沧海难为水，除却巫山不是云',
            path: '/pages/posts/post-detail/post-detail?id=0'
        }
    }  
    ,
    
    onShareTap: function (event) {
      var itemList = [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ];
      wx.showActionSheet({
        itemList: itemList,
        itemColor: "#405f80",
        success: function (res) {
          
          wx.showModal({
            title: "用户 " + itemList[res.tapIndex],
            content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
          })
        }
      })
    }

})