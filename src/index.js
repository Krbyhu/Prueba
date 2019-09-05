const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { database } = require('./keys')

//Inicialization
const app = express();
require('./lib/passport');

//Imports

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Mddlewares
app.use(session({
    secret: 'Testsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    app.locals.user = req.user;
    next();
});

//Routes
//app.use(require('./routes/login'));
//app.use(require('./routes/main'));
app.use(require('./routes/signup'));
app.use(require('./routes/forgotpwd'));
app.use(require('./routes/products'));
app.use(require('./routes/cart'));


//Public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'lib')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ' +
        app.get('port'));
});