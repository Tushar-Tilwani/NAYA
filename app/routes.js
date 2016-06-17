module.exports = function(app) {
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests


	app.get('/', function(req, res) {
		res.sendfile('./public/login.html');
	});

	app.get('/login', function(req, res) {
		res.sendfile('./public/login.html');
	});
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});	

};