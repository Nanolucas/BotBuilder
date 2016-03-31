"use strict";

class roll {
	run(command) {
		var range_regex = /^(\d+)\-(\d+)/g,
			values;

		if (/^\d+$/.test(command)) {
			return '*' + this.random_number(1, command) + '*';
		} else if (values = range_regex.exec(command)) {
			return '*' + this.random_number(values[1], values[2]) + '*';
		}

		return 'I don\'t understand what you said but here is a number from 1-100: *' + this.random_number(1, 100) + '*';
	}

	random_number(low, high) {
		console.log('low: ' + low + ', high: ' + high);
		return Math.floor(Math.random() * high + low);
	}
}

module.exports = roll;
