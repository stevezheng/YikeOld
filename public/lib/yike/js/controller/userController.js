YikeModule
  .controller('$yikeUserCtrl', ['$scope', '$yikeUser', function ($scope, $yikeUser) {
    $yikeUser.permission();
  }])
  .controller('$yikeUserLoginCtrl', ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser', function ($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /**
     * alert
     * @param title
     * @param template
     * @returns {Object|*}
     */
    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    $scope.user = {};

    $scope.doLogin = function (username, password) {
      if (!username) {
        alertPopup('提示', '请输入用户名');
        return false;
      }

      if (!password) {
        alertPopup('提示', '请输入密码');
        return false;
      }

      $yikeUser.logIn(username, password, {
        success: function (user) {
          var popup = alertPopup('提示', '登录成功');
          popup.then(function () {
            $location.path('/tab/home');
          });
          $rootScope.cUser = user;
        },
        error: function (user, err) {
          console.error(err);
        }
      });
    };
  }])

  .controller('$yikeUserRegCtrl', ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser', '$state', function ($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser, $state) {
    /**
     * alert
     * @param title
     * @param template
     * @returns {Object|*}
     */
    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    $scope.user = {};

    $scope.reg = function (username, password, rPassword) {
      if (!username) {
        alertPopup('提示', '请输入用户名');
        return false;
      }

      if (!password) {
        alertPopup('提示', '请输入密码');
        return false;
      }

      if (!rPassword) {
        alertPopup('提示', '请输入确认密码');
        return false;
      }

      if (rPassword !== password) {
        alertPopup('提示', '两次密码输入不一致');
        return false;
      }

      var user = new $yikeUser();

      user.set('username', username);
      user.set('password', password);

      user.signUp(null, {
        success: function (user) {
          var popup = alertPopup('提示', '注册成功');
          popup.then(function () {
            $location.path('/tab/home');
          });
          $rootScope.cUser = user;
        },
        error: function (user, err) {
          console.error(err);
        }
      });
    };
  }]);
