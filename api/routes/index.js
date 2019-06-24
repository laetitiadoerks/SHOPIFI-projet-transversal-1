var express = require('express');
var router = express.Router();

// page créée pour des tests
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//VERSION TEST
// router.get('/', (req, res) => {
//     res.status(200).send({
//         message: 'Hello, world!'
//     });
// });
module.exports = router;
