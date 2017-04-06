// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionicLazyLoad','starter.controllers', 'starter.services', 'starter.filter'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .directive('selectOnClick', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          if (!$window.getSelection().toString()) {
            // Required for mobile Safari
            this.setSelectionRange(0, this.value.length)
          }
        });
      }
    };
  }])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.style("standard"); // standard | striped

    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.text('返回');
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'AppCtrl'
      })
      .state('tab.tab1', {
        url: '/tab1',
        views: {
          'tab1': {
            templateUrl: 'templates/tab1.html',
            controller: 'Tab1Ctrl'
          }
        }
      })
      .state('tab.tab1-details', {
        url: '/tab/tab1-details/:id/:title/:type',
        views: {
          'tab1': {
            templateUrl: 'templates/tab1-details.html',
            controller: 'Tab1DetailsCtrl'
          }
        }
      })
      .state('tab.tab2', {
        url: '/tab2',
        views: {
          'tab2': {
            templateUrl: 'templates/tab2.html',
            controller: 'Tab2Ctrl'
          }
        }
      })
      .state('tab.tab2-details', {
        url: '/tab/tab2-details/:id/:title/:type',
        views: {
          'tab2': {
            templateUrl: 'templates/tab2-details.html',
            controller: 'Tab1DetailsCtrl'
          }
        }
      })
      .state('tab.tab3', {
        url: '/tab3',
        views: {
          'tab3': {
            templateUrl: 'templates/tab3.html',
            controller: 'Tab3Ctrl'
          }
        }
      })
      .state('tab.tab3-details', {
        url: '/tab/tab3-details/:id/:title/:type',
        views: {
          'tab3': {
            templateUrl: 'templates/tab3-details.html',
            controller: 'Tab1DetailsCtrl'
          }
        }
      })
      .state('tab.tab4', {
        url: '/tab4',
        views: {
          'tab4': {
            templateUrl: 'templates/tab4.html',
            controller: 'Tab4Ctrl'
          }
        }
      })
      .state('tab.tab4-details', {
        url: '/tab/tab4-details/:id/:title/:type',
        views: {
          'tab4': {
            templateUrl: 'templates/tab4-details.html',
            controller: 'Tab1DetailsCtrl'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.account-login', {
        url: '/tab/account-login',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account-login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('tab.account-fav', {
        url: '/tab/account-fav',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account-fav.html',
            controller: 'FavCtrl'
          }
        }
      })
       .state('tab.tab-account', {
        url: '/tab/tab4-account/:id/:title/:type',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab2-details.html',
            controller: 'Tab1DetailsCtrl'
          }
        }
      })
      .state('tab.account-details', {
        url: '/tab/account-details',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account-details.html',
            controller: 'AccountDetailsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/tab1');

  });
