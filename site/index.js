/**
 * Created by flammenmensch on 18.05.14.
 */
var express = require('express');

module.exports = function (app) {
	var router = express.Router();

	router.use(express.static(__dirname + '/public'));

	router.get('/', function (req, res, next) {
		res.render('index', {
			title: app.get('title'),
			subtitle: app.get('subtitle'),
			copyright: app.get('copyright')
		});
	});

	return router;
};