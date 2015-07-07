(function () {
  'use strict';

  angular
    .module('user.add', [])
    .controller('UserAddCtrl', UserAddCtrl);

  UserAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function UserAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();