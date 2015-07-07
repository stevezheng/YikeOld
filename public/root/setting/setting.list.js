(function () {
  'use strict';

  angular
    .module('setting.list', [])
    .controller('SettingListCtrl', SettingListCtrl);

  SettingListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function SettingListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();