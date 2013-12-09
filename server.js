var	spawn = require('child_process').spawn,
	path = require('path'),
	phantomjs = spawn('/usr/local/bin/phantomjs',[path.join(__dirname, 'app.js')]);

	phantomjs.stdout.on('data', function(data) {
		console.log(data);
	});