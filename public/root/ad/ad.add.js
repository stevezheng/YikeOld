(function () {
  'use strict';

  angular
    .module('ad.add', [])
    .controller('AdAddCtrl', AdAddCtrl);

  AdAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AdAddCtrl($scope) {
    $scope.init = init;
    $scope.submit = submit;
    $scope.item = {
      name: ''
      , image: ''
    };

    init();

    ////////////////

    function init() {
    }

    function submit() {
      if (!$scope.item.name) {
        window.alert('请填写广告名称');
        return false;
      }


      if (!$scope.item.image) {
        window.alert('请上传广告图片');
        return false;
      }

      D('ad')
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