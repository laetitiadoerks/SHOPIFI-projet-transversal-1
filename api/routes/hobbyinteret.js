var express = require('express');
var router = express.Router();
var connection     = require('../lib/dbconn');
const auth = require('../config/auth');

router.get('/hobby',  auth.isAuthenticated,  async (req, res) => {
    try {
        // const userConnecte = req.user.id_user;
        // //var user=req.session.username;
        // console.log(userConnecte);
        const query = "SELECT * FROM hobby"
        const [results] = await connection.promise().query(query)
        console.log(results);
        res.status(200).send(results)

        // res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		response.send({'erreur': err})
    }
});

router.get('/interet',  auth.isAuthenticated,  async (req, res) => {
    try {
        // const userConnecte = req.user.id_user;
        // //var user=req.session.username;
        // console.log(userConnecte);
        const query = "SELECT * FROM interet"
        const [results] = await connection.promise().query(query)
        console.log(results);
        res.status(200).send(results)

        // res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		response.send({'erreur': err})
    }
});

router.post('/hobby/ajout',  auth.isAuthenticated,  async (req, res) => {
    try {
        const userConnecte = req.user.id_user;
        var id_hobby1 = req.body.id_hobby1;
        var id_hobby2 = req.body.id_hobby2;
        var id_hobby3 = req.body.id_hobby3;

        console.log('on est dans ajout d\'hobby.');
        console.log(id_hobby1);
        console.log(id_hobby2);
        console.log(id_hobby3);
        console.log(userConnecte);
        const query = "INSERT INTO user_hobby VALUES (?, ?), (?, ?), (?, ?);"
        await connection.promise().query(query, [userConnecte, id_hobby1, userConnecte, id_hobby2, userConnecte, id_hobby3])
        //console.log(results);
        res.status(200).send({'ok': true})

        //res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		res.send({'erreur': err})
    }
});

router.post('/interet/ajout',  auth.isAuthenticated,  async (req, res) => {
    try {
        const userConnecte = req.user.id_user;
        var id_interet1 = req.body.id_interet1;
        var id_interet2 = req.body.id_interet2;
        var id_interet3 = req.body.id_interet3;

        console.log('on est dans ajout d\'interet.');
        console.log(interet1);
        console.log(interet2);
        console.log(interet3);
        console.log(userConnecte);
        const query = "INSERT INTO user_interet VALUES (?, ?), (?, ?), (?, ?);"
        await connection.promise().query(query, [userConnecte, id_interet1, userConnecte, id_interet2, userConnecte, id_interet3])
        //console.log(results);
        res.status(200).send({'ok': true})

        //res.send(results)
    } catch (err) {
        // Traiter l'erreur (qui est contenue dans `e`)
        //res.status(500).send({'error': err})
		res.send({'erreur': err})
    }
});

module.exports = router;
