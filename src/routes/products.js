const express = require('express');
const router = express.Router();

const db = require('../database');
const { isLoggedIn, isAdmin } = require('../lib/auth');

router.get('/add', isAdmin, isLoggedIn, (req, res) => {
    res.render('products/products');
});

router.post('/add', async(req, res) => {
    const { Nombre, Codigo, Valor, Cantidad, UrlImagen, Detalle } = req.body;
    const newProduct = {
        Nombre,
        Codigo,
        Valor,
        Cantidad,
        UrlImagen,
        Detalle
    };
    await db.query('INSERT INTO producto SET ?', [newProduct]);
    req.flash('success', 'Producto agregado correctamente');
    res.redirect('/');
});

router.get('/', async(req, res) => {
    const products = await db.query('SELECT * FROM producto');
    res.render('main/main', { products });
});

router.get('/delete/:id', isAdmin, isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM producto WHERE ID = ?', [id]);
    req.flash('success', 'Producto eliminado correctamente');
    res.redirect('/');
});

router.get('/edit/:id', isAdmin, isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const edit = await db.query('SELECT * FROM producto WHERE ID = ?', [id]);
    res.render('products/edit', { edit: edit[0] });
    console.log(edit[0]);
});

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { Nombre, Codigo, Valor, Cantidad, UrlImagen, Detalle } = req.body;
    const newEdit = {
        Nombre,
        Codigo,
        Valor,
        Cantidad,
        UrlImagen,
        Detalle
    };
    await db.query('UPDATE producto SET ? WHERE ID = ?', [newEdit, id]);
    req.flash('success', 'Producto actualizado correctamente');
    res.redirect('/');
});


module.exports = router;