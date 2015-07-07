YikeModule

.factory('$yikeUser', ['$location', function($location) {
    return AV.Object.extend('_User', {
      sayHi: function() {
        console.log('hi');
      },
    }, {
      isLogin: function() {
        var self = this;
        var cUser = self.current();
        if (cUser) {
          return true;
        } else {
          $location.path('/user-login');
          return false;
        }
      },

      permission: function() {
        var self = this;

        self.isLogin(); //判断是否登陆

        var cUser = self.current();
        //todo: 这里要结合ACL的内容进行修改
      }
    });
  }])