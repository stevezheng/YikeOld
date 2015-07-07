(function () {
  'use strict';

  angular
    .module('address.add', [])
    .controller('AddressAddCtrl', AddressAddCtrl);

  AddressAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AddressAddCtrl($scope) {
    $scope.init = init;
    $scope.submit = submit;
    $scope.item = {
      address: ''
      , phone: 0
      , name: ''
      , city: ''
      , area: ''
      , province: ''
    };

    init();

    ////////////////

    function init() {
    }

    function submit() {
      if (!$scope.item.address) {
        window.alert('请填写地址');
        return false;
      }


      if (!$scope.item.name) {
        window.alert('请填写名称');
        return false;
      }

      if (!$scope.item.phone) {
        window.alert('请填写联系方式');
        return false;
      }

      if (!$scope.item.city) {
        window.alert('请填写城市');
        return false;
      }

      if (!$scope.item.area) {
        window.alert('请填写地区');
        return false;
      }

      if (!$scope.item.province) {
        window.alert('请填写省份');
        return false;
      }

      D('address')
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