/**
 * Created by flammenmensch on 19.05.14.
 */
(function (angular) {
	angular.module('cat-facts.services', [ ])

		.service('CatRestService', [ '$http', function ($http) {
			this.getFact = function () {
				return $http.get('/api/rest/fact');
			};
		} ])

		.provider('CatRealtimeService', function () {
			var _websocketUrl = 'ws://localhost:8001/socket';

			var CatService = function (url) {
				var ws = new WebSocket(url);

				ws.onopen = function () {
					console.log('Socket connection was opened');
				};

				this.setCallback = function (cb) {
					ws.onmessage = cb;
				};
			};

			this.wsUrl = function (value) {
				_websocketUrl = value;

				return this;
			};

			this.$get = [ function () {
				return new CatService(_websocketUrl);
			} ];
		});
} (angular));