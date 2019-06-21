var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var app = express();
// const passport = require('./config/passport');
//var LocalStrategy = require('passport-local').Strategy;

//Permet cross origin request et de connecter l'API et le client
var cors = require('cors');
// // Set our port pour tests
// const port = process.env.PORT || 8000;

//TRANSFERT DU CODE DE LAETITIA VERS BASE
//LES DEPENDANCES
var mysql = require('mysql2');
var bodyParser = require('body-parser');

// var app = express();
//bien être connecté au vpn de l'unige pour accéder à la bdd
// var connection = mysql.createConnection({
// 	host     : '10.194.69.15',
// 	user     : 'A6',
// 	password : 'nm6ofcCAJ7OrlVhD',
// 	database : 'A6'
// });
var connection     = require('./lib/dbconn');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Demande un routag spécifique
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var accueilRouter = require("./routes/accueil");
var logoutRouter = require("./routes/logout");
var produitRouter = require("./routes/produit");
var recommandationRouter = require("./routes/recommandation");
var signupRouter = require("./routes/signup");
var userRouter = require("./routes/user");
var achatRouter = require("./routes/achat");



// app.use(passport.initialize())
// app.use(passport.session())

//BODY PARSER
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//CORS
//Définition des CORS
// pas forcement bon contenu
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const passport = require('./config/passport');

//APP GET
//accueil
//ajouter comparaison
//envoyer true a karma
app.use(session({
    store: new fileStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
    // cookie:{http:Only:false}
}));

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
//     // cookie:{http:Only:false}
// }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Utiliser cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())



app.use('/', indexRouter);
app.use('/users', usersRouter);
//Nouvelle route de test, dit a express d'utiliser ce chemin
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/accueil", accueilRouter);
app.use("/logout", logoutRouter);
app.use("/produit", produitRouter);
app.use("/recommandation", recommandationRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/achat", achatRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // pour tests
// // Start our server
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

module.exports = app;
