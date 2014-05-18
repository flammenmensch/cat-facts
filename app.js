/**
 * Created by flammenmensch on 18.05.14.
 */
var express = require('express');
var jade = require('jade');

var app = express();

app.set('title', 'CatFacts');
app.set('subtitle', 'Realtime cat facts and pictures.');
app.set('copyright', new Date().getFullYear() + ', Flammenmensch. Cats provided by <a href="https://instagram.com" target="_blank">Instagr.am</a> and <a href="http://www.iconka.com/ru" target="_blank">Iconka</a>.');

app.set('views', __dirname + '/site/views');
app.set('view engine', 'jade');

var api = require('./api')(app);
var site = require('./site')(app);

app.use(api);
app.use(site);

app.listen(process.env.PORT || 8000, function (err) {
	if (err) {
		return console.error(err);
	}

	console.log('Application started');
});