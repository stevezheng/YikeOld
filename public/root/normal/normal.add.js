(function () {
  'use strict';

  angular
    .module('normal.add', [])
    .controller('NormalAddCtrl', NormalAddCtrl);

  NormalAddCtrl.$inject = ['$scope', '$location'];

  /* @ngInject */
  function NormalAddCtrl($scope, $location) {
    var model = $location.path().slice(1);
    $scope.init = init;
    $scope.submit = submit;
    $scope.item = {};
    //$scope.fields = config.models[0].fields;


    init();

    ////////////////

    function init() {
    }

    function submit() {
      D(model)
        .add($scope.item)
        .then(function() {
          window.alert('添加成功');
          location.reload();
        }, function() {
          window.alert('添加失败');
        });
    }
  }
})();