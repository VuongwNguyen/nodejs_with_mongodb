const router = require('express').Router();
const AdminController = require('../controllers/AdminController');


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the admin page' });
});

router.post('/createAdmin', async function (req, res, next) {
    try {
        const { data } = req.body;
        const admin = await AdminController.createAdmin(data);
        res.status(200).json({ admin: admin, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/loginByAdmin', async function (req, res, next) {

    try {
        const { username, password } = req.body;
        const admin = await AdminController.loginByAdmin(username, password);
        console.log(admin);
        if (!admin) {
            res.status(400).json({ message: 'Admin not found', status: false });
            return;
        }
        res.status(200).json({ admin: admin, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

module.exports = router;