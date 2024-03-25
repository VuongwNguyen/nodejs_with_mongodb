const CartController = require('../controllers/CartController');
const { security } = require('../conf/constant');
const router = require('express').Router();

// only add new, update, delete, use security, left uneeded


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the cart page' });
});

router.post('/createCart', async function (req, res, next) {
    try {
        const { user_id, products } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const cart = await CartController.createCart(user_id, products);
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found', status: false });
        }
        res.status(200).json({ cart: cart, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/updateCart', async function (req, res, next) {
    try {
        const { user_id, products } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const cart = await CartController.updateCart(user_id, products);
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found', status: false });
        }
        res.status(200).json({ cart: cart, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/deleteProductInCart', async function (req, res, next) {
    try {
        const { user_id, product_id } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const cart = await CartController.deleteProductInCart(user_id, product_id);
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found', status: false });
        }
        res.status(200).json({ cart: cart, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.get('/getCartByUser', async function (req, res, next) {
    try {
        const { user_id } = req.body;
        const cart = await CartController.getCartByUser(user_id);
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found', status: false });
        }
        res.status(200).json({ cart: cart, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

module.exports = router;
