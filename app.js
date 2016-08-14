var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();

app.get('/', function(req, res){
	res.send('Hello World');
});

var port = 3000;

app.listen(port, function(){
	console.log('Server running on port: ' + port);
})