const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/cart', (req, res) => {
    res.render('cart/cart');
});

router.get('/add-to-cart/:id', async(req, res) => {
    // const id = req.params.id;
    // const cart = await db.query('SELECT * FROM producto Where ID = ?', id);
    // console.log(cart[0]);
    const compare = await db.query('SELECT * FROM usuario');
    console.log(compare);
    res.redirect('/');
});

module.exports = router;