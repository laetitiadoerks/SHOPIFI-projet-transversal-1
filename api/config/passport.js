const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
var express = require('express');
// var router = express.Router();
var connection     = require('../lib/dbconn');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// Load User model
// const User = require('../models/User');
//rows = user
passport.use(new LocalStrategy(
    // {
    //     usernameField: 'email',
    //     passwordField: 'mot_de_passe'
    // },
    function (email, mot_de_passe, done){
        connection.query("select * from user where email = ?", [email], function(err, rows){
          if (err) return done(req.flash('message',err));

          if(!rows.length){
              return done(null, false,);
          }

          var dbmot_de_passe  = rows[0].mot_de_passe;
          console.log(dbmot_de_passe);

          if(!(dbmot_de_passe == mot_de_passe)){
              return done(null, false);
           }
           //req.session.user = rows[0];
           const user = rows[0];
          return done(null, user);
        });
    }
))
passport.serializeUser(function(user, done){
    console.log(user.id_user);
    done(null, user.id_user);
});

passport.deserializeUser(function(id, done){
    connection.query("select * from user where id_user = "+ id, function (err, rows){
        // console.log(id_user);
        const user = rows[0];
        done(err, user);
    });
});
module.exports = passport;
//module.exports = function(passport) {
  // passport.use(new LocalStrategy({
  //     usernameField: 'email',
  //     passwordField: 'mot_de_passe'
  //     //passReqToCallback: true //passback entire req to call back
  //             //     passport.use(new Strategy(
  //             // function(username, password, cb) {
  //             //   db.users.findByUsername(username, function(err, user) {
  //             //     if (err) { return cb(err); }
  //             //     if (!user) { return cb(null, false); }
  //             //     if (user.password != password) { return cb(null, false); }
  //             //     return cb(null, user);
  //             //   });
  //             //   }));
  // }, function (email, mot_de_passe, done) {
  //     user.findOne({
  //         where:{email: email}, function(err, results){
  //
  //         }
  //     })
  //     // Match user
  //     User.findOne({
  //       email: email
  //     }).then(user => {
  //       if (!user) {
  //         return done(null, false, { message: 'That email is not registered' });
  //       }
  //
  //       // Match password
  //       bcrypt.compare(password, user.password, (err, isMatch) => {
  //         if (err) throw err;
  //         if (isMatch) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false, { message: 'Password incorrect' });
  //         }
  //       });
  //     });
  //   })
  // );
//   passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'mot_de_passe',
//     passReqToCallback: true //passback entire req to call back
// } , function (req, email, mot_de_passe, done){
//       console.log(email+' = '+ mot_de_passe);
//       if(!email || !mot_de_passe ) { return done(null, false, req.flash('message','All fields are required.')); }
//       // var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
//       connection.query("select * from user where email = ?", [email], function(err, rows){
//           console.log(err);
//         if (err) return done(req.flash('message',err));
//
//         if(!rows.length){ return done(null, false, req.flash('message','Invalid email or mot_de_passe.')); }
//         // salt = salt+''+mot_de_passe;
//         // var encmot_de_passe = crypto.createHash('sha1').update(salt).digest('hex');
//         var dbmot_de_passe  = rows[0].mot_de_passe;
//         console.log(dbmot_de_passe);
//
//         if(!(dbmot_de_passe == mot_de_passe)){
//             return done(null, false, req.flash('message','Invalid email or mot_de_passe.'));
//          }
//          req.session.user = rows[0];
//         return done(null, rows[0]);
//       });
//     }
// ));



  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });
  //
  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });
// };
