angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $timeout, $rootScope, $ionicModal) {
        $rootScope.imgUrl = server.imgUrl;

        $ionicModal.fromTemplateUrl('templates/TongeBlog.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $timeout(function () {
            $scope.modal.show();
        }, 3000)

    })
    .controller('AccountCtrl', function ($scope, $rootScope, $ionicPopup, $ionicModal, $state, $ionicTabsDelegate, $ionicSlideBoxDelegate, AccountService) {

        $rootScope.isLogin = false;
        $ionicModal.fromTemplateUrl('templates/tab-account-login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.loginData = {
            name: '',
            password: ''
        }

        $scope.regData = {
            account: '',
            email: '',
            password: ''
        }

        $scope.user = {
            account: "未登陆"
        }
        $scope.login = function () {
            AccountService.login($scope.loginData.name, $scope.loginData.password, function (user) {
                //account avatar domain  email  gender id integral isemail isphone status time title weiboid
                $scope.user = user;
                $rootScope.isLogin = true;
                $scope.modal.hide();
            });
        }
        $scope.doRefresh = function () {
            AccountService.user(function (result) {
                if (result.status == false) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: result.msg
                    });
                }
                $scope.user = result;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.goDetails = function () {
            if ($rootScope.isLogin == false) {
                $scope.modal.show();
            } else {
                $state.go('tab.account-details');
                $ionicTabsDelegate.showBar(false);
            }
        }

        $scope.$on('$ionicView.beforeEnter', function () {
            console.log('已经成为活动视图');
            var user = AccountService.getCacheUser();
            if (user == undefined) {
                $rootScope.isLogin = false;
                $scope.user = {};
            } else {
                if (user.status != false) {
                    $rootScope.isLogin = true;
                    $scope.user = user;
                }
            }
            $ionicTabsDelegate.showBar(true);
        });


        var accountTab = $ionicTabsDelegate.$getByHandle('accountTab');
        var accountSlide = $ionicSlideBoxDelegate.$getByHandle('accountSlide');

        $scope.register = function () {
            AccountService.reg($scope.regData.account, $scope.regData.email, $scope.regData.password);
        }

        $scope.accountSelectedTab = function (index) {
            accountSlide.slide(index);
        }
        $scope.accountSlideChanged = function (index) {
            accountTab.select(accountSlide.currentIndex());
        };
    })
    .controller('AccountDetailsCtrl', function ($scope, $rootScope, $ionicHistory, AccountService) {
        // 注销登陆
        $scope.logout = function () {
            // 删除本地缓存
            window.localStorage.removeItem(cache.user);
            window.localStorage.removeItem(cache.token);
            $rootScope.isLogin = false;

            $ionicHistory.goBack();
        }
        $scope.user = AccountService.getCacheUser();
        $scope.doRefresh = function () {
            AccountService.user(function (user) {
                $scope.user = user;
                $rootScope.isLogin = true;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    })
    .controller('FavCtrl', function ($scope, $state, $timeout, $ionicLoading, $ionicListDelegate, FavService) {
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;

        var vm = $scope.vm = {
            row: 1,
            isload: false,
            items: [],
            load: function () {
                FavService.getFavorites(vm.row).success(function (response) {
                    console.log(response);
                    if (response.status == false || response.tngou.length == 0) {
                        vm.isload = true;
                    } else {
                        vm.row += 1;
                        vm.items = vm.items.concat(response.tngou);
                    }
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            },
            doRefresh: function () {
                vm.items = [];
                vm.row = 1;
                vm.load();
            },
            loadMore: function () {
                vm.load();
            }
        }

        $scope.goDetails = function (item) {
            $state.go('tab.tab-account', { id: item.id, title: item.title, type: item.otype })
        }
        $scope.removeItem = function (item) {
            console.log(item);
            FavService.deleteFav(item.id, item.otype).success(function (response) {
                if (response.status == true) {
                    vm.items.splice(vm.items.indexOf(item), 1);
                    $ionicListDelegate.closeOptionButtons();
                    $ionicLoading.show({
                        template: '已删除',
                        noBackdrop: true
                    })

                } else {
                    $ionicLoading.show({
                        template: '删除失败',
                        noBackdrop: true
                    })
                }
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000)
            })
        };

    })
    .controller('BaseCtrl', function ($scope, $rootScope, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
        $rootScope.imgUrl = server.imgUrl;
        //slide集合
        $scope.slides = $scope.classify;
        //顶部菜单
        $scope.tabs = $scope.classify;

        $scope.getData = function (c) {
            // 安卓平台不会自动触发加载
            if (ionic.Platform.isAndroid()) {
                c.doRefresh();
            }
            // 初始化数据，和回调函数 
            c.isload = false;
            c.callback = function () {
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }
        // 初始化第一个tab的数据
        $scope.getData($scope.classify[0]);


        //重要：因为页面中用了n个tabs组建，所以这里通过每个controller对应的currentTabId来判断哪个tabs来做选中操作。
        var selectTab = function (index) {
            // 优化 使用delegate-handle来操作tabs # currentTabId
            $ionicTabsDelegate.$getByHandle($scope.currentTabId).select(index);
        }

        $scope.slideChanged = function (index) {
            var c = $scope.classify[index]
            $scope.getData(c);
            //选中tabs
            selectTab(index);
        };

        $scope.$on('$ionicView.afterEnter', function () {
            //选中tabs
            selectTab($ionicSlideBoxDelegate.$getByHandle($scope.currentSlide).currentIndex());
        });

        $scope.selectedTab = function (index) {
            //滑动的索引和速度
            $ionicSlideBoxDelegate.slide(index)
        }
        $scope.$on('$ionicView.beforeEnter', function () {
            console.log('已经成为活动视图');
            $ionicTabsDelegate.showBar(true);
        });






    })
    .controller('Tab1Ctrl', function ($scope, $state, $controller, Tab1Service, $ionicTabsDelegate) {
        $scope.classify = Tab1Service.getClassify()
        $scope.currentTabId = "tab1";
        $scope.currentSlide = "slide1";
        //调用父级控制器之前先初始化需要的数据 这里要准备的就是分类 和 tab的索引
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            $state.go('tab.tab1-details', { id: item.id, title: item.title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('Tab1DetailsCtrl', function ($scope, $stateParams, $timeout, $ionicLoading, $ionicPopover, $ionicActionSheet, Tab1Service, AccountService, FavService) {
        var id = $stateParams.id;
        var type = $stateParams.type;
        var title = $scope.title = $stateParams.title;
        Tab1Service.getDetails(type, id).success(function (response) {
            $scope.item = response;
        })

        // Triggered on a button click, or some other target
        $scope.favorite = function () {
            var user = AccountService.getCacheUser()
            if (user == undefined) {
                $ionicLoading.show({
                    template: '请登录!',
                    noBackdrop: true
                })
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000)
                return;
            }


            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '收藏' }
                    // ,{ text: '取消' }
                ],
                // destructiveText: 'Delete',
                titleText: '收藏',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    console.log(index);
                    FavService.addFav(id, type, title).success(function (response) {
                        if (response.status == true) {
                            $ionicLoading.show({
                                template: '收藏成功',
                                noBackdrop: true
                            })
                        } else {
                            $ionicLoading.show({
                                template: '收藏失败',
                                noBackdrop: true
                            })
                        }
                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 1000)
                    });
                    return true;
                }
            });
        };
    })
    .controller('Tab2Ctrl', function ($scope, $state, Tab2Service, $controller, $ionicTabsDelegate) {
        $scope.classify = Tab2Service.getTab2Menu()
        $scope.currentTabId = "tab2";
        $scope.currentSlide = "slide2";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            $state.go('tab.tab2-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('Tab3Ctrl', function ($scope, Tab3Service, $controller, $state, $ionicTabsDelegate) {
        $scope.classify = Tab3Service.getTab3Menu()
        $scope.currentTabId = "tab3";
        $scope.currentSlide = "slide3";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            $state.go('tab.tab3-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    })
    .controller('Tab4Ctrl', function ($scope, Tab4Service, $controller, $state, $ionicTabsDelegate) {
        $scope.classify = Tab4Service.getTab4Menu()
        $scope.currentTabId = "tab4";
        $scope.currentSlide = "slide4";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            console.log(item);
            $state.go('tab.tab4-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
    });
