var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});

// requete pour check email unique
const emailUnique =  async(emailUser) => {
    const query = "SELECT email FROM `user` WHERE email = ?;"
    var [results] = await connection.promise().query(query, emailUser);
    console.log('email unique');
    console.log(results);
    return  results;
}
//pour s'enregistrer
router.post('/', async (req, res) => {
    try {
        //let user = req.body
        //console.log(user);
        const idUser = null;
        console.log(idUser);
        const statutUser = 'visiteur';
        console.log(statutUser);
        //console.log([req.body.prenom_user, req.body.nom_user, req.body.genre, req.body.date_naissance, req.body.addresse, req.body.email, req.body.mot_de_passe]);

        if (!req.body.email) {
            throw 'Email requis.'
        }
        if (!req.body.mot_de_passe) {
            throw 'Mot de passe requis.'
        }
        // requete check si email déjà dans BD
        const listeEmail = await emailUnique(req.body.email);
        console.log('liste email');
        console.log(listeEmail);

        if (listeEmail.length != 0){
            throw 'Cet email est déjà pris.'
        }

        console.log('hihihi');
        const user = [idUser, req.body.prenom_user, req.body.nom_user, req.body.genre, req.body.date_naissance, req.body.addresse, req.body.email, req.body.mot_de_passe, statutUser];
        console.log(user);
        const query = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
        await connection.promise().query(query, user)
        // console.log('hahaha quand meme donnees entree dans BD');
        //console.log(results);
        res.send({'success': true})

    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        res.status(500).send({'error': err})
		//res.send({'erreur': err})
    }
})

module.exports = router;
