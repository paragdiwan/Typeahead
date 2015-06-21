// directive.js
// keybinding with mousetrap js
angular.module('pdMousetrap', [])
.directive('pdMousetrap', ['$rootScope', 'pdTypeAheadSelectService', function ($rootScope, pdTypeAheadSelectService) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			console.log('mousetrap started!');
			Mousetrap.bind(['right', 'down'], function() {
				console.log('right or down key - nav to next');
				pdTypeAheadSelectService.moveDown();
			});
			Mousetrap.bind(['left', 'up'], function() {
				console.log('left key - nav to previous');
				pdTypeAheadSelectService.moveUp();
			});

			Mousetrap.bind('enter', function() {
				console.log('enter - select item');
				pdTypeAheadSelectService.applySelection();
			});

			Mousetrap.bind('escape', function() {
				console.log('escape - close typeahead');
				//pdTypeAheadSelectService.close();
				$rootScope.$broadcast('pd.typeahead:close');
			});

			Mousetrap.stopCallback = function () {
     			return false;
			}; // required to trigger mousetrap even with focused input elements
		}
	};
}])