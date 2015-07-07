angular.module('app',
  ['ngRoute', 'utils', 'shop', 'address', 'home', 'user', 'order', 'pay', 'item'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/index.html',
        controller: 'HomeListCtrl'
      })
      .when('/user', {
        templateUrl: '/views/user.html',
        controller: 'UserListCtrl'
      })
      .when('/address', {
        templateUrl: '/views/address.html',
        controller: 'AddressListCtrl'
      })
      .when('/shop', {
        templateUrl: '/views/shop.html',
        controller: 'ShopCommonCtrl'
      })
      .when('/item', {
        templateUrl: '/views/item.html',
        controller: 'ItemListCtrl'
      })
      .when('/item-category', {
        templateUrl: '/views/item-category.html',
        controller: 'ItemCategoryCtrl'
      })
      .when('/order', {
        templateUrl: '/views/order.html',
        controller: 'OrderListCtrl'
      })
      .when('/pay', {
        templateUrl: '/views/pay.html',
        controller: 'PayListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
