const express = require('express');
const router = express.Router();



router.get("/login", function (req, res) {
    var { username, password } = req.query;
    if (username === "huongtt" && password === "123") {
        res.json({ 'massage': "Đăng nhập thành công", status: true });
    } else {
        res.json({ 'massage': "Đăng nhập thất bại", status: false });
    }
});

router.post("/login", function (req, res) {
    var { username, password } = req.body;
    userData.filter(user => {
        user.username === username && user.password === password ?
            res.json({ 'massage': "Đăng nhập thành công", status: true }) :
            res.json({ 'massage': "Đăng nhập thất bại", status: false });
    });
});


module.exports = router;