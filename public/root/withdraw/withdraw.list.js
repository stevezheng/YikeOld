(function () {
  'use strict';

  angular
    .module('withdraw.list', [])
    .controller('WithdrawListCtrl', WithdrawListCtrl);

  WithdrawListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function WithdrawListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();