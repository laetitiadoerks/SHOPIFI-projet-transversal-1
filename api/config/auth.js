var connection     = require('../lib/dbconn');

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
  },
  forwardAuthenticated: function(request, response, next) {
    if (!request.isAuthenticated()) {
      return next();
    }
    // res.redirect('/dashboard');
    response.send(400);
    console.log("non authentifier");
  }
};
