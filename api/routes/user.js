var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');
const auth = require('../config/auth');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});

//FONCTIONNE
//fonctionne si logger
//pour avoir les informations du user/son profil
router.get('/',  auth.isAuthenticated,  async (req, res) => {
    try {
        const userConnecte = req.user.id_user;
        //var user=req.session.username;
        console.log(userConnecte);
        const query = "SELECT prenom_user, nom_user, genre, date_naissance, addresse, email, mot_de_passe FROM `user` WHERE id_user=?"

        const [results] = await connection.promise().query(query, userConnecte)
        console.log(results);
        if (results.length==0){
            res.status(404).send({'erreur': 'ce user n\'existe pas'});
        }
        else {
            //console.log(results.length);
            //console.log(results[0]);
            res.status(200).send(results)
        }

        // res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		response.send({'erreur': err})
    }
})



//FONCTIONNE
//ATTENTION, ne retourne rien si tableau vide, c'est que client a pas fait achats
//fonctionne si logger
//pour avoir la liste des achats effectuer du user
router.get('/achats',  auth.isAuthenticated,  async (req, res) => {
    try {
        const userConnecte = req.user.id_user;
        //var user=req.session.username;
        console.log(userConnecte);
        const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.id_user=?"

        const [results] = await connection.promise().query(query, userConnecte)
        console.log(results);
        if (results.length==0){
            res.status(404).send({'erreur': 'ce user n\'a pas fait d\'achats'});
        }
        else {
            //console.log(results.length);
            res.status(200).send(results)
        }

        //res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		response.send({'erreur': err})
    }
})

//
//user peut changer son nom, son prenom, son addresse, son mot de passe
//peut tout faire ou rien
//a modifier? il faudrait faire plusieurs boutons: un pour mot_de_passe, un pour infos perso
//ne peut pas changer ses interet et hobby
router.post('/modification',  auth.isAuthenticated,  async (req, res) => {
    try {
        const userConnecte = req.user.id_user;
        const userNom= req.body.nom_user;
        const userPrenom = req.body.prenom_user;
        const userAddresse = req.body.addresse;
        const userMot_de_passe = req.body.mot_de_passe;
        //var user=req.session.username;
        console.log(userConnecte);
        const query = "UPDATE `user` SET `prenom_user`=?,`nom_user`=?,`addresse`=?,`mot_de_passe`=? WHERE id_user = ?";

        const [results] = await connection.promise().query(query,[userPrenom, userNom, userAddresse, userMot_de_passe, userConnecte])
        console.log(results);

        res.send(results)
    } catch (e) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
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
