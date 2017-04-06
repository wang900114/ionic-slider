angular.module('starter.services', [])
  .service('AccountService', function ($http) {
    var $this = this;
    console.log(this)
    // 获取缓存用户信息
    this.getCacheUser = function () {
      return angular.fromJson(window.localStorage[cache.user]);
    }

    // 登陆
    this.login = function (name, password, callback) {
      var url = urls.login + "&name=" + name + "&password=" + password;
      $http.jsonp(url).success(function (response) {
        if (response.status == true) {
          window.localStorage[cache.token] = response.access_token;
          $this.user(callback);
        } else {
          alert("用户名和密码不匹配！");
        }
      })
    }
    // 获取信息
    this.user = function (callback) {
      var url = urls.user + "&access_token=" + window.localStorage[cache.token];
      $http.jsonp(url).success(function (response) {
        console.log(response);
        window.localStorage[cache.user] = angular.toJson(response);
        callback(response)
      })
    }

    // 注册
    this.reg = function (account, email, password) {
      var url = urls.reg + "&account=" + account + "&email=" + email + "&password=" + password;
      $http.jsonp(url).success(function (response) {
        if (response.status == false) {
          alert(response.msg);
        } else {
          window.localStorage[cache.token] = response.access_token;
        }
      })
    }



  })
  .service('FavService', function ($http) {
    //获取收藏列表
    this.getFavorites = function (page) {
      var url = urls.favorite + "&page=" + page + "&rows" + settings.rows + "&access_token=" + window.localStorage[cache.token];
      return $http.jsonp(url);
    }
    //删除收藏
    this.deleteFav = function (id, type) {
      var url = urls.favoriteDelete + "&id=" + id + "&type=" + type + "&access_token=" + window.localStorage[cache.token]
      return $http.jsonp(url);
    }
    //添加收藏
    this.addFav = function (id, type, title) {
      var url = urls.favoriteAdd + "&id=" + id + "&type=" + type + "&title=" + title + "&access_token=" + window.localStorage[cache.token]
      return $http.jsonp(url);
    }
  })
  .service('BaseService', function ($http) {
    this.loadMore = function ($this) {
      console.log("正在加载更多数据..." + $this.page);
      $http.jsonp($this.url + "?page=" + $this.page + "&rows=" + settings.rows + "&callback=JSON_CALLBACK").success(function (response) {
        console.log(response);
        if (response.tngou.length > 0) {
          $this.items = $this.items.concat(response.tngou);
          $this.page++;
        } else {
          console.log("没有数据了...")
          $this.isload = true;
        }
        $this.callback();
      });
    }

    this.doRefresh = function ($this) {
      console.log("正在执行refresh操作...");
      //使用jsonp的方式请求
      $http.jsonp($this.url + "?page=1&rows=" + settings.rows + "&callback=JSON_CALLBACK").success(function (response) {
        console.log(response);
        $this.page = 2;
        $this.items = response.tngou;
        $this.callback();
        $this.isload = false;
      });
    }
  })
  .service('Tab1Service', function ($http, BaseService) {

    this.getClassify = function () {
      return [
        {
          name: '精选', isload: true, url: server.domain + '/info/list', type: 'info',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '专刊', isload: true, url: server.domain + '/lore/list', type: 'lore',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '编委选文', isload: true, url: server.domain + '/ask/list', type: 'ask',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '论坛', isload: true, url: server.domain + '/ask/list', type: 'ask',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          },
        },
        {
          name: '走读中国', isload: true, url: server.domain + '/ask/list', type: 'ask',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          },
        }
      ]
    }

    this.getDetails = function (type, id) {
      var url = server.domain + "/" + type + "/show?id=" + id + "&callback=JSON_CALLBACK";
      return $http.jsonp(url);
    }
  })
  .service('Tab2Service', function ($http) {
    var loadMore = function ($this) {
      console.log("正在加载更多数据..." + $this.page);
      $http.jsonp($this.url + "?page=" + $this.page + "&rows=" + settings.rows + "&callback=JSON_CALLBACK").success(function (response) {
        console.log(response);
        if (response.list) {
          $this.items = $this.items.concat(response.list);
          $this.page++;
        } else {
          console.log("没有数据了...")
          $this.isload = true;
        }
        $this.callback();
      });
    }

    var doRefresh = function ($this) {
      console.log("正在执行refresh操作...");
      $http.jsonp($this.url + "?page=1&rows=" + settings.rows + "&callback=JSON_CALLBACK").success(function (response) {
        console.log(response);
        if (response.list) {
          $this.page = 2;
          $this.items = response.list;
        }
        $this.callback();
        $this.isload = true;
      });
    }
    this.getTab2Menu = function () {
      return [
        {
          name: '疾病查询', isload: true, url: server.domain + '/disease/list', type: 'disease',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '病状查询', isload: true, url: server.domain + '/symptom/list', type: 'symptom',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '检查项目', isload: true, url: server.domain + '/check/list', type: 'check',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '手术项目', isload: true, url: server.domain + '/operation/list', type: 'operation',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            loadMore(this);
          },
          doRefresh: function () {
            doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        }
      ]
    }

  })
  .service('Tab3Service', function (BaseService) {

    this.getTab3Menu = function () {
      return [
        {
          name: '社会热点', isload: true, url: server.domain + '/top/list', type: 'top',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康菜谱', isload: true, url: server.domain + '/cook/list', type: 'cook',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康食品', isload: true, url: server.domain + '/food/list', type: 'food',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        }
      ]
    }

  })
  .service('Tab4Service', function ($http, BaseService) {

    this.getTab4Menu = function () {
      return [
        {
          name: '农业新闻', isload: true, url: server.domain + '/news/list', type: 'news',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '农业技术', isload: true, url: server.domain + '/tech/list', type: 'tech',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        }
      ]
    }

    this.getDetails = function (type, id) {
      var url = server.domain + "/" + type + "/show?id=" + id + "&callback=JSON_CALLBACK";
      return $http.jsonp(url);
    }
  });
