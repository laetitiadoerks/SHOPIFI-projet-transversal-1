var express = require('express');
var router = express.Router();
var connection = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet de déconnecter un user (POST)
* Reourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
router.post('/',  auth.isAuthenticated, (request, response) => {
    // console.log(req.user.email);
	request.logout();
    response.status(200).send({'ok': true})
});

module.exports = router;
