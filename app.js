var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();

// var logger = function(req, res, next){
// 	console.log('Logging....');
// 	next();
// }
// app.use(logger);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

var people = [
	{
		fName: 'Jesse',
		lName: 'Soldat',
		age: 35
	},
	{
		fName: 'Nate',
		lName: 'Soldat',
		age: 37
	},
	{
		fName: 'Marcia',
		lName: 'Soldat',
		age: 70
	}
];

app.get('/',  function(req, res){
	// res.send('Hello World');
	// res.json(people);
	var title = 'Customers';
	res.render('index', {title: title, people: people});
});

var port = 3000;

app.listen(port, function(){
	console.log('Server running on port: ' + port);
})