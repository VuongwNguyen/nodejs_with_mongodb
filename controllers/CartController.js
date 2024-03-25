const Carts = require('../models/Carts');

async function createCart(user_id, products) {
    try {
        const cart = new Carts({ user_id: user_id, products: products });
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getCartByUser(user_id) {
    try {
        const cart = await Carts.findOne({ user_id: user_id });
        return cart.products;
    } catch (error) {
        console.log(error);
    }
    return null;
}


async function updateCart(user_id, products) {
    try {
        const cart = await Carts.findOne({ user_id: user_id });
        cart.products = products;
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
    }
    return null;
}

// xoá phần tử nào đó trong products
async function deleteProductInCart(user_id, product_id) {
    try {
        const cart = await Carts.findOne({ user_id: user_id });
        cart.products = cart.products.filter(product => product.product_id != product_id);
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = {
    createCart,
    getCartByUser,
    updateCart,
    deleteProductInCart

}