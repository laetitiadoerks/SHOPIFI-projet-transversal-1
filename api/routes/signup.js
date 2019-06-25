const express = require('express');
const router = express.Router();
const connection     = require('../lib/dbconn');

/**
* Fonction qui permet de checker si l'email est unique
* a partir d'un email du user
* Recupère la liste des emails correspondants à celui donner en entrée
* Retourne les resultat
*/
const emailUnique =  async(emailUser) => {
    const query = "SELECT email FROM `user` WHERE email = ?;"
    var [results] = await connection.promise().query(query, emailUser);
    console.log('email unique');
    console.log(results);
    return  results;
}
/**
* Fonction qui permet d'ajouter un nouvel utilisateur (POST)
* a partir des donnees entrée par celui-ci
* Retourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
//pour s'enregistrer
router.post('/', async (req, res) => {
    try {
        // initialisation les variables fixes pour la requete
        // id_user est autoincrémenter dans la BD et par défaut le statut est 'visiteur'
        const idUser = null;
        // console.log(idUser);
        const statutUser = 'visiteur';
        // console.log(statutUser);

        // véfirie si l'email est présent
        //if (!req.query.email) {
        if (!req.body.email) {
            throw 'Email requis.'
        }
        // vérifie si le mot de passe est présent
        //if (!req.query.mot_de_passe) {
        if (!req.body.mot_de_passe) {
            throw 'Mot de passe requis.'
        }
        // Vérifie si l'email est déjà pris
        //const listeEmail = await emailUnique(req.query.email);
        const listeEmail = await emailUnique(req.body.email);
        // console.log('liste email');
        // console.log(listeEmail);

        // verifie si la liste est vide, si oui alors l'email est libre
        if (listeEmail.length != 0){
            throw 'Cet email est déjà pris.'
        }

        // initialise le tableau de données pour la requete avec les données entrées par l'utilisateur
        //const user = [idUser, req.query.prenom_user, req.query.nom_user, req.query.genre, req.query.date_naissance, req.query.addresse, req.query.email, req.query.mot_de_passe, statutUser];
        const user = [idUser, req.body.prenom_user, req.body.nom_user, req.body.genre, req.body.date_naissance, req.body.addresse, req.body.email, req.body.mot_de_passe, statutUser];
        console.log(user);
        const query = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
        await connection.promise().query(query, user)
        // console.log('hahaha quand meme donnees entree dans BD');
        // console.log(results);

        //var results = [{'ok': true}];
        //results.push({'id_user': userConnecte});
        res.send({'ok': true})
    } catch (err) {
        res.status(500).send({'error': err})
    }
})

module.exports = router;
