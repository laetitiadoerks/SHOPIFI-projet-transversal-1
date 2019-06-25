const express = require('express');
const router = express.Router();
const connection     = require('../lib/dbconn');
const auth = require('../config/auth');

/**
* Fonction qui permet d'obtenir les informations du user (GET)
* a partir de l'id du user
* Verifie si le user est connecté
* Retourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
router.get('/',  auth.isAuthenticated,  async (req, res) => {
    try {
        // initialisation et recupération de l'id du user pour la requete
        //const userConnecte = req.query.id_user;
        const userConnecte = req.user.id_user;
        console.log(userConnecte);
        const query = "SELECT prenom_user, nom_user, genre, date_naissance, addresse, email, mot_de_passe FROM `user` WHERE id_user=?"

        const [results] = await connection.promise().query(query, userConnecte)
        console.log(results);
        // verifie si le tableau du resultat est vide ou non
        // si il est vide, le user n'existe pas
        if (results.length==0){
            res.status(404).send({'erreur': 'ce user n\'existe pas'});
        }
        else {
            //console.log(results.length);
            //console.log(results[0]);
            //results.push({'id_user': userConnecte});
            res.status(200).send(results)
        }
    } catch (err) {
		response.send({'erreur': err})
    }
})

/**
* Fonction qui permet d'obtenir la liste d'achats d'un user (GET)
* a partir de l'id du user
* Verifie si le user est connecté
* Retourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
router.get('/achats',  auth.isAuthenticated,  async (req, res) => {
    try {
        // initialisation et recupération de l'id du user pour la requete
        //const userConnecte = req.query.id_user;
        const userConnecte = req.user.id_user;
        console.log(userConnecte);
        const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.id_user=?"

        const [results] = await connection.promise().query(query, userConnecte)
        console.log(results);
        // verifie si le tableau du resultat est vide ou non
        // si il est vide, le user n'a pas fait d'achats
        if (results.length == 0){
            res.status(404).send({'erreur': 'ce user n\'a pas fait d\'achats'});
        }
        else {
            //results.push({'id_user': userConnecte});
            res.status(200).send(results)
        }
    } catch (err) {
		res.send({'erreur': err})
    }
})

/**
* Fonction qui permet de modifier les informations d'un user (POST)
* a partir de l'id du user et des données entrées par l'utilisateur
* Verifie si le user est connecté
* Retourne "{'ok': true}" et un code 200 si ca a fonctionner sinon un erreur
* L'utilisateur peut changer son nom, son prenom, son addresse, son mot de passe
* il change tout ou rien
*/
router.post('/modification',  auth.isAuthenticated,  async (req, res) => {
    try {
        // initialisation et recupération de l'id du user pour la requete
        const userConnecte = req.user.id_user;
        //const userConnecte = req.query.id_user;
        // initialisation et recupération des valeurs des variables pour la requete
        const userNom= req.body.nom_user;
        const userPrenom = req.body.prenom_user;
        const userAddresse = req.body.addresse;
        const userMot_de_passe = req.body.mot_de_passe;
        // const userNom= req.query.nom_user;
        // const userPrenom = req.query.prenom_user;
        // const userAddresse = req.query.addresse;
        // const userMot_de_passe = req.query.mot_de_passe;
        console.log(userConnecte);
        const query = "UPDATE `user` SET `prenom_user`=?,`nom_user`=?,`addresse`=?,`mot_de_passe`=? WHERE id_user = ?";

        await connection.promise().query(query,[userPrenom, userNom, userAddresse, userMot_de_passe, userConnecte])
        //var results = [{'ok': true}];
        //results.push({'id_user': userConnecte});
        res.status(200).send({'ok': true})
    } catch (e) {
		response.send({'erreur': err})
    }
});


//VERSION TEST
// //FONCTIONNE
// //fonctionne si logger
// //pour avoir les informations du user/son profil
// router.get('/', (req, res) => {
//         const user = req.body.id_user;
//         //console.log(user);
//         const query = "SELECT prenom_user, nom_user, genre, date_naissance, addresse, email, mot_de_passe FROM `user` WHERE id_user=?";
//         connection.query(query, user,
//         function(err, results){
//             if (err) {
//                 throw err;
//                 res.status(500).send({'erreur': err});
//             }
//             if (results.length==0){
//                 res.status(404).send({'erreur': 'ce user n\'existe pas'});
//             }
//             else {
//                 //console.log(results.length);
//                 //console.log(results[0]);
//                 res.status(200).send(results[0])
//             }
//         });
// });
//
// //FONCTIONNE
// //ATTENTION, ne retourne rien si tableau vide, c'est que client a pas fait achats
// //fonctionne si logger
// //pour avoir la liste des achats effectuer du user
// router.get('/achats', (req, res) => {
//         const user = req.body.id_user;
//         //console.log(user);
//         const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.id_user=?";
//         connection.query(query, user,
//         function (err, results){
//             if (err) {
//                 throw err;
//                 res.status(500).send({'erreur': err});
//             }
//             if (results.length==0){
//                 res.status(404).send({'erreur': 'ce user n\'a pas fait d\'achats'});
//             }
//             else {
//                 //console.log(results.length);
//                 res.status(200).send(results)
//             }
//         });
// });
//
// //
// //user peut changer son nom, son prenom, son addresse, son mot de passe
// //peut tout faire ou rien
// //a modifier? il faudrait faire plusieurs boutons: un pour mot_de_passe, un pour infos perso
// //ne peut pas changer ses interet et hobby
// router.post('/modification', (req, res) => {
//         const userConnecte = req.body.id_user;
//         const userNom= req.body.nom_user;
//         const userPrenom = req.body.prenom_user;
//         const userAddresse = req.body.addresse;
//         const userMot_de_passe = req.body.mot_de_passe;
//         //var user=req.session.username;
//         console.log(userConnecte);
//         const query = "UPDATE `user` SET `prenom_user`=?,`nom_user`=?,`addresse`=?,`mot_de_passe`=? WHERE id_user = ?";
//         connection.query(query,[userPrenom, userNom, userAddresse, userMot_de_passe, userConnecte]),
//         function (err, results){
//             if (err) throw err;
//             res.status(200).send(results)
//         };
//         console.log(results);
// });

module.exports = router;
