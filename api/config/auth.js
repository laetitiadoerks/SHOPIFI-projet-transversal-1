var connection     = require('../lib/dbconn');

/**
 * Fonction pour l'authentification
 * utilise les fonctionnalités de passport pour savoir si un ustilisateur est connecté
 * test l'authentification sur l'email
 */
module.exports = {
  isAuthenticated: function(request, response, next) {
    if (request.isAuthenticated()) {
        console.log(request.user.email);
        console.log("authentifier");
        return next();
    }
    else {
        return response.status(401).send('Non_authorise')
    }
  }
  // ,
  // forwardAuthenticated: function(request, response, next) {
  //   if (!request.isAuthenticated()) {
  //     return next();
  //   }
  //   // res.redirect('/dashboard');
  //   response.send(400);
  //   console.log("non authentifier");
  // }
};
