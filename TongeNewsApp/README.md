###在线预览地址
[http://news.tongedev.cn](http://news.tongedev.cn "http://news.tongedev.cn")

###前言
>这是一个系列文章，从环境搭建开始讲解，包括网络数据请求，将持续更新到项目完结。实战开发中遇到的各种问题的解决方案，也都将毫无保留的分享给大家。
>
**关注微信订阅号TongeBlog可查看全套移动跨平台开发框架ionic开发的新闻阅读app教程。**
 
 
###项目介绍
>本项目基于移动跨平台开发框架 Ionic 开发，主要包含健康、医疗、生活、农业、和用户五大模块，以下是功能架构图。

[图]
>![image](https://git.oschina.net/tonge/TongeNewsApp/raw/master/www/img/TongeNews.png)

###目录

- [ionic开源项目教程] 第1讲 前言,技术储备,环境搭建,常用命令
- [ionic开源项目教程] 第2讲 新建项目,架构页面,配置app.js和controllers.js
- [ionic开源项目教程] 第3讲 使用Tabs和SlideBox实现左右滑动菜单- 
- [ionic开源项目教程] 第4讲 通过Service层获取新闻列表
- [ionic开源项目教程] 第5讲 如何在项目中使用全局配置
- [ionic开源项目教程] 第6讲 过滤器filter的使用
- [ionic开源项目教程] 第7讲 实现下拉刷新上拉加载ion-refresher和ion-infinite-scroll
- [ionic开源项目教程] 第8讲  根据菜单分类加载数据(重要)
- [ionic开源项目教程] 第9讲 新闻详情页的实现[ionic开源项目教程]
- [ionic开源项目教程] 第10讲 新闻详情页的用户体验优化
- [ionic开源项目教程] 第11讲 封装BaseController实现controller继承
- [ionic开源项目教程] 第12讲 医疗模块的实现以及Service层loadMore和doRefresh的提取封装
- [ionic开源项目教程] 第13讲 Service层继续优化，提取公用Service，以及生活和农业两大模块的实现
- [ionic开源项目教程] 第14讲 ionic解决跨域问题
- [ionic开源项目教程] 第15讲 ionic用户个人中心登录注册的实现
- [ionic开源项目教程] 第16讲 实现添加收藏、获取收藏列表、删除收藏

##
>作者：Tonge
>
>出处：微信订阅号TongeBlog
>
>关于作者：移动团队负责人，喜欢分享技术，热爱移动开发，擅长于移动端后台构架、原生WindowsPhone App开发、Windows Universal Platform App(通用应用程序开发)、原生iOS开发、和移动端跨平台Ionic开发，专注于各种移动开发技术的研究。对移动端有着非常高的热情和丰富的开发经验，熟悉移动端的整个开发流程。
>如有问题，可以通过TongeDev@live.cn 联系我，非常感谢。
>
>版权申明：欢迎转载，但必须保留此段文字注明出处，违者必究。
>
>加群交流：[Tonge移动跨平台开发QQ交流群] 111055535
>![image](https://git.oschina.net/tonge/TongeNewsApp/raw/master/www/img/qqgroup.png)


##
1.制作密钥
keytool -genkey -v -keystore cn.tongedev.news -alias TongeBlog -keyalg RSA -keysize 2048 -validity 5000

2.签名
jarsigner -digestalg SHA1 -sigalg MD5withRSA -tsa https://timestamp.geotrust.com/tsa -keystore cn.tongedev.news -signedjar TongeNewsApp-signed.apk TongeNewsApp-unsigned.apk TongeBlog

3.优化
zipalign -v 4 TongeNewsApp-signed.apk TongeNewsApp.apk