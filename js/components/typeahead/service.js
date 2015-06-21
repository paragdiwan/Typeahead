// service.js
angular.module('pdTypeAhead')
.factory('pdTypeAheadService', function($http,$q) {
	var factory = {};
	var def = $q.defer();
	factory.getData = function() {
		$http.get('https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.json')
			.success(function(res){
				var out = res.map(function(value, index){
					// console.log(value, index);
					return {
						selected: false,
						value: value
					};
				});
				// console.log(out); 
				//factory.data = out;
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
			//console.log('new index - up', selectedIndex);
			$rootScope.$broadcast('pd.typeahead:updatedIndex', selectedIndex);
		},
		moveDown: function() {
			//console.log('max', maxIndex);
			//console.log(selectedIndex, 'before update');
			if ( selectedIndex < maxIndex -1 ){
				selectedIndex++;
			}
			$rootScope.$broadcast('pd.typeahead:updatedIndex', selectedIndex);
			//console.log('new index - down', selectedIndex);
		},
		applySelection: function() {
			$rootScope.$broadcast('pd.typeahead:applySelection', selectedIndex);
		}

	}
});