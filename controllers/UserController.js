const Users = require('../models/Users')

async function register(username, phone, email, password) {
    try {
        const checkUser = await Users.findOne({ $or: [{ phone: phone }, { email: email }] });
        if (checkUser) {
            return null;
        }
        const user = new Users({ username: username, password: password, phone: phone, email: email })
        await user.save()
        return user;
    } catch (error) {
        console.log(error);
    }
    
    return null;
}

async function login(username, password) {
    try {
        const user = await Users.findOne({ $or: [{ phone: username }, { email: username }] });
        if (user) {
            if (user.password == password) {
                return user;
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
module.exports = { login, register, updateUser };
