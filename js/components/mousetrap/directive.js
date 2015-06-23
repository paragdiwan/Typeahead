// directive.js
// keybinding with mousetrap js
angular.module('pdMousetrap', [])
.directive('pdMousetrap', ['$rootScope', 'pdTypeAheadSelectService', function ($rootScope, pdTypeAheadSelectService) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {

			Mousetrap.bind(['right', 'down'], function() {
				pdTypeAheadSelectService.moveDown();
			});

			Mousetrap.bind(['left', 'up'], function() {
				pdTypeAheadSelectService.moveUp();
			});

			Mousetrap.bind('enter', function() {
				$rootScope.$broadcast('pd.typeahead:enter');
				pdTypeAheadSelectService.applySelection();
			});

			Mousetrap.bind('backspace', function() {
				$rootScope.$broadcast('pd.typeahead:backspace');
				pdTypeAheadSelectService.applySelection();
			});

			Mousetrap.bind('escape', function() {
				$rootScope.$broadcast('pd.typeahead:close');
			});

			Mousetrap.stopCallback = function () {
     			return false;
			}; // required to trigger mousetrap even with focused input elements
		}
	};
}])