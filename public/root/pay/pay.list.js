(function () {
  'use strict';

  angular
    .module('pay.list', [])
    .controller('PayListCtrl', PayListCtrl);

  PayListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function PayListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();