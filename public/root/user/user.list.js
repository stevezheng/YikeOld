(function () {
  'use strict';

  angular
    .module('user.list', [])
    .controller('UserListCtrl', UserListCtrl);

  UserListCtrl.$inject = ['$scope', '$http'];

  /* @ngInject */
  function UserListCtrl($scope, $http) {
    $scope.init = init;
    $scope.page = 1;
    $scope.listRows = 20;
    $scope.totalPage = 1;
    $scope.filter = {};

    $scope.changePage = changePage;
    $scope.openModal = openModal;
    $scope.del = del;
    $scope.query = query;
    $scope.editMoney = editMoney;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('User')
        .page($scope.page, $scope.listRows)
        .where($scope.filter)
        .select()
        .then(function(res) {
          $scope.data = res;
          $scope.$digest();
        });

      D('User')
        .count()
        .then(function(count) {
          $scope.count = count;
          $scope.totalPage = Math.ceil(count / $scope.listRows);
        });
    }

    function changePage(page)  {
      if (page > 0 && page <= $scope.totalPage) {
        $scope.page = page;
        query();
      }
    }

    function openModal(element) {
      $(element).click();
    }

    function editMoney(item) {
      var r = window.prompt('正数增加，负数减少');
      if (r) {
        if (!Number(r)) {
          window.alert('请输入数字');
          return false;
        }

        var money = Number(item.get('money')) + Number(r);
        $http.post('/admin/user/money', {id: item.id, money: money})
          .then(function(res) {
            console.log(res);
            window.alert('修改成功');
            query();
          });

      }
    }

    function del(item) {
      $http.post('/admin/user/del', {id: item.id})
        .then(function(res) {
          console.log(res);
          window.alert('删除成功');
          query();
        });
    }
  }
})();