var express = require('express');
var router = express.Router();
var connection = require('../lib/dbconn');
const auth = require('../config/auth');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});

//FONCTIONNE
//sur page accueil après login
//verification de l'authentification pour aller sur la page d'acceuil
router.get('/',  auth.isAuthenticated, function(request, response) {
	response.status(200).send({'ok': true});

	// if (request.session.loggedin) {
	// 	response.send('Welcome back, ' + request.session.username + '!');
    //     console.log("accueil");
	// } else {
	// 	response.send('Please login to view this page!');
    //     console.log("aller se logger");
	// }
	// response.end();
});

//FONCTIONNE
//bouton recherche sur page accueil
//recherche d'un produit contenant le contenu de la barre de recherche dans le nom du profuit, sa description et sa categorie
router.get('/recherche',  auth.isAuthenticated, async (req, res) => {
    try {
            var recherche=req.body.recherche;
            console.log(recherche);
            recherche = '%'+recherche+'%';
            const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and (nom_produit like ? or description_produit like ? or nom_categorie like ?)"

            const [results] = await connection.promise().query(query, [recherche, recherche, recherche])
            console.log(results);

            res.status(200).send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		response.send({'erreur': err})
    }
})

//VERSION TEST
// //FONCTIONNE
// //aller sur la page d'acceuil
// router.get('/', function(request, response) {
// 	response.status(200).send('ok')
// });
//
// //FONCTIONNE
// //bouton recherche sur page accueil
// //recherche d'un produit contenant le contenu de la barre de recherche dans le nom du profuit, sa description et sa categorie
// router.get('/recherche',(req, res) => {
//             var recherche=req.body.recherche;
//             //console.log(recherche);
//             recherche = '%'+recherche+'%';
//             const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and (nom_produit like ? or description_produit like ? or nom_categorie like ?)"
// 			connection.query(query, [recherche, recherche, recherche],
// 			function (err, results) {
// 				if (err) throw err;
// 				res.status(200).send(results)
// 			});
// });


module.exports = router;
