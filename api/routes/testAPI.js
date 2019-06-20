var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});


router.get('/', function(request, response) {
    //response.sendFile(path.join(__dirname + '/login.html'));
    response.send([
    	{
        "id_user": 98,
        "prenom_user": "Kerwin",
        "nom_user": "Mickleborough",
        "genre": "Male",
        "date_naissance": "1991-06-06T22:00:00.000Z",
        "addresse": "716 West Alley",
        "email": "lo@g.com",
        "mot_de_passe": "1234",
        "statut": "visiteur"
    	}
		]);
	});
    // app.post('/login', function(request, response) {
    // 	var username = request.body.username;
    //     console.log(username);
    // 	var password = request.body.password;
    //     console.log(password);
    // 	if (username && password) {
    // 		connection.query('SELECT * FROM user WHERE email = ? AND mot_de_passe = ?',
    //          [username, password],
    //          function(error, results, fields) {
    //             console.log(results);
    // 			if (results.length > 0) {
    // 				request.session.loggedin = true;
    // 				request.session.username = username;
    // 				// response.redirect('/accueil');
    //                 response.send(results);
    // 			} else {
    // 				response.send('Incorrect Username and/or Password!');
    // 			}
    // 			response.end();
    // 		});
    // 	} else {
    // 		response.send('Please enter Username and Password!');
    // 		response.end();
    // 	}
    // });
    //
    // //pour s'enregistrer
    // app.get('/signup', async (req, res) => {
    //     try {
    //             var user=req.session.username;
    //             console.log(user);
    //             const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.email=?"
    //
    //             const [results] = await connection.promise().query(query, user)
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })
    //
    // // app.get('/logout', async (req, res) => {
    // //     try {
    // //             var user=req.session.username;
    // //             console.log(user);
    // //             const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.email=?"
    // //
    // //             const [results] = await connection.promise().query(query, user)
    // //             console.log(results);
    // //
    // //             res.send(results)
    // //     } catch (e) {
    // //         // Traiter l'erreur (qui est contenue dans `e`)
    // //                 var err= 'hihi'
    // //                 console.log(err);
    // //                 return;
    // //     }
    // // })
    //
    // //sur page accueil après login
    // app.get('/accueil', function(request, response) {
    // 	if (request.session.loggedin) {
    // 		response.send('Welcome back, ' + request.session.username + '!');
    //         console.log("accueil");
    // 	} else {
    // 		response.send('Please login to view this page!');
    //         console.log("aller se logger");
    // 	}
    // 	response.end();
    // });
    //
    // //bouton recherche sur page accueil
    // //marche pas %
    // app.get('/accueil/recherche', async (req, res) => {
    //     try {
    //             var recherche=req.body.recherche;
    //             console.log(recherche);
    //             recherche = '%'+recherche+'%';
    //             const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and (nom_produit like ? or description_produit like ? or nom_categorie like ?)"
    //
    //             const [results] = await connection.promise().query(query, [recherche, recherche, recherche])
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })
    //
    //
    //
    //
    //
    // app.get('/produit', async (req, res) => {
    //     try {
    //             var produit=req.body.id_produit;
    //             console.log(produit);
    //             const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM produit, categorie, produit_categorie WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie and produit.id_produit = ?"
    //
    //             const [results] = await connection.promise().query(query, produit)
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })
    //
    // // fonctionne si logger
    // app.get('/user', async (req, res) => {
    //     try {
    //             var user=req.session.username;
    //             console.log(user);
    //             const query = "SELECT prenom_user, nom_user, genre, date_naissance, addresse, email, mot_de_passe FROM `user` WHERE email=?"
    //
    //             const [results] = await connection.promise().query(query, user)
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })
    //
    //
    //
    //
    // //fonctionne si logger
    // app.get('/user/achats', async (req, res) => {
    //     try {
    //             var user=req.session.username;
    //             console.log(user);
    //             const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.email=?"
    //
    //             const [results] = await connection.promise().query(query, user)
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })
    //
    //
    // app.get('/user/modification', async (req, res) => {
    //     try {
    //             var user=req.session.username;
    //             console.log(user);
    //             const query = "SELECT prenom_user, nom_user, nom_produit, prix, date_achat FROM user, achat, produit WHERE user.id_user=achat.id_user and achat.id_produit=produit.id_produit and user.email=?"
    //
    //             const [results] = await connection.promise().query(query, user)
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })
    //
    // app.get('/produits/recommandation', async (req, res) => {
    //     try {
    //             var user=req.session.username;
    //             console.log(user);
    //             const queryUser = "SELECT id_user FROM user WHERE email=?"
    //             const queryAchats = "SELECT achat.id_produit, id_categorie FROM `produit_categorie`, `achat` WHERE achat.id_produit=produit_categorie.id_produit and id_user=?"//ID_USER
    //             const queryHobby = "SELECT nom_hobby FROM `user_hobby`, `hobby` WHERE user_hobby.id_hobby=hobby.id_hobby and id_user=?"//ID_USER
    //             const queryInteret = "SELECT nom_interet FROM `user_interet`, `interet` WHERE user_interet.id_interet=interet.id_interet and id_user=?"//ID_USER
    //             const queryRecommandation = `SELECT *
    //                                             FROM produit, categorie, produit_categorie
    //                                             WHERE produit.id_produit=produit_categorie.id_produit
    //                                             AND categorie.id_categorie=produit_categorie.id_categorie
    //                                             AND ((categorie.id_categorie=1 OR categorie.id_categorie=2 OR categorie.id_categorie=3)
    //                                             OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)XXX
    //                                             OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))YYY
    //                                             AND NOT EXISTS (SELECT achat.id_produit FROM achat WHERE achat.id_produit=produit.id_produit and id_user=?)ID_USER
    //                                             ORDER BY RAND()
    //                                             LIMIT 5;`
    //
    //
    //             const [resultsUser] = await connection.promise().query(query, user)
    //             console.log(resultsUser);
    //             var idUser=resultsUser[0];
    //             console.log(idUser);
    //
    //             const [resultsAchats] = await connection.promise().query(query, user)
    //             console.log(resultsAchats);
    //             var achats=3;
    //             var categorie1=1;
    //             var categorie2=2;
    //             var categorie3=3;
    //
    //             const [resultsHobby] = await connection.promise().query(query, user)
    //             console.log(resultsHobby);
    //             var hobby1='x';
    //             var hobby2=0;
    //             var hobby3=0;
    //
    //             const [resultsInteret] = await connection.promise().query(query, user)
    //             console.log(resultsInteret);
    //             var interet1='y';
    //             var interet2=0;
    //             var interet3=0;
    //
    //             const [results] = await connection.promise().query(query, user)
    //             console.log(results);
    //
    //             res.send(results)
    //     } catch (e) {
    //         // Traiter l'erreur (qui est contenue dans `e`)
    //                 var err= 'hihi'
    //                 console.log(err);
    //                 return;
    //     }
    // })

module.exports = router;
