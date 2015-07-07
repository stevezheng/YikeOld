(function () {
  'use strict';

  angular
    .module('item.category.add', [])
    .controller('ItemCategoryAddCtrl', ItemCategoryAddCtrl);

  ItemCategoryAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemCategoryAddCtrl($scope) {
    $scope.init = init;
    $scope.submit = submit;
    $scope.item = {
      name: ''
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

      D('ItemCategory')
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