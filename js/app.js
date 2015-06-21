angular.module('demoApp', ['pdTypeAhead'])
.controller('mainCtrl', ['$scope', 'pdTypeAheadService', function($scope,  pdTypeAheadService) {
  	pdTypeAheadService.getData().then(function (httpData) {
            $scope.dataToPopulate = httpData;
        },function(httpData) {
            console.log('name retrieval failed.');
        });
	}
]);