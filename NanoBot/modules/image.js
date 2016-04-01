"use strict";

var request = require('request');

class image {
	run(command) {
		request('http://www.imtwelve.com/api/image_search.php?search=' + encodeURIComponent(command), function (error, response, body) {
			if (!response.statusCode == 200) {
				return 'Error: SOMETHING WENT TERRIBLY WRONG (' + response.statusCode + ')';
			}

			if (error) {
				return 'Error: ' . body;
			}

			return body;
		})
	}
}

module.exports = image;
