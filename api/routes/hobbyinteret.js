const express = require('express');
const router = express.Router();
const connection = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet d'obtenir la liste des hobby
* Verifie si le user est connecté
* Retourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
router.get('/hobby',  auth.isAuthenticated,  async (req, res) => {
    try {
        // const userConnecte = req.query.id_user;
        //const userConnecte = req.user.id_user;
        const query = "SELECT * FROM hobby"
        const [results] = await connection.promise().query(query)
        console.log(results);
        res.status(200).send(results)
    } catch (err) {
		response.send({'erreur': err})
    }
});

/**
* Fonction qui permet d'obtenir la liste des interets
* Verifie si le user est connecté
* Reourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
router.get('/interet',  auth.isAuthenticated,  async (req, res) => {
    try {
        // const userConnecte = req.query.id_user;
        // const userConnecte = req.user.id_user;
        const query = "SELECT * FROM interet"
        const [results] = await connection.promise().query(query)
        console.log(results);
        res.status(200).send(results)
    } catch (err) {
		response.send({'erreur': err})
    }
});

/**
* Fonction qui permet d'ajouter 3 hobby à un user (POST)
* a partir des 3 hobby et de l'id du user
* Verifie si le user est connecté
* Retourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
router.post('/hobby/ajout',  auth.isAuthenticated,  async (req, res) => {
    try {
        // initialisation et recupération des valeurs des variables pour la requete
        const userConnecte = req.user.id_user;
        const id_hobby1 = req.body.id_hobby1;
        const id_hobby2 = req.body.id_hobby2;
        const id_hobby3 = req.body.id_hobby3;
        // const userConnecte = req.query.id_user;
        // const id_hobby1 = req.query.id_hobby1;
        // const id_hobby2 = req.query.id_hobby2;
        // const id_hobby3 = req.query.id_hobby3;

        // console.log('on est dans ajout d\'hobby.');
        // console.log(id_hobby1);
        // console.log(id_hobby2);
        // console.log(id_hobby3);
        // console.log(userConnecte);
        const query = "INSERT INTO user_hobby VALUES (?, ?), (?, ?), (?, ?);"
        await connection.promise().query(query, [userConnecte, id_hobby1, userConnecte, id_hobby2, userConnecte, id_hobby3])
        //console.log(results);


        res.status(200).send({'ok': true})
    } catch (err) {
		res.send({'erreur': err})
    }
});

/**
* Fonction qui permet d'ajouter 3 interets à un user (POST)
* a partir des 3 interets et de l'id du user
* Verifie si le user est connecté
* Reourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
router.post('/interet/ajout',  auth.isAuthenticated,  async (req, res) => {
    try {
        // initialisation et recupération des valeurs des variables pour la requete
        const userConnecte = req.user.id_user;
        const id_interet1 = req.body.id_interet1;
        const id_interet2 = req.body.id_interet2;
        const id_interet3 = req.body.id_interet3;
        // const userConnecte = req.query.id_user;
        // const id_interet1 = req.query.id_interet1;
        // const id_interet2 = req.query.id_interet2;
        // const id_interet3 = req.query.id_interet3;

        // console.log('on est dans ajout d\'interet.');
        // console.log(interet1);
        // console.log(interet2);
        // console.log(interet3);
        // console.log(userConnecte);
        const query = "INSERT INTO user_interet VALUES (?, ?), (?, ?), (?, ?);"
        await connection.promise().query(query, [userConnecte, id_interet1, userConnecte, id_interet2, userConnecte, id_interet3])
        //console.log(results);


        res.status(200).send({'ok': true})
    } catch (err) {
		res.send({'erreur': err})
    }
});

module.exports = router;
