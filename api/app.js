const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const app = express();
//Permet cross origin request et de connecter l'API et le client
const cors = require('cors');

// // Set our port pour tests
// const port = process.env.PORT || 8000;

const connection = require('./lib/dbconn');

// Poru le routage
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var accueilRouter = require("./routes/accueil");
var logoutRouter = require("./routes/logout");
var produitRouter = require("./routes/produit");
var recommandationRouter = require("./routes/recommandation");
var signupRouter = require("./routes/signup");
var userRouter = require("./routes/user");
var achatRouter = require("./routes/achat");
var hobbyinteretRouter = require("./routes/hobbyinteret");


//BODY PARSER
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//CORS
//Définition des CORS
// pas forcement bon contenu
app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}))

// // ??? je sais pas ce que c'est
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });




// Session
app.use(session({
    store: new fileStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false } // Let React access the cookie
}));

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
//     // cookie:{http:Only:false}
// }));


//Utiliser cors
//app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// intitialisation passport
app.use(passport.initialize())
app.use(passport.session())


// Routes, dit a express d'utiliser ces chemins
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/accueil", accueilRouter);
app.use("/logout", logoutRouter);
app.use("/produit", produitRouter);
app.use("/recommandation", recommandationRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/achat", achatRouter);
app.use("/hobbyinteret", hobbyinteretRouter);



// // pour tests
// // Start our server
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

module.exports = app;
