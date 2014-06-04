/**
 * Created by flammenmensch on 19.05.14.
 */
(function (angular) {
	angular.module('cat-facts.controllers', [ 'cat-facts.services' ])
		.controller('CatController', [ '$timeout', '$interval', 'CatRestService', 'CatRealtimeService', function ($timeout, $interval, catService, catRealtimeService) {
			var self = this;

			this.data = {
				image: 'http://placekitten.com/g/612/612',
				fact: 'No fact loaded'
			};

			this.getFact = function () {
				catService.getFact().success(function (response) {
					self.data = response.data;

					$timeout(self.getFact, 20000);
				}).error(function (error) {
					console.error(error);
				});
			};

			/*catRealtimeService.setCallback(function (message) {
				$timeout(function () {
					try {
						var response = JSON.parse(message.data);
						self.data = response.data;
					} catch (err) {
						console.error(err);
					}
				});
			});*/

			this.getFact();
		} ]);
} (angular));