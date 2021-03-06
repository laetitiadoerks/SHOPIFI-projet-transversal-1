const express = require('express');
const router = express.Router();
const connection = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet d'aller sur la page d'acceuil
* Verifie si le user est connecter
*/

router.get('/', function(request, response) {
	response.status(200).send({'ok': true});
});

/**
* Fonction pour obtenir une liste de produits a partir d'un mot donné
* Verifie si user connecter
*/
router.get('/recherche', auth.isAuthenticated, async (req, res) => {
    try {
			const userConnecte = req.user.id_user;
            var recherche = req.query.recherche;
            console.log(recherche);
            recherche = '%'+recherche+'%';
			console.log(recherche);
            const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and (nom_produit like ? or description_produit like ? or nom_categorie like ?)"

            const [results] = await connection.promise().query(query, [recherche, recherche, recherche])
            console.log(results);

			//results.push({'id_user': userConnecte});
            res.status(200).send(results)
    } catch (err) {
		res.send({'erreur': err})
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
