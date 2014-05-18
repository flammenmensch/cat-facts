/**
 * Created by flammenmensch on 18.05.14.
 */
var ws = require('ws');

var WsService = function (options) {
	var wss = new ws.Server({ port: options.port || 8001, path: '/socket' });

	wss.on('connection', function (ws) {
		console.log('Client connected');
	});

	wss.broadcast = function (data) {
		console.log('Sending message to %s client(s).', this.clients.length);

		for(var i in this.clients) {
			this.clients[i].send(data, function (err) {
				if (err) {
					return console.error(err);
				}
			});
		}
	};

	this.broadcastMessage = function (message) {
		wss.broadcast(message);
	};
};

module.exports.WsService = WsService;