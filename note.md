底部tabBar的设置看app.json

星星评分看stars-template，其中的数据是在Movie.js获取并由movie.wxml传递给movie-list-template,然后传递给movie-template,传递给stars-template

点击底部tabBar的“电影”页然后点击“更多”跳转页面看movie.js的onMoreTap，url传入的category=" + category 是为了区分 “更多”页面要加载哪一方面的数据

上滑加载更多数据看more-movie.js，用的是onReachBottom，来监听页面上滑到底，看文档的“注册页面”，一开始老师用的是scroll-view组件，但后来改版了， 在滚动 scroll-view 时会阻止页面回弹，所以在 scroll-view 中滚动无法触发 onPullDownRefresh

下拉刷新看more-movie.json和more-movie.js的 onPullDownRefresh

“电影”页面的搜索部分看movie.wxml,movie.js

电影详情页看 movie.js的onMovieTap和movie-detail文件夹

收藏文章功能和音乐播放看post-detail文件夹

