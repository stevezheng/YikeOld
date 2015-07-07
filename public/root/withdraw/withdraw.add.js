(function () {
  'use strict';

  angular
    .module('withdraw.add', [])
    .controller('WithdrawAddCtrl', WithdrawAddCtrl);

  WithdrawAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function WithdrawAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();