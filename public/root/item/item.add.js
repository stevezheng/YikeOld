(function () {
  'use strict';

  angular
    .module('item.add', ['utils'])
    .controller('ItemAddCtrl', ItemAddCtrl);

  ItemAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemAddCtrl($scope) {
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
        window.alert('请填写产品名称');
        return false;
      }

      if (!$scope.item.price) {
        window.alert('请填写产品价格');
        return false;
      }

      if (!$scope.item.image) {
        window.alert('请上传产品图片');
        return false;
      }

      $scope.item.price = Number($scope.item.price);

      D('Item')
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