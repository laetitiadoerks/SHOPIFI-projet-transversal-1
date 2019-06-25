var express = require('express');
var router = express.Router();
var connection = require('../lib/dbconn');
var passport = require('../config/passport');

/**
* Fonction qui permet d'authentifier un user (POST)
* Reourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
router.post('/', passport.authenticate('local'), (request, response) => {
    response.status(200).send({'ok': true})

});

module.exports = router;
