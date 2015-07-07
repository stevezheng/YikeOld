(function () {
  'use strict';

  angular
    .module('order.add', [])
    .controller('OrderAddCtrl', OrderAddCtrl);

  OrderAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function OrderAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();