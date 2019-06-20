var express = require('express');
var router = express.Router();
var connection = require('../lib/dbconn');
const auth = require('../config/auth');

//router.get('/', function(req, res, next) {
//    res.send('API is working properly');
//});


// router.get('/', function(request, response) {
    //response.sendFile(path.join(__dirname + '/login.html'));
    router.post('/',  auth.isAuthenticated, (request, response) => {
        // console.log(req.user.email);
    	request.logout();
        response.send({'success': true})
    });
    // app.get('/logout', async (req, res) => {
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

module.exports = router;
