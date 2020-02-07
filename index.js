var express = require('express');
var helmet = require('helmet');
var debug = require('debug')('http')

var BodyParser = require('body-parser')


var MongoClient = require('mongodb').MongoClient;
var dbName = process.env.MONGODB_DBNAME || 'company';
var url = process.env.MONGODB_URL || 'mongodb://administrator:administrator@localhost:27017/company';
var collection = process.env.MONGODB_COLLECTION || 'employees';
var database;

MongoClient.connect(url, function(err, client) {
	if (err) {
		throw err
	} else {
		database = client.db(dbName);
		console.log('Connected to MongoDB: '+ dbName);
	}
});

var app = express();
app.use(helmet());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send('hello world');
});

app.post('/employees', function(req, res) {
	database.collection(collection).insert(req.body, function (err, result) {
		if (err) {
			res.json({status: JSON.stringify(err)});
		} else {
			res.json({status: "insert"});
		}
   });
 });

app.get('/employees', function(req, res) {
	database.collection(collection).find({}).toArray((err, result) => {
        if (err) {
            res.json({status: JSON.stringify(err)});
        } else {
			res.json(result);
		}
    });
 });

var port = process.env.PORT || 3000
var server = app.listen(port);
debug("listen: " + port)

process.on('SIGTERM', () => {
	console.info('SIGTERM signal received.');
	console.log('Closing http server.');
	server.close(() => {
		console.log('Http server closed.');
	});
});

module.exports = server;
