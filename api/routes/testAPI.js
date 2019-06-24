const express = require('express');
const router = express.Router();
const connection     = require('../lib/dbconn');

// page créée pour des tests
router.get('/', function(request, response) {
    response.send([
    	{
        "id_user": 98,
        "prenom_user": "Kerwin",
        "nom_user": "Mickleborough",
        "genre": "Male",
        "date_naissance": "1991-06-06T22:00:00.000Z",
        "addresse": "716 West Alley",
        "email": "lo@g.com",
        "mot_de_passe": "1234",
        "statut": "visiteur"
    	}
		]);
	});

//VERSION TEST
// router.get('/', function(request, response) {
//     response.send([{"id_user": 98, "prenom_user": "Kerwin", "nom_user": "Mickleborough", "genre": "Male", "date_naissance": "1991-06-06T22:00:00.000Z", "addresse": "716 West Alley", "email": "lo@g.com", "mot_de_passe": "1234", "statut": "visiteur"}]);
// 	});

module.exports = router;
