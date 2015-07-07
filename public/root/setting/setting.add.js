(function () {
  'use strict';

  angular
    .module('setting.add', [])
    .controller('settingAddCtrl', settingAddCtrl);

  settingAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function settingAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();