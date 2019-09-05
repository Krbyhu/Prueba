module.exports = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },

    isAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.isAdmin == 1) {
                return next();
            }
        }
        return res.redirect('/profile');
    }
};