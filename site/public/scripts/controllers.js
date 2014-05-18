/**
 * Created by flammenmensch on 19.05.14.
 */
(function (angular) {
	angular.module('cat-facts.controllers', [ 'cat-facts.services' ])
		.controller('CatController', [ '$timeout', 'CatService', function ($timeout, catService) {
			var self = this;

			this.data = {
				image: 'http://placekitten.com/g/612/612',
				fact: 'No fact loaded'
			};

			catService.setCallback(function (message) {
				$timeout(function () {
					try {
						var response = JSON.parse(message.data);
						self.data = response.data;
					} catch (err) {
						console.error(err);
					}
				});
			});
		} ]);
} (angular));