(function () {
  'use strict';

  angular
    .module('pay.add', [])
    .controller('PayAddCtrl', PayAddCtrl);

  PayAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function PayAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();