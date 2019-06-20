var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');
const auth = require('../config/auth');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});

//fonction pour recommandation

///???
const getInfoUser =  async(userId) => {
    const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM `produit`, `categorie`, `produit_categorie` WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie ORDER BY rand() LIMIT 6"
    var [results] = await connection.promise().query(query)
    // console.log('info user');
    // console.log(results);
    return  results;
}

const getUser =  async(userId) => {
    const query = "SELECT id_user FROM user WHERE id_user=?"
    var [results] = await connection.promise().query(query, userId)
    // console.log('get user');
    // console.log(results);
    return  results;
}

const getAchats =  async(userId) => {
    const query = "SELECT achat.id_produit, id_categorie FROM `produit_categorie`, `achat` WHERE achat.id_produit=produit_categorie.id_produit and id_user=?"//ID_USER
    var [results] = await connection.promise().query(query, Array(5).fill(userId))
    // console.log('get user Achats');
    // console.log(results);
    return  results;
}

const getHobby =  async(userId) => {
    const query = "SELECT nom_hobby FROM `user_hobby`, `hobby` WHERE user_hobby.id_hobby=hobby.id_hobby and id_user=?"//ID_USER
    var [results] = await connection.promise().query(query, userId)
    // console.log('get user Hobby');
    // console.log(results);
    return  results;
}

const getInteret =  async(userId) => {
    const query = "SELECT nom_interet FROM `user_interet`, `interet` WHERE user_interet.id_interet=interet.id_interet and id_user=?"//ID_USER
    var [results] = await connection.promise().query(query, userId)
    // console.log('get user Interet');
    // console.log(results);
    return  results;
}

router.get('/',  auth.isAuthenticated,  async (req, res) => {
    try {

        const userConnecte = req.user.id_user;
        console.log('hihi');
        console.log(userConnecte);

        const user = await getUser(userConnecte)
        console.log('user:');
        console.log(user);

        const achats = await getAchats(userConnecte)
        console.log('Achats:');
        console.log(achats);
        // for (var i = 0; i < achats.length; i++) {
        //     //achats[i]
        //     console.log(acahts[i]);
        // }

        const hobby = await getHobby(userConnecte)
        console.log('hobby:');
        console.log(hobby);

        const interet = await getInteret(userConnecte)
        console.log('interet:');
        console.log(interet);


        if (achats.length>=3){
            const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie ORDER BY rand() LIMIT 6"
            const [results] = await connection.promise().query(query);
            //console.log(results);
            // var user=req.session.username;
            // console.log(user);
            // const queryUser = "SELECT id_user FROM user WHERE email=?"
            // const queryAchats = "SELECT achat.id_produit, id_categorie FROM `produit_categorie`, `achat` WHERE achat.id_produit=produit_categorie.id_produit and id_user=?"//ID_USER
            // const queryHobby = "SELECT nom_hobby FROM `user_hobby`, `hobby` WHERE user_hobby.id_hobby=hobby.id_hobby and id_user=?"//ID_USER
            // const queryInteret = "SELECT nom_interet FROM `user_interet`, `interet` WHERE user_interet.id_interet=interet.id_interet and id_user=?"//ID_USER
            // const queryRecommandation = `SELECT *
            //                                 FROM produit, categorie, produit_categorie
            //                                 WHERE produit.id_produit=produit_categorie.id_produit
            //                                 AND categorie.id_categorie=produit_categorie.id_categorie
            //                                 AND ((categorie.id_categorie=1 OR categorie.id_categorie=2 OR categorie.id_categorie=3)
            //                                 OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)XXX
            //                                 OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))YYY
            //                                 AND NOT EXISTS (SELECT achat.id_produit FROM achat WHERE achat.id_produit=produit.id_produit and id_user=?)ID_USER
            //                                 ORDER BY RAND()
            //                                 LIMIT 5;`
            //
            //
            // const [resultsUser] = await connection.promise().query(query, user)
            // console.log(resultsUser);
            // var idUser=resultsUser[0];
            // console.log(idUser);
            //
            // const [resultsAchats] = await connection.promise().query(query, user)
            // console.log(resultsAchats);
            // var achats=3;
            // var categorie1=1;
            // var categorie2=2;
            // var categorie3=3;
            //
            // const [resultsHobby] = await connection.promise().query(query, user)
            // console.log(resultsHobby);
            // var hobby1='x';
            // var hobby2=0;
            // var hobby3=0;
            //
            // const [resultsInteret] = await connection.promise().query(query, user)
            // console.log(resultsInteret);
            // var interet1='y';
            // var interet2=0;
            // var interet3=0;
            //
            // const [results] = await connection.promise().query(query, user)
            // console.log(results);

            res.send(results)
        }
        else {
            console.log('else');
            const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie ORDER BY rand() LIMIT 6"
            const [results] = await connection.promise().query(query);
            //console.log(results);
            // var user=req.session.username;
            // console.log(user);
            // const queryUser = "SELECT id_user FROM user WHERE email=?"
            // const queryAchats = "SELECT achat.id_produit, id_categorie FROM `produit_categorie`, `achat` WHERE achat.id_produit=produit_categorie.id_produit and id_user=?"//ID_USER
            // const queryHobby = "SELECT nom_hobby FROM `user_hobby`, `hobby` WHERE user_hobby.id_hobby=hobby.id_hobby and id_user=?"//ID_USER
            // const queryInteret = "SELECT nom_interet FROM `user_interet`, `interet` WHERE user_interet.id_interet=interet.id_interet and id_user=?"//ID_USER
            // const queryRecommandation = `SELECT *
            //                                 FROM produit, categorie, produit_categorie
            //                                 WHERE produit.id_produit=produit_categorie.id_produit
            //                                 AND categorie.id_categorie=produit_categorie.id_categorie
            //                                 AND ((categorie.id_categorie=1 OR categorie.id_categorie=2 OR categorie.id_categorie=3)
            //                                 OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)XXX
            //                                 OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))YYY
            //                                 AND NOT EXISTS (SELECT achat.id_produit FROM achat WHERE achat.id_produit=produit.id_produit and id_user=?)ID_USER
            //                                 ORDER BY RAND()
            //                                 LIMIT 5;`
            //
            //
            // const [resultsUser] = await connection.promise().query(query, user)
            // console.log(resultsUser);
            // var idUser=resultsUser[0];
            // console.log(idUser);
            //
            // const [resultsAchats] = await connection.promise().query(query, user)
            // console.log(resultsAchats);
            // var achats=3;
            // var categorie1=1;
            // var categorie2=2;
            // var categorie3=3;
            //
            // const [resultsHobby] = await connection.promise().query(query, user)
            // console.log(resultsHobby);
            // var hobby1='x';
            // var hobby2=0;
            // var hobby3=0;
            //
            // const [resultsInteret] = await connection.promise().query(query, user)
            // console.log(resultsInteret);
            // var interet1='y';
            // var interet2=0;
            // var interet3=0;
            //
            // const [results] = await connection.promise().query(query, user)
            // console.log(results);

            res.send(results)
        }

    } catch (e) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(600).send({'error': err})
		res.send({'erreur': e})
    }
})

module.exports = router;
