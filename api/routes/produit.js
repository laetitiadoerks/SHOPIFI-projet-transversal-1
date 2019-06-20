var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');
const auth = require('../config/auth');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});


router.get('/',  auth.isAuthenticated,  async (req, res) => {
    try {
            var produit=req.body.id_produit;
            console.log(produit);
            const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and produit.id_produit = ?"

            const [results] = await connection.promise().query(query, produit)
            console.log(results);

            if (results.length==0){
                res.status(404).send({'erreur': 'ce produit n\'existe pas'});
            }
            else {
                //console.log(results.length);
                res.status(200).send(results)
            }
            // res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
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
