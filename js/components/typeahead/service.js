// service.js
angular.module('pdTypeAhead')
.factory('pdTypeAheadService', function($http,$q,DATA_SERVICE) {
	var factory = {};
	var def = $q.defer();
	factory.getData = function() {
		$http.get(DATA_SERVICE)
			.success(function(res){
				var out = res.map(function(value, index){
					// console.log(value, index);
					return {
						selected: false,
						value: value
					};
				});
				def.resolve(out);
			})
			.error(function(err){
				def.reject(err);
			})
			return def.promise;
		}
	return factory;
})
.factory('pdTypeAheadSelectService', function($rootScope) {
	var selectedIndex = 0,
		maxIndex = 0;

	return {
		setSelected: function(index) {
			selectedIndex = index;
		},
		setMax: function(max) {
			maxIndex = max;
		},
		getSelected: function() {
			return selectedIndex;
		},
		moveUp: function() {
			if ( selectedIndex > 0 )
				selectedIndex--; 
			$rootScope.$broadcast('pd.typeahead:updatedIndex', selectedIndex);
		},
		moveDown: function() {
			if ( selectedIndex < maxIndex -1 ){
				selectedIndex++;
			}
			$rootScope.$broadcast('pd.typeahead:updatedIndex', selectedIndex);
		},
		applySelection: function() {
			$rootScope.$broadcast('pd.typeahead:applySelection', selectedIndex);
		}

	}
});