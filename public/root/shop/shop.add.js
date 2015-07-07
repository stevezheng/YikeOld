(function () {
  'use strict';

  angular
    .module('shop.add', ['utils'])
    .controller('ShopAddCtrl', ShopAddCtrl);

  ShopAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ShopAddCtrl($scope) {
    $scope.init = init;
    $scope.submit = submit;
    $scope.item = {
      name: ''
      , price: 0
      , image: ''
    };

    init();

    ////////////////

    function init() {
    }
    
    function submit() {
      if (!$scope.item.name) {
        window.alert('请填写商家名称');
        return false;
      }

      D('Shop')
        .add($scope.item)
        .then(function(res) {
          window.alert('添加成功');
          location.reload();
        }, function(err) {
          window.alert('添加失败');
        });
    }
  }
})();