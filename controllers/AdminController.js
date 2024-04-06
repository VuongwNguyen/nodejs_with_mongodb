const Admins = require('../models/Admins');
const Orders = require('../models/Orders');


async function createAdmin(data) {
    try {
        const admin = new Admins(data);
        await admin.save();
        return admin;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}

async function loginByAdmin(username, password) {
    try {
        const admin = await Admins.findOne({ username: username, password: password });
        return admin;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}


async function getAllOrders() {
    try {
        const orders = await Orders.find().populate('User_id').populate('products.product_id');
        return orders;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = { createAdmin, loginByAdmin };