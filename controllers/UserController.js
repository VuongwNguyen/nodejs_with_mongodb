const Users = require('../models/Users')
const Orders = require('../models/Orders')
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

async function register(username, phone, email, password) {
    try {
        const checkUser = await Users.findOne({ $or: [{ phone: phone }, { email: email }] });
        if (checkUser) {
            return null;
        }
        const hash = await bcrypt.hash(password, salt);
        const user = new Users({ username: username, password: hash, phone: phone, email: email })
        await user.save()
        return user;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function login(username, password) {
    try {
        const user = await Users.findOne({ $or: [{ phone: username }, { email: username }] }).populate('cart.product_id');
        if (user) {
            if (user.status == 'deleted') {
                return null;
            }
            if (await bcrypt.compare(password, user.password)) {
                return user.populate('cart.product_id.category_id', 'name');
            }
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function updateUser(id, data) {
    try {
        const user = await Users.findOne({ _id: id });
        if (user) {
            // check if email or phone is already in user
            const checkUser = await Users.findOne({ $or: [{ phone: data.phone }, { email: data.email }] });
            if (checkUser && checkUser._id != id) {
                return null;
            }
            user.set(data);
            await user.save();
            return user;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

// insert cart to user recive id of user and array product
async function insertCart(id, cart) {
    try {
        const user = await Users.findOne({ _id: id });
        if (user) {
            user.cart = cart;
            await user.save();
            return user.populate({ path: 'cart.product_id', populate: { path: 'category_id', select: 'name' } });
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getOrderByUser(id) {
    try {
        const user = await Orders.findOne({ User_id: id }).populate('products.product_id');
        return user;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}


module.exports = { login, register, updateUser, insertCart, getOrderByUser };
