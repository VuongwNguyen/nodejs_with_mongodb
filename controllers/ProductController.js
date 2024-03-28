const Products = require('../models/Products');

async function createProduct(data) {
    try {
        const checkProduct = await Products.findOne({ name: data.name });
        if (checkProduct) {
            return null;
        }
        const product = new Products(data);
        await product.save();
        return product;
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
        product.set(data);
        await product.save();
        return product;
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
        const products = await Products.find();
        return products;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getProductByCondition(id, limit=0, keyword, category_id) {
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
        let query = Products.find(condition);
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

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductByCondition,
    deleteProductList
}

