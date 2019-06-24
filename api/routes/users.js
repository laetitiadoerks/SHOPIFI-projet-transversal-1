var express = require('express');
var router = express.Router();

// page créée pour des tests
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//VERSION TEST
// router.get('/',(req, res) => {
//             const query = "SELECT prenom_user, nom_user, genre, date_naissance, addresse, email, mot_de_passe FROM `user`";
//             connection.query(query,
// 			function (err, results) {
// 				if (err) throw err;
// 				res.status(200).send(results)
// 			});
// });

module.exports = router;
