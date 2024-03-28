const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const local = 'mongodb+srv://db-mongodb-sgp1-99474-841772ec.mongo.ondigitalocean.com';

async function connect() {
    try {
        await mongoose.connect(local, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to database successfully!');
    } catch (error) {
        console.log('Connect to database fail!', error);
    }
}


module.exports = { connect };
