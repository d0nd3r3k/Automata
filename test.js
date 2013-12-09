var moment = require('moment');

var now = moment();

console.log(now.format('dddd'));

var foobar = function(){
	console.log("foofoo");
}

setInterval(foobar, 400);