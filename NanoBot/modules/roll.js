"use strict";

class roll {
	run(command) {
		var range_regex = /^(\d+)\-(\d+)/;
		
		if (/^\d/.test(command)) {
			return '*' + this.random_number(1, command) + '*';
		} else if (range_regex.test(command)) {
			var values = [],
				item;
			
			while (item = range_regex.exec(command)) {
				values.push(item[1]);
			}
			
			console.log('roll range values: ' + values);
			
			return '*' + this.random_number(values[0], values[1]) + '*';
		}
		
		return 'I don\'t understand what you said but here is a number from 1-100: *' + this.random_number(1, 100) + '*';
	}
	
	random_number(low, high) {
		return Math.floor(Math.random() * (high - low + 1) + low);
	}
}

module.exports = roll;