var routeApp = angular.module('routeApp',['ngRoute']);
routeApp.config(['$routeProvider',function ($routeProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'resource/views/list.html',
      controller: 'RouteListCtl'
    })
    .when('/list/:id', {
      templateUrl: 'resource/views/detail.html',
      controller: 'RouteDetailCtl'
    })
    .otherwise({
      redirectTo: '/list'
    });
}]);