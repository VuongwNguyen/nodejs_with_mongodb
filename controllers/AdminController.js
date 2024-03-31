const Admins = require('../models/Admins');


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

module.exports = { createAdmin, loginByAdmin };