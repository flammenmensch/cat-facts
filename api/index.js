/**
 * Created by flammenmensch on 18.05.14.
 */
var express			= require('express');
var async 			= require('async');
var ws				= require('ws');
var CatService		= require('./lib/cat-service').CatService;
var WsService		= require('./lib/ws-service').WsService;

module.exports = function (app) {
	var router = express.Router();
	var catService = new CatService();
	var wsService = new WsService({});

	//var INSTAGRAM_CLIENT_ID = '494d53a84fd5492c844804d711c7b733';

	router.route('/api/rest/fact')
		.get(function (req, res, next) {
			async.parallel([ catService.getFact, catService.getImage ], function (err, results) {
				var response = {
					success: true,
					data: {
						fact: results[0],
						image: results[1]
					}
				};

				return res.json(200, response);
			});
		});

	router.route('/api/realtime/callback')
		.get(function (req, res, next) {
			res.send(req.param('hub.challenge') || '');
			res.end();
		})
		.post(function (req, res, next) {
			async.parallel([ catService.getFact, catService.getImage ], function (err, results) {
				var message = {
					fact: results[0],
					image: results[1]
				};

				wsService.broadcastMessage(JSON.stringify(message));
			});

			return res.json(200, { success: true });
		});

	return router;
};