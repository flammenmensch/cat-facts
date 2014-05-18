/**
 * Created by flammenmensch on 19.05.14.
 */
(function (angular) {
	angular.module('cat-facts.directives', [ ])
		.directive('backgroundImage', [ function () {
			return {
				restrict: 'A',
				scope: {
					src: '='
				},
				link: function (scope, element) {
					scope.$watch('src', function (newValue) {
						element.css({
							'background-image': 'url(' + newValue + ')'
						});
					});
				}
			};
		} ]);
} (angular));