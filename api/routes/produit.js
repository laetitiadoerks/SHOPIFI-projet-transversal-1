const express = require('express');
const router = express.Router();
const connection     = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet d'obtenir les informations d'un produit
* a partir de l'id_produit d'un produit
* Verifie si le user est connecté
* Retourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
//auth.isAuthenticated,
router.get('/',  async (req, res) => {
    try {
        //// initialisation et recupération de la valeur de la variable pour la requete
        var produit=req.body.id_produit;
        console.log(produit);
        const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and produit.id_produit = ?"

        const [results] = await connection.promise().query(query, produit)
        console.log(results);

        // verifie si la liste n'est pas vide
        // renvoie une erreur si la liste est vide
        if (results.length == 0){
            res.status(404).send({'erreur': 'ce produit n\'existe pas'});
        }
        else {
            //console.log(results.length);
            res.status(200).send(results)
        }
    } catch (err) {
		response.send({'erreur': err})
    }
})

//VERSION TEST
// router.get('/', (req, res) => {
//             var produit=req.body.id_produit;
//             //console.log(produit);
//             const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and produit.id_produit = ?"
//             connection.query(query, produit,
//             function(err, results){
//                 if (err) {
//                     throw err;
//                     res.status(500).send({'erreur': err});
//                 }
//                 if (results.length==0){
//                     res.status(404).send({'erreur': 'ce produit n\'existe pas'});
//                 }
//                 else {
//                     //console.log(results.length);
//                     res.status(200).send(results)
//                 }
//             });
// });

module.exports = router;
