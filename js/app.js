angular.module('pdTypeadhead', ['pdTypeAhead'])
.value('DATA_SERVICE', 'https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.json')
.controller('mainCtrl', ['$scope', 'pdTypeAheadService', function($scope,  pdTypeAheadService) {
  	pdTypeAheadService.getData()
        .then(function (httpData) {
            $scope.dataToPopulate = httpData;
        },
        function(httpData) {
          //error
        });
    }
]);