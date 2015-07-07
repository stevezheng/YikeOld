(function () {
  'use strict';

  angular
    .module('shop.edit', [])
    .controller('ShopEditCtrl', ShopEditCtrl);

  ShopEditCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ShopEditCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();