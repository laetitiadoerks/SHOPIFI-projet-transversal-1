var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');
const auth = require('../config/auth');



//FONCTIONNE
//ATTENTION, ne retourne rien si tableau vide, c'est que client a pas fait achats
//fonctionne si logger
//pour avoir la liste des achats effectuer du user
router.post('/ajout',  auth.isAuthenticated,  async (req, res) => {
    try {
        const userConnecte = req.user.id_user;
        var id_produit = req.body.id_produit;
        var date_achat = req.body.date_achat;
        //var user=req.session.username;
        //var donneesAchat = {id_produit: id_produit, id_user: userConnecte, date_achat: date_achat};
        console.log('on est dans ajout achat');
        console.log(id_produit);
        console.log(date_achat);
        console.log(userConnecte);
        const query = "INSERT INTO `achat` VALUES (null, ?, ?, ?);"
        await connection.promise().query(query, [userConnecte, id_produit, date_achat])
        //console.log(results);
        res.status(200).send({'ok': true})

        //res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		res.send({'erreur': err})
    }
})
module.exports = router;
