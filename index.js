var express = require('express');
var helmet = require('helmet');
var debug = require('debug')('http')

var BodyParser = require('body-parser')

var app = express();
app.use(helmet());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send('hello world');
});

var port = process.env.PORT || 3000
var server = app.listen(port);
console.log("listen: " + port)

process.on('SIGTERM', () => {
	console.info('SIGTERM signal received.');
	console.log('Closing http server.');
	server.close(() => {
		console.log('Http server closed.');
	});
});

module.exports = server;
