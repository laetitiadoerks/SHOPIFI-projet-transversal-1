const express = require('express');
const router = express.Router();
const connection     = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet d'obtenir le statu du user'
* a partir de l'id du user
* Retourne les resultats
*/
const checkStatutUser =  async(idUser) => {
    const query = "SELECT statut FROM `user` WHERE id_user = ?;"
    const [results] = await connection.promise().query(query, idUser);
    console.log('statut:');
    console.log(results);
    return  results;
}

/**
* Fonction qui permet de c hecker si le user est admin ou pas les informations d'un produit
* a partir de l'id d'un user
* Verifie si le user est connecté
* Retourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
router.get('/', async (req, res) => {
    try {
        //// initialisation et recupération de la valeur de la variable pour la requete
        //const idUser = req.user.id_user;
        const idUser = req.query.id_user;
        console.log(idUser);
        const results = await checkStatutUser(idUser);

        // verifie si la liste n'est pas vide
        // renvoie une erreur si la liste est vide
        if (results.length == 0){
            res.status(404).send({'erreur': 'Cet utilisateur n\'a pas de status ou il n\'existe pas'});
        }
        else if (results.statut = 'admin') {
            var resultats = [{'ok': true}];
            resultats.push({'id_user': userConnecte});
            res.status(200).send(resultats)
        }
        else {
            //console.log(results.length);
            res.status(404).send({'erreur': 'Accès non autorisé.'})
        }
    } catch (err) {
		response.send({'erreur': err})
    }
})

/**
* Fonction qui permet d'ajouter un nouveau produit (POST)
* a partir de l'id du user
* Retourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
*/
//pour s'enregistrer
router.post('/ajout', async (req, res) => {
    try {

        //// initialisation et recupération de la valeur de la variable pour la requete
        //const idUser = req.user.id_user;
        const idUser = req.body.id_user;
        //const idUser = req.query.id_user;
        console.log(idUser);
        const results = await checkStatutUser(idUser);

        // verifie si la liste n'est pas vide
        // renvoie une erreur si la liste est vide
        if (results.length == 0){
            res.status(404).send({'erreur': 'Cet utilisateur n\'a pas de status ou il n\'existe pas'});
        }
        else if (results.statut = 'admin') {
            // initialisation les variables fixes pour la requete
            // id_user est autoincrémenter dans la BD et par défaut le statut est 'visiteur'
            const idProduit = null;
            // console.log(idProduit);
            const image = null;
            // console.log(image);
            const note = null;
            // console.log(note);

            // véfirie si l'email est présent
            //if (!req.query.nom_produit) {
            if (!req.body.nom_produit) {
                throw 'Le nom du produit est requis'
            }
            // vérifie si le mot de passe est présent
            //if (!req.query.prix) {
            if (!req.body.prix) {
                throw 'Le prix du produit est requis.'
            }

            // initialise le tableau de données pour la requete avec les données entrées par l'utilisateur
            //const produit = [idProduit, req.query.nom_produit, req.query.prix, req.query.description_produit, image, note];
            const produit = [idProduit, req.body.nom_produit, req.body.prix, req.body.description_produit, image, note];
            console.log(produit);
            const query = "INSERT INTO produit VALUES (?, ?, ?, ?, ?, ?);"
            await connection.promise().query(query, produit)
            // console.log('hahaha quand meme donnees entree dans BD');
            // console.log(results);

            var resultats = [{'ok': true}];
            resultats.push({'id_user': userConnecte});
            res.status(200).send(resultats)
        }
        else {
            //console.log(results.length);
            res.status(404).send({'erreur': 'Accès non autorisé.'})

        }
    } catch (err) {
        res.status(500).send({'error': err})
    }
})

module.exports = router;
