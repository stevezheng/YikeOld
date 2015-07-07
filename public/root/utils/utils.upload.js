(function () {
  'use strict';

  angular
    .module('utils.upload', [])
    .directive('utilsUpload', utilsUpload);

  utilsUpload.$inject = [];
  function utilsUpload() {
    return {
      replace: true,
      restrict: 'AE',
      link: function (scope, elem, attrs) {

        scope.browseFile = function () {
          document.getElementById('browseBtn').click();
        };

        angular.element(document.getElementById('browseBtn')).on('change', function (e) {

          var file = e.target.files[0];

          angular.element(document.getElementById('browseBtn')).val('');
          var name = 'photo.jpg';

          var avFile = new AV.File(name, file);
          avFile.save()
            .then(function(res) {
              scope.$apply(function() {
                scope.item.image = res._url;
              });
            }, function(error) {
            });
        });

      },
      templateUrl: '/views/utils/upload-file.html'
    };
  }
})();