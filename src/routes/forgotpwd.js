const express = require('express');
const router = express.Router();


router.get('/forgotpwd', (req, res) => {
    res.render('forgotpwd/forgotpwd');
});
module.exports = router;