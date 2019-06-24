const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
var express = require('express');
var connection     = require('../lib/dbconn');


/**
* Fonction permettant d'identifier et connecter un utilisateur
*/
passport.use(new LocalStrategy(
    // check si l'utilisateur est dans la base de données avec email et mot de passe
    function (email, mot_de_passe, done){
        connection.query("select * from user where email = ?", [email], function(err, rows){
          if (err) return done(req.flash('message',err));

          // si tableau vide retourne null
          if(!rows.length){
              return done(null, false,);
          }
          // recuperation mot_de_passe
          var dbmot_de_passe  = rows[0].mot_de_passe;
          console.log(dbmot_de_passe);

          // check du mot_de_passe
          if(!(dbmot_de_passe == mot_de_passe)){
              return done(null, false);
           }
           const user = rows[0];
          return done(null, user);
        });
    }
))

// fonction pour serialiser le user
passport.serializeUser(function(user, done){
    console.log(user.id_user);
    done(null, user.id_user);
});

// fonction pour deserialiser le user
passport.deserializeUser(function(id, done){
    connection.query("select * from user where id_user = "+ id, function (err, rows){
        // console.log(id_user);
        const user = rows[0];
        done(err, user);
    });
});
module.exports = passport;
