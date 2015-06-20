angular.module('demoApp', ['pdTypeAhead'])
.controller('mainCtrl', ['$scope', 'pdTypeAheadService', function($scope,  pdTypeAheadService) {
  	pdTypeAheadService.getData().then(function (httpData) {
            $scope.dataToPopulate = httpData;
        },function(httpData) {
            console.log('name retrieval failed.');
        });
	}
]);	


/*modServiceDef.directive('typeAhead',[function() {
	return {
		scope : {
			cinfo:'=datalist',
		},
		link:function(scope,element,attr) {
			scope.visible = true;
			scope.updateSearchTerm = function(selName) {
				scope.sterm = selName;
			}
		},
		templateUrl:'templates/typeahead.tmpl'
	}
}]);*/

/*modServiceDef.factory('myFactory', function($http,$q) {
	var factory = {};
	var def = $q.defer();
	factory.getData = function() {
		$http.get('https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.json')
			.success(function(res){ 
				factory.data = res;
				def.resolve(res);
			})
			.error(function(err){
				def.reject(err);
			})
			return def.promise;
		}
	return factory;
});*/