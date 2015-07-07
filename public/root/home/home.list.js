(function () {
  'use strict';

  angular
    .module('home.list', [])
    .controller('HomeListCtrl', HomeListCtrl);

  HomeListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function HomeListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();