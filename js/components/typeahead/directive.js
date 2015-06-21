// directive.js

angular.module('pdTypeAhead', ['pdMousetrap'])
.directive('typeAhead',['$document', '$compile', '$filter', function($document, $compile, $filter) {
	return {
		restrict: 'A',
		scope : {
			cinfo:'=datalist',
		},
		replace: false,
		controllerAs: 'typeAheadCtrl',
		controller: function($scope, $attrs, pdTypeAheadSelectService) {
			var vm = this,
				getIndex = function(name) {
					return vm.results ? vm.results.indexOf(name): 0;
				},
				getMax = function() {
					return vm.results.length;
				};

			this.hide = function() {
				$scope.typeAheadVisible(false);
			};

			this.updateSelection = function(selected) {
				var activeName;
				$scope.selectedNameIndex = selected;
				angular.forEach(vm.results, function(name, index) {
					name.selected = false;
					if (index == selected) {
						name.selected = true;
						// UI Fix.
						activeName = document.getElementsByClassName('active');
						if(activeName.length) {
							document.getElementsByClassName('dropdown')[0].scrollTop =  activeName[0].offsetTop - activeName[0].offsetHeight;
							//console.log('set scrolltop', activeName[0].offsetHeight , document.getElementsByClassName('dropdown')[0].scrollTop, activeName[0].offsetTop);
						}
					} 
				});
			};

			$scope.sterm = '';
			$scope.visible = true;

			//pdTypeAheadSelectService.setSelected(0);
			
			$scope.typeAheadVisible = function(visible) {
				$scope.visible = $scope.sterm.length > 0 && visible;
			};
			//console.log($scope, $attrs);//, pdTypeAheadSelectService);
			//var selectionDone = false;

			$scope.$watch(function() {return vm.results}, function(results) {
				var resLength = results.length;
				if ( !resLength ) return; // not resolved yet
				// console.log();
				pdTypeAheadSelectService.setMax(resLength);
				// console.log('results update', results);
				vm.updateSelection(pdTypeAheadSelectService.getSelected());
				// results[0].selected = true;
				
				if ( resLength > 1 ) {
					$scope.typeAheadVisible(true);
				}
				else {
					// we found a name --> hide typeahead
					$scope.typeAheadVisible(false);
				}
			});

			$scope.$on('pd.typeahead:updatedIndex', function(event, selected) {
				vm.updateSelection(selected);
				//console.log('event index update happend', selected);
				$scope.$apply();
			});

			$scope.$on('pd.typeahead:close', function() {
				console.log('closing..');
				vm.hide();
				$scope.$apply();
			});

			$scope.$on('pd.typeahead:applySelection', function(event, selected) {
				if ( !vm.results[selected] ) return; //nothing selected show type ahead
				
				$scope.updateSearchTerm(vm.results[selected]);
				//console.log('event applySelection happend');
				$scope.$apply();
			});


			$scope.updateSearchTerm = function(selName) {
				$scope.sterm = selName.value;
				$scope.filterData(selName);
			};

			$scope.close = function() {
				vm.hide();
			};

			$scope.filterData = function(sterm) {
				vm.results = $filter('filter')($scope.cinfo, sterm);//cinfo| filter:sterm track by $index
				vm.results = $filter('limitTo')(vm.results || [], 100); // limit to 100 to keep it responsive.
				pdTypeAheadSelectService.setSelected(getIndex(sterm));
				pdTypeAheadSelectService.setMax(getMax());
				$scope.selectedNameIndex = pdTypeAheadSelectService.getSelected();
			};

			$scope.filterData('');
		},
		link:function(scope,element,attr) {
			// scope.visible = true;
			element[0].focus();
			element.attr('pd-mousetrap','');
			element.removeAttr("type-ahead"); //remove the attribute to avoid indefinite loop
			element.removeAttr("data-type-ahead"); //also remove the same attribute with data- prefix in case users specify data-common-things in the html
			$document[0].getElementById('idSearch').focus(); // auto-focus to input field
			$compile(element)(scope); // update because of newly added directive
		},
		templateUrl:'templates/typeahead.tmpl'
	}
}]); 