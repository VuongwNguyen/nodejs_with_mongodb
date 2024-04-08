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
        // trả về mảng đảo ngược thứ tự các đơn hàng
        return orders.reverse();
    } catch (error) {
        console.log(error);
    }
    return null;
}

// viết hàm xoá tất cả các đơn hàng có trong hệ thống
async function deleteAllOrders() {
    try {
        await Orders.deleteMany();
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

async function confirmOrder(order_id) {
    try {
        const order = await Orders.findById(order_id);
        order.status = 'completed';
        order.completed_at = Date.now();
        await order.save();
        return order;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function cancelOrder(order_id) {
    try {
        const order = await Orders.findById(order_id);
        order.status = 'canceled';
        order.canceled_at = Date.now();
        await order.save();
        return order;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = { createAdmin, loginByAdmin, getAllOrders,deleteAllOrders, confirmOrder, cancelOrder};