const router = require('express').Router();

const ProductController = require('../controllers/ProductController');
const { security } = require('../conf/constant');


// only add new, update, delete, use security and left uneeeded

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the product page' });
});

router.post('/createProduct', async function (req, res, next) {
    try {
        const { data } = req.body;
        console.log(data);
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const product = await ProductController.createProduct(data);
        if (!product) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({ product: product, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/updateProduct', async function (req, res, next) {
    try {
        const { id, data } = req.body;
        console.log(id, ':', data);
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const product = await ProductController.updateProduct(id, data);
        if (!product) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({ product: product, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/deleteProduct', async function (req, res, next) {
    try {
        const { id } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const product = await ProductController.deleteProduct(id);
        if (!product) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({
            "massage": "Deleted product successfully"
            , status: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.get('/getAllProduct', async function (req, res, next) {
    try {
        const products = await ProductController.getAllProduct();
        if (!products) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({ products: products, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.get('/getProductByCondition', async function (req, res, next) {
    try {
        const { id, limit, keyword, category_id } = req.query;
        const products = await ProductController.getProductByCondition(id, limit, keyword, category_id);
        if (!products) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({ products: products, status: true, length: products.length });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

// xoá hàng loạt bằng hàm deleteProductList
router.post('/deleteProductList', async function (req, res, next) {
    try {
        const { idList } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const product = await ProductController.deleteProductList(idList);
        if (!product) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({ product: product, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.get('/getProductWithCategory', async function (req, res, next) {
    try {
        const CategoryWithProducts = await ProductController.getProductWithCategory();
        if (!CategoryWithProducts) {
            return res.status(400).json({ message: 'Product not found', status: false });
        }
        res.status(200).json({ products: CategoryWithProducts, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
        console.log(error);
    }
});









module.exports = router;

