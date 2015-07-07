(function () {
  'use strict';

  angular
    .module('normal.list', [])
    .controller('NormalListCtrl', NormalListCtrl);

  NormalListCtrl.$inject = ['$scope', '$location'];

  /* @ngInject */
  function NormalListCtrl($scope, $location) {
    var _model = $location.path().slice(1);
    var model = AV._.findWhere(config.models, {name: _model});
    var fields = model.fields;

    $scope.init = init;
    $scope.page = 1;
    $scope.listRows = 10;
    $scope.totalPage = 1;
    $scope.filter = {};
    $scope.model = model;
    $scope.fields = fields;

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
      //setTimeout(function() {
      //  try {
      //    CKEDITOR.replace( 'editor1');
      //  } catch (ex) {}
      //}, 500);
    }

    function query() {
      D(model.name)
        .page($scope.page, $scope.listRows)
        .where($scope.filter)
        .select()
        .then(function (res) {
          $scope.data = res;
          $scope.$digest();
        });

      D(model.name)
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
      D(model.name)
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