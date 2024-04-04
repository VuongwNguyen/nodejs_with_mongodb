const Products = require('../models/Products');
const Categories = require('../models/Categories');

async function createProduct(data) {
    try {
        const checkProduct = await Products.findOne({ name: data.name });
        if (checkProduct) {
            return null;
        }
        const product = new Products(data);
        const save = await product.save();
        const result = await save.populate('category_id', 'name');
        return result;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function updateProduct(id, data) {
    try {
        const product = await Products.findOne({ _id: id });
        if (!product) {
            return null;
        }
        const result = await product.set(data).populate('category_id', 'name');
        return result;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function deleteProduct(id) {
    try {
        const product = await Products.findOne({ _id: id });
        if (!product) {
            return null;
        }
        await product.deleteOne();
        return true;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getAllProduct() {
    try {
        const products = await Products.find().populate('category_id', 'name');
        return products;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getProductByCondition(id, limit = 0, keyword, category_id) {
    try {
        let condition = {};
        if (id) {
            condition._id = id;
        }
        if (keyword) {
            condition.name = { $regex: keyword, $options: 'i' };
        }
        if (category_id) {
            condition.category_id = category_id;
        }
        let query = Products.find(condition).populate('category_id', 'name');
        if (limit) {
            query = query.limit(parseInt(limit));
        }
        const products = await query.exec();
        return products;
    } catch (error) {
        console.log(error);
    }
    return null;
}
// xoá hàng loạt truyền vào mảng id
async function deleteProductList(idList) {
    try {
        const products = await Products.find({ _id: { $in: idList } });
        if (!products) {
            return null;
        }
        await Products.deleteMany({ _id: { $in: idList } });
        return true;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getProductWithCategory() {
    try {
        const categories = await Categories.find().lean().exec();
        const CategoryWithProducts = await Promise.all(categories.map(async (category) => {
            console.log(category._id);
            const products = await Products.find({ category_id: category._id }).populate('category_id', 'name').lean().exec();
            return { category: category.name, products: products };
        }));
        return CategoryWithProducts;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductByCondition,
    deleteProductList,
    getProductWithCategory,
}


