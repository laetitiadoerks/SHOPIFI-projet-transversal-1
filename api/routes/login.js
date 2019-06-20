var express = require('express');
var router = express.Router();
var connection = require('../lib/dbconn');
// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;

var passport = require('../config/passport');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});

// router.get('/', function(request, response) {
    //response.sendFile(path.join(__dirname + '/login.html'));
    router.post('/', passport.authenticate('local'), (request, response) => {
        response.status(200).send({'ok': true})
    	// var username = request.body.username;
        // console.log(username);
    	// var password = request.body.password;
        // console.log(password);
    	// if (username && password) {
    	// 	connection.query('SELECT * FROM user WHERE email = ? AND mot_de_passe = ?',
        //      [username, password],
        //      function(error, results, fields) {
        //         console.log(results);
    	// 		if (results.length > 0) {
    	// 			request.session.loggedin = true;
    	// 			request.session.username = username;
    	// 			// response.redirect('/accueil');
        //             response.send(results);
    	// 		} else {
    	// 			response.send('Incorrect Username and/or Password!');
    	// 		}
    	// 		response.end();
    	// 	});
    	// } else {
    	// 	response.send('Please enter Username and Password!');
    	// 	response.end();
    	// }
        //response.send(200);

    });


module.exports = router;
