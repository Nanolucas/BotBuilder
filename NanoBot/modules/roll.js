"use strict";

class roll {
	run(command) {
		var range_regex = /^(\d+)\-(\d+)/g,
			values;

		if (/^\d+$/.test(command)) {
			return '*' + this.random_number(1, parseInt(command)) + '*';
		} else if (values = range_regex.exec(command)) {
			return '*' + this.random_number(parseInt(values[1]), parseInt(values[2])) + '*';
		}

		return 'I don\'t understand what you said but here is a number from 1-100: *' + this.random_number(1, 100) + '*';
	}

	random_number(min, max) {
		console.log('min: ' + min + ', max: ' + max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

module.exports = roll;
