/**
 * Created by flammenmensch on 18.05.14.
 */
var request = require('request');
var xmldoc  = require('xmldoc');

module.exports.CatService = function () {

	this.getFact = function (callback) {
		request('http://catfacts-api.appspot.com/api/facts', function (err, response, body) {
			if (err) {
				return callback(err);
			}

			var data = JSON.parse(body);
			callback(null, data.facts[0]);
		});
	};

	this.getImage = function (callback) {
		request('http://thecatapi.com/api/images/get?format=xml&size=med&type=jpg', function (err, response, body) {
			if (err) {
				return callback(err);
			}

			var doc = new xmldoc.XmlDocument(body);
			var url = doc.valueWithPath('data.images.image.url');

			callback(null, url);
		});
	};
};