(function () {
  'use strict';

  angular
    .module('item.list', [])
    .controller('ItemListCtrl', ItemListCtrl);

  ItemListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemListCtrl($scope) {
    $scope.init = init;
    $scope.page = 1;
    $scope.listRows = 20;
    $scope.totalPage = 1;
    $scope.filter = {};

    $scope.changePage = changePage;
    $scope.openModal = openModal;
    $scope.del = del;
    $scope.query = query;

    init();

    ////////////////

    function init() {
      query();
    }

    function openModal(element) {
      $(element).click();
    }

    function query() {
      D('Item')
        .page($scope.page, $scope.listRows)
        .where($scope.filter)
        .order('createdAt desc')
        .select()
        .then(function (res) {
          $scope.data = res;
          $scope.$digest();
        });

      D('Item')
        .count()
        .then(function (count) {
          $scope.count = count;
          $scope.totalPage = Math.ceil(count / $scope.listRows);
        });
    }

    function changePage(page) {
      if (page > 0 && page <= $scope.totalPage) {
        $scope.page = page;
        query();
      }
    }

    function del(item) {
      D('Item')
        .where({objectId: item.id})
        .delete()
        .then(function () {
          window.alert('删除成功');
          query();
        }, function (err) {
          window.alert('删除失败');
        });
    }
  }
})();