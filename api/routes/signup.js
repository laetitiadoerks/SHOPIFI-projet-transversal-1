var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});

// check email unique
const emailUnique = async(emailUser) => {
    const query ="";
}
//pour s'enregistrer
router.post('/', async (req, res) => {
    try {
        //let user = req.body
        //console.log(user);
        const idUser = 'null';
        console.log(idUser);
        const statutUser = 'visiteur';
        console.log(statutUser);
        //console.log([req.body.prenom_user, req.body.nom_user, req.body.genre, req.body.date_naissance, req.body.addresse, req.body.email, req.body.mot_de_passe]);

        if (!req.body.email) {
            throw 'Email requis'
        }
        if (!req.body.mot_de_passe) {
            throw 'Mot de passe requis'
        }
//(?, ?, ?, ?, ?, ?, ?, ?, ?)
        console.log('hihihi');
        const user = [idUser, req.body.prenom_user, req.body.nom_user, req.body.genre, req.body.date_naissance, req.body.addresse, req.body.email, req.body.mot_de_passe, statutUser];
        console.log(user);
        const query = "INSERT INTO user (id_user, prenom_user, nom_user, genre, date_naissance, addresse, email, mot_de_passe, statut) VALUES ?"
        const query2 ="INSERT INTO user SET ?"
        const query3 = "INSERT INTO `user`(`id_user`, `prenom_user`, `nom_user`, `genre`, `date_naissance`, `addresse`, `email`, `mot_de_passe`, `statut`) VALUES (null, 'albertine','rigi','m','1999-12-10','jjjjjjjj','rigi.com','1234','visiteur')";
        const [results] = await database.query(query3);
        //console.log(results);
        res.send({'success': true})

            // var user=req.session.username;
            // console.log(user);
            // const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.email=?"
            //
            // const [results] = await connection.promise().query(query, user)
            // console.log(results);
            //
            // res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        res.status(500).send({'error': err})
		//res.send({'erreur': err})
    }
})

module.exports = router;
