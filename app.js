var express = require('express'),
	bodyParser = require('body-parser'),
	mongojs = require('mongojs'),
	path = require('path'),
	expressValidator = require('express-validator');
var db = mongojs('customerapp', ['users']);

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
app.use(expressValidator([]));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	res.locals.errors = null;
	next();
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
})); 

// var people = [
// 	{
// 		fName: 'Jesse',
// 		lName: 'Soldat',
// 		age: 35
// 	},
// 	{
// 		fName: 'Nate',
// 		lName: 'Soldat',
// 		age: 37
// 	},
// 	{
// 		fName: 'Marcia',
// 		lName: 'Soldat',
// 		age: 70
// 	}
// ];
var title = 'Customers';

app.get('/',  function(req, res){
	// res.send('Hello World');
	// res.json(people);
	db.users.find(function(err, docs){
		console.log(docs);
		res.render('index', {title: title, people: docs, errors: res.locals.errors});
	});

	
});

app.post('/', function(req, res){

	req.checkBody('fName', 'First Name is Required!').notEmpty();
	req.checkBody('lName', 'Last Name is Required!').notEmpty();
	req.checkBody('email', 'Email is Required!').notEmpty();

	errors = req.validationErrors();

	if(errors){
		db.users.find(function(err, docs){
			res.render('index', {
				title: title, 
				people: docs, 
				errors: errors
			});
		});
	} else {

		var newUser = {
			fName: req.body.fName,
			lName: req.body.lName,
			email: req.body.email
		};
		db.users.insert(newUser, function(err, result){
			if(err){
				console.log(err);
			} else {
				res.redirect('/')
			}
		});	
	}
	
});

var port = 3000;

app.listen(port, function(){
	console.log('Server running on port: ' + port);
})