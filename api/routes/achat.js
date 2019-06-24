const express = require('express');
const router = express.Router();
const connection = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet d'ajouter un achat à un user a partir des données du user et d'un produit
* Verifie si le user est connecté
* Reourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
router.post('/ajout',  auth.isAuthenticated,  async (req, res) => {
    try {
        //initialisation des variable et recupération des valeurs pour la requete
        const userConnecte = req.user.id_user;
        const id_produit = req.body.id_produit;
        const date_achat = req.body.date_achat;

        // console.log('on est dans ajout achat');
        // console.log(id_produit);
        // console.log(date_achat);
        // console.log(userConnecte);
        const query = "INSERT INTO `achat` VALUES (null, ?, ?, ?);"
        await connection.promise().query(query, [userConnecte, id_produit, date_achat])
        //console.log(results);
        res.status(200).send({'ok': true})
    } catch (err) {
		res.send({'erreur': err})
    }
})
module.exports = router;
