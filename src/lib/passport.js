const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database');
const helpers = require('./helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'Correo',
    passwordField: 'Password',
    passReqToCallback: true
}, async(req, Correo, Password, done) => {
    const rows = await db.query('SELECT * FROM usuario Where Correo = ?', [Correo]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(Password, user.Password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' +
                user.Nombre_Completo + '!'));
        } else {
            done(null, false, req.flash('error', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('error', 'El correo no existe'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'Correo',
    passwordField: 'Password',
    passReqToCallback: true
}, async(req, Correo, Password, done) => {
    const { Nombre_Completo, Nombre_Usuario, isAdmin } = req.body;
    const newUser = {
        Correo,
        Password,
        Nombre_Completo,
        Nombre_Usuario,
        isAdmin
    }
    newUser.Password = await helpers.encryptPassword(Password);
    const result = await db.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.ID = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.ID);
});

passport.deserializeUser(async(ID, done) => {
    const rows = await db.query('SELECT * FROM usuario Where ID = ?', [ID]);
    done(null, rows[0]);
});