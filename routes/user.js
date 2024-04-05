const router = require('express').Router();

const { security } = require('../conf/constant');
const UserController = require('../controllers/UserController');




// only add new, update, delete, use security, left uneeded

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the user page' });
});

// Register
router.post('/register', async function (req, res, next) {
    try {
        const { username, phone, email, password } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const user = await UserController.register(username, phone, email, password);
        if (!user) {
            return res.status(400).json({ message: 'User not found', status: false });
        }
        res.status(200).json({ user: user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});
// Update
router.post('/update', async function (req, res, next) {
    try {
        const { id, data } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const user = await UserController.updateUser(id, data);
        if (!user) {
            return res.status(400).json({ message: 'User not found', status: false });
        }
        res.status(200).json({ user: user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});
// Login
router.post('/login', async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await UserController.login(username, password);
        if (!user) {
            return res.status(400).json({ message: 'User not found', status: false });
        }
        res.status(200).json({ user: user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

// insert cart to user recive id of user and array product
router.post('/insertCart', async function (req, res, next) {
    try {
        const { id, cart } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const user = await UserController.insertCart(id, cart);
        if (!user) {
            return res.status(400).json({ message: 'User not found', status: false });
        }
        res.status(200).json({ user: user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

// get user by id
router.get('/getUser', async function (req, res, next) {
    try {
        const { id } = req.query;
        const user = await UserController.getUserById(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found', status: false });
        }
        res.status(200).json({ user: user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

module.exports = router;