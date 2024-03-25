const express = require('express');
const router = express.Router();
// hello world
router.get('/', function (req, res, next) {
    res.json({ message: 'Hello World!' });
});

router.get('/bai2', function (req, res, next) {
    const { a, b } = req.query;
    var sum = Number(a) + Number(b);
    res.json({ sum: sum });
});

router.post('/bai2_', function (req, res, next) {
    const { a, b } = req.body;
    res.json({ sum: Number(a) + Number(b) });
});