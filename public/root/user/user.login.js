(function () {
  'use strict';

  angular
    .module('user.login', [])
    .controller('UserLoginCtrl', UserLoginCtrl);

  UserLoginCtrl.$inject = ['$scope', '$location'];

  /* @ngInject */
  function UserLoginCtrl($scope, $location) {
    $scope.init = init;
    $scope.login = login;
    $scope.user = {
      username: ''
      , password: ''
    };

    init();

    ////////////////

    function init() {
    }

    function login(username, password) {
      AV.User.logIn(username, password)
        .then(function(res) {
          window.alert('登陆成功');
          $location.path('/');
        }, function(err) {
          window.alert('账号密码错误');
        });
    }
  }
})();