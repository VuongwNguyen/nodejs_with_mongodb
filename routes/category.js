const router = require('express').Router();

const { security } = require('../conf/constant');
const CategoryController = require('../controllers/CategoryController');

// only add new, update, delete, use security, left uneeded

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the category page' });
});

router.post('/createCategory', async function (req, res, next) {
    try {
        const { data } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const category = await CategoryController.createCategory(data);
        if (!category) {
            return res.status(400).json({ message: 'Category not found', status: false });
        }
        res.status(200).json({ category: category, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/updateCategory', async function (req, res, next) {
    try {
        const { id, data } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const category = await CategoryController.updateCategory(id, data);
        if (!category) {
            return res.status(400).json({ message: 'Category not found', status: false });
        }
        res.status(200).json({ category: category, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});

router.post('/deleteCategory', async function (req, res, next) {
    try {
        const { id } = req.body;
        const Security = req.headers['security'];
        if (Security != security) {
            return res.status(401).json({ message: 'Unauthorized', status: false });
        }
        const category = await CategoryController.deleteCategory(id);
        if (!category) {
            return res.status(400).json({ message: 'Category not found', status: false });
        }
        res.status(200).json({ massage: "Category deleted successfully", status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});
//get do not need security
router.get('/getAllCategory', async function (req, res, next) {
    try {
        const categories = await CategoryController.getAllCategory();
        if (!categories) {
            return res.status(400).json({ message: 'Category not found', status: false });
        }
        res.status(200).json({ categories: categories, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
});


module.exports = router;


